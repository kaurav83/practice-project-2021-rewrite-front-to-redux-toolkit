import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';

import { CONSTANTS } from '../../constants';
import { cashOut, clearPaymentStore } from '../../store/slices/paymentSlice';
import { changeProfileViewMode } from '../../store/slices/userProfileSlice';

import UserInfo from '../../components/UserInfo/UserInfo';
import PayForm from '../../components/PayForm/PayForm';
import Error from '../../components/Error/Error';
import Header from '../../components/Header/Header';
import styles from './UserProfile.module.sass';

const UserProfile = (props) => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.userStore.data);
  const balance = userData?.balance;
  const role = userData?.role;
  const { profileViewMode } = useSelector((state) => state.userProfile);
  const { error } = useSelector((state) => state.payment);

  useEffect(() => {
    if (!role) {
      props.history.push('/login');
    }
  }, [role, props]);

  const pay = (values) => {
    const { number, expiry, cvc, sum } = values;
    dispatch(cashOut({
      number,
      expiry,
      cvc,
      sum,
    }));
  };

  return (
    <div>
      <Header />
      <div className={styles.mainContainer}>
        <div className={styles.aside}>
          <span className={styles.headerAside}>Select Option</span>

          <div className={styles.optionsContainer}>
            <div
              className={classNames(styles.optionContainer, {
                [styles.currentOption]:
                  profileViewMode === CONSTANTS.USER_INFO_MODE,
              })}
              onClick={() => dispatch(changeProfileViewMode(CONSTANTS.USER_INFO_MODE))}
            >
              UserInfo
            </div>

            {role === CONSTANTS.CREATOR && (
              <div
                className={classNames(styles.optionContainer, {
                  [styles.currentOption]:
                    profileViewMode === CONSTANTS.CASHOUT_MODE,
                })}
                onClick={() => dispatch(changeProfileViewMode(CONSTANTS.CASHOUT_MODE))}
              >
                Cashout
              </div>
            )}
          </div>
        </div>

        {profileViewMode === CONSTANTS.USER_INFO_MODE && userData ? (
          <UserInfo />
        ) : (
          <div className={styles.container}>
            {parseInt(balance) === 0 ? (
              <span className={styles.notMoney}>
                There is no money on your balance
              </span>
            ) : (
              <div>
                {error && (
                  <Error
                    data={error.data}
                    status={error.status}
                    clearError={clearPaymentStore}
                  />
                )}

                <PayForm sendRequest={pay} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
