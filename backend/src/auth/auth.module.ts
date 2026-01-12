import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthRepository } from './auth.repository';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthGuard } from './guards/jwt.guard';

@Module({
	imports: [
		JwtModule.register({
			secret: process.env.JWT_SECRET || 'supersecret',
			signOptions: { expiresIn: '7d' },
		}),
	],
	controllers: [AuthController],
	providers: [AuthService, AuthRepository, JwtAuthGuard],
	exports: [JwtAuthGuard, JwtModule],
})
export class AuthModule {}
