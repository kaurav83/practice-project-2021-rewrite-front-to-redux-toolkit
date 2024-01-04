import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import moment from 'moment';

import Notification from '../components/Notification/Notification';

export const useEvents = () => {
  const [events, setEvents] = useState(JSON.parse(localStorage.getItem('events')) || []);

  useEffect(() => {
    const updateEvents = () => {
      const updatedEvents = events.map((event) => {
        if (moment().isSameOrAfter(moment(event.eventDate + ' ' + event.eventTime))) {
          return { ...event, isCompleted: true };
        }

        const now = moment().valueOf();
        const timeEvent = moment(event.eventDate + ' ' + event.eventTime).valueOf();
        const timeToStartEvent = moment.duration(timeEvent - now);

        if (timeToStartEvent <= (event.notifyBefore * moment.duration(1, 'minutes')) && !event.isSentNotify) {
          event.isSentNotify = true;

          toast(
            <Notification
              type="events"
              message={`Event ${event.eventName} will completed in ${Math.floor(timeToStartEvent / 60000)} minutes`}
            />
          );
        }

        return event;
      })

      setEvents(updatedEvents);
    };

    const interval = setInterval(updateEvents, 1000);

    return () => clearInterval(interval);
  }, [events]);

  return {
    events,
    setEvents,
  }
};
