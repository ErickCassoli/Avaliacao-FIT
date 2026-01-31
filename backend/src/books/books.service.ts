import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private booksRepository: Repository<Book>,
  ) { }

  /**
   * Creates a new book in the database.
   * @param createBookDto Data for the new book
   * @returns The created book entity
   */
  async create(createBookDto: CreateBookDto): Promise<Book> {
    const book = this.booksRepository.create(createBookDto);
    return this.booksRepository.save(book);
  }

  /**
   * Retrieves all books.
   * @returns An array of books
   */
  async findAll(page: number = 1, limit: number = 10): Promise<Book[]> {
    const skip = (page - 1) * limit;
    return this.booksRepository.find({
      skip,
      take: limit,
    });
  }

  /**
   * Retrieves a single book by ID.
   * @param id The UUID of the book
   * @returns The book entity
   * @throws NotFoundException if book not found
   */
  async findOne(id: string): Promise<Book> {
    const book = await this.booksRepository.findOne({ where: { id } });
    if (!book) {
      throw new NotFoundException(`Book with ID "${id}" not found`);
    }
    return book;
  }

  /**
   * Updates an existing book.
   * @param id The UUID of the book to update
   * @param updateBookDto Data to update
   * @returns The updated book entity
   * @throws NotFoundException if book not found
   */
  async update(id: string, updateBookDto: UpdateBookDto): Promise<Book> {
    const book = await this.findOne(id); // Ensure exists
    const updatedBook = this.booksRepository.merge(book, updateBookDto);
    return this.booksRepository.save(updatedBook);
  }

  /**
   * Removes a book from the database.
   * @param id The UUID of the book to remove
   */
  async remove(id: string): Promise<void> {
    const result = await this.booksRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Book with ID "${id}" not found`);
    }
  }
}
