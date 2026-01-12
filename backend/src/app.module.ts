import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { ModelModule } from './model/model.module';
import { CryptoModule } from './crypto/crypto.module';

@Module({
	imports: [ConfigModule.forRoot({
		isGlobal: true,
		envFilePath: `./.env`,
	}), AuthModule, PrismaModule, ModelModule, CryptoModule],
})
export class AppModule {}
