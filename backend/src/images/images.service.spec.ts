import { Test, TestingModule } from '@nestjs/testing';
import { ImagesService } from './images.service';

import { getModelToken } from '@nestjs/mongoose';
import { Image } from './schemas/image.schema';

describe('ImagesService', () => {
  let service: ImagesService;

  const mockImageModel = {
    new: jest.fn().mockResolvedValue({}),
    constructor: jest.fn().mockResolvedValue({}),
    find: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    create: jest.fn(),
    exec: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ImagesService,
        {
          provide: getModelToken(Image.name),
          useValue: mockImageModel,
        },
      ],
    }).compile();

    service = module.get<ImagesService>(ImagesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
