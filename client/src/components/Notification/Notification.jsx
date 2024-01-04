import React from 'react';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames';

import styles from './Notification.module.sass';

const Notification = props => (
  <div className={classNames(styles.notification, {
    [styles.eventNotification]: props.type === 'events'
  })}>
    <br />

    <span>{props.message}</span>

    <br />

    {props.contestId && (
      <span
        onClick={() => props.history.push(`/contest/${props.contestId}`)}
        className={styles.goToContest}
      >
        Go to contest
      </span>
    )}
  </div>
);

export default withRouter(Notification);
