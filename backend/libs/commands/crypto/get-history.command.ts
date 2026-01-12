import { RECOMMENDATION } from '@libs/consts';
import { z } from 'zod';

export namespace GetHistoryCommand {
	export const ResponseSchema = z.array(
		z.object({
			id: z.uuid(),
			modelId: z.string().uuid(),
			predictedPrice: z.number(),
			diffPercent: z.number(),
			recommendation: z.enum(RECOMMENDATION),
			createdAt: z.date(),
		})
	);

	export type Response = z.infer<typeof ResponseSchema>;
}
