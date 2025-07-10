import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { FaArrowLeft, FaCheckCircle, FaMusic, FaClock, FaExclamationTriangle, FaCheck, FaUser } from 'react-icons/fa';
import '../styles/app.css';

const localizer = momentLocalizer(moment);

const eventiCompiti = [
  {
    id: 1,
    title: 'Esercizio scala Do maggiore',
    start: new Date('2024-11-06T10:00:00'),
    end: new Date('2024-11-06T11:00:00'),
    description: 'Praticare la scala di Do maggiore per 30 minuti al giorno',
    difficulty: 'facile',
    completed: false
  },
  {
    id: 2,
    title: 'Ripasso Teoria Lezione 3',
    start: new Date('2024-11-08T09:00:00'),
    end: new Date('2024-11-08T10:00:00'),
    description: 'Rivedere gli accordi maggiori e minori',
    difficulty: 'medio',
    completed: true
  },
  {
    id: 3,
    title: 'Studio brano "Minuetto"',
    start: new Date('2024-11-10T15:00:00'),
    end: new Date('2024-11-10T16:00:00'),
    description: 'Studiare il brano completo, prestare attenzione al vibrato',
    difficulty: 'difficile',
    completed: false
  }
];

function CompitiStudente() {
  const navigate = useNavigate();
  const [compiti, setCompiti] = useState(eventiCompiti);
  const [currentView, setCurrentView] = useState('month');

  const toggleCompito = (id) => {
    setCompiti(compiti.map(compito => 
      compito.id === id ? { ...compito, completed: !compito.completed } : compito
    ));
  };

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'facile': return '#71b280';
      case 'medio': return '#feca57';
      case 'difficile': return '#ff6b6b';
      default: return '#71b280';
    }
  };

  const getDifficultyLabel = (difficulty) => {
    switch(difficulty) {
      case 'facile': return 'Facile';
      case 'medio': return 'Medio';
      case 'difficile': return 'Difficile';
      default: return 'Facile';
    }
  };

  const customEventStyle = (event) => {
    const compito = compiti.find(c => c.id === event.id);
    return {
      style: {
        backgroundColor: compito?.completed ? '#71b280' : getDifficultyColor(compito?.difficulty),
        borderRadius: '6px',
        opacity: compito?.completed ? 0.7 : 0.9,
        color: 'white',
        border: compito?.completed ? '2px solid #71b280' : '1px solid rgba(255,255,255,0.3)',
        fontSize: '12px'
      }
    };
  };

  const CustomEvent = ({ event }) => {
    const compito = compiti.find(c => c.id === event.id);
    return (
      <div style={{ padding: '2px 4px' }}>
        <div style={{ fontWeight: 'bold', fontSize: '11px' }}>
          {compito?.completed ? '✓ ' : ''}{event.title}
        </div>
      </div>
    );
  };

  const handleViewChange = (view) => {
    setCurrentView(view);
  };

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
            <button 
              className="modern-btn-secondary me-2"
              onClick={() => navigate('/profilo')}
            >
              <FaUser className="me-2" />
              Profilo
            </button>
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
              <FaCheckCircle className="me-3" />
              I Tuoi Compiti
            </h1>
            <p className="modern-welcome-subtitle">
              Gestisci i tuoi compiti musicali e tieni traccia dei progressi. 
              Clicca sui compiti per segnarli come completati.
            </p>
          </div>
        </div>

        {/* Calendar Controls */}
        <div className="row justify-content-center mb-4">
          <div className="col-12 col-md-6">
            <div className="modern-glass-card text-center" style={{ padding: '1rem' }}>
              <div className="btn-group w-100">
                <button 
                  className={`btn ${currentView === 'month' ? 'modern-btn-primary' : 'modern-btn-secondary'}`}
                  onClick={() => handleViewChange('month')}
                  style={{ flex: 1 }}
                >
                  Mese
                </button>
                <button 
                  className={`btn ${currentView === 'week' ? 'modern-btn-primary' : 'modern-btn-secondary'}`}
                  onClick={() => handleViewChange('week')}
                  style={{ flex: 1 }}
                >
                  Settimana
                </button>
                <button 
                  className={`btn ${currentView === 'day' ? 'modern-btn-primary' : 'modern-btn-secondary'}`}
                  onClick={() => handleViewChange('day')}
                  style={{ flex: 1 }}
                >
                  Giorno
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats rapide */}
        <div className="row justify-content-center mb-4">
          <div className="col-12 col-md-10 col-lg-8">
            <div className="row g-3">
              <div className="col-3">
                <div className="modern-stat-card slide-up" style={{ animationDelay: '0.1s' }}>
                  <div className="modern-stat-number" style={{ fontSize: '1.8rem' }}>
                    {compiti.length}
                  </div>
                  <div className="modern-stat-label">Totali</div>
                </div>
              </div>
              <div className="col-3">
                <div className="modern-stat-card slide-up" style={{ animationDelay: '0.2s' }}>
                  <div className="modern-stat-number" style={{ fontSize: '1.8rem' }}>
                    {compiti.filter(c => !c.completed).length}
                  </div>
                  <div className="modern-stat-label">Da Fare</div>
                </div>
              </div>
              <div className="col-3">
                <div className="modern-stat-card slide-up" style={{ animationDelay: '0.3s' }}>
                  <div className="modern-stat-number" style={{ fontSize: '1.8rem' }}>
                    {compiti.filter(c => c.completed).length}
                  </div>
                  <div className="modern-stat-label">Completati</div>
                </div>
              </div>
              <div className="col-3">
                <div className="modern-stat-card slide-up" style={{ animationDelay: '0.4s' }}>
                  <div className="modern-stat-number" style={{ fontSize: '1.8rem' }}>
                    {Math.round((compiti.filter(c => c.completed).length / compiti.length) * 100)}%
                  </div>
                  <div className="modern-stat-label">Progresso</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          {/* Lista Compiti */}
          <div className="col-12 col-lg-6">
            <div className="modern-glass-card slide-up" style={{ animationDelay: '0.5s' }}>
              <h5 className="mb-4 text-center" style={{ color: 'white' }}>
                <FaCheckCircle className="me-2" />
                Lista Compiti
              </h5>

              {compiti.map((compito, idx) => (
                <div 
                  key={compito.id} 
                  className="d-flex align-items-start p-3 mb-3"
                  style={{
                    background: compito.completed ? 'rgba(113, 178, 128, 0.1)' : 'rgba(255,255,255,0.05)',
                    borderRadius: '12px',
                    border: `1px solid ${compito.completed ? 'rgba(113, 178, 128, 0.3)' : 'rgba(255,255,255,0.1)'}`,
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  onClick={() => toggleCompito(compito.id)}
                >
                  <div style={{
                    width: '40px',
                    height: '40px',
                    background: compito.completed ? '#71b280' : 'rgba(255,255,255,0.1)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: '1rem',
                    color: 'white',
                    fontSize: '1.2rem',
                    border: compito.completed ? 'none' : '2px solid rgba(255,255,255,0.3)'
                  }}>
                    {compito.completed ? <FaCheck /> : idx + 1}
                  </div>
                  
                  <div className="flex-grow-1">
                    <div className="d-flex align-items-center justify-content-between mb-2">
                      <h6 className="mb-0" style={{ 
                        color: 'white',
                        textDecoration: compito.completed ? 'line-through' : 'none',
                        opacity: compito.completed ? 0.7 : 1
                      }}>
                        {compito.title}
                      </h6>
                      <span style={{
                        background: getDifficultyColor(compito.difficulty),
                        padding: '0.25rem 0.5rem',
                        borderRadius: '12px',
                        fontSize: '0.7rem',
                        fontWeight: 'bold',
                        color: 'white'
                      }}>
                        {getDifficultyLabel(compito.difficulty)}
                      </span>
                    </div>
                    
                    <p className="mb-2" style={{ 
                      color: 'rgba(255,255,255,0.7)', 
                      fontSize: '0.9rem',
                      opacity: compito.completed ? 0.6 : 1
                    }}>
                      {compito.description}
                    </p>
                    
                    <div className="d-flex align-items-center text-white-50">
                      <FaClock className="me-2" style={{ fontSize: '0.8rem' }} />
                      <small>Scadenza: {moment(compito.start).format('DD/MM/YYYY')}</small>
                      {moment(compito.start).isBefore(moment()) && !compito.completed && (
                        <FaExclamationTriangle className="ms-2" style={{ color: '#ff6b6b' }} />
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {compiti.length === 0 && (
                <div className="text-center py-4">
                  <FaCheckCircle style={{ 
                    fontSize: '3rem', 
                    color: 'rgba(255,255,255,0.3)', 
                    marginBottom: '1rem' 
                  }} />
                  <p style={{ color: 'rgba(255,255,255,0.7)' }}>
                    Nessun compito assegnato
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Calendario Compiti */}
          <div className="col-12 col-lg-6">
            <div className="modern-glass-card slide-up" style={{ animationDelay: '0.6s', padding: '2rem' }}>
              <h5 className="mb-4 text-center" style={{ color: 'white' }}>
                <FaClock className="me-2" />
                Calendario Scadenze
              </h5>
              
              <div className="modern-calendar">
                <Calendar
                  localizer={localizer}
                  events={compiti}
                  startAccessor="start"
                  endAccessor="end"
                  view={currentView}
                  onView={handleViewChange}
                  views={['month', 'week', 'day']}
                  style={{ 
                    height: '400px', 
                    backgroundColor: 'rgba(255,255,255,0.05)', 
                    color: 'white', 
                    borderRadius: '12px',
                    padding: '1rem'
                  }}
                  eventPropGetter={customEventStyle}
                  components={{
                    event: CustomEvent
                  }}
                  onSelectEvent={(event) => {
                    const compito = compiti.find(c => c.id === event.id);
                    if (compito) {
                      toggleCompito(compito.id);
                    }
                  }}
                  messages={{
                    next: "Successivo",
                    previous: "Precedente", 
                    today: "Oggi",
                    month: "Mese",
                    week: "Settimana",
                    day: "Giorno",
                    agenda: "Agenda",
                    date: "Data",
                    time: "Ora",
                    event: "Compito",
                    noEventsInRange: "Nessun compito in questo periodo",
                    showMore: total => `+ Altri ${total}`
                  }}
                  formats={{
                    timeGutterFormat: 'HH:mm',
                    eventTimeRangeFormat: ({ start, end }) => 
                      `${moment(start).format('HH:mm')} - ${moment(end).format('HH:mm')}`,
                    dayFormat: 'DD/MM',
                    dayHeaderFormat: 'dddd DD/MM',
                    dayRangeHeaderFormat: ({ start, end }) => 
                      `${moment(start).format('DD/MM')} - ${moment(end).format('DD/MM')}`,
                    monthHeaderFormat: 'MMMM YYYY',
                    weekdayFormat: 'dddd'
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompitiStudente;