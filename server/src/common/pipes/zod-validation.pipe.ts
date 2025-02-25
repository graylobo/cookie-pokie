import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { ZodSchema } from 'zod';

@Injectable()
export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: unknown) {
    try {
      return this.schema.parse(value);
    } catch (error) {
      throw new BadRequestException('Validation failed', {
        cause: error,
        description: error.errors
          ?.map((e) => `${e.path.join('.')}: ${e.message}`)
          .join(', '),
      });
    }
  }
}
