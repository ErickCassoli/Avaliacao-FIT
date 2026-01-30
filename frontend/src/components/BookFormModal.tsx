import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import type { Book } from '../types/Book';
import Modal from './Modal';
import api from '../services/api';
import './BookFormModal.css';

interface BookFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  bookToEdit?: Book | null;
}

interface FormData {
  titulo: string;
  autor: string;
  data_publicacao: string;
  descricao: string;
  imagem_url: string;
}

const BookFormModal: React.FC<BookFormModalProps> = ({ 
  isOpen, 
  onClose, 
  onSuccess, 
  bookToEdit 
}) => {
  const { register, handleSubmit, reset, setValue, watch, formState: { errors, isSubmitting } } = useForm<FormData>();
  const isEditing = !!bookToEdit;
  const imageUrl = watch('imagem_url');

  useEffect(() => {
    if (isOpen) {
      if (bookToEdit) {
        setValue('titulo', bookToEdit.titulo);
        setValue('autor', bookToEdit.autor);
        // Format date/string if needed. Assuming API returns YYYY-MM-DD or string we can use directly?
        // Requirements say "Date/String (Ex: 17/08/1945)". Input type="date" needs YYYY-MM-DD.
        // If it's a raw string, we might need to handle it. For now, assuming standard text or formatted date.
        // Let's use simple text input for date as per requirement flexibility, or date input if standard.
        // Let's use type="text" with placeholder "dd/mm/yyyy" to be safe with "17/08/1945" string format requirement.
        setValue('data_publicacao', bookToEdit.data_publicacao);
        setValue('descricao', bookToEdit.descricao);
        setValue('imagem_url', bookToEdit.imagem_url);
      } else {
        reset({
          titulo: '',
          autor: '',
          data_publicacao: '',
          descricao: '',
          imagem_url: ''
        });
      }
    }
  }, [isOpen, bookToEdit, setValue, reset]);

  const onSubmit = async (data: FormData) => {
    try {
      if (isEditing && bookToEdit) {
        await api.put(`/books/${bookToEdit.id}`, data);
      } else {
        await api.post('/books', data);
      }
      onSuccess();
      onClose();
    } catch (error) {
      console.error('Error saving book:', error);
      alert('Erro ao salvar o livro. Verifique o console.');
    }
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title={isEditing ? 'Editar livro' : 'Novo livro'}
      maxWidth="800px" // Wider for side-by-side preview
    >
      <form onSubmit={handleSubmit(onSubmit)} className="book-form">
        <div className="book-form__layout">
          <div className="book-form__fields">
            <div className="form-group">
              <label htmlFor="titulo">Título</label>
              <input 
                id="titulo"
                {...register('titulo', { required: 'Título é obrigatório' })} 
                placeholder="Ex: A Revolução dos Bichos"
              />
              {errors.titulo && <span className="error-msg">{errors.titulo.message}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="autor">Autor</label>
              <input 
                id="autor"
                {...register('autor', { required: 'Autor é obrigatório' })} 
                placeholder="Ex: George Orwell"
              />
              {errors.autor && <span className="error-msg">{errors.autor.message}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="data_publicacao">Data de publicação</label>
              <input 
                id="data_publicacao"
                {...register('data_publicacao', { required: 'Data é obrigatória' })} 
                placeholder="Ex: 17/08/1945"
              />
              {errors.data_publicacao && <span className="error-msg">{errors.data_publicacao.message}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="imagem_url">URL da Capa</label>
              <input 
                id="imagem_url"
                {...register('imagem_url', { required: 'URL obrigatória para preview' })} 
                placeholder="https://..."
              />
              {errors.imagem_url && <span className="error-msg">{errors.imagem_url.message}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="descricao">Descrição</label>
              <textarea 
                id="descricao"
                {...register('descricao', { required: 'Descrição é obrigatória' })} 
                rows={5}
              />
              {errors.descricao && <span className="error-msg">{errors.descricao.message}</span>}
            </div>
          </div>

          <div className="book-form__preview">
             {imageUrl ? (
               <div className="preview-card">
                 <img src={imageUrl} alt="Preview" onError={(e) => (e.target as HTMLImageElement).style.display = 'none'} />
                 <div className="preview-info">
                   <strong>Pré-visualização</strong>
                 </div>
               </div>
             ) : (
               <div className="preview-placeholder">
                  <span>Escolher imagem</span>
               </div>
             )}
          </div>
        </div>

        <div className="book-form__actions">
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Cancelar
          </button>
          <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
            {isSubmitting ? 'Salvando...' : 'Salvar'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default BookFormModal;
