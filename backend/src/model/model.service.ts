import {  Injectable } from "@nestjs/common";
import { ModelRepository } from "./model.repository";

@Injectable()
export class ModelService {
	constructor(private readonly modelsRepository: ModelRepository) {}

	async getAll() {
		const models = await this.modelsRepository.findAll();
		return models;
	}
}
