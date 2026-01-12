import { RegisterCommand } from '@libs/commands';
import { createZodDto } from 'nestjs-zod';

export class RegisterBodyDto extends createZodDto(
    RegisterCommand.RequestSchema,
) {}

export class RegisterResponseDto extends createZodDto(
    RegisterCommand.ResponseSchema,
){}