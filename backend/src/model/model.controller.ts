import {  Controller, Get, UseGuards } from '@nestjs/common';
import { ModelService } from './model.service';
import { MODEL_CONTROLLER, MODEL_ROUTES } from '@libs/api';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@Controller(MODEL_CONTROLLER)
export class ModelController {
	constructor(private readonly modelService: ModelService) {}

	@UseGuards(JwtAuthGuard)
	@Get(MODEL_ROUTES.GET_ALL)
	async getAll() {
		return this.modelService.getAll();
	}
}
