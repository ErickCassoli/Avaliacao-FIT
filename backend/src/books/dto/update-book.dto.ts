import { PartialType } from '@nestjs/swagger';
import { CreateBookDto } from './create-book.dto';

/**
 * DTO for updating a Book.
 * Allows partial updates of CreateBookDto fields.
 */
export class UpdateBookDto extends PartialType(CreateBookDto) { }
