import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { CONSTANTS } from '../../constants';

import Events from '../../components/Events/Events';
import Header from '../../components/Header/Header';

const EventsPage = (props) => {
  const data = useSelector((state) => state.userStore.data);

  useEffect(() => {
    if (data?.role === CONSTANTS.MODERATOR) {
      props.history.push('/');
    }
  }, [props, data]);

  return (
    <>
      <Header />

      <Events />
    </>
  )
};

export default EventsPage;
