import { MODEL_INTERVAL, MODEL_SYMBOL } from '@libs/consts';
import { z } from 'zod';

export namespace GetModelsCommand {
	export const ResponseSchema = z.array(
		z.object({
			id: z.uuid(),
			name: z.string(),
			symbol: z.enum(MODEL_SYMBOL),
			interval: z.enum(MODEL_INTERVAL),
			startTime: z.date(),
			endTime: z.date(),
			status: z.string(),
			createdAt: z.date(),
		})
	);

	export type Response = z.infer<typeof ResponseSchema>;
}
