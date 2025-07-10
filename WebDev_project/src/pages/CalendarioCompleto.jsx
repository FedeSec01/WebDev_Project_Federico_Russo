import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { FaArrowLeft, FaCalendarAlt, FaMusic } from 'react-icons/fa';
import '../styles/app.css';
import { useCalendar } from '../context/CalendarContext';
import EventModal from '../components/EventModal';

const localizer = momentLocalizer(moment);

function CalendarioCompleto() {
  const { events, addEvent } = useCalendar();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [initialModalData, setInitialModalData] = useState(null);
  const [currentView, setCurrentView] = useState('month');

  const handleSelectEvent = (event) => {
    alert(`Evento: ${event.title}\nData: ${moment(event.start).format('LLL')}`);
  };

  const handleSelectSlot = (slotInfo) => {
    const start = slotInfo.start;
    const isoDate = moment(start).format('YYYY-MM-DDTHH:mm');
    setInitialModalData({
      title: '',
      date: isoDate,
      room: '1',
      duration: 60,
      studente: 'luca'
    });
    setShowModal(true);
  };

  const handleSave = (data) => {
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

    const newEvent = {
      title: `${data.title} - Aula ${data.room}`,
      start,
      end,
      studente: data.studente
    };

    addEvent(newEvent);
    setShowModal(false);
  };

  const handleViewChange = (view) => {
    setCurrentView(view);
  };

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
              <FaCalendarAlt className="me-3" />
              Calendario Completo
            </h1>
            <p className="modern-welcome-subtitle">
              Visualizza e gestisci tutte le lezioni programmate. Clicca su uno slot vuoto per creare una nuova lezione.
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
                <button 
                  className={`btn ${currentView === 'agenda' ? 'modern-btn-primary' : 'modern-btn-secondary'}`}
                  onClick={() => handleViewChange('agenda')}
                  style={{ flex: 1 }}
                >
                  Agenda
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats rapide */}
        <div className="row justify-content-center mb-4">
          <div className="col-12 col-md-10">
            <div className="row g-3">
              <div className="col-3">
                <div className="modern-stat-card slide-up" style={{ animationDelay: '0.1s' }}>
                  <div className="modern-stat-number" style={{ fontSize: '1.8rem' }}>
                    {events.length}
                  </div>
                  <div className="modern-stat-label">Lezioni Totali</div>
                </div>
              </div>
              <div className="col-3">
                <div className="modern-stat-card slide-up" style={{ animationDelay: '0.2s' }}>
                  <div className="modern-stat-number" style={{ fontSize: '1.8rem' }}>
                    {events.filter(e => new Date(e.start) > new Date()).length}
                  </div>
                  <div className="modern-stat-label">Future</div>
                </div>
              </div>
              <div className="col-3">
                <div className="modern-stat-card slide-up" style={{ animationDelay: '0.3s' }}>
                  <div className="modern-stat-number" style={{ fontSize: '1.8rem' }}>
                    {events.filter(e => {
                      const today = moment().format('YYYY-MM-DD');
                      const eventDate = moment(e.start).format('YYYY-MM-DD');
                      return eventDate === today;
                    }).length}
                  </div>
                  <div className="modern-stat-label">Oggi</div>
                </div>
              </div>
              <div className="col-3">
                <div className="modern-stat-card slide-up" style={{ animationDelay: '0.4s' }}>
                  <div className="modern-stat-number" style={{ fontSize: '1.8rem' }}>
                    {new Set(events.map(e => e.title.split('Aula ')[1])).size}
                  </div>
                  <div className="modern-stat-label">Aule Usate</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Calendar */}
        <div className="row justify-content-center">
          <div className="col-12">
            <div className="modern-glass-card slide-up" style={{ animationDelay: '0.5s', padding: '2rem' }}>
              <div className="modern-calendar">
                <Calendar
                  localizer={localizer}
                  events={events}
                  startAccessor="start"
                  endAccessor="end"
                  view={currentView}
                  onView={handleViewChange}
                  views={['month', 'week', 'day', 'agenda']}
                  step={30}
                  timeslots={2}
                  min={new Date(0, 0, 0, 8, 0, 0)}
                  max={new Date(0, 0, 0, 20, 0, 0)}
                  style={{ 
                    height: '80vh', 
                    backgroundColor: 'rgba(255,255,255,0.05)', 
                    color: 'white', 
                    borderRadius: '12px',
                    padding: '1rem'
                  }}
                  selectable
                  onSelectEvent={handleSelectEvent}
                  onSelectSlot={handleSelectSlot}
                  eventPropGetter={eventStyleGetter}
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
                    showMore: total => `+ Altri ${total}`,
                    work_week: "Settimana Lavorativa",
                    yesterday: "Ieri",
                    tomorrow: "Domani",
                    allDay: "Tutto il giorno"
                  }}
                  formats={{
                    timeGutterFormat: 'HH:mm',
                    eventTimeRangeFormat: ({ start, end }) => 
                      `${moment(start).format('HH:mm')} - ${moment(end).format('HH:mm')}`,
                    agendaTimeRangeFormat: ({ start, end }) => 
                      `${moment(start).format('HH:mm')} - ${moment(end).format('HH:mm')}`,
                    dayFormat: 'DD/MM',
                    dayHeaderFormat: 'dddd DD/MM',
                    dayRangeHeaderFormat: ({ start, end }) => 
                      `${moment(start).format('DD/MM')} - ${moment(end).format('DD/MM')}`,
                    monthHeaderFormat: 'MMMM YYYY',
                    agendaDateFormat: 'DD/MM/YYYY',
                    weekdayFormat: 'dddd'
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <EventModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSave={handleSave}
        initialData={initialModalData}
      />
    </div>
  );
}

export default CalendarioCompleto;