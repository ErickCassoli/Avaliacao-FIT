import { Controller, Get, Post, Body, Param, Delete, Put, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { BooksService } from './books.service';
import { ImagesService } from '../images/images.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';
import { ConfigService } from '@nestjs/config';
import { ApiTags, ApiOperation, ApiResponse, ApiConsumes, ApiBadRequestResponse, ApiNotFoundResponse } from '@nestjs/swagger';
import { ApiErrorResponse } from '../common/dto/error.dto';

@ApiTags('books')
@Controller('books')
export class BooksController {
  constructor(
    private readonly booksService: BooksService,
    private readonly imagesService: ImagesService,
    private readonly configService: ConfigService,
  ) { }

  /**
   * Create a new book with optional image upload.
   */
  @Post()
  @ApiOperation({ summary: 'Create a new book with optional image' })
  @ApiConsumes('multipart/form-data')
  @ApiResponse({ status: 201, description: 'Book successfully created.' })
  @ApiBadRequestResponse({ description: 'Validation failed', type: ApiErrorResponse })
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Body() createBookDto: CreateBookDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Book> {
    if (file) {
      const image = await this.imagesService.upload(file);
      // Store just the Mongo ID
      createBookDto.imagem_id = image.id.toString();
    }
    return this.booksService.create(createBookDto);
  }

  /**
   * Retrieve all books.
   * @returns A list of all books.
   */
  @Get()
  @ApiOperation({ summary: 'List all books' })
  @ApiResponse({ status: 200, description: 'Return all books.' })
  findAll(): Promise<Book[]> {
    return this.booksService.findAll();
  }

  /**
   * Retrieve a single book by ID.
   * @param id The UUID of the book.
   * @returns The found book entity.
   */
  @Get(':id')
  @ApiOperation({ summary: 'Get a book by ID' })
  @ApiResponse({ status: 200, description: 'Return the book.' })
  @ApiNotFoundResponse({ description: 'Book not found.', type: ApiErrorResponse })
  findOne(@Param('id') id: string): Promise<Book> {
    return this.booksService.findOne(id);
  }

  /**
   * Update a book.
   * @param id The UUID of the book to update.
   * @param updateBookDto The data to update.
   * @returns The updated book entity.
   */
  @Put(':id')
  @ApiOperation({ summary: 'Update a book' })
  @ApiConsumes('multipart/form-data')
  @ApiResponse({ status: 200, description: 'Book successfully updated.' })
  @UseInterceptors(FileInterceptor('image'))
  async update(
    @Param('id') id: string,
    @Body() updateBookDto: UpdateBookDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Book> {
    if (file) {
      const image = await this.imagesService.upload(file);
      updateBookDto.imagem_id = image.id.toString();
    }
    return this.booksService.update(id, updateBookDto);
  }

  /**
   * Delete a book.
   * @param id The UUID of the book to delete.
   * @returns void
   */
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a book' })
  @ApiResponse({ status: 200, description: 'Book successfully deleted.' })
  remove(@Param('id') id: string): Promise<void> {
    return this.booksService.remove(id);
  }
}
