import React, { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { Image as ImageIcon } from 'lucide-react';
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

interface BookFormInputs {
  titulo: string;
  autor: string;
  data_publicacao: string;
  descricao: string;
}

const BookFormModal: React.FC<BookFormModalProps> = ({ 
  isOpen, 
  onClose, 
  onSuccess, 
  bookToEdit 
}) => {
  const { register, handleSubmit, reset, setValue, formState: { errors, isSubmitting } } = useForm<BookFormInputs>();
  const isEditing = !!bookToEdit;
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = React.useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Trigger file input click
  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  // Update preview when file changes
  useEffect(() => {
    if (selectedFile) {
      const objectUrl = URL.createObjectURL(selectedFile);
      setPreviewUrl(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [selectedFile]);

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
        setValue('data_publicacao', bookToEdit.data_publicacao);
        setValue('descricao', bookToEdit.descricao);
        // Construct URL from ID
        const backendUrl = 'http://localhost:3000'; // Or use env
        const imageUrl = bookToEdit.imagem_id ? `${backendUrl}/images/${bookToEdit.imagem_id}` : '';
        setPreviewUrl(imageUrl);
      } else {
        reset({
          titulo: '',
          autor: '',
          data_publicacao: '',
          descricao: '',
        });
        setPreviewUrl('');
        setSelectedFile(null);
      }
    }
  }, [isOpen, bookToEdit, setValue, reset]);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const onSubmit = async (data: BookFormInputs) => {
    try {
      const formData = new FormData();
      formData.append('titulo', data.titulo);
      formData.append('autor', data.autor);
      formData.append('data_publicacao', data.data_publicacao);
      formData.append('descricao', data.descricao);
      
      if (selectedFile) {
        formData.append('image', selectedFile);
      } else if (!isEditing) {
        alert('Por favor, selecione uma imagem de capa.');
        return;
      }
      // Note: If editing and no new file, we don't send 'image'. 
      // Backend needs to handle this (optional update). 
      // But currently we're reusing create/update logic.
      // If backend requires image on Create, we must check selectedFile.

      if (isEditing && bookToEdit) {
        // For update, we might need a different header or just standard axios behavior
        await api.put(`/books/${bookToEdit.id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      } else {
        await api.post('/books', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
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
            
            
            {/* File Input removed from here - moved to hidden input in right column */}

            {/* Description field moved out of here */}
          </div>

          <div className="book-form__preview">
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={onFileChange} 
              accept="image/*" 
              style={{ display: 'none' }} 
            />
             {previewUrl ? (
               <div className="preview-card" onClick={handleImageClick} title="Alterar imagem">
                 <img src={previewUrl} alt="Preview" />
               </div>
             ) : (
               <div className="preview-placeholder" onClick={handleImageClick}>
                  <ImageIcon size={48} strokeWidth={1} />
                  <span>Escolher imagem</span>
               </div>
             )}
          </div>
        </div>

        {/* Description Field - Full Width Bottom */}
        <div className="form-group">
          <label htmlFor="descricao">Descrição</label>
            <textarea 
              id="descricao"
              {...register('descricao', { required: 'Descrição é obrigatória' })} 
              rows={5}
            />
          {errors.descricao && <span className="error-msg">{errors.descricao.message}</span>}
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
