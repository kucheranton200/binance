import { z } from 'zod';

export namespace ResetPasswordCommand {
    export const RequestSchema = z.object({
        email: z.email(),
        password: z.string(),
    });

    export type Request = z.infer<typeof RequestSchema>;

    export const ResponseSchema = z.object({
        user: z.object({
            id: z.uuid(),
            email: z.email(),
            createdAt: z.date(),
        }),
    });

    export type Response = z.infer<typeof ResponseSchema>;
}
