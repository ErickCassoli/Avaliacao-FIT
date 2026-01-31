import { Test, TestingModule } from '@nestjs/testing';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { ImagesService } from '../images/images.service';
import { ConfigService } from '@nestjs/config';

describe('BooksController', () => {
    let controller: BooksController;

    const mockBooksService = {
        create: jest.fn(),
        findAll: jest.fn(),
        findOne: jest.fn(),
        update: jest.fn(),
        remove: jest.fn(),
    };

    const mockImagesService = {
        upload: jest.fn(),
    };

    const mockConfigService = {
        get: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [BooksController],
            providers: [
                { provide: BooksService, useValue: mockBooksService },
                { provide: ImagesService, useValue: mockImagesService },
                { provide: ConfigService, useValue: mockConfigService },
            ],
        }).compile();

        controller = module.get<BooksController>(BooksController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
