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
        {
            titulo: 'O Hobbit',
            autor: 'J.R.R. Tolkien',
            data_publicacao: '1937',
            descricao: 'Bilbo Bolseiro vive uma vida pacata no Condado, até que o mago Gandalf o convence a embarcar em uma aventura inesperada.',
            imagem_id: '',
        },
        {
            titulo: 'A Revolução dos Bichos',
            autor: 'George Orwell',
            data_publicacao: '1945',
            descricao: 'Uma fábula satírica sobre a Revolução Russa, onde os animais de uma granja se rebelam contra seus donos humanos.',
            imagem_id: '',
        },
        {
            titulo: 'Cem Anos de Solidão',
            autor: 'Gabriel García Márquez',
            data_publicacao: '1967',
            descricao: 'A saga da família Buendía na fictícia cidade de Macondo, mesclando realidade e fantasia.',
            imagem_id: '',
        },
        {
            titulo: 'O Apanhador no Campo de Centeio',
            autor: 'J.D. Salinger',
            data_publicacao: '1951',
            descricao: 'A história de Holden Caulfield, um adolescente rebelde que narra seus dias em Nova York após ser expulso da escola.',
            imagem_id: '',
        },
        {
            titulo: 'Orgulho e Preconceito',
            autor: 'Jane Austen',
            data_publicacao: '1813',
            descricao: 'Um clássico romance sobre a aristocracia inglesa, focado no relacionamento entre Elizabeth Bennet e Mr. Darcy.',
            imagem_id: '',
        },
        {
            titulo: 'Crime e Castigo',
            autor: 'Fiódor Dostoiévski',
            data_publicacao: '1866',
            descricao: 'A tormenta psicológica de Raskólnikov, um ex-estudante que comete um assassinato e lida com a culpa.',
            imagem_id: '',
        },
        {
            titulo: 'O Código Da Vinci',
            autor: 'Dan Brown',
            data_publicacao: '2003',
            descricao: 'Um thriller de mistério que envolve simbologia religiosa e segredos históricos.',
            imagem_id: '',
        },
        {
            titulo: 'A Menina que Roubava Livros',
            autor: 'Markus Zusak',
            data_publicacao: '2005',
            descricao: 'Narrado pela Morte, conta a história de Liesel Meminger na Alemanha nazista.',
            imagem_id: '',
        },
        {
            titulo: 'Jogos Vorazes',
            autor: 'Suzanne Collins',
            data_publicacao: '2008',
            descricao: 'Em um futuro distópico, Katniss Everdeen se voluntaria para participar de um jogo mortal televisionado.',
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
