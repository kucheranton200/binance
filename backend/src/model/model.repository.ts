import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class ModelRepository {
	constructor(private readonly prisma: PrismaService) {}

	findAll() {
		return this.prisma.model.findMany({
			orderBy: { name: 'asc' },
		});
	}

	findById(id: string) {
		return this.prisma.model.findUnique({ where: { id } });
	}
}
