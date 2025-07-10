import { useState, useEffect } from 'react';
import { FaTasks, FaUser, FaCalendarAlt, FaEdit, FaTimes, FaExclamationTriangle } from 'react-icons/fa';
import { users } from '../utils/mockUsers';
import '../styles/app.css';

// Filtra solo gli studenti dagli utenti registrati
const studenti = users.filter(user => user.role === 'student').map(user => ({
  username: user.username,
  nome: user.nome
}));

const difficoltaOptions = [
  { value: 'facile', label: 'Facile', color: '#71b280' },
  { value: 'medio', label: 'Medio', color: '#feca57' },
  { value: 'difficile', label: 'Difficile', color: '#ff6b6b' }
];

function CompitoModal({ show, onClose, onSave, initialData }) {
  const [compitoData, setCompitoData] = useState({
    title: '',
    description: '',
    studente: studenti.length > 0 ? studenti[0].username : '',
    scadenza: '',
    difficulty: 'facile'
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setCompitoData({ ...initialData });
    } else {
      // Imposta data di default a domani
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      setCompitoData({ 
        title: '', 
        description: '', 
        studente: studenti.length > 0 ? studenti[0].username : '', 
        scadenza: tomorrow.toISOString().slice(0, 16),
        difficulty: 'facile'
      });
    }
  }, [initialData, show]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCompitoData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Rimuovi errore quando l'utente inizia a digitare
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!compitoData.title.trim()) {
      newErrors.title = 'Il titolo è obbligatorio';
    }

    if (!compitoData.description.trim()) {
      newErrors.description = 'La descrizione è obbligatoria';
    }

    if (!compitoData.scadenza) {
      newErrors.scadenza = 'La data di scadenza è obbligatoria';
    } else {
      const scadenzaDate = new Date(compitoData.scadenza);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (scadenzaDate < today) {
        newErrors.scadenza = 'La scadenza non può essere nel passato';
      }
    }

    if (!compitoData.studente) {
      newErrors.studente = 'Seleziona uno studente';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    onSave(compitoData);
    handleClose();
  };

  const handleClose = () => {
    setCompitoData({
      title: '',
      description: '',
      studente: studenti.length > 0 ? studenti[0].username : '',
      scadenza: '',
      difficulty: 'facile'
    });
    setErrors({});
    onClose();
  };

  const getDifficultyColor = (difficulty) => {
    const option = difficoltaOptions.find(opt => opt.value === difficulty);
    return option ? option.color : '#71b280';
  };

  if (!show) return null;

  return (
    <div className="modern-modal-overlay fade-in">
      <div className="modern-modal-content slide-up" style={{ maxWidth: '600px' }}>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h5 className="mb-0" style={{ color: 'white', fontSize: '1.5rem', fontWeight: '600' }}>
            <FaTasks className="me-2" />
            {initialData ? 'Modifica Compito' : 'Assegna Nuovo Compito'}
          </h5>
          <button 
            className="btn p-0" 
            onClick={handleClose}
            style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.2rem' }}
          >
            <FaTimes />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Titolo Compito */}
          <div className="mb-3">
            <label className="form-label d-flex align-items-center" style={{ color: 'rgba(255,255,255,0.9)', marginBottom: '0.5rem' }}>
              <FaEdit className="me-2" />
              Titolo del Compito
            </label>
            <input
              type="text"
              name="title"
              className="modern-form-control"
              placeholder="Es: Esercizio scala Do maggiore"
              value={compitoData.title}
              onChange={handleInputChange}
              required
            />
            {errors.title && (
              <small style={{ color: '#ff6b6b' }}>{errors.title}</small>
            )}
          </div>

          {/* Descrizione */}
          <div className="mb-3">
            <label className="form-label d-flex align-items-center" style={{ color: 'rgba(255,255,255,0.9)', marginBottom: '0.5rem' }}>
              <FaEdit className="me-2" />
              Descrizione Dettagliata
            </label>
            <textarea
              name="description"
              className="modern-form-control"
              rows="4"
              placeholder="Descrivi il compito in dettaglio, inclusi obiettivi e istruzioni specifiche..."
              value={compitoData.description}
              onChange={handleInputChange}
              style={{ resize: 'vertical', minHeight: '100px' }}
              required
            />
            {errors.description && (
              <small style={{ color: '#ff6b6b' }}>{errors.description}</small>
            )}
          </div>

          <div className="row">
            {/* Studente */}
            <div className="col-md-6 mb-3">
              <label className="form-label d-flex align-items-center" style={{ color: 'rgba(255,255,255,0.9)', marginBottom: '0.5rem' }}>
                <FaUser className="me-2" />
                Studente
              </label>
              <select
                name="studente"
                className="modern-form-control"
                value={compitoData.studente}
                onChange={handleInputChange}
                required
              >
                {studenti.map((s, i) => (
                  <option key={i} value={s.username}>{s.nome}</option>
                ))}
              </select>
              {errors.studente && (
                <small style={{ color: '#ff6b6b' }}>{errors.studente}</small>
              )}
            </div>

            {/* Scadenza */}
            <div className="col-md-6 mb-3">
              <label className="form-label d-flex align-items-center" style={{ color: 'rgba(255,255,255,0.9)', marginBottom: '0.5rem' }}>
                <FaCalendarAlt className="me-2" />
                Data di Scadenza
              </label>
              <input
                type="datetime-local"
                name="scadenza"
                className="modern-form-control"
                value={compitoData.scadenza}
                onChange={handleInputChange}
                required
              />
              {errors.scadenza && (
                <small style={{ color: '#ff6b6b' }}>{errors.scadenza}</small>
              )}
            </div>
          </div>

          {/* Difficoltà */}
          <div className="mb-4">
            <div className="row g-2">
              {difficoltaOptions.map((option) => (
                <div key={option.value} className="col-4">
                  <label 
                    className={`w-100 p-3 border-0 rounded-3 d-flex flex-column align-items-center cursor-pointer ${
                      compitoData.difficulty === option.value ? 'selected' : ''
                    }`}
                    style={{
                      background: compitoData.difficulty === option.value 
                        ? `${option.color}20` 
                        : 'rgba(255,255,255,0.05)',
                      border: compitoData.difficulty === option.value 
                        ? `2px solid ${option.color}` 
                        : '1px solid rgba(255,255,255,0.1)',
                      color: 'white',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer'
                    }}
                  >
                    <input
                      type="radio"
                      name="difficulty"
                      value={option.value}
                      checked={compitoData.difficulty === option.value}
                      onChange={handleInputChange}
                      style={{ display: 'none' }}
                    />
                    <div style={{
                      width: '20px',
                      height: '20px',
                      background: option.color,
                      borderRadius: '50%',
                      marginBottom: '0.5rem'
                    }}></div>
                    <span style={{ fontWeight: '600', fontSize: '0.9rem' }}>
                      {option.label}
                    </span>
                    {compitoData.difficulty === option.value && (
                      <div style={{
                        width: '6px',
                        height: '6px',
                        background: option.color,
                        borderRadius: '50%',
                        marginTop: '0.25rem'
                      }}></div>
                    )}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Preview del compito */}
          <div className="mb-4 p-3" style={{
            background: 'rgba(255,255,255,0.05)',
            borderRadius: '12px',
            border: '1px solid rgba(255,255,255,0.1)'
          }}>
            <h6 style={{ color: 'white', marginBottom: '0.75rem' }}>
              📋 Anteprima Compito:
            </h6>
            <div style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.8)' }}>
              <div className="mb-2">
                <strong style={{ color: getDifficultyColor(compitoData.difficulty) }}>
                  {compitoData.title || 'Titolo compito'}
                </strong>
              </div>
              <div className="mb-2">
                {compitoData.description || 'Descrizione del compito...'}
              </div>
              <div className="d-flex justify-content-between">
                <span>
                  👤 <strong>{studenti.find(s => s.username === compitoData.studente)?.nome || 'Studente'}</strong>
                </span>
                <span>
                  📅 {compitoData.scadenza ? new Date(compitoData.scadenza).toLocaleDateString('it-IT', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  }) : 'Data scadenza'}
                </span>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="d-flex justify-content-end gap-3">
            <button 
              type="button" 
              className="modern-btn-secondary"
              onClick={handleClose}
            >
              Annulla
            </button>
            <button 
              type="submit" 
              className="modern-btn-primary"
            >
              {initialData ? 'Aggiorna' : 'Assegna'} Compito
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CompitoModal;