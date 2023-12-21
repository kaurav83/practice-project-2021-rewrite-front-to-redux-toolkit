import React from 'react';

import { CONSTANTS } from '../../../constants';

import styles from './NamingContests.module.sass';

const NamingContests = () => {
  return (
    <div className={styles.namingContests}>
      <div className={styles.namingContestsWrapper}>
        <div className={styles.namingContestsContainer}>
          <img
            src={`${CONSTANTS.STATIC_IMAGES_PATH}icon-27.svg`}
            alt="contests-work"
            className={styles.serviceImg}
          />

          <h2 className={styles.subTitle}>
            How Do Naming Contests Work?
          </h2>

          <div className={styles.mainPart}>
            <img
              src={`${CONSTANTS.STATIC_IMAGES_PATH}support-man.svg`}
              alt="support-man"
              className={styles.houseAgency}
            />

            <div className={styles.stepsContainer}>
              <ul className={styles.stepsList}>
                <li className={styles.stepItem}>
                  <div className={styles.stepContainer}>
                    <span className={styles.stepNumber}>
                      1.
                    </span>

                    <p className={styles.stepDescription}>
                      Fill out your Naming Brief and begin receiving name ideas in minutes
                    </p>
                  </div>
                </li>

                <li className={styles.stepItem}>
                  <div className={styles.stepContainer}>
                    <span className={styles.stepNumber}>
                      2.
                    </span>

                    <p className={styles.stepDescription}>
                      Rate the submissions and provide feedback to creatives. Creatives submit even more names based on your feedback.
                    </p>
                  </div>
                </li>

                <li className={styles.stepItem}>
                  <div className={styles.stepContainer}>
                    <span className={styles.stepNumber}>
                      3.
                    </span>

                    <p className={styles.stepDescription}>
                      Our team helps you test your favorite names with your target audience. We also assist with Trademark screening.
                    </p>
                  </div>
                </li>

                <li className={styles.stepItem}>
                  <div className={styles.stepContainer}>
                    <span className={styles.stepNumber}>
                      4.
                    </span>

                    <p className={styles.stepDescription}>
                      Pick a Winner. The winner gets paid for their submission.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default NamingContests;
