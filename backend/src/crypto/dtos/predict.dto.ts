import { PredictCommand } from '@libs/commands';
import { createZodDto } from 'nestjs-zod';

export class PredictBodyDto extends createZodDto(
    PredictCommand.RequestSchema,
) {}

export class PredictResponseDto extends createZodDto(
    PredictCommand.ResponseSchema,
){}