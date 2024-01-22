import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { CONSTANTS } from './constants';
import browserHistory from './browserHistory';

import { LoginPageLazy } from './pages/LoginPage/LoginPage.lazy';
import { RegistrationPageLazy } from './pages/RegistrationPage/RegistrationPage.lazy';
import { PaymentLazy } from './pages/Payment/Payment.lazy';
import { StartContestPageLazy } from './pages/StartContestPage/StartContestPage.lazy';
import { DashboardLazy } from './pages/Dashboard/Dashboard.lazy';
import { HomeLazy } from './pages/Home/Home.lazy';
import { ContestPageLazy } from './pages/ContestPage/ContestPage.lazy';
import { UserProfileLazy } from './pages/UserProfile/UserProfile.lazy';
import { ContestCreationPageLazy } from './pages/ContestCreation/ContestCreationPage.lazy';
import { HowItWorksPageLazy } from './pages/HowItWorksPage/HowItWorksPage.lazy';
import { EventsPageLazy } from './pages/EventsPage/EventsPage.lazy';
import { ModerateOffersPageLazy } from './pages/ModerateOffersPage/ModerateOffersPage.lazy';
import OnlyNotAuthorizedUserHoc from './components/OnlyNotAuthorizedUserHoc/OnlyNotAuthorizedUserHoc';
import PrivateHoc from './components/PrivateHoc/PrivateHoc';
import NotFound from './components/NotFound/NotFound';
import ChatContainer from './components/Chat/ChatComponents/ChatContainer/ChatContainer';
import Spinner from './components/Spinner/Spinner';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

const App = () => (
  <Router history={browserHistory}>
    <ToastContainer
      position='top-center'
      autoClose={5000}
      hideProgressBar
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnVisibilityChange
      draggable
      pauseOnHover
    />

    <Suspense fallback={<div className="suspense-spinner"><Spinner /></div>}>
      <Switch>
        <Route exact path='/' component={HomeLazy} />

        <Route 
          exact
          path='/how-it-works'
          component={HowItWorksPageLazy}
        />

        <Route
          exact
          path='/events'
          component={EventsPageLazy}
        />

        <Route
          exact
          path='/moderate-offers'
          component={PrivateHoc(ModerateOffersPageLazy)} 
        />

        <Route
          exact
          path='/login'
          component={OnlyNotAuthorizedUserHoc(LoginPageLazy)}
        />

        <Route
          exact
          path='/registration'
          component={OnlyNotAuthorizedUserHoc(RegistrationPageLazy)}
        />

        <Route exact path='/payment' component={PrivateHoc(PaymentLazy)} />

        <Route
          exact
          path='/startContest'
          component={PrivateHoc(StartContestPageLazy)}
        />

        <Route
          exact
          path='/startContest/nameContest'
          component={PrivateHoc(ContestCreationPageLazy, {
            contestType: CONSTANTS.NAME_CONTEST,
            title: 'Company Name',
          })}
        />

        <Route
          exact
          path='/startContest/taglineContest'
          component={PrivateHoc(ContestCreationPageLazy, {
            contestType: CONSTANTS.TAGLINE_CONTEST,
            title: 'TAGLINE',
          })}
        />

        <Route
          exact
          path='/startContest/logoContest'
          component={PrivateHoc(ContestCreationPageLazy, {
            contestType: CONSTANTS.LOGO_CONTEST,
            title: 'LOGO',
          })}
        />

        <Route exact path='/dashboard' component={PrivateHoc(DashboardLazy)} />

        <Route
          exact
          path='/contest/:id'
          component={PrivateHoc(ContestPageLazy)}
        />

        <Route exact path='/account' component={PrivateHoc(UserProfileLazy)} />

        <Route component={NotFound} />
      </Switch>
    </Suspense>

    <ChatContainer />
  </Router>
);

export default App;
