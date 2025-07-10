import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { lessons } from '../utils/mockLessons';
import { studenti } from '../utils/mockStudenti';
import { strumenti } from '../utils/mockStrumenti';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { FaUserGraduate, FaCalendarAlt, FaChalkboardTeacher, FaGuitar, FaMusic, FaChartLine, FaUser, FaPlus, FaTasks } from 'react-icons/fa';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../styles/app.css';
import { useCalendar } from '../context/CalendarContext';
import EventModal from '../components/EventModal';
import CompitoModal from '../components/CompitoModal';
import { useAuth } from '../context/AuthContext';

const localizer = momentLocalizer(moment);

function TeacherDashboard() {
  const [monthlyData, setMonthlyData] = useState([]);
  const [showEventModal, setShowEventModal] = useState(false);
  const [showCompitoModal, setShowCompitoModal] = useState(false);
  const [editingEventIndex, setEditingEventIndex] = useState(null);
  const [initialModalData, setInitialModalData] = useState(null);
  const [calendarView, setCalendarView] = useState('month');
  const [fabExpanded, setFabExpanded] = useState(false);
  const { events, addEvent, updateEvent } = useCalendar();
  const navigate = useNavigate();
  const { logout } = useAuth();

  // Calcola statistiche reali
  const realStats = {
    studentiAttivi: studenti.length,
    strumentiAssegnati: strumenti.length,
    lezioniOggi: events.filter(event => {
      const today = moment().format('YYYY-MM-DD');
      const eventDate = moment(event.start).format('YYYY-MM-DD');
      return eventDate === today;
    }).length,
    soddisfazione: '95%'
  };

  useEffect(() => {
    const grouped = Array.from({ length: 12 }, (_, i) => ({
      month: new Date(0, i).toLocaleString('it', { month: 'short' }),
      count: 0,
    }));
    
    events.forEach((event) => {
      const date = new Date(event.start);
      const month = date.getMonth();
      if (grouped[month]) {
        grouped[month].count += 1;
      }
    });
    
    setMonthlyData(grouped);
  }, [events]);

  const openEventModal = (event = null, index = null) => {
    if (event) {
      setInitialModalData({
        title: event.title.split(' - Aula')[0],
        date: moment(event.start).format('YYYY-MM-DDTHH:mm'),
        room: event.title.split('Aula ')[1] || '1',
        duration: moment(event.end).diff(moment(event.start), 'minutes'),
        studente: event.studente || 'luca'
      });
      setEditingEventIndex(index);
    } else {
      setInitialModalData(null);
      setEditingEventIndex(null);
    }
    setShowEventModal(true);
    setFabExpanded(false);
  };

  const openCompitoModal = () => {
    setShowCompitoModal(true);
    setFabExpanded(false);
  };

  const handleEventSave = (data) => {
    const now = new Date();
    const eventDate = new Date(data.date);

    if (eventDate < now) {
      alert('La data inserita è già passata.');
      return;
    }
    if (parseInt(data.duration) <= 0) {
      alert('La durata deve essere maggiore di zero.');
      return;
    }

    const start = new Date(data.date);
    const end = new Date(start.getTime() + data.duration * 60000);

    const updatedEvent = {
      title: `${data.title} - Aula ${data.room}`,
      start,
      end,
      studente: data.studente
    };

    if (editingEventIndex !== null) {
      updateEvent(editingEventIndex, updatedEvent);
    } else {
      addEvent(updatedEvent);
    }
    setShowEventModal(false);
  };

  const handleCompitoSave = (compitoData) => {
    // Qui andrà la logica per salvare il compito
    console.log('Nuovo compito assegnato:', compitoData);
    alert(`Compito "${compitoData.title}" assegnato a ${compitoData.studente}`);
    setShowCompitoModal(false);
  };

  const cards = [
    { 
      icon: <FaUserGraduate />, 
      label: 'Registro Studenti', 
      description: 'Gestisci i tuoi studenti e monitora i progressi',
      onClick: () => navigate('/registro-studenti') 
    },
    { 
      icon: <FaCalendarAlt />, 
      label: 'Prenotazione Aule', 
      description: 'Prenota aule per le tue lezioni',
      onClick: () => openEventModal() 
    },
    { 
      icon: <FaChalkboardTeacher />, 
      label: 'Calendario Completo', 
      description: 'Visualizza tutte le lezioni programmate',
      onClick: () => navigate('/calendario') 
    },
    { 
      icon: <FaGuitar />, 
      label: 'Strumenti Assegnati', 
      description: 'Monitora gli strumenti in prestito',
      onClick: () => navigate('/strumenti-assegnati') 
    },
  ];

  const eventStyleGetter = (event) => {
    return {
      style: {
        backgroundColor: '#4a9d8e',
        borderRadius: '5px',
        opacity: 0.9,
        color: 'white',
        border: 'none',
        display: 'block'
      }
    };
  };

  return (
    <div className="dashboard-background">
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
            <button 
              className="modern-btn-secondary me-2"
              onClick={() => navigate('/profilo')}
            >
              <FaUser className="me-2" />
              Profilo
            </button>
            <div className="user-avatar">M</div>
            <span>Marta Bianchi</span>
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
            <h1 className="modern-welcome-title">Benvenuta, Marta! 🎼</h1>
            <p className="modern-welcome-subtitle">
              La tua dashboard per gestire lezioni, studenti e tutto il mondo dell'accademia musicale. 
              Oggi hai {realStats.lezioniOggi} lezioni programmate.
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="modern-stats-section">
          <div className="modern-stat-card slide-up" style={{ animationDelay: '0.1s' }}>
            <div className="modern-stat-number">{realStats.studentiAttivi}</div>
            <div className="modern-stat-label">Studenti Attivi</div>
          </div>
          <div className="modern-stat-card slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="modern-stat-number">{realStats.strumentiAssegnati}</div>
            <div className="modern-stat-label">Strumenti Assegnati</div>
          </div>
          <div className="modern-stat-card slide-up" style={{ animationDelay: '0.3s' }}>
            <div className="modern-stat-number">{realStats.lezioniOggi}</div>
            <div className="modern-stat-label">Lezioni Oggi</div>
          </div>
          <div className="modern-stat-card slide-up" style={{ animationDelay: '0.4s' }}>
            <div className="modern-stat-number">{realStats.soddisfazione}</div>
            <div className="modern-stat-label">Soddisfazione</div>
          </div>
        </div>

        <div className="row">
          {/* Cards Section */}
          <div className="col-12 col-lg-6">
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

          {/* Chart Section */}
          <div className="col-12 col-lg-6">
            <div className="modern-glass-card slide-up" style={{ animationDelay: '0.7s', height: '500px' }}>
              <h5 className="text-center mb-4" style={{ color: 'white' }}>
                <FaChartLine className="me-2" />
                Lezioni per mese
              </h5>
              <ResponsiveContainer width="100%" height="90%">
                <LineChart data={monthlyData} margin={{ top: 20, right: 20, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.2)" />
                  <XAxis dataKey="month" stroke="#ffffff" />
                  <YAxis stroke="#ffffff" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(19, 78, 94, 0.9)', 
                      border: '1px solid rgba(255,255,255,0.2)', 
                      borderRadius: '8px',
                      color: '#fff' 
                    }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="count" 
                    stroke="#71b280" 
                    strokeWidth={3} 
                    dot={{ r: 4, fill: '#71b280' }} 
                    activeDot={{ r: 6, fill: '#4a9d8e' }} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Mini Calendar */}
        <div className="row mt-4">
          <div className="col-12">
            <div className="modern-glass-card slide-up" style={{ animationDelay: '0.8s' }}>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 style={{ color: 'white', margin: 0 }}>
                  <FaCalendarAlt className="me-2" />
                  Calendario Lezioni
                </h5>
                <div className="btn-group">
                  <button 
                    className={`btn btn-sm ${calendarView === 'month' ? 'modern-btn-primary' : 'modern-btn-secondary'}`}
                    onClick={() => setCalendarView('month')}
                    style={{ padding: '0.5rem 1rem' }}
                  >
                    Mese
                  </button>
                  <button 
                    className={`btn btn-sm ${calendarView === 'week' ? 'modern-btn-primary' : 'modern-btn-secondary'}`}
                    onClick={() => setCalendarView('week')}
                    style={{ padding: '0.5rem 1rem' }}
                  >
                    Settimana
                  </button>
                  <button 
                    className={`btn btn-sm ${calendarView === 'day' ? 'modern-btn-primary' : 'modern-btn-secondary'}`}
                    onClick={() => setCalendarView('day')}
                    style={{ padding: '0.5rem 1rem' }}
                  >
                    Giorno
                  </button>
                </div>
              </div>
              <div className="modern-calendar">
                <Calendar
                  localizer={localizer}
                  events={events}
                  startAccessor="start"
                  endAccessor="end"
                  view={calendarView}
                  onView={setCalendarView}
                  views={['month', 'week', 'day']}
                  step={30}
                  timeslots={2}
                  min={new Date(0, 0, 0, 8, 0, 0)}
                  max={new Date(0, 0, 0, 20, 0, 0)}
                  style={{ 
                    height: 400, 
                    backgroundColor: 'rgba(255,255,255,0.1)', 
                    color: 'white', 
                    borderRadius: '8px',
                    padding: '1rem'
                  }}
                  eventPropGetter={eventStyleGetter}
                  onSelectEvent={(event, e) => {
                    const index = events.findIndex(ev => 
                      ev.start === event.start && 
                      ev.end === event.end && 
                      ev.title === event.title
                    );
                    openEventModal(event, index);
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
                    event: "Evento",
                    noEventsInRange: "Nessuna lezione in questo periodo",
                    showMore: total => `+ Altri ${total}`
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Multi-Function FAB */}
      <div style={{ position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 1000 }}>
        {/* Options when expanded */}
        {fabExpanded && (
          <>
            <button 
              className="modern-fab"
              style={{
                bottom: '80px',
                right: '0',
                position: 'absolute',
                width: '50px',
                height: '50px',
                fontSize: '1.2rem'
              }}
              onClick={openCompitoModal}
              title="Assegna Compito"
            >
              <FaTasks />
            </button>
            <button 
              className="modern-fab"
              style={{
                bottom: '140px',
                right: '0',
                position: 'absolute',
                width: '50px',
                height: '50px',
                fontSize: '1.2rem'
              }}
              onClick={() => openEventModal()}
              title="Nuova Lezione"
            >
              <FaCalendarAlt />
            </button>
          </>
        )}
        
        {/* Main FAB */}
        <button 
          className="modern-fab"
          onClick={() => setFabExpanded(!fabExpanded)}
          style={{
            transform: fabExpanded ? 'rotate(45deg)' : 'rotate(0deg)',
            transition: 'transform 0.3s ease'
          }}
        >
          <FaPlus />
        </button>
      </div>

      {/* Modals */}
      <EventModal
        show={showEventModal}
        onClose={() => setShowEventModal(false)}
        onSave={handleEventSave}
        initialData={initialModalData}
      />

      <CompitoModal
        show={showCompitoModal}
        onClose={() => setShowCompitoModal(false)}
        onSave={handleCompitoSave}
      />
    </div>
  );
}

export default TeacherDashboard;