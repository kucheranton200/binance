import { GetModelsCommand } from '@libs/commands';
import { createZodDto } from 'nestjs-zod';

export class GetModelsResponseDto extends createZodDto(
	GetModelsCommand.ResponseSchema
) {}