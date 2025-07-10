import { useState, useEffect } from 'react';
import { FaCalendarAlt, FaClock, FaDoorOpen, FaUser, FaTimes } from 'react-icons/fa';
import { users } from '../utils/mockUsers';
import '../styles/app.css';

// Filtra solo gli studenti dagli utenti registrati
const studenti = users.filter(user => user.role === 'student').map(user => ({
  username: user.username,
  nome: user.nome
}));

function EventModal({ show, onClose, onSave, initialData }) {
  const [eventData, setEventData] = useState({
    title: '',
    date: '',
    room: '1',
    duration: 60,
    studente: studenti.length > 0 ? studenti[0].username : ''
  });

  useEffect(() => {
    if (initialData) {
      setEventData({ ...initialData });
    } else {
      setEventData({ 
        title: '', 
        date: '', 
        room: '1', 
        duration: 60, 
        studente: studenti.length > 0 ? studenti[0].username : ''
      });
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(eventData);
  };

  if (!show) return null;

  return (
    <div className="modern-modal-overlay fade-in">
      <div className="modern-modal-content slide-up">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h5 className="mb-0" style={{ color: 'white', fontSize: '1.5rem', fontWeight: '600' }}>
            <FaCalendarAlt className="me-2" />
            {initialData ? 'Modifica Prenotazione' : 'Nuova Prenotazione Aula'}
          </h5>
          <button 
            className="btn p-0" 
            onClick={onClose}
            style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.2rem' }}
          >
            <FaTimes />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label d-flex align-items-center" style={{ color: 'rgba(255,255,255,0.9)', marginBottom: '0.5rem' }}>
              <FaUser className="me-2" />
              Titolo Lezione
            </label>
            <input
              type="text"
              className="modern-form-control"
              placeholder="Es: Lezione di Violino"
              value={eventData.title}
              onChange={(e) => setEventData({ ...eventData, title: e.target.value })}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label d-flex align-items-center" style={{ color: 'rgba(255,255,255,0.9)', marginBottom: '0.5rem' }}>
              <FaCalendarAlt className="me-2" />
              Data e Ora
            </label>
            <input
              type="datetime-local"
              className="modern-form-control"
              value={eventData.date}
              onChange={(e) => setEventData({ ...eventData, date: e.target.value })}
              required
            />
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label d-flex align-items-center" style={{ color: 'rgba(255,255,255,0.9)', marginBottom: '0.5rem' }}>
                <FaDoorOpen className="me-2" />
                Aula
              </label>
              <select
                className="modern-form-control"
                value={eventData.room}
                onChange={(e) => setEventData({ ...eventData, room: e.target.value })}
              >
                {[...Array(10)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>Aula {i + 1}</option>
                ))}
              </select>
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label d-flex align-items-center" style={{ color: 'rgba(255,255,255,0.9)', marginBottom: '0.5rem' }}>
                <FaClock className="me-2" />
                Durata (minuti)
              </label>
              <input
                type="number"
                className="modern-form-control"
                placeholder="60"
                min="15"
                max="180"
                step="15"
                value={eventData.duration}
                onChange={(e) => setEventData({ ...eventData, duration: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="form-label d-flex align-items-center" style={{ color: 'rgba(255,255,255,0.9)', marginBottom: '0.5rem' }}>
              <FaUser className="me-2" />
              Studente
            </label>
            <select
              className="modern-form-control"
              value={eventData.studente}
              onChange={(e) => setEventData({ ...eventData, studente: e.target.value })}
            >
              {studenti.map((s, i) => (
                <option key={i} value={s.username}>{s.nome}</option>
              ))}
            </select>
          </div>

          <div className="d-flex justify-content-end gap-3">
            <button 
              type="button" 
              className="modern-btn-secondary"
              onClick={onClose}
            >
              Annulla
            </button>
            <button 
              type="submit" 
              className="modern-btn-primary"
            >
              {initialData ? 'Aggiorna' : 'Crea'} Prenotazione
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EventModal;