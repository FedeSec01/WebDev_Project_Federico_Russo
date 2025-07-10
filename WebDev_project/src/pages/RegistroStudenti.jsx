import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { studenti as initialStudenti } from '../utils/mockStudenti';
import { FaArrowLeft, FaUserGraduate, FaMusic, FaPlus, FaEdit, FaTrash, FaSave, FaTimes, FaEye } from 'react-icons/fa';
import '../styles/app.css';

function RegistroStudenti() {
  const navigate = useNavigate();
  const [studenti, setStudenti] = useState(initialStudenti);
  const [showModal, setShowModal] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [formData, setFormData] = useState({
    nome: '',
    cognome: '',
    corso: '',
    lezioniTotali: 30,
    lezioniSvolte: 0
  });
  const [errors, setErrors] = useState({});

  const corsiDisponibili = ['Violino', 'Pianoforte', 'Chitarra', 'Batteria', 'Canto', 'Flauto', 'Sassofono'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
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

    if (!formData.nome.trim()) {
      newErrors.nome = 'Il nome è obbligatorio';
    }

    if (!formData.cognome.trim()) {
      newErrors.cognome = 'Il cognome è obbligatorio';
    }

    if (!formData.corso) {
      newErrors.corso = 'Seleziona un corso';
    }

    if (formData.lezioniTotali < 1) {
      newErrors.lezioniTotali = 'Le lezioni totali devono essere almeno 1';
    }

    if (formData.lezioniSvolte < 0) {
      newErrors.lezioniSvolte = 'Le lezioni svolte non possono essere negative';
    }

    if (parseInt(formData.lezioniSvolte) > parseInt(formData.lezioniTotali)) {
      newErrors.lezioniSvolte = 'Le lezioni svolte non possono superare quelle totali';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const openModal = (student = null) => {
    if (student) {
      setEditingStudent(student);
      setFormData({
        nome: student.nome,
        cognome: student.cognome,
        corso: student.corso,
        lezioniTotali: student.lezioniTotali,
        lezioniSvolte: student.lezioniSvolte
      });
    } else {
      setEditingStudent(null);
      setFormData({
        nome: '',
        cognome: '',
        corso: '',
        lezioniTotali: 30,
        lezioniSvolte: 0
      });
    }
    setErrors({});
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingStudent(null);
    setFormData({
      nome: '',
      cognome: '',
      corso: '',
      lezioniTotali: 30,
      lezioniSvolte: 0
    });
    setErrors({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    if (editingStudent) {
      // Modifica studente esistente
      setStudenti(prev => prev.map(student => 
        student.id === editingStudent.id 
          ? { ...student, ...formData }
          : student
      ));
    } else {
      // Aggiungi nuovo studente
      const newStudent = {
        id: Math.max(...studenti.map(s => s.id)) + 1,
        ...formData
      };
      setStudenti(prev => [...prev, newStudent]);
    }

    closeModal();
  };

  const handleDelete = (studentId) => {
    if (window.confirm('Sei sicuro di voler eliminare questo studente?')) {
      setStudenti(prev => prev.filter(student => student.id !== studentId));
    }
  };

  const getProgressColor = (svolte, totali) => {
    const percentage = (svolte / totali) * 100;
    if (percentage >= 80) return '#71b280';
    if (percentage >= 50) return '#feca57';
    return '#ff6b6b';
  };

  const getProgressPercentage = (svolte, totali) => {
    return Math.round((svolte / totali) * 100);
  };

  return (
    <div className="dashboard-background min-vh-100">
      <div className="bg-animation"></div>
      
      {/* Header */}
      <header className="modern-header fade-in">
        <div className="header-content">
          <div className="modern-logo">
            <div className="logo-icon">
              <FaMusic />
            </div>
            <span>Accademia Musicale</span>
          </div>
          <div className="user-section">
            <button className="modern-btn-secondary d-flex align-items-center" onClick={() => navigate('/dashboard')}>
              <FaArrowLeft className="me-2" />
              Dashboard
            </button>
          </div>
        </div>
      </header>

      <div className="container-fluid py-4">
        {/* Page Header */}
        <div className="modern-welcome-section slide-up mb-4">
          <div className="welcome-content">
            <h1 className="modern-welcome-title d-flex align-items-center justify-content-center">
              <FaUserGraduate className="me-3" />
              Registro Studenti
            </h1>
            <p className="modern-welcome-subtitle">
              Gestisci i tuoi studenti, monitora i progressi e aggiorna le informazioni del corso
            </p>
          </div>
        </div>

        {/* Add Button */}
        <div className="text-center mb-4">
          <button 
            className="modern-btn-primary d-flex align-items-center mx-auto"
            onClick={() => openModal()}
          >
            <FaPlus className="me-2" />
            Aggiungi Nuovo Studente
          </button>
        </div>

        {/* Students Table */}
        <div className="row justify-content-center">
          <div className="col-12">
            <div className="modern-glass-card slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="table-responsive">
                <table className="table table-dark table-borderless align-middle">
                  <thead>
                    <tr style={{ borderBottom: '2px solid rgba(255,255,255,0.1)' }}>
                      <th style={{ color: 'white', fontWeight: '600', padding: '1rem' }}>Studente</th>
                      <th style={{ color: 'white', fontWeight: '600', padding: '1rem' }}>Corso</th>
                      <th style={{ color: 'white', fontWeight: '600', padding: '1rem' }}>Progresso</th>
                      <th style={{ color: 'white', fontWeight: '600', padding: '1rem' }}>Lezioni</th>
                      <th style={{ color: 'white', fontWeight: '600', padding: '1rem', textAlign: 'center' }}>Azioni</th>
                    </tr>
                  </thead>
                  <tbody>
                    {studenti.map((studente, idx) => {
                      const progressPercentage = getProgressPercentage(studente.lezioniSvolte, studente.lezioniTotali);
                      const progressColor = getProgressColor(studente.lezioniSvolte, studente.lezioniTotali);
                      
                      return (
                        <tr key={studente.id} style={{ 
                          borderBottom: '1px solid rgba(255,255,255,0.05)',
                          background: idx % 2 === 0 ? 'rgba(255,255,255,0.02)' : 'transparent'
                        }}>
                          <td style={{ padding: '1rem' }}>
                            <div className="d-flex align-items-center">
                              <div style={{
                                width: '40px',
                                height: '40px',
                                background: 'linear-gradient(135deg, #71b280, #4a9d8e)',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginRight: '0.75rem',
                                color: 'white',
                                fontWeight: 'bold'
                              }}>
                                {studente.nome.charAt(0)}{studente.cognome.charAt(0)}
                              </div>
                              <div>
                                <div style={{ color: 'white', fontWeight: '500' }}>
                                  {studente.nome} {studente.cognome}
                                </div>
                                <small style={{ color: 'rgba(255,255,255,0.6)' }}>
                                  ID: {studente.id}
                                </small>
                              </div>
                            </div>
                          </td>
                          
                          <td style={{ padding: '1rem' }}>
                            <span style={{
                              background: progressColor,
                              color: 'white',
                              padding: '0.25rem 0.75rem',
                              borderRadius: '20px',
                              fontSize: '0.8rem',
                              fontWeight: '600'
                            }}>
                              {studente.corso}
                            </span>
                          </td>
                          
                          <td style={{ padding: '1rem' }}>
                            <div style={{ width: '120px' }}>
                              <div className="d-flex justify-content-between align-items-center mb-1">
                                <small style={{ color: 'rgba(255,255,255,0.8)' }}>
                                  {progressPercentage}%
                                </small>
                              </div>
                              <div style={{
                                background: 'rgba(255,255,255,0.1)',
                                borderRadius: '10px',
                                height: '8px',
                                overflow: 'hidden'
                              }}>
                                <div style={{
                                  background: progressColor,
                                  width: `${progressPercentage}%`,
                                  height: '100%',
                                  borderRadius: '10px',
                                  transition: 'width 0.3s ease'
                                }}></div>
                              </div>
                            </div>
                          </td>
                          
                          <td style={{ padding: '1rem' }}>
                            <div style={{ color: 'rgba(255,255,255,0.9)' }}>
                              <strong style={{ color: progressColor }}>
                                {studente.lezioniSvolte}
                              </strong>
                              <span style={{ color: 'rgba(255,255,255,0.6)' }}>
                                /{studente.lezioniTotali}
                              </span>
                            </div>
                            <small style={{ color: 'rgba(255,255,255,0.6)' }}>
                              Mancanti: {studente.lezioniTotali - studente.lezioniSvolte}
                            </small>
                          </td>
                          
                          <td style={{ padding: '1rem', textAlign: 'center' }}>
                            <div className="btn-group">
                              <button 
                                className="btn btn-sm"
                                style={{
                                  background: 'rgba(113, 178, 128, 0.2)',
                                  border: '1px solid rgba(113, 178, 128, 0.3)',
                                  color: '#71b280'
                                }}
                                onClick={() => openModal(studente)}
                                title="Modifica"
                              >
                                <FaEdit />
                              </button>
                              <button 
                                className="btn btn-sm"
                                style={{
                                  background: 'rgba(255, 107, 107, 0.2)',
                                  border: '1px solid rgba(255, 107, 107, 0.3)',
                                  color: '#ff6b6b'
                                }}
                                onClick={() => handleDelete(studente.id)}
                                title="Elimina"
                              >
                                <FaTrash />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>

                {studenti.length === 0 && (
                  <div className="text-center py-5">
                    <FaUserGraduate style={{ 
                      fontSize: '4rem', 
                      color: 'rgba(255,255,255,0.3)', 
                      marginBottom: '1rem' 
                    }} />
                    <h5 style={{ color: 'rgba(255,255,255,0.7)' }}>Nessuno studente registrato</h5>
                    <p style={{ color: 'rgba(255,255,255,0.5)' }}>
                      Clicca su "Aggiungi Nuovo Studente" per iniziare
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Summary Stats */}
        {studenti.length > 0 && (
          <div className="row justify-content-center mt-4">
            <div className="col-12 col-md-10 col-lg-8">
              <div className="row g-3">
                <div className="col-3">
                  <div className="modern-stat-card slide-up" style={{ animationDelay: '0.4s' }}>
                    <div className="modern-stat-number" style={{ fontSize: '1.8rem' }}>
                      {studenti.length}
                    </div>
                    <div className="modern-stat-label">Studenti Totali</div>
                  </div>
                </div>
                <div className="col-3">
                  <div className="modern-stat-card slide-up" style={{ animationDelay: '0.5s' }}>
                    <div className="modern-stat-number" style={{ fontSize: '1.8rem' }}>
                      {studenti.reduce((sum, s) => sum + s.lezioniSvolte, 0)}
                    </div>
                    <div className="modern-stat-label">Lezioni Totali</div>
                  </div>
                </div>
                <div className="col-3">
                  <div className="modern-stat-card slide-up" style={{ animationDelay: '0.6s' }}>
                    <div className="modern-stat-number" style={{ fontSize: '1.8rem' }}>
                      {Math.round(studenti.reduce((sum, s) => sum + (s.lezioniSvolte / s.lezioniTotali), 0) / studenti.length * 100)}%
                    </div>
                    <div className="modern-stat-label">Progresso Medio</div>
                  </div>
                </div>
                <div className="col-3">
                  <div className="modern-stat-card slide-up" style={{ animationDelay: '0.7s' }}>
                    <div className="modern-stat-number" style={{ fontSize: '1.8rem' }}>
                      {new Set(studenti.map(s => s.corso)).size}
                    </div>
                    <div className="modern-stat-label">Corsi Attivi</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal per aggiungere/modificare studente */}
      {showModal && (
        <div className="modern-modal-overlay fade-in">
          <div className="modern-modal-content slide-up" style={{ maxWidth: '500px' }}>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h5 className="mb-0" style={{ color: 'white', fontSize: '1.5rem', fontWeight: '600' }}>
                <FaUserGraduate className="me-2" />
                {editingStudent ? 'Modifica Studente' : 'Nuovo Studente'}
              </h5>
              <button 
                className="btn p-0" 
                onClick={closeModal}
                style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.2rem' }}
              >
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-6 mb-3">
                  <label className="form-label" style={{ color: 'rgba(255,255,255,0.9)' }}>
                    Nome
                  </label>
                  <input
                    type="text"
                    name="nome"
                    className="modern-form-control"
                    value={formData.nome}
                    onChange={handleInputChange}
                    placeholder="Nome"
                    required
                  />
                  {errors.nome && <small style={{ color: '#ff6b6b' }}>{errors.nome}</small>}
                </div>

                <div className="col-6 mb-3">
                  <label className="form-label" style={{ color: 'rgba(255,255,255,0.9)' }}>
                    Cognome
                  </label>
                  <input
                    type="text"
                    name="cognome"
                    className="modern-form-control"
                    value={formData.cognome}
                    onChange={handleInputChange}
                    placeholder="Cognome"
                    required
                  />
                  {errors.cognome && <small style={{ color: '#ff6b6b' }}>{errors.cognome}</small>}
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label" style={{ color: 'rgba(255,255,255,0.9)' }}>
                  Corso
                </label>
                <select
                  name="corso"
                  className="modern-form-control"
                  value={formData.corso}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Seleziona un corso</option>
                  {corsiDisponibili.map(corso => (
                    <option key={corso} value={corso}>{corso}</option>
                  ))}
                </select>
                {errors.corso && <small style={{ color: '#ff6b6b' }}>{errors.corso}</small>}
              </div>

              <div className="row">
                <div className="col-6 mb-3">
                  <label className="form-label" style={{ color: 'rgba(255,255,255,0.9)' }}>
                    Lezioni Totali
                  </label>
                  <input
                    type="number"
                    name="lezioniTotali"
                    className="modern-form-control"
                    value={formData.lezioniTotali}
                    onChange={handleInputChange}
                    min="1"
                    max="100"
                    required
                  />
                  {errors.lezioniTotali && <small style={{ color: '#ff6b6b' }}>{errors.lezioniTotali}</small>}
                </div>

                <div className="col-6 mb-3">
                  <label className="form-label" style={{ color: 'rgba(255,255,255,0.9)' }}>
                    Lezioni Svolte
                  </label>
                  <input
                    type="number"
                    name="lezioniSvolte"
                    className="modern-form-control"
                    value={formData.lezioniSvolte}
                    onChange={handleInputChange}
                    min="0"
                    max={formData.lezioniTotali}
                    required
                  />
                  {errors.lezioniSvolte && <small style={{ color: '#ff6b6b' }}>{errors.lezioniSvolte}</small>}
                </div>
              </div>

              <div className="d-flex justify-content-end gap-3">
                <button 
                  type="button" 
                  className="modern-btn-secondary"
                  onClick={closeModal}
                >
                  Annulla
                </button>
                <button 
                  type="submit" 
                  className="modern-btn-primary d-flex align-items-center"
                >
                  <FaSave className="me-2" />
                  {editingStudent ? 'Aggiorna' : 'Aggiungi'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default RegistroStudenti;