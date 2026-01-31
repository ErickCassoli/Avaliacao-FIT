import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import api from '../services/api';
import type { Book } from '../types/Book';
import BookFormModal from '../components/BookFormModal';
import DeleteConfirmationModal from '../components/DeleteConfirmationModal';
import './BookDetails.css';

const BookDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const fetchBook = async () => {
    if (!id) return;
    try {
      setLoading(true);
      const response = await api.get<Book>(`/books/${id}`);
      setBook(response.data);
    } catch (error) {
      console.error('Failed to fetch book', error);
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBook();
  }, [id, navigate]);

  const handleDelete = async () => {
    if (!book) return;
    try {
      await api.delete(`/books/${book.id}`);
      navigate('/');
    } catch (error) {
      console.error('Failed to delete book', error);
      alert('Erro ao excluir.');
    }
  };

  if (loading || !book) return <div className="page-container">Carregando...</div>;

  return (
    <div className="page-container">
      <header className="details-header">
        <Link to="/" className="back-link">
          <ChevronLeft size={20} />
          Voltar
        </Link>
        <div className="details-actions">
          <button className="btn-text" onClick={() => setIsEditModalOpen(true)}>Editar</button>
          <button className="btn-text btn-text--danger" onClick={() => setIsDeleteModalOpen(true)}>Excluir</button>
        </div>
      </header>

      <main className="details-content">
        <div className="details-text">
          <h1 className="details-title">{book.titulo}</h1>
          
          <div className="details-meta">
            <span>Por <strong>{book.autor}</strong></span>
            <span className="meta-separator"></span>
            <span>Publicado em {book.data_publicacao}</span>
          </div>

          <div className="details-description">
            {book.descricao ? (
              book.descricao.split('\n').map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))
            ) : (
                <p>Sem descrição.</p>
            )}
          </div>
        </div>

        <div className="details-image">
           <img 
             src={`http://localhost:3000/images/${book.imagem_id}`} 
             alt={book.titulo} 
             onError={(e) => (e.target as HTMLImageElement).style.display = 'none'} 
           />
        </div>
      </main>

      <BookFormModal 
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSuccess={fetchBook}
        bookToEdit={book}
      />

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default BookDetails;
