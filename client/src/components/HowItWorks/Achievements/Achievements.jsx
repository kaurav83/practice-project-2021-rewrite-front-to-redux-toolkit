import React from 'react';

import { CONSTANTS } from '../../../constants';

import styles from './Achievements.module.sass';

const Achievements = () => {
  return (
    <div className={styles.achievements}>
      <div className={styles.achievementsWrapper}>
        <ul className={styles.achievementsList}>
          <li className={styles.achievementsItem}>
            <figure className={styles.achievementsFigure}>
                <img src={`${CONSTANTS.STATIC_IMAGES_PATH}stars.svg`} alt="stars" />
            </figure>

            <p className={styles.achievementsText}>
              <span className={styles.achievementsTextBold}>
                4.9 out of 5 stars
              </span>{' '}
              from 25,000+ customers.
            </p>
          </li>

          <li className={styles.achivmentSeparator} />

          <li className={styles.achievementsItem}>
            <figure className={styles.achievementsFigure}>
              <img
                src={`${CONSTANTS.STATIC_IMAGES_PATH}comunity.webp`} 
                alt="stars"
                className={styles.achievementsImg}
              />
            </figure>

            <p className={styles.achievementsText}>
              Our branding community stands{' '}
              <span className={styles.achievementsTextBold}>
                200,000+
              </span>{' '}
              strong.
            </p>
          </li>

          <li className={styles.achivmentSeparator} />

          <li className={styles.achievementsItem}>
            <figure className={styles.achievementsFigure}>
              <img src={`${CONSTANTS.STATIC_IMAGES_PATH}sharing-files.svg`} alt="sharing-files" />
            </figure>
            
            <p className={styles.achievementsText}>
              <span className={styles.achievementsTextBold}>
                140+ Industries
              </span>{' '}
              supported across more than {' '}
              <span className={styles.achievementsTextBold}>
                85 countries
              </span>{' '}
              – and counting.
            </p>
          </li>
        </ul>
      </div>
    </div>
  )
};

export default Achievements;
