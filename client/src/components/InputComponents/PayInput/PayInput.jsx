import React from 'react';
import classNames from 'classnames';
import InputMask from 'react-input-mask';
import { useField } from 'formik';

const PayInput = props => {
  const {
    label,
    changeFocus,
    classes,
    isInputMask,
    mask,
    errorMessage
  } = props;
  // eslint-disable-next-line
  const [field, meta, helpers] = useField(props.name);
  const { touched, error } = meta;

  if (field.name === 'sum') {
    return (
      <div className={classes.container}>
        <input
          className={classNames(classes.input, {
            [classes.notValid]: touched && error,
          })}
          placeholder={label}
          {...field}
        />

        {touched && error && (
          <span className={classes.error}>
            {errorMessage}!
          </span>
        )}
      </div>
    );
  }

  if (isInputMask) {
    return (
      <div className={classes.container}>
        <InputMask
          onFocus={() => changeFocus(field.name)}
          className={classNames(classes.input, {
            [classes.notValid]: touched && error,
          })}
          mask={mask}
          maskChar={null}
          placeholder={label}
          {...field}
        />

        {touched && error && (
          <span className={classes.error}>
            {errorMessage}!
          </span>
        )}
      </div>
    );
  }
  return (
    <div className={classes.container}>
      <input
        {...field}
        placeholder={label}
        className={classNames(classes.input, {
          [classes.notValid]: touched && error,
        })}
        onFocus={() => changeFocus(field.name)}
      />

      {touched && error && (
        <span className={classes.error}>
          {errorMessage}!
        </span>
      )}
    </div>
  );
};

export default PayInput;
