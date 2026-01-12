import { DeleteModelCommand } from '@libs/commands';
import { createZodDto } from 'nestjs-zod';

export class DeleteModelResponseDto extends createZodDto(
	DeleteModelCommand.ResponseSchema
) {}