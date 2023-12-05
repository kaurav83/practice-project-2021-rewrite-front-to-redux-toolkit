import React from 'react';
import { Link } from 'react-router-dom';

import { CONSTANTS } from '../../constants';

import LoginForm from '../../components/LoginForm/LoginForm';
import Logo from '../../components/Logo';
import styles from './LoginPage.module.sass';

const LoginPage = props => (
  <div className={styles.mainContainer}>
    <div className={styles.loginContainer}>
      <div className={styles.headerSignUpPage}>
        <Logo src={`${CONSTANTS.STATIC_IMAGES_PATH}logo.png`} alt='logo' />

        <div className={styles.linkLoginContainer}>
          <Link to='/registration' style={{ textDecoration: 'none' }}>
            <span>Signup</span>
          </Link>
        </div>
      </div>

      <div className={styles.loginFormContainer}>
        <LoginForm history={props.history} />
      </div>
    </div>
  </div>
);

export default LoginPage;
