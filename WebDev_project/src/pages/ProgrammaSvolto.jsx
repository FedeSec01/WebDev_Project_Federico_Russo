import { programmaStudente } from '../utils/mockProgrammaStudente';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaBookOpen, FaCalendarAlt, FaStickyNote, FaMusic } from 'react-icons/fa';
import '../styles/app.css';

function ProgrammaSvolto() {
  const navigate = useNavigate();

  return (
    <div className="dashboard-background min-vh-100">
      <div className="bg-animation"></div>
      
      {/* Header Moderno */}
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
              <FaBookOpen className="me-3" />
              Programma Svolto
            </h1>
            <p className="modern-welcome-subtitle">
              Ecco il riepilogo di tutte le lezioni che hai completato finora. 
              Puoi consultare gli argomenti trattati e le note del docente.
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="row justify-content-center">
          <div className="col-12 col-xl-10">
            <div className="modern-glass-card slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="row g-4">
                {programmaStudente.map((lezione, idx) => (
                  <div key={idx} className="col-12 col-md-6 col-lg-4">
                    <div className="modern-glass-card h-100" style={{ 
                      padding: '1.5rem',
                      minHeight: '200px',
                      cursor: 'default',
                      animationDelay: `${0.1 * idx}s`
                    }}>
                      <div className="d-flex align-items-center mb-3">
                        <div style={{
                          width: '50px',
                          height: '50px',
                          background: 'linear-gradient(135deg, #71b280, #4a9d8e)',
                          borderRadius: '12px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginRight: '1rem',
                          color: 'white',
                          fontSize: '1.2rem',
                          fontWeight: 'bold'
                        }}>
                          {idx + 1}
                        </div>
                        <div>
                          <div className="d-flex align-items-center text-white-50 mb-1">
                            <FaCalendarAlt className="me-2" style={{ fontSize: '0.9rem' }} />
                            <small>{lezione.data}</small>
                          </div>
                        </div>
                      </div>
                      
                      <h5 className="modern-card-title mb-3" style={{ fontSize: '1.1rem' }}>
                        {lezione.argomento}
                      </h5>
                      
                      <div className="d-flex align-items-start">
                        <FaStickyNote className="me-2 mt-1" style={{ 
                          color: '#71b280', 
                          fontSize: '0.9rem',
                          flexShrink: 0 
                        }} />
                        <p className="modern-card-description mb-0" style={{ fontSize: '0.9rem' }}>
                          {lezione.note}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {programmaStudente.length === 0 && (
                <div className="text-center py-5">
                  <FaBookOpen style={{ fontSize: '4rem', color: 'rgba(255,255,255,0.3)', marginBottom: '1rem' }} />
                  <h5 style={{ color: 'rgba(255,255,255,0.7)' }}>Nessuna lezione completata</h5>
                  <p style={{ color: 'rgba(255,255,255,0.5)' }}>
                    Le tue lezioni completate appariranno qui
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Progress Summary */}
        <div className="row justify-content-center mt-4">
          <div className="col-12 col-md-8 col-lg-6">
            <div className="modern-glass-card slide-up text-center" style={{ animationDelay: '0.4s' }}>
              <h5 className="mb-3" style={{ color: 'white' }}>Riepilogo Progresso</h5>
              <div className="row">
                <div className="col-4">
                  <div className="modern-stat-number" style={{ fontSize: '2rem' }}>
                    {programmaStudente.length}
                  </div>
                  <div className="modern-stat-label">Lezioni</div>
                </div>
                <div className="col-4">
                  <div className="modern-stat-number" style={{ fontSize: '2rem' }}>
                    {programmaStudente.length * 60}
                  </div>
                  <div className="modern-stat-label">Minuti</div>
                </div>
                <div className="col-4">
                  <div className="modern-stat-number" style={{ fontSize: '2rem' }}>
                    75%
                  </div>
                  <div className="modern-stat-label">Completato</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProgrammaSvolto;