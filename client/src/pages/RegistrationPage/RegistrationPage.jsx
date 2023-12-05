import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { clearAuthError } from '../../store/slices/authSlice';
import { CONSTANTS } from '../../constants';

import Logo from '../../components/Logo';
import RegistrationForm from '../../components/RegistrationForm/RegistrationForm';
import RegistrationFooter from './RegistrationFooter';
import styles from './RegistrationPage.module.sass';

const RegistrationPage = props => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearAuthError());
  }, [dispatch]);

  return (
    <div className={styles.signUpPage}>
      <div className={styles.signUpContainer}>
        <div className={styles.headerSignUpPage}>
          <Logo src={`${CONSTANTS.STATIC_IMAGES_PATH}logo.png`} />

          <div className={styles.linkLoginContainer}>
            <Link to='/login' style={{ textDecoration: 'none' }}>
              <span>Login</span>
            </Link>
          </div>
        </div>

        <RegistrationForm history={props.history} />
      </div>

      <RegistrationFooter />
    </div>
  );
};

export default RegistrationPage;
