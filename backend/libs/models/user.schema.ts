import z from 'zod';

export const UserSchema = z.object({
	id: z.uuid(),
	email: z.email(),
	password: z.string(),
	createdAt: z.date(),
	updatedAt: z.date(),
});

export type User = z.infer<typeof UserSchema>;
