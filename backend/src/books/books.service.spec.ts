import { Test, TestingModule } from '@nestjs/testing';
import { BooksService } from './books.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';

const mockBookRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOneBy: jest.fn(),
    delete: jest.fn(),
};

describe('BooksService', () => {
    let service: BooksService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                BooksService,
                {
                    provide: getRepositoryToken(Book),
                    useValue: mockBookRepository,
                },
            ],
        }).compile();

        service = module.get<BooksService>(BooksService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
