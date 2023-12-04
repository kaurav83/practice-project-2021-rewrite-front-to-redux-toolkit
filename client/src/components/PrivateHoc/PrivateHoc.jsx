import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getUser } from '../../store/slices/userSlice';

import Spinner from '../Spinner/Spinner';

const PrivateHoc = (Component, props) => {
  const Hoc = (innerProps) => {
    const dispatch = useDispatch();
    const userStore = useSelector((state) => state.userStore);

    const allProps = { ...props, ...innerProps, ...userStore };

    useEffect(() => {
      if (!allProps.data) {
        dispatch(getUser());
      }
    }, [allProps.data, dispatch]);

    return (
      <>
        {allProps.isFetching ? (
          <Spinner />
        ) : (
          <Component
            history={allProps.history}
            match={allProps.match}
            {...allProps}
          />
        )}
      </>
    );
  }

  return Hoc;
};

export default PrivateHoc;
