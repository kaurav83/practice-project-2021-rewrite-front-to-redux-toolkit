import React from 'react';
import { Link } from 'react-router-dom';

import { CONSTANTS } from '../../../constants';

import styles from './Services.module.sass';

const Services = () => {
  return (
    <div className={styles.services}>
      <div className={styles.servicesWrapper}>
        <div className={styles.servicesContainer}>
          <span className={styles.hashTag}>
            Our Services
          </span>

          <h2 className={styles.subTitle}>
            3 Ways To Use Squadhelp
          </h2>

          <p className={styles.description}>
            Squadhelp offers 3 ways to get you a perfect name for your business.
          </p>

          <ul className={styles.servicesList}>
            <li className={styles.service}>
              <img
                src={`${CONSTANTS.STATIC_IMAGES_PATH}icon-7.svg`}
                alt="launch-contest"
                className={styles.serviceImg}
              />

              <h3 className={styles.serviceTitle}>
                Launch a Contest
              </h3>

              <p className={styles.serviceDescription}>
                Work with hundreds of creative experts to get custom name suggestions for your business or brand. All names are auto-checked for URL availability.
              </p>

              <Link to='/startContest' className={styles.serviceLink}>
                Launch a Contest
              </Link>
            </li>

            <li className={styles.service}>
              <img
                src={`${CONSTANTS.STATIC_IMAGES_PATH}icon-40.svg`}
                alt="explore-names"
                className={styles.serviceImg}
              />

              <h3 className={styles.serviceTitle}>
                Explore Names For Sale
              </h3>

              <p className={styles.serviceDescription}>
                Our branding team has curated thousands of pre-made names that you can purchase instantly. All names include a matching URL and a complimentary Logo Design
              </p>

              <Link to='/premium-domains-for-sale' className={styles.serviceLink}>
                Explore Names For Sale
              </Link>
            </li>

            <li className={styles.service}>
              <img
                src={`${CONSTANTS.STATIC_IMAGES_PATH}icon-24.svg`}
                alt="explore-names"
                className={styles.serviceImg}
              />

              <h3 className={styles.serviceTitle}>
                Agency-level Managed Contests
              </h3>

              <p className={styles.serviceDescription}>
                Our Managed contests combine the power of crowdsourcing with the rich experience of our branding consultants. Get a complete agency-level experience at a fraction of Agency costs
              </p>

              <Link to='/managed-contests' className={styles.serviceLink}>
                Learn More
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
};

export default Services;
