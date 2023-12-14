import React, { useContext } from 'react';

import { HowItWorksContext } from '../../../context/HowItWorksContext/HowItWorksContext';
import { useMediaQuery } from "../../../hooks/useMediaQuery";

import HowItWorksHeaderTop from './HowItWorksHeaderTop/HowItWorksHeaderTop';
import HowItWorksHeaderBottom from './HowItWorksHeaderBottom/HowItWorksHeaderBottom';
import styles from './HowItWorksHeader.sass';

const HowItWorksHeader = () => {
  const { isOpenMenu } = useContext(HowItWorksContext);
  const isWidthTablet = useMediaQuery("(min-width: 768px)");

  return (
    <div className={styles.HowItWorksHeader}>
        <HowItWorksHeaderTop />

      {(isOpenMenu || isWidthTablet) && (
        <HowItWorksHeaderBottom />
      )}
    </div>
  )
};

export default HowItWorksHeader;
