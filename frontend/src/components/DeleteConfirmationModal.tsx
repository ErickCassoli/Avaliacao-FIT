import React from 'react';
import Modal from './Modal';
import './BookFormModal.css'; // Reusing btn styles

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({ 
  isOpen, 
  onClose, 
  onConfirm,
  title = "Tem certeza?"
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} maxWidth="500px">
      <div style={{ textAlign: 'center', padding: '1rem 0' }}>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
          Ao excluir este livro não será possível recuperá-lo. Realmente deseja excluí-lo?
        </p>
        <div className="book-form__actions" style={{ justifyContent: 'center' }}>
          <button className="btn btn-secondary" onClick={onClose}>
            Cancelar
          </button>
          <button className="btn btn-danger" onClick={onConfirm}>
            Excluir
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteConfirmationModal;
