import React from 'react';
import { Field, ErrorMessage } from 'formik';

import styles from './TimePicker.module.sass';

const TimePicker = ({ fieldName, classes }) => {
  return (
    <Field name={fieldName}>
      {({ field }) => (
        <div>
          <input
            type="time"
            className={styles.timePicker}
            {...field}
          />

          <ErrorMessage
            name={field.name}
            component="span"
            className={classes.warning}
          />
        </div>
      )}
    </Field>
  )
}

export default TimePicker;
