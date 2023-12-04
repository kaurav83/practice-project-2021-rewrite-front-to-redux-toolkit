import React from 'react';
import { useSelector } from 'react-redux';

import { CONSTANTS } from '../../constants';

import CustomerDashboard from '../../components/CustomerDashboard/CustomerDashboard';
import CreatorDashboard from '../../components/CreatorDashboard/CreatorDashboard';
import Header from '../../components/Header/Header';

const Dashboard = ({ history, match }) => {
  const { role } = useSelector((state) => state.userStore.data);

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
