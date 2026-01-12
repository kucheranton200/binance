import { z } from 'zod';

export namespace RegisterCommand {
	export const RequestSchema = z.object({
		email: z.email(),
		password: z.string().min(8).max(128),
	});

	export type Request = z.infer<typeof RequestSchema>;

	export const ResponseSchema = z.object({
		user: z.object({
			id: z.uuid(),
			email: z.email(),
			createdAt: z.date(),
		}),
		token: z.string(),
	});

	export type Response = z.infer<typeof ResponseSchema>;
}
