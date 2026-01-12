import { UpdateModelCommand } from '@libs/commands';
import { createZodDto } from 'nestjs-zod';

export class UpdateModelBodyDto extends createZodDto(
    UpdateModelCommand.RequestSchema,
) {}

export class UpdateModelResponseDto extends createZodDto(
    UpdateModelCommand.ResponseSchema,
){}