import { CreateModelCommand } from '@libs/commands';
import { createZodDto } from 'nestjs-zod';

export class CreateModelBodyDto extends createZodDto(
    CreateModelCommand.RequestSchema,
) {}

export class CreateModelResponseDto extends createZodDto(
    CreateModelCommand.ResponseSchema,
){}