import { GetHistoryCommand } from '@libs/commands';
import { createZodDto } from 'nestjs-zod';

export class GetHistoryResponseDto extends createZodDto(
    GetHistoryCommand.ResponseSchema,
){}