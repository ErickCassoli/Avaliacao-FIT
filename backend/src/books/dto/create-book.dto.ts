import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

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

  @IsUrl()
  @IsNotEmpty()
  imagem_url: string;
}
