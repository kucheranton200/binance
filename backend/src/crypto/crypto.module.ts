import { Module } from '@nestjs/common';
import { CryptoController } from './crypto.controller';
import { CryptoService } from './crypto.service';
import { CryptoRepository } from './crypto.repository';
import { ModelRepository } from 'src/model/model.repository';
import { AuthModule } from 'src/auth/auth.module';

@Module({
	imports: [AuthModule],
	controllers: [CryptoController],
	providers: [CryptoService, CryptoRepository, ModelRepository],
})
export class CryptoModule {}
