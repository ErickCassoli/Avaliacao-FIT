import React from 'react';
import { Link } from 'react-router-dom';
import type { Book } from '../types/Book';
import './BookCard.css';

interface BookCardProps {
  book: Book;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  return (
    <article className="book-card">
      <div className="book-card__image-container">
        <Link to={`/books/${book.id}`} className="book-card__link">
          <img 
            src={book.imagem_url} 
            alt={`Capa do livro ${book.titulo}`} 
            className="book-card__image" 
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://placehold.co/400x600?text=Sem+Capa';
            }}
          />
        </Link>
      </div>
      <div className="book-card__content">
        <Link to={`/books/${book.id}`} className="book-card__title-link">
          <h3 className="book-card__title" title={book.titulo}>
            {book.titulo}
          </h3>
        </Link>
        <p className="book-card__author">{book.autor}</p>
      </div>
    </article>
  );
};

export default BookCard;
