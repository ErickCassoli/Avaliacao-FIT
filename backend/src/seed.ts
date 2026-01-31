import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BooksService } from './books/books.service';
import { CreateBookDto } from './books/dto/create-book.dto';

async function bootstrap() {
    const app = await NestFactory.createApplicationContext(AppModule);
    const booksService = app.get(BooksService);

    const booksToSeed: CreateBookDto[] = [
        {
            titulo: 'Dom Casmurro',
            autor: 'Machado de Assis',
            data_publicacao: '1899',
            descricao: 'Uma das obras-primas de Machado de Assis, narrada por Bento Santiago, o Bentinho.',
            imagem_id: '',
        },
        {
            titulo: 'O Pequeno Príncipe',
            autor: 'Antoine de Saint-Exupéry',
            data_publicacao: '1943',
            descricao: 'Um clássico da literatura universal que conta a história de um pequeno príncipe e suas viagens.',
            imagem_id: '',
        },
        {
            titulo: '1984',
            autor: 'George Orwell',
            data_publicacao: '1949',
            descricao: 'Um romance distópico clássico sobre vigilância governamental e totalitarismo.',
            imagem_id: '',
        },
        {
            titulo: 'O Senhor dos Anéis: A Sociedade do Anel',
            autor: 'J.R.R. Tolkien',
            data_publicacao: '1954',
            descricao: 'O primeiro volume da épica fantasia de Tolkien sobre a Terra Média.',
            imagem_id: '',
        },
        {
            titulo: 'Harry Potter e a Pedra Filosofal',
            autor: 'J.K. Rowling',
            data_publicacao: '1997',
            descricao: 'O início da jornada do jovem bruxo Harry Potter em Hogwarts.',
            imagem_id: '',
        },
    ];

    console.log('🌱 Starting seed...');

    for (const book of booksToSeed) {
        try {
            await booksService.create(book);
            console.log(`✅ Created book: ${book.titulo}`);
        } catch (error) {
            console.error(`❌ Failed to create book: ${book.titulo}`, error);
        }
    }

    console.log('🌳 Seed complete!');
    await app.close();
}

bootstrap();
