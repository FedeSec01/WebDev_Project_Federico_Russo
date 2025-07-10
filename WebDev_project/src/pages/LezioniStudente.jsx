import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { FaArrowLeft, FaCalendarAlt, FaMusic, FaClock, FaMapMarkerAlt, FaUser } from 'react-icons/fa';
import '../styles/app.css';
import { useCalendar } from '../context/CalendarContext';

const localizer = momentLocalizer(moment);

function LezioniStudente() {
  const navigate = useNavigate();
  const { events } = useCalendar();
  const [currentView, setCurrentView] = useState('week');

  // Eventi filtrati per lo studente "luca"
  const studentEvents = events.filter(event => event.studente === 'luca');

  // Stile personalizzato degli eventi nel calendario
  const customEventStyle = () => ({
    style: {
      backgroundColor: '#4a9d8e',
      borderRadius: '6px',
      opacity: 0.9,
      color: 'white',
      border: '1px solid #71b280',
      fontSize: '12px'
    }
  });

  // Render personalizzato degli eventi
  const CustomEvent = ({ event }) => (
    <div style={{ padding: '2px 4px' }}>
      <div style={{ fontWeight: 'bold', fontSize: '11px' }}>
        {event.title.split(' - ')[0]}
      </div>
      <div style={{ fontSize: '10px', opacity: 0.9 }}>
        {event.title.includes('Aula') ? event.title.split('Aula ')[1] : ''}
      </div>
    </div>
  );

  const handleViewChange = (view) => {
    setCurrentView(view);
  };

  return (
    <div className="dashboard-background min-vh-100">
      <div className="bg-animation"></div>

      {/* Header */}
      <header className="modern-header fade-in">
        <div className="header-content">
          <div className="modern-logo">
            <div className="logo-icon"><FaMusic /></div>
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
            <button 
              className="modern-btn-secondary d-flex align-items-center" 
              onClick={() => navigate('/dashboard')}
            >
              <FaArrowLeft className="me-2" />
              Dashboard
            </button>
          </div>
        </div>
      </header>

      <div className="container-fluid py-4">
        {/* Titolo pagina */}
        <div className="modern-welcome-section slide-up mb-4">
          <div className="welcome-content text-center">
            <h1 className="modern-welcome-title d-flex align-items-center justify-content-center">
              <FaCalendarAlt className="me-3" />
              Le Tue Lezioni
            </h1>
            <p className="modern-welcome-subtitle">
              Visualizza tutte le tue lezioni programmate. Clicca su una lezione per vedere i dettagli.
            </p>
          </div>
        </div>

        {/* Controlli calendario */}
        <div className="row justify-content-center mb-4">
          <div className="col-12 col-md-6">
            <div className="modern-glass-card text-center p-3">
              <div className="btn-group w-100">
                {['month', 'week', 'day'].map(view => (
                  <button
                    key={view}
                    className={`btn ${currentView === view ? 'modern-btn-primary' : 'modern-btn-secondary'}`}
                    onClick={() => handleViewChange(view)}
                    style={{ flex: 1 }}
                  >
                    {view === 'month' ? 'Mese' : view === 'week' ? 'Settimana' : 'Giorno'}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Statistiche */}
        <div className="row justify-content-center mb-4">
          <div className="col-12 col-md-10 col-lg-8">
            <div className="row g-3">
              <div className="col-4">
                <div className="modern-stat-card slide-up" style={{ animationDelay: '0.1s' }}>
                  <div className="modern-stat-number"> {studentEvents.length} </div>
                  <div className="modern-stat-label">Lezioni Totali</div>
                </div>
              </div>
              <div className="col-4">
                <div className="modern-stat-card slide-up" style={{ animationDelay: '0.2s' }}>
                  <div className="modern-stat-number"> {studentEvents.filter(e => new Date(e.start) > new Date()).length} </div>
                  <div className="modern-stat-label">Prossime</div>
                </div>
              </div>
              <div className="col-4">
                <div className="modern-stat-card slide-up" style={{ animationDelay: '0.3s' }}>
                  <div className="modern-stat-number"> {studentEvents.filter(e => new Date(e.start) < new Date()).length} </div>
                  <div className="modern-stat-label">Completate</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Calendario */}
        <div className="row justify-content-center">
          <div className="col-12">
            <div className="modern-glass-card slide-up p-4">
              <Calendar
                localizer={localizer}
                events={studentEvents}
                startAccessor="start"
                endAccessor="end"
                view={currentView}
                onView={handleViewChange}
                views={['month', 'week', 'day']}
                step={30}
                timeslots={2}
                min={new Date(0, 0, 0, 8, 0, 0)}
                max={new Date(0, 0, 0, 20, 0, 0)}
                style={{ height: '70vh', backgroundColor: 'rgba(255,255,255,0.05)', color: 'white', borderRadius: '12px' }}
                eventPropGetter={customEventStyle}
                components={{ event: CustomEvent }}
                onSelectEvent={(event) => {
                  alert(`Lezione: ${event.title.split(' - ')[0]}\nData: ${moment(event.start).format('DD/MM/YYYY HH:mm')}\nAula: ${event.title.includes('Aula') ? event.title.split('Aula ')[1] : 'Non specificata'}`);
                }}
                messages={{
                  next: "Successivo", previous: "Precedente", today: "Oggi",
                  month: "Mese", week: "Settimana", day: "Giorno", agenda: "Agenda",
                  date: "Data", time: "Ora", event: "Evento",
                  noEventsInRange: "Nessuna lezione in questo periodo",
                  showMore: total => `+ Altri ${total}`
                }}
                formats={{
                  timeGutterFormat: 'HH:mm',
                  eventTimeRangeFormat: ({ start, end }) => `${moment(start).format('HH:mm')} - ${moment(end).format('HH:mm')}`,
                  dayFormat: 'DD/MM',
                  dayHeaderFormat: 'dddd DD/MM',
                  dayRangeHeaderFormat: ({ start, end }) => `${moment(start).format('DD/MM')} - ${moment(end).format('DD/MM')}`,
                  monthHeaderFormat: 'MMMM YYYY',
                  weekdayFormat: 'dddd'
                }}
              />
            </div>
          </div>
        </div>

        {/* Prossime lezioni */}
        <div className="row justify-content-center mt-4">
          <div className="col-12 col-lg-10">
            <div className="modern-glass-card slide-up" style={{ animationDelay: '0.6s' }}>
              <h5 className="mb-4 text-center" style={{ color: 'white' }}>
                <FaClock className="me-2" />
                Prossime Lezioni
              </h5>

              {studentEvents
                .filter(e => new Date(e.start) > new Date())
                .sort((a, b) => new Date(a.start) - new Date(b.start))
                .slice(0, 3)
                .map((event, idx) => (
                  <div key={idx} className="d-flex align-items-center p-3 mb-3" style={{
                    background: 'rgba(255,255,255,0.05)',
                    borderRadius: '12px',
                    border: '1px solid rgba(255,255,255,0.1)'
                  }}>
                    <div style={{
                      width: '60px', height: '60px',
                      background: 'linear-gradient(135deg, #71b280, #4a9d8e)',
                      borderRadius: '12px', display: 'flex',
                      flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                      marginRight: '1rem', color: 'white', fontSize: '0.8rem', fontWeight: 'bold'
                    }}>
                      <div>{moment(event.start).format('DD')}</div>
                      <div>{moment(event.start).format('MMM')}</div>
                    </div>
                    <div className="flex-grow-1">
                      <h6 className="mb-1" style={{ color: 'white' }}>
                        {event.title.split(' - ')[0]}
                      </h6>
                      <div className="d-flex align-items-center text-white-50 mb-1">
                        <FaClock className="me-2" style={{ fontSize: '0.8rem' }} />
                        <small>{moment(event.start).format('HH:mm')} - {moment(event.end).format('HH:mm')}</small>
                      </div>
                      <div className="d-flex align-items-center text-white-50">
                        <FaMapMarkerAlt className="me-2" style={{ fontSize: '0.8rem' }} />
                        <small>{event.title.includes('Aula') ? `Aula ${event.title.split('Aula ')[1]}` : 'Aula da definire'}</small>
                      </div>
                    </div>
                  </div>
                ))}

              {studentEvents.filter(e => new Date(e.start) > new Date()).length === 0 && (
                <div className="text-center py-4">
                  <FaCalendarAlt style={{ fontSize: '3rem', color: 'rgba(255,255,255,0.3)', marginBottom: '1rem' }} />
                  <p style={{ color: 'rgba(255,255,255,0.7)' }}>Nessuna lezione programmata</p>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default LezioniStudente;