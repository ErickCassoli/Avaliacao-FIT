import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  /**
   * Create a new book.
   * @param createBookDto The data to create the book.
   * @returns The created book entity.
   */
  @Post()
  create(@Body() createBookDto: CreateBookDto): Promise<Book> {
    return this.booksService.create(createBookDto);
  }

  /**
   * Retrieve all books.
   * @returns A list of all books.
   */
  @Get()
  findAll(): Promise<Book[]> {
    return this.booksService.findAll();
  }

  /**
   * Retrieve a single book by ID.
   * @param id The UUID of the book.
   * @returns The found book entity.
   */
  @Get(':id')
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
  update(
    @Param('id') id: string,
    @Body() updateBookDto: UpdateBookDto,
  ): Promise<Book> {
    return this.booksService.update(id, updateBookDto);
  }

  /**
   * Delete a book.
   * @param id The UUID of the book to delete.
   * @returns void
   */
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.booksService.remove(id);
  }
}
