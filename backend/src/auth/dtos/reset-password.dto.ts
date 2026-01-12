import { ResetPasswordCommand } from '@libs/commands';
import { createZodDto } from 'nestjs-zod';

export class ResetPasswordBodyDto extends createZodDto(
    ResetPasswordCommand.RequestSchema,
) {}

export class ResetPasswordResponseDto extends createZodDto(
    ResetPasswordCommand.ResponseSchema,
){}