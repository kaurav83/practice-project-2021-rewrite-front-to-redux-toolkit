import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import isEmpty from 'lodash/isEmpty';

import { pay, clearPaymentStore } from '../../store/slices/paymentSlice';
import { CONSTANTS } from '../../constants';

import PayForm from '../../components/PayForm/PayForm';
import Error from '../../components/Error/Error';
import styles from './Payment.module.sass';

const Payment = (props) => {
  const dispatch = useDispatch();
  const {
    payment: {
      error
    },
    contestCreationStore: {
      contests
    }
  } = useSelector((state) => state);

  useEffect(() => {
    if (isEmpty(contests)) {
      props.history.replace('startContest');
    }
  }, [props, contests]);

  const sendPay = (values) => {
    const contestArray = [];

    Object.keys(contests).forEach((key) =>
      contestArray.push({ ...contests[key] })
    );

    const { number, expiry, cvc, name } = values;
    const data = new FormData();

    for (let i = 0; i < contestArray.length; i++) {
      data.append('files', contestArray[i].file);
      contestArray[i].haveFile = !!contestArray[i].file;
    }

    data.append('name', name.trim());
    data.append('number', number);
    data.append('expiry', expiry);
    data.append('cvc', cvc);
    data.append('contests', JSON.stringify(contestArray));
    data.append('price', '100');
    dispatch(pay({
      data: {
        formData: data,
      },
      history: props.history,
    }));
  };

  const goBack = () => {
    props.history.goBack();
  };

  return (
    <div>
      <div className={styles.header}>
        <Link to="/">
          <img
            src={`${CONSTANTS.STATIC_IMAGES_PATH}blue-logo.png`}
            alt="blue-logo"
          />
        </Link>
      </div>

      <div className={styles.mainContainer}>
        <div className={styles.paymentContainer}>
          <span className={styles.headerLabel}>Checkout</span>

          {error && (
            <Error
              data={error.data}
              status={error.status}
              clearError={clearPaymentStore}
            />
          )}

          <PayForm sendRequest={sendPay} back={goBack} isPayForOrder />
        </div>
        <div className={styles.orderInfoContainer}>
          <span className={styles.orderHeader}>Order Summary</span>

          <div className={styles.packageInfoContainer}>
            <span className={styles.packageName}>Package Name: Standard</span>

            <span className={styles.packagePrice}>$100 USD</span>
          </div>

          <div className={styles.resultPriceContainer}>
            <span>Total:</span>

            <span>$100.00 USD</span>
          </div>

          <a href="http://www.google.com">Have a promo code?</a>
        </div>
      </div>
    </div>
  );
};

export default Payment;
