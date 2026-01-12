import { AUTH_CONTROLLER, AUTH_ROUTES } from '@libs/api';
import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginBodyDto, RegisterBodyDto, RegisterResponseDto, ResetPasswordBodyDto } from './dtos';

@Controller(AUTH_CONTROLLER)
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post(AUTH_ROUTES.REGISTER)
	async register(@Body() body: RegisterBodyDto): Promise<RegisterResponseDto> {
		return this.authService.register(body);
	}

	@Post(AUTH_ROUTES.LOGIN)
	login(@Body() dto: LoginBodyDto) {
		return this.authService.login(dto.email, dto.password);
	}

	@Post(AUTH_ROUTES.RESET_PASSWORD)
	resetPassword(@Body() dto: ResetPasswordBodyDto) {
		return this.authService.resetPassword(dto.email, dto.password);
	}
}
