import React from 'react';
import { useSelector } from 'react-redux';

import { CONSTANTS } from '../../constants';

import CustomerDashboard from '../../components/CustomerDashboard/CustomerDashboard';
import CreatorDashboard from '../../components/CreatorDashboard/CreatorDashboard';
import Header from '../../components/Header/Header';

const Dashboard = ({ history, match }) => {
  const { data } = useSelector((state) => state.userStore);
  const  role  = data?.role;

  if (!role) {
    history.push('/');
  } 

  return (
    <div>
      <Header />

      {role === CONSTANTS.CUSTOMER
        ? <CustomerDashboard history={history} match={match} />
        : <CreatorDashboard history={history} match={match} />
      }
    </div>
  );
};

export default Dashboard;
