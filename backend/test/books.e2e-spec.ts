import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';

describe('BooksController (e2e)', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        app.useGlobalPipes(new ValidationPipe());
        await app.init();
    });

    afterAll(async () => {
        await app.close();
    });

    let createdBookId: string;

    it('/books (POST) - should create a book', async () => {
        const bookData = {
            titulo: 'Test Book',
            autor: 'Test Author',
            data_publicacao: '2023-01-01',
            descricao: 'A test description',
        };

        const response = await request(app.getHttpServer())
            .post('/books')
            .send(bookData)
            .expect(201);

        expect(response.body).toHaveProperty('id');
        expect(response.body.titulo).toEqual(bookData.titulo);
        createdBookId = response.body.id;
    });

    it('/books (GET) - should list books with pagination', async () => {
        const response = await request(app.getHttpServer())
            .get('/books?page=1&limit=5')
            .expect(200);

        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);
    });

    it('/books/:id (GET) - should get the created book', async () => {
        const response = await request(app.getHttpServer())
            .get(`/books/${createdBookId}`)
            .expect(200);

        expect(response.body.id).toEqual(createdBookId);
        expect(response.body.titulo).toEqual('Test Book');
    });

    it('/books/:id (PUT) - should update the book', async () => {
        const updateData = {
            titulo: 'Updated Title',
        };

        const response = await request(app.getHttpServer())
            .put(`/books/${createdBookId}`)
            .send(updateData)
            .expect(200);

        expect(response.body.titulo).toEqual(updateData.titulo);
    });

    it('/books/:id (DELETE) - should delete the book', async () => {
        await request(app.getHttpServer())
            .delete(`/books/${createdBookId}`)
            .expect(200);

        // Verify deletion
        await request(app.getHttpServer())
            .get(`/books/${createdBookId}`)
            .expect(404);
    });
});
