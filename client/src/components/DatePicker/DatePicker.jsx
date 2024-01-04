import React from 'react';
import { Field, ErrorMessage } from 'formik';

import styles from './DatePicker.module.sass';

const DatePicker = ({ fieldName, classes }) => {
  return (
    <Field name={fieldName}>
      {({ field }) => (
        <div>
          <input
            type="date"
            className={styles.datePicker}
            required
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
};

export default DatePicker;
