import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getUser } from '../../store/slices/userSlice';

import Spinner from '../Spinner/Spinner';

const OnlyNotAuthorizedUserHoc = Component => {
  const HocForLoginSignUp = ({ history, isFetching }) => {
    const dispatch = useDispatch();
    const userStore = useSelector((state) => state.userStore);

    useEffect(() => {
      dispatch(getUser(history.replace));
    }, [dispatch, history.replace]);

    if (isFetching) {
      return <Spinner />;
    }

    if (!userStore.data) {
      return <Component history={history} />;
    }

    return null;
  }

  return HocForLoginSignUp;
};

export default OnlyNotAuthorizedUserHoc;
