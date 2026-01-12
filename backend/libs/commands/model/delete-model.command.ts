import { z } from 'zod';

export namespace DeleteModelCommand {
	export const ResponseSchema = z.object({
		success: z.literal(true),
	});

	export type Response = z.infer<typeof ResponseSchema>;
}
