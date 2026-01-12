import { RECOMMENDATION } from "@libs/consts";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class CryptoRepository {
	constructor(private prisma: PrismaService) {}

	async createRecommendation(data: {
		userId: string;
		modelId: string;
		currentPrice: number;
		trend: string;
		prediction: any;
	}) {
		return this.prisma.recommendation.create({
			data
		});
	}

	async findLatestByUser(userId: string, limit = 50) {
		return this.prisma.recommendation.findMany({
			where: {
				userId,
			},
			take: limit,
			orderBy: { createdAt: 'desc' },
			include: {
				model: { select: { name: true } },
			},
		});
	}
}
