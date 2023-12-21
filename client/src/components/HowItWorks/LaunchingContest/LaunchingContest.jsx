import React from 'react';

import { dataLaunchingContest } from '../config/dataAccordion';

import Accordion from '../../Accordion/Accordion';
import styles from './LaunchingContest.module.sass';

const LaunchingContest = () => {
  return (
    <div className={styles.launchingContest}>
      <nav className={styles.navBarLaunching}>
        <ul className={styles.launchingList}>
          <li className={styles.launchingItem}>
            <a href="#contests" className={styles.launchingLink}>
              Launching A Contest
            </a>
          </li>

          <li className={styles.launchingItem}>
            <a href="#marketplace" className={styles.launchingLink}>
              Buying From Marketplace
            </a>
          </li>

          <li className={styles.launchingItem}>
            <a href="#managed" className={styles.launchingLink}>
              Managed Contests
            </a>
          </li>

          <li className={styles.launchingItem}>
            <a href="#creatives" className={styles.launchingLink}>
              For Creatives
            </a>
          </li>
        </ul>
      </nav>

      <div className={styles.launchingWrapper}>
        <section className={styles.accordionSection}>
          {dataLaunchingContest.map((launching) => {
            return (
              <div
                id={launching.id}
                className={styles.sectionWrapper}
                key={launching.id}
              >
                <h3 className={styles.titleSection}>
                  {launching.titleSection}
                </h3>

                <Accordion
                  data={launching.sectionList}
                />
              </div>
            )
          })}
        </section>
      </div>
    </div>
  )
};

export default LaunchingContest;
