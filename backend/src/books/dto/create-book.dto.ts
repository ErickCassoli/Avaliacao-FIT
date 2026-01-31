import { IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO for creating a new Book.
 * Validates input data.
 */
export class CreateBookDto {
  @ApiProperty({ description: 'The title of the book', example: 'Animal Farm' })
  @IsString()
  @IsNotEmpty()
  titulo: string;

  @ApiProperty({ description: 'The author of the book', example: 'George Orwell' })
  @IsString()
  @IsNotEmpty()
  autor: string;

  @ApiProperty({ description: 'Validation date or string', example: '1945-08-17' })
  @IsString()
  @IsNotEmpty()
  data_publicacao: string;

  @ApiProperty({ description: 'Brief description of the book', example: 'A fairy story...' })
  @IsString()
  @IsNotEmpty()
  descricao: string;

  @ApiProperty({ description: 'MongoDB ObjectID of the cover image', required: false })
  @IsString()
  @IsOptional()
  imagem_id?: string;
}
