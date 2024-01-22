import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { CONSTANTS } from '../../constants';

import Header from '../../components/Header/Header';

const ModerateOffersPage = (props) => {
  const { data } = useSelector((state) => state.userStore);

  useEffect(() => {
    if (data?.role !== CONSTANTS.MODERATOR) {
      props.history.replace('/');
    }
  }, [data, props]);

  return (
    <>
      <Header/>
      
      Moderate Offers Page
    </>
  )
};

export default ModerateOffersPage;
