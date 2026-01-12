import { z } from 'zod';

export namespace UpdateModelCommand {
	export const RequestSchema = z.object({
		name: z.string().min(1).max(40),
	});

	export type Request = z.infer<typeof RequestSchema>;

	export const ResponseSchema = z.object({
		id: z.uuid(),
		name: z.string(),
	});

	export type Response = z.infer<typeof ResponseSchema>;
}
