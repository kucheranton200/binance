import {  Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CRYPTO_CONTROLLER, CRYPTO_ROUTES } from '@libs/api';
import { CryptoService } from './crypto.service';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@Controller(CRYPTO_CONTROLLER)
export class CryptoController {
	constructor(private readonly cryptoService: CryptoService) {}

	@UseGuards(JwtAuthGuard)
	@Get(CRYPTO_ROUTES.GET_HISTORY)
	async history(@GetUser('id') userId: string) {
		return this.cryptoService.getHistory(userId);
	}

	@UseGuards(JwtAuthGuard)
	@Post(CRYPTO_ROUTES.PREDICT)
	async predict(
		@GetUser('id') userId: string,
		@Body() body: { modelId: string }
	) {
		return this.cryptoService.predict(userId, body.modelId);
	}
}
