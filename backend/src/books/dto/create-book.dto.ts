import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

/**
 * DTO for creating a new Book.
 * Validates input data.
 */
export class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  titulo: string;

  @IsString()
  @IsNotEmpty()
  autor: string;

  @IsString()
  @IsNotEmpty()
  data_publicacao: string;

  @IsString()
  @IsNotEmpty()
  descricao: string;

  @IsString()
  @IsOptional()
  imagem_id?: string;
}
