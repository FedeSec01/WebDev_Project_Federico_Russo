import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaArrowLeft, FaUser, FaLock, FaEye, FaEyeSlash, FaMusic, FaSave, FaEdit } from 'react-icons/fa';
import '../styles/app.css';

function UserProfile() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [formData, setFormData] = useState({
    nome: user?.nome || '',
    email: user?.email || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});

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

    if (!formData.email.trim()) {
      newErrors.email = 'L\'email è obbligatoria';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Formato email non valido';
    }

    // Validazione password solo se l'utente ha inserito una nuova password
    if (formData.newPassword) {
      if (!formData.currentPassword) {
        newErrors.currentPassword = 'Inserisci la password attuale';
      }
      
      if (formData.newPassword.length < 6) {
        newErrors.newPassword = 'La password deve essere di almeno 6 caratteri';
      }
      
      if (formData.newPassword !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Le password non coincidono';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    // Simula aggiornamento profilo
    setTimeout(() => {
      alert('Profilo aggiornato con successo!');
      setIsEditing(false);
      
      // Reset password fields
      setFormData(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }));
    }, 500);
  };

  const handleCancel = () => {
    setFormData({
      nome: user?.nome || '',
      email: user?.email || '',
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    setErrors({});
    setIsEditing(false);
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
              <FaUser className="me-3" />
              Il Tuo Profilo
            </h1>
            <p className="modern-welcome-subtitle">
              Gestisci le tue informazioni personali e cambia la password
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6">
            <div className="modern-glass-card slide-up" style={{ animationDelay: '0.2s' }}>
              
              {/* Profile Header */}
              <div className="text-center mb-4">
                <div style={{
                  width: '100px',
                  height: '100px',
                  background: 'linear-gradient(135deg, #71b280, #4a9d8e)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1rem',
                  fontSize: '2.5rem',
                  color: 'white',
                  fontWeight: 'bold'
                }}>
                  {user?.nome?.charAt(0)?.toUpperCase() || 'U'}
                </div>
                <h4 style={{ color: 'white', marginBottom: '0.5rem' }}>
                  {user?.nome || 'Utente'}
                </h4>
                <span style={{
                  background: user?.role === 'teacher' ? '#4a9d8e' : '#71b280',
                  color: 'white',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '20px',
                  fontSize: '0.8rem',
                  fontWeight: '600'
                }}>
                  {user?.role === 'teacher' ? 'Docente' : 'Studente'}
                </span>
              </div>

              {/* Edit Button */}
              <div className="text-center mb-4">
                {!isEditing ? (
                  <button 
                    className="modern-btn-primary d-flex align-items-center mx-auto"
                    onClick={() => setIsEditing(true)}
                  >
                    <FaEdit className="me-2" />
                    Modifica Profilo
                  </button>
                ) : (
                  <div className="d-flex justify-content-center gap-3">
                    <button 
                      className="modern-btn-primary d-flex align-items-center"
                      onClick={handleSubmit}
                    >
                      <FaSave className="me-2" />
                      Salva
                    </button>
                    <button 
                      className="modern-btn-secondary d-flex align-items-center"
                      onClick={handleCancel}
                    >
                      Annulla
                    </button>
                  </div>
                )}
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit}>
                {/* Informazioni Personali */}
                <h5 className="mb-3" style={{ color: 'white', borderBottom: '1px solid rgba(255,255,255,0.2)', paddingBottom: '0.5rem' }}>
                  Informazioni Personali
                </h5>
                
                <div className="mb-3">
                  <label className="form-label" style={{ color: 'rgba(255,255,255,0.9)' }}>
                    Nome Completo
                  </label>
                  <div className="position-relative">
                    <FaUser style={{
                      position: 'absolute',
                      left: '1rem',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: 'rgba(255,255,255,0.5)',
                      fontSize: '1rem'
                    }} />
                    <input
                      type="text"
                      name="nome"
                      className="modern-form-control"
                      value={formData.nome}
                      onChange={handleInputChange}
                      style={{ paddingLeft: '3rem' }}
                      disabled={!isEditing}
                      required
                    />
                  </div>
                  {errors.nome && (
                    <small style={{ color: '#ff6b6b' }}>{errors.nome}</small>
                  )}
                </div>

                <div className="mb-4">
                  <label className="form-label" style={{ color: 'rgba(255,255,255,0.9)' }}>
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    className="modern-form-control"
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    placeholder="tua@email.com"
                    required
                  />
                  {errors.email && (
                    <small style={{ color: '#ff6b6b' }}>{errors.email}</small>
                  )}
                </div>

                {/* Cambio Password */}
                {isEditing && (
                  <>
                    <h5 className="mb-3" style={{ color: 'white', borderBottom: '1px solid rgba(255,255,255,0.2)', paddingBottom: '0.5rem' }}>
                      Cambia Password
                    </h5>
                    
                    <div className="mb-3">
                      <label className="form-label" style={{ color: 'rgba(255,255,255,0.9)' }}>
                        Password Attuale
                      </label>
                      <div className="position-relative">
                        <FaLock style={{
                          position: 'absolute',
                          left: '1rem',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          color: 'rgba(255,255,255,0.5)',
                          fontSize: '1rem'
                        }} />
                        <input
                          type={showCurrentPassword ? 'text' : 'password'}
                          name="currentPassword"
                          className="modern-form-control"
                          value={formData.currentPassword}
                          onChange={handleInputChange}
                          style={{ paddingLeft: '3rem', paddingRight: '3rem' }}
                          placeholder="Inserisci password attuale"
                        />
                        <button
                          type="button"
                          style={{
                            position: 'absolute',
                            right: '1rem',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            background: 'none',
                            border: 'none',
                            color: 'rgba(255,255,255,0.5)',
                            fontSize: '1rem',
                            cursor: 'pointer'
                          }}
                          onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        >
                          {showCurrentPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                      </div>
                      {errors.currentPassword && (
                        <small style={{ color: '#ff6b6b' }}>{errors.currentPassword}</small>
                      )}
                    </div>

                    <div className="mb-3">
                      <label className="form-label" style={{ color: 'rgba(255,255,255,0.9)' }}>
                        Nuova Password
                      </label>
                      <div className="position-relative">
                        <FaLock style={{
                          position: 'absolute',
                          left: '1rem',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          color: 'rgba(255,255,255,0.5)',
                          fontSize: '1rem'
                        }} />
                        <input
                          type={showNewPassword ? 'text' : 'password'}
                          name="newPassword"
                          className="modern-form-control"
                          value={formData.newPassword}
                          onChange={handleInputChange}
                          style={{ paddingLeft: '3rem', paddingRight: '3rem' }}
                          placeholder="Nuova password (min. 6 caratteri)"
                        />
                        <button
                          type="button"
                          style={{
                            position: 'absolute',
                            right: '1rem',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            background: 'none',
                            border: 'none',
                            color: 'rgba(255,255,255,0.5)',
                            fontSize: '1rem',
                            cursor: 'pointer'
                          }}
                          onClick={() => setShowNewPassword(!showNewPassword)}
                        >
                          {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                      </div>
                      {errors.newPassword && (
                        <small style={{ color: '#ff6b6b' }}>{errors.newPassword}</small>
                      )}
                    </div>

                    <div className="mb-3">
                      <label className="form-label" style={{ color: 'rgba(255,255,255,0.9)' }}>
                        Conferma Nuova Password
                      </label>
                      <div className="position-relative">
                        <FaLock style={{
                          position: 'absolute',
                          left: '1rem',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          color: 'rgba(255,255,255,0.5)',
                          fontSize: '1rem'
                        }} />
                        <input
                          type={showConfirmPassword ? 'text' : 'password'}
                          name="confirmPassword"
                          className="modern-form-control"
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          style={{ paddingLeft: '3rem', paddingRight: '3rem' }}
                          placeholder="Ripeti nuova password"
                        />
                        <button
                          type="button"
                          style={{
                            position: 'absolute',
                            right: '1rem',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            background: 'none',
                            border: 'none',
                            color: 'rgba(255,255,255,0.5)',
                            fontSize: '1rem',
                            cursor: 'pointer'
                          }}
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                      </div>
                      {errors.confirmPassword && (
                        <small style={{ color: '#ff6b6b' }}>{errors.confirmPassword}</small>
                      )}
                    </div>

                    <div className="alert" style={{
                      background: 'rgba(113, 178, 128, 0.1)',
                      border: '1px solid rgba(113, 178, 128, 0.3)',
                      borderRadius: '8px',
                      padding: '0.75rem',
                      color: 'rgba(255,255,255,0.8)',
                      fontSize: '0.9rem'
                    }}>
                      💡 <strong>Suggerimento:</strong> Lascia vuoti i campi password se non vuoi cambiarla
                    </div>
                  </>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;