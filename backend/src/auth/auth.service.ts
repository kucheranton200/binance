import { Injectable, ConflictException, UnauthorizedException, BadRequestException, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AuthRepository } from './auth.repository';
import { RegisterBodyDto, RegisterResponseDto } from './dtos';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
	constructor(
		private readonly authRepository: AuthRepository,
		private readonly jwtService: JwtService
	) {}

	async register(payload: RegisterBodyDto): Promise<RegisterResponseDto> {
		const existingUser = await this.authRepository.findByEmail(payload.email);

		if (existingUser) {
			throw new ConflictException('User already exists');
		}

		const hashedPassword = await bcrypt.hash(payload.password, 10);

		const user = await this.authRepository.create({
			email: payload.email,
			password: hashedPassword,
		});

		const token = this.jwtService.sign({
			sub: user.id,
			email: user.email,
		});

		return {
			user: {
				id: user.id,
				email: user.email,
				createdAt: user.createdAt,
			},
			token
		};
	}

	async login(email: string, password: string) {
		const user = await this.authRepository.findByEmail(email);
		if (!user) throw new UnauthorizedException('Неверный email или пароль');

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) throw new UnauthorizedException('Неверный email или пароль');

		const token = this.jwtService.sign({ sub: user.id, email: user.email });
		return { user: { id: user.id, email: user.email }, token };
	}

    async resetPassword(email: string, newPassword: string) {
		const user = await this.authRepository.findByEmail(email);
		if (!user) throw new NotFoundException('Пользователь не найден');

		await this.authRepository.updateUserPassword(user.id, newPassword);
		return { message: 'Пароль успешно обновлён' };
	}
}
