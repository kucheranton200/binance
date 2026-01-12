import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { INestApplication, RequestMethod } from '@nestjs/common';
import { ZodValidationPipe } from 'nestjs-zod';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
		bodyParser: true,
	});;
  const configService = app.get(ConfigService);
  const NODE_ENV = configService.getOrThrow<string>('NODE_ENV');
  const API_PREFIX = configService.getOrThrow<string>('API_PREFIX');
  const APP_PORT = Number(configService.getOrThrow<string>('APP_PORT'));
  configureApp(app, API_PREFIX, NODE_ENV);

  app.enableCors({
		origin: 'http://localhost:5173',
		credentials: true,
	});

  await app.listen(APP_PORT, '0.0.0.0');

}

function configureApp(
	app: INestApplication,
	apiPrefix: string,
	nodeEnv: string,
): void {
	app.setGlobalPrefix(apiPrefix, {
		exclude: [
			{ path: 'ping', method: RequestMethod.GET },
			{ path: 'metrics', method: RequestMethod.GET },
		],
	});

	app.use(helmet());

	app.useGlobalPipes(new ZodValidationPipe());
	app.enableShutdownHooks();
}
bootstrap();
