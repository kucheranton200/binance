import { RECOMMENDATION } from '@libs/consts';
import { z } from 'zod';

export namespace PredictCommand {
	export const RequestSchema = z.object({
		modelId: z.uuid(),
	});

	export type Request = z.infer<typeof RequestSchema>;

	export const ResponseSchema = z.object({
		predictedPrice: z.number(),
		diffPercent: z.number(),
		recommendation: z.enum(RECOMMENDATION),
		createdAt: z.date(),
	});

	export type Response = z.infer<typeof ResponseSchema>;
}
