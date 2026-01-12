import { LoginCommand } from '@libs/commands';
import { createZodDto } from 'nestjs-zod';

export class LoginBodyDto extends createZodDto(
    LoginCommand.RequestSchema,
) {}

export class LoginResponseDto extends createZodDto(
    LoginCommand.ResponseSchema,
){}