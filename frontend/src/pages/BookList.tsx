import { useEffect, useState } from 'react';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
import api from '../services/api';
import type { Book } from '../types/Book';
import BookCard from '../components/BookCard';
import BookFormModal from '../components/BookFormModal';
import './BookList.css';

const BookList = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const response = await api.get<Book[]>('/books', {
        params: {
          page,
          limit: ITEMS_PER_PAGE
        }
      });
      setBooks(response.data);
    } catch (error) {
      console.error('Failed to fetch books', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [page]); // Re-fetch when page changes

  const filteredBooks = books.filter(book => 
    book.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.autor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="page-container">
      <header className="page-header">
        <div className="header-top">
          <h1 className="page-title">Livros</h1>
          <button 
            className="btn-text" 
            onClick={() => setIsCreateModalOpen(true)}
          >
            Novo
          </button>
        </div>
        
        <div className="search-bar">
          <Search className="search-icon" size={20} />
          <input 
            type="text" 
            placeholder="Buscar" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </header>

      {loading ? (
        <div className="loading-state">Carregando livraria...</div>
      ) : (
        <div className="book-grid">
          {filteredBooks.map(book => (
            <BookCard key={book.id} book={book} />
          ))}
          {filteredBooks.length === 0 && (
            <p className="empty-state">Nenhum livro encontrado nesta página.</p>
          )}
        </div>
      )}

      {!loading && !searchTerm && (
        <div className="pagination-controls">
          <button 
            className="pagination-btn"
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            <ChevronLeft size={20} />
          </button>
          
          <span className="pagination-info">Página {page}</span>
          
          <button 
            className="pagination-btn"
            onClick={() => setPage(p => p + 1)}
            disabled={books.length < ITEMS_PER_PAGE}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}

      <BookFormModal 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={fetchBooks}
      />
    </div>
  );
};

export default BookList;
