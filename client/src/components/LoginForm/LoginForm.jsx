import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Formik } from 'formik';

import { checkAuth, clearAuth } from '../../store/slices/authSlice';
import { Schems } from '../../utils/validators/validationSchems';
import { CONSTANTS } from '../../constants';

import FormInput from '../FormInput/FormInput';
import Error from '../Error/Error';
import styles from './LoginForm.module.sass';

const formInputClasses = {
  container: styles.inputContainer,
  input: styles.input,
  warning: styles.fieldWarning,
  notValid: styles.notValid,
  valid: styles.valid,
};

const LoginForm = (props) => {
  const { submitting, history } = props;

  const dispatch = useDispatch();
  const { error, isFetching } = useSelector((state) => state.auth);

  useEffect(() => {
    return () => dispatch(clearAuth());
  }, [dispatch]);

  const clicked = useCallback((values) => {
    dispatch(checkAuth({
      data: values,
      authMode: CONSTANTS.AUTH_MODE.LOGIN,
      history
    }));
  }, [dispatch, history]);

  return (
    <div className={styles.loginForm}>
      {error && (
        <Error
          data={error.data}
          status={error.status}
          clearError={clearAuth}
        />
      )}

      <h2>LOGIN TO YOUR ACCOUNT</h2>

      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        onSubmit={clicked}
        validationSchema={Schems.LoginSchem}
      >
        <Form>
          <FormInput
            classes={formInputClasses}
            name="email"
            type="text"
            label="Email Address"
          />

          <FormInput
            classes={formInputClasses}
            name="password"
            type="password"
            label="Password"
          />

          <button
            type="submit"
            disabled={submitting}
            className={styles.submitContainer}
          >
            <span className={styles.inscription}>
              {isFetching ? 'Submitting...' : 'LOGIN'}
            </span>
          </button>
        </Form>
      </Formik>
    </div>
  );
}

export default LoginForm;
