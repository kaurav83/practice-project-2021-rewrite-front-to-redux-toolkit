import React from 'react';
import { useDispatch } from 'react-redux';
import classNames from 'classnames';

import { setNewCustomerFilter } from '../../store/slices/contestsSlice';
import { CONSTANTS } from '../../constants';

import styles from './CustomerDashboard.module.sass';

const CustomerDashboardTabset = ({ customerFilter }) => {
  const dispatch = useDispatch();

  const handleClick = (filterName) => {
    if (filterName !== customerFilter) {
      dispatch(setNewCustomerFilter(filterName));
    }
  };

  return (
    <div className={styles.filterContainer}>
      <div
        onClick={() => handleClick(CONSTANTS.CONTEST_STATUS_ACTIVE)}
        className={classNames({
          [styles.activeFilter]:
            CONSTANTS.CONTEST_STATUS_ACTIVE === customerFilter,
          [styles.filter]:
            CONSTANTS.CONTEST_STATUS_ACTIVE !== customerFilter,
        })}
      >
        Active Contests
      </div>

      <div
        onClick={() => handleClick(CONSTANTS.CONTEST_STATUS_FINISHED)}
        className={classNames({
          [styles.activeFilter]:
            CONSTANTS.CONTEST_STATUS_FINISHED === customerFilter,
          [styles.filter]:
            CONSTANTS.CONTEST_STATUS_FINISHED !== customerFilter,
        })}
      >
        Completed contests
      </div>

      <div
        onClick={() => handleClick(CONSTANTS.CONTEST_STATUS_PENDING)}
        className={classNames({
          [styles.activeFilter]:
            CONSTANTS.CONTEST_STATUS_PENDING === customerFilter,
          [styles.filter]:
            CONSTANTS.CONTEST_STATUS_PENDING !== customerFilter,
        })}
      >
        Inactive contests
      </div>
    </div>
  )
};

export default CustomerDashboardTabset;