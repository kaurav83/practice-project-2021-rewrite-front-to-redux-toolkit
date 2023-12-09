import React from 'react';
import { useDispatch } from 'react-redux';

import styles from './Error.module.sass';

const Error = props => {
  const dispatch = useDispatch();

  const getMessage = () => {
    const { status, data } = props;

    switch (status) {
      case 404:
        return data;
      case 400:
        return 'Check the input data';
      case 409:
        return data;
      case 403:
        return 'Bank decline transaction';
      case 406:
        return data;
      default:
        return data || 'Server Error';
    }
  };

  const { clearError } = props;
  return (
    <div className={styles.errorContainer}>
      <span>{getMessage()}</span>
      
      <i className='far fa-times-circle' onClick={() => dispatch(clearError())} />
    </div>
  );
};

export default Error;
