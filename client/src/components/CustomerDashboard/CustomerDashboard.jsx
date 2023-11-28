import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

import {
  getContests,
  clearContestsList,
  setNewCustomerFilter,
} from '../../store/slices/contestsSlice';
import CONSTANTS from '../../constants';

import ContestsContainer from '../ContestsContainer/ContestsContainer';
import ContestBox from '../ContestBox/ContestBox';
import TryAgain from '../TryAgain/TryAgain';
import styles from './CustomerDashboard.module.sass';

const CustomerDashboard = (props) => {
  const {
    error,
    haveMore,
    customerFilter,
    clearContestsList,
    newFilter,
    isFetching,
    history,
  } = props;

  const loadMore = startFrom => {
    props.getContests({
      limit: 8,
      offset: startFrom,
      contestStatus: customerFilter,
    });
  };

  const getContests = () => {
    props.getContests({
      limit: 8,
      contestStatus: customerFilter,
    });
  };

  useEffect(() => {
    return () => clearContestsList();
  }, []);

  useEffect(() => {
    getContests();
  }, [customerFilter]);


  const goToExtended = contest_id => {
    history.push(`/contest/${contest_id}`);
  };

  const setContestList = () => {
    const array = [];
    const { contests } = props;

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
    clearContestsList();
    getContests();
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.filterContainer}>
        <div
          onClick={() =>
            newFilter(CONSTANTS.CONTEST_STATUS_ACTIVE)
          }
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
          onClick={() =>
            newFilter(CONSTANTS.CONTEST_STATUS_FINISHED)
          }
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
          onClick={() =>
            newFilter(CONSTANTS.CONTEST_STATUS_PENDING)
          }
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

const mapStateToProps = state => state.contestsList;

const mapDispatchToProps = dispatch => ({
  getContests: data =>
    dispatch(getContests({ requestData: data, role: CONSTANTS.CUSTOMER })),
  clearContestsList: () => dispatch(clearContestsList()),
  newFilter: filter => dispatch(setNewCustomerFilter(filter)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomerDashboard);
