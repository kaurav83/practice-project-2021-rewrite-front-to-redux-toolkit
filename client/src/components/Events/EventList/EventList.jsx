import React, { useRef } from 'react';
import moment from 'moment';
import classNames from 'classnames';

import { useMediaQuery } from '../../../hooks/useMediaQuery';

import DeleteIcon from '../../SvgComponents/deleteIcon';
import CompletedIcon from '../../SvgComponents/completedIcon';
import styles from './EventList.module.sass';

const EventList = ({ events, removeEvent }) => {
  const ref = useRef([]);
  const isWidthTablet = useMediaQuery("(min-width: 768px)");

  const renderTime = (event, index) => {
    const targetDate = moment(event.eventDate + ' ' + event.eventTime);
    const nowTime = moment();
    const duration = moment.duration(targetDate.diff(nowTime));

    const now = moment().valueOf();
    const timeEvent = moment(event.eventDate + ' ' + event.eventTime).valueOf();
    const totalDuration = timeEvent - event.startEventDate;
    const elapsedTime = now - event.startEventDate;

    const percentagePassed = (elapsedTime / totalDuration) * 100;

    if (ref.current[index]?.style) {
      ref.current[index].style.width = percentagePassed > 99.5 ? '100%' : `${percentagePassed}%`;
    }


    const days = duration.days() ? `${duration.days()} day(s)` : '';
    const hours = duration.hours() ? `${duration.hours()}h` : '';
    const minutes = duration.minutes() ? `${duration.minutes()}m` : '';
    const seconds = duration.seconds();

    return `${days} ${hours} ${minutes} ${seconds} s`;
  }

  return (
    <div className={styles.eventsWrapper}>
      <ul className={classNames(styles.eventList, {
        [styles.hasNotEvents]: !events.length
      })}>
        {events.map((event, index) => (
          <li key={event.id} className={styles.eventItem}>
            <span className={styles.progressBarFill} ref={(el) => ref.current[event.id] = el}>
              <span className={styles.progressBarrText}>
                {event.eventName}
              </span>
            </span>

            {event.isCompleted
              ? <span className={styles.completed}>
                {isWidthTablet ? 'Event completed' : <CompletedIcon />}
              </span>
              : <span className={styles.timer}>{renderTime(event, event.id)}</span>
            }

            {event.isCompleted && (
              <button
                type='button'
                onClick={() => removeEvent(event.id)}
                className={styles.removeBtn}
              >
                <DeleteIcon />
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventList;
