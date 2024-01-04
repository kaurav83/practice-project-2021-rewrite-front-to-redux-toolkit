import React, { useCallback } from 'react';
import { Form, Formik } from 'formik';
import moment from 'moment';
import { toast } from 'react-toastify';

import { Schems } from '../../../utils/validators/validationSchems';

import FormInput from '../../FormInput/FormInput';
import DatePicker from '../../DatePicker/DatePicker';
import TimePicker from '../../TimePicker/TimePicker';
import Notification from '../../Notification/Notification';
import styles from './EventForm.module.sass';

const formInputClasses = {
  container: styles.inputContainer,
  input: styles.input,
  warning: styles.fieldWarning,
  notValid: styles.notValid,
  valid: styles.valid,
};

const EventForm = ({ addEvent }) => {
  const clicked = useCallback((values, props) => {
    const { eventName, eventDate, eventTime, notifyBefore } = values;

    const givenDate = moment(eventDate + ' ' + eventTime, 'YYYY-MM-DD HH:mm');
    const now = moment();

    const isCompleted = now.isAfter(givenDate);

    if (!isCompleted) {
      addEvent({
        eventName,
        eventDate,
        eventTime,
        notifyBefore: parseInt(notifyBefore, 10),
        isCompleted,
        isSentNotify: false,
        startEventDate: +new Date(),
        id: Math.random()
      });

      props.resetForm()
    } else {
      toast(
        <Notification message={"Incorrect date or time"} />
      );
    }
  }, [addEvent]);

  return (
    <Formik
      initialValues={{
        eventName: '',
        eventDate: moment().format("YYYY-MM-DD"),
        eventTime: '',
        notifyBefore: '',
      }}
      onSubmit={(values, props) => clicked(values, props)}
      validationSchema={Schems.EventShema}
    >
      <Form>
        <div className={styles.eventForm}>
          <FormInput
            classes={formInputClasses}
            name="eventName"
            type="text"
            label="Event name"
          />

          <DatePicker
            classes={formInputClasses}
            fieldName="eventDate"
          />

          <TimePicker
            classes={formInputClasses}
            fieldName="eventTime"
          />

          <FormInput
            classes={formInputClasses}
            type="number"
            label="Notify before"
            name="notifyBefore"
          />

          <button
            type="submit"
            className={styles.submitBtn}
          >
            Add event
          </button>
        </div>
      </Form>
    </Formik>
  );
};

export default EventForm;
