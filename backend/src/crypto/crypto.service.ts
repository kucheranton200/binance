import {  Injectable, NotFoundException } from "@nestjs/common";
import { ModelRepository } from "../model/model.repository";
import { CryptoRepository } from "./crypto.repository";
import axios from "axios";

type PredictionPoint = {
	step: number;
	price: number;
};

type PredictionArray = PredictionPoint[];

@Injectable()
export class CryptoService {
	private readonly ML_API_URL: string;
	constructor(
		private repo: CryptoRepository,
		private modelsRepo: ModelRepository
	) {
		this.ML_API_URL = process.env.ML_API_URL;
	}

	async predict(userId: string, modelId: string) {
		const model = await this.modelsRepo.findById(modelId);
		if (!model) throw new NotFoundException('Модель не найдена');

		const { data } = await axios.post(`${this.ML_API_URL}/predict`, {
			symbol: model.symbol,
			interval: model.interval,
			training_period: model.trainingPeriod,
		});

		const prediction = data.prediction_next_5_candles;
		const rec = await this.repo.createRecommendation({
			userId,
			modelId,
			currentPrice: data.current_price,
			trend: data.trend,
			prediction,
		});

		const lastPrice =
			prediction.length > 0
				? prediction[prediction.length - 1].price
				: data.current_price;

		const diffPercent =
			((lastPrice - data.current_price) / data.current_price) * 100;

		return {
			modelName: model.name,
			currentPrice: data.current_price,
			predictedPrice: lastPrice,
			diffPercent: +diffPercent.toFixed(2),
			trend: data.trend,
			prediction,
			createdAt: rec.createdAt,
		};
	}

	async getHistory(userId: string) {
		const recs = await this.repo.findLatestByUser(userId);

		return recs.map((r) => {
			const prediction = r.prediction as PredictionArray;

			const lastPrice =
				prediction.length > 0
					? prediction[prediction.length - 1].price
					: Number(r.currentPrice);

			const diffPercent =
				((lastPrice - Number(r.currentPrice)) / Number(r.currentPrice)) * 100;

			return {
				id: r.id,
				modelName: r.model.name,
				currentPrice: Number(r.currentPrice),
				predictedPrice: lastPrice,
				diffPercent: +diffPercent.toFixed(2),
				trend: r.trend,
				createdAt: r.createdAt,
			};
		});
	}
}