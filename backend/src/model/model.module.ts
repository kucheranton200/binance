import { Module } from '@nestjs/common';
import { ModelController } from './model.controller';
import { ModelService } from './model.service';
import { ModelRepository } from './model.repository';
import { AuthModule } from 'src/auth/auth.module';

@Module({
	imports: [AuthModule],
	controllers: [ModelController],
	providers: [ModelService, ModelRepository],
	exports: [ModelRepository],
})
export class ModelModule {}
