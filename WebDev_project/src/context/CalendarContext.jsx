import { createContext, useContext, useState } from 'react';

const CalendarContext = createContext();

export function CalendarProvider({ children }) {
  const [events, setEvents] = useState([
    {
      title: 'Lezione di Violino - Aula 1',
      start: new Date('2024-11-05T15:00:00'),
      end: new Date('2024-11-05T16:00:00'),
      studente: 'luca'
    },
    {
      title: 'Lezione di Teoria Musicale - Aula 3',
      start: new Date('2024-11-07T14:30:00'),
      end: new Date('2024-11-07T15:30:00'),
      studente: 'luca'
    }
  ]);

  const addEvent = (newEvent) => {
    setEvents([...events, newEvent]);
  };

  const updateEvent = (index, updatedEvent) => {
    const updatedEvents = [...events];
    updatedEvents[index] = updatedEvent;
    setEvents(updatedEvents);
  };

  return (
    <CalendarContext.Provider value={{ events, addEvent, updateEvent }}>
      {children}
    </CalendarContext.Provider>
  );
}

export const useCalendar = () => useContext(CalendarContext);
