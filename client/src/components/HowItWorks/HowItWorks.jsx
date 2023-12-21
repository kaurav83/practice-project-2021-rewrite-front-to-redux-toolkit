import React from 'react';

import HowItWorksHeader from './HowItWorksHeader/HowItWorksHeader';
import HeroBanner from './HeroBanner/HeroBanner';
import Services from './Services/Services';
import NamingContests from './NamingContests/NamingContests';
import LaunchingContest from './LaunchingContest/LaunchingContest';
import Banner from './Banner/Banner';
import Achievements from './Achievements/Achievements';
import Info from './Info/Info';
import FeaturedIn from './FeaturedIn/FeaturedIn';
import HowItWorksFooter from './HowItWorksFooter/HowItWorksFooter';
import ToUp from '../ToUp/ToUp';
import styles from './HowItWorks.sass';

const HowItWorks = () => {
  return (
    <div className={styles.HowItWorks}>
      <HowItWorksHeader />

      <HeroBanner/>

      <Services />

      <NamingContests />

      <LaunchingContest />

      <Banner />

      <Achievements />

      <Info />

      <FeaturedIn />

      <HowItWorksFooter />

      <ToUp />
    </div>
  )
};

export default HowItWorks;
