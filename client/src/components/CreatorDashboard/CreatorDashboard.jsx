import React, { useCallback, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import queryString from 'query-string';
import isEqual from 'lodash/isEqual';

import {
  getContests,
  clearContestsList,
  setNewCreatorFilter,
} from '../../store/slices/contestsSlice';
import { getDataForContest } from '../../store/slices/dataForContestSlice';
import { CONSTANTS } from '../../constants';

import ContestsContainer from '../ContestsContainer/ContestsContainer';
import ContestBox from '../ContestBox/ContestBox';
import TryAgain from '../TryAgain/TryAgain';
import CreatorDashboardFilters from './CreatorDashboardFilters';
import styles from './CreatorDashboard.module.sass';

const CreatorDashboard = (props) => {
  const dispatch = useDispatch();
  const {
    error,
    haveMore,
    creatorFilter,
    contests
  } = useSelector((state) => state.contestsList);
  const dataForContest = useSelector((state) => state.dataForContest);
  const { isFetching } = dataForContest;

  useEffect(() => {
    dispatch(getDataForContest());

    return () => dispatch(clearContestsList());
  }, [dispatch]);

  const getContestsCallback = useCallback((filter) => {
    dispatch(getContests({
      requestData: {
        limit: 8,
        offset: 0,
        ...filter,
      },
      role: CONSTANTS.CREATOR
    }));
  }, [dispatch]);

  const parseUrlForParams = (search) => {
    const obj = queryString.parse(search);
    const filter = {
      typeIndex: obj.typeIndex || 1,
      contestId: obj.contestId ? obj.contestId : '',
      industry: obj.industry ? obj.industry : '',
      awardSort: obj.awardSort || 'asc',
      ownEntries:
        typeof obj.ownEntries === 'undefined' ? false : obj.ownEntries,
    };

    if (!isEqual(filter, creatorFilter)) {
      dispatch(setNewCreatorFilter(filter));
      dispatch(clearContestsList());
      getContestsCallback(filter);

      return false;
    }

    return true;
  };

  const getPredicateOfRequest = useCallback(() => {
    const obj = {};

    Object.keys(creatorFilter).forEach((el) => {
      if (creatorFilter[el]) {
        obj[el] = creatorFilter[el];
      }
    });
    obj.ownEntries = creatorFilter.ownEntries;

    return obj;
  }, [creatorFilter]);

  const loadMore = useCallback((startFrom) => {
    dispatch(getContests(
      {
        requestData: {
          limit: 8,
          offset: startFrom,
          ...getPredicateOfRequest(),
        },
        role: CONSTANTS.CREATOR
      }));
  }, [dispatch, getPredicateOfRequest]);

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

  const goToExtended = useCallback((contestId) => {
    props.history.push(`/contest/${contestId}`);
  }, [props.history]);

  const tryLoadAgain = useCallback(() => {
    dispatch(clearContestsList());
    dispatch(getContests({
      requestData: {
        limit: 8,
        offset: 0,
        ...getPredicateOfRequest(),
      },
      role: CONSTANTS.CREATOR
    }));
  }, [dispatch, getPredicateOfRequest]);

  useEffect(() => {
    if (
      parseUrlForParams(props.location.search) &&
      !contests.length
    ) {
      getContestsCallback(creatorFilter);
    }
    // eslint-disable-next-line
  }, [props.location.search, contests.length]);

  return (
    <div className={styles.mainContainer}>
      <CreatorDashboardFilters
        isFetching={isFetching}
        creatorFilter={creatorFilter}
        dataForContest={dataForContest}
        history={props.history}
      />

      {error ? (
        <div className={styles.messageContainer}>
          <TryAgain getData={tryLoadAgain} />
        </div>
      ) : (
        <ContestsContainer
          isFetching={isFetching}
          loadMore={loadMore}
          history={props.history}
          haveMore={haveMore}
        >
          {setContestList()}
        </ContestsContainer>
      )}
    </div>
  );
}

export default withRouter(CreatorDashboard);
