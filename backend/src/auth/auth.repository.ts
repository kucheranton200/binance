import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthRepository {
	constructor(private readonly prisma: PrismaService) {}

	async findByEmail(email: string) {
		return this.prisma.user.findUnique({
			where: { email },
		});
	}

	async create(params: { email: string; password: string }) {
		return this.prisma.user.create({
			data: {
				email: params.email,
				password: params.password,
			},
		});
	}

	async updateUserPassword(userId: string, newPassword: string) {
		const hashed = await bcrypt.hash(newPassword, 10);
		return this.prisma.user.update({
			where: { id: userId },
			data: { password: hashed },
		});
	}
}
