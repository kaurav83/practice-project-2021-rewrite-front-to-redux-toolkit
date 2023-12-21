import React from 'react';

import FooterTop from './FooterTop/FooterTop';
import FooterMiddle from './FooterMiddle/FooterMiddle';
import FooterBottom from './FooterBottom/FooterBottom';
import styles from './HowItWorksFooter.module.sass';

const HowItWorksFooter = () => {
  return (
    <footer className={styles.howItWorksFooter}>
      <div className={styles.footerWrapper}>
        <FooterTop />

        <FooterMiddle />

        <FooterBottom />
      </div>
    </footer>
  )
};

export default HowItWorksFooter;
