import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

import { CONSTANTS } from '../../../constants';

import styles from './Banner.module.sass';

const Banner = () => {
  return (
    <div className={styles.banner}>
      <div className={styles.bannerContent}>
        <h3 className={styles.bannerTitle}>
          Ready to get started?
        </h3>

        <p className={styles.bannerDescription}>
          Fill out your contest brief and begin receiving custom name suggestions within minutes.
        </p>

        <Link to="/startContest" className={styles.bannerLink}>
          Start A Contest
        </Link>
      </div>

      <figure className={classNames(styles.abstraction)}>
        <img
          src={`${CONSTANTS.STATIC_IMAGES_PATH}abstract-shapes-8.svg`}
          alt="abstract-shapes-8"
        />
      </figure>

      <figure className={classNames(styles.abstraction)}>
        <img
          src={`${CONSTANTS.STATIC_IMAGES_PATH}abstract-shapes-5.svg`}
          alt="abstract-shapes-5"
        />
      </figure>
    </div>
  )
};

export default Banner;
