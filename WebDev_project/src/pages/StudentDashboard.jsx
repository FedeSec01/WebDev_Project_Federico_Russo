import { useNavigate } from 'react-router-dom';
import { FaBookOpen, FaGuitar, FaCalendarAlt, FaCheckCircle, FaMusic, FaGraduationCap, FaUser } from 'react-icons/fa';
import '../styles/app.css';
import { useAuth } from '../context/AuthContext';

function StudentDashboard() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const cards = [
    {
      icon: <FaBookOpen />,
      label: 'Programma Svolto',
      description: 'Consulta il programma delle lezioni completate',
      onClick: () => navigate('/programma-svolto')
    },
    {
      icon: <FaGuitar />,
      label: 'Strumenti Assegnati',
      description: 'Visualizza i tuoi strumenti in prestito',
      onClick: () => navigate('/strumenti-studente')
    },
    {
      icon: <FaCalendarAlt />,
      label: 'Lezioni Programmate',
      description: 'Controlla le tue prossime lezioni',
      onClick: () => navigate('/lezioni-studente')
    },
    {
      icon: <FaCheckCircle />,
      label: 'Compiti da Svolgere',
      description: 'Gestisci i tuoi compiti e esercizi',
      onClick: () => navigate('/compiti-studente')
    }
  ];

  const stats = [
    { number: '12', label: 'Lezioni Completate' },
    { number: '2', label: 'Strumenti Assegnati' },
    { number: '5', label: 'Compiti Attivi' },
    { number: '8.5', label: 'Voto Medio' }
  ];

  return (
    <div className="dashboard-background">
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
            <button 
              className="modern-btn-secondary me-2"
              onClick={() => navigate('/profilo')}
            >
              <FaUser className="me-2" />
              Profilo
            </button>
            <div className="user-avatar">L</div>
            <span>Luca Verdi</span>
            <button className="modern-logout-btn" onClick={logout}>
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="container-fluid py-4">
        {/* Welcome Section */}
        <div className="modern-welcome-section slide-up">
          <div className="welcome-content">
            <h1 className="modern-welcome-title">Benvenuto, Luca! 🎵</h1>
            <p className="modern-welcome-subtitle">
              Benvenuto nella tua area personale! Qui puoi gestire il tuo percorso musicale, 
              consultare gli strumenti assegnati, le lezioni programmate e i compiti da svolgere.
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="modern-stats-section">
          {stats.map((stat, idx) => (
            <div key={idx} className="modern-stat-card slide-up" style={{ animationDelay: `${0.1 * idx}s` }}>
              <div className="modern-stat-number">{stat.number}</div>
              <div className="modern-stat-label">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="row">
          {/* Cards Section */}
          <div className="col-12 col-lg-8">
            <div className="modern-dashboard-grid">
              {cards.map((card, idx) => (
                <div
                  key={idx}
                  className="modern-glass-card slide-up"
                  style={{ animationDelay: `${0.1 * (idx + 1)}s` }}
                  onClick={card.onClick}
                >
                  <div className="modern-card-icon">{card.icon}</div>
                  <div className="modern-card-title">{card.label}</div>
                  <div className="modern-card-description">{card.description}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Progress Section */}
          <div className="col-12 col-lg-4">
            <div className="modern-glass-card slide-up" style={{ animationDelay: '0.6s', height: 'fit-content' }}>
              <div className="text-center mb-4">
                <FaGraduationCap className="modern-card-icon" style={{ fontSize: '4rem', marginBottom: '1rem' }} />
                <h3 className="modern-card-title">Il Tuo Progresso</h3>
              </div>
              
              <div className="mb-4">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span style={{ color: 'rgba(255,255,255,0.9)' }}>Corso di Violino</span>
                  <span style={{ color: '#71b280', fontWeight: 'bold' }}>75%</span>
                </div>
                <div style={{ 
                  background: 'rgba(255,255,255,0.1)', 
                  borderRadius: '10px', 
                  height: '8px',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    background: 'linear-gradient(135deg, #71b280, #4a9d8e)',
                    width: '75%',
                    height: '100%',
                    borderRadius: '10px',
                    transition: 'width 0.3s ease'
                  }}></div>
                </div>
              </div>

              <div className="mb-4">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span style={{ color: 'rgba(255,255,255,0.9)' }}>Teoria Musicale</span>
                  <span style={{ color: '#71b280', fontWeight: 'bold' }}>60%</span>
                </div>
                <div style={{ 
                  background: 'rgba(255,255,255,0.1)', 
                  borderRadius: '10px', 
                  height: '8px',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    background: 'linear-gradient(135deg, #71b280, #4a9d8e)',
                    width: '60%',
                    height: '100%',
                    borderRadius: '10px',
                    transition: 'width 0.3s ease'
                  }}></div>
                </div>
              </div>

              <div className="text-center mt-4">
                <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.9rem' }}>
                  Continua così! Stai facendo ottimi progressi nel tuo percorso musicale.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <button className="modern-fab" onClick={() => navigate('/lezioni-studente')}>
        📅
      </button>
    </div>
  );
}

export default StudentDashboard;