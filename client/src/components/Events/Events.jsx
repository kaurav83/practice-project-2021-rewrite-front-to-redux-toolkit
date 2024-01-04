import React, { useCallback } from 'react';
import moment from 'moment';

import { useEvents } from '../../hooks/useEvents';

import EventForm from './EventForm/EventForm';
import EventList from './EventList/EventList';
import styles from './Events.module.sass';

const Events = () => {
  const { events, setEvents } = useEvents();

  const addEvent = useCallback((newEvent) => {
    setEvents((prev) => {
      const sortedEvents = [...prev, newEvent].sort((a, b) => {
        const firstDate = moment(a.eventDate + ' ' + a.eventTime);
        const secondDate = moment(b.eventDate + ' ' + b.eventTime);

        return firstDate.diff(secondDate);
      })

      localStorage.setItem('events', JSON.stringify(sortedEvents));

      return sortedEvents;
    })
  }, [setEvents]);

  const removeEvent = useCallback((id) => {
    setEvents((prev) => {
      return prev.filter((item) => item.id !== id);
    });

    const filteredEvents = JSON.parse(localStorage.getItem('events')).filter((event) => event.id !== id);
    const sortedEvents = filteredEvents.sort((a, b) => {
      const firstDate = moment(a.eventDate + ' ' + a.eventTime);
      const secondDate = moment(b.eventDate + ' ' + b.eventTime);

      return firstDate.diff(secondDate);
    });

    localStorage.setItem('events', JSON.stringify(sortedEvents));
  }, [setEvents])

  return (
    <div className={styles.events}>
      <h1 className={styles.eventsTitle}>Create event</h1>

      <EventForm addEvent={addEvent} />

      <EventList events={events} removeEvent={removeEvent} />
    </div>
  )
};

export default Events;
