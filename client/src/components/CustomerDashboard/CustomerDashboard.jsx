import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  getContests,
  clearContestsList,
} from '../../store/slices/contestsSlice';
import { CONSTANTS } from '../../constants';

import ContestsContainer from '../ContestsContainer/ContestsContainer';
import ContestBox from '../ContestBox/ContestBox';
import TryAgain from '../TryAgain/TryAgain';
import CustomerDashboardTabset from './CustomerDashboardTabset';
import styles from './CustomerDashboard.module.sass';

const CustomerDashboard = ({ history }) => {
  const {
    error,
    haveMore,
    customerFilter,
    isFetching,
    contests,
  } = useSelector((state) => state.contestsList);

  const dispatch = useDispatch();

  const loadMore = startFrom => {
    dispatch(getContests({
      requestData: {
        limit: 8,
        offset: startFrom,
        contestStatus: customerFilter,
      },
      role: CONSTANTS.CUSTOMER
    }));
  };

  const getContestsCallback = useCallback(() => {
    dispatch(getContests({
      requestData: {
        limit: 8,
        contestStatus: customerFilter,
      },
      role: CONSTANTS.CUSTOMER
    }));
  }, [dispatch, customerFilter]);

  useEffect(() => {
    return () => dispatch(clearContestsList());
  }, [dispatch]);

  useEffect(() => {
    getContestsCallback();
  }, [customerFilter, getContestsCallback]);


  const goToExtended = contest_id => {
    history.push(`/contest/${contest_id}`);
  };

  const setContestList = () => {
    const array = [];

    for (let i = 0; i < contests.length; i++) {
      array.push(
        <ContestBox
          data={contests[i]}
          key={contests[i].id}
          goToExtended={goToExtended}
        />
      );
    }

    return array;
  };

  const tryToGetContest = () => {
    dispatch(clearContestsList());
    getContestsCallback();
  };

  return (
    <div className={styles.mainContainer}>
      <CustomerDashboardTabset
        customerFilter={customerFilter}
      />

      <div className={styles.contestsContainer}>
        {error
          ? <TryAgain getData={tryToGetContest()} />
          : (
            <ContestsContainer
              isFetching={isFetching}
              loadMore={loadMore}
              history={history}
              haveMore={haveMore}
            >
              {setContestList()}
            </ContestsContainer>
          )}
      </div>
    </div>
  );
}

export default CustomerDashboard;
