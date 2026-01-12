import { MODEL_INTERVAL, MODEL_SYMBOL } from '@libs/consts';
import { z } from 'zod';

export namespace CreateModelCommand {
	export const RequestSchema = z.object({
		name: z.string().min(1).max(40),
		symbol: z.enum(MODEL_SYMBOL),
		interval: z.enum(MODEL_INTERVAL),
		startTime: z.coerce.date(),
		endTime: z.coerce.date(),
	});

	export type Request = z.infer<typeof RequestSchema>;

	export const ResponseSchema = z.object({
		id: z.uuid(),
		name: z.string(),
		status: z.string(),
	});

	export type Response = z.infer<typeof ResponseSchema>;
}
