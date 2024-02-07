import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { CONSTANTS } from '../../constants';

import Header from '../../components/Header/Header';
import ModerateOffers from '../../components/ModerateOffers/ModerateOffers';

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
      
      <ModerateOffers />
    </>
  )
};

export default ModerateOffersPage;
