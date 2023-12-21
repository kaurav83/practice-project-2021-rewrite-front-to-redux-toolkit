import React from 'react';

import { CONSTANTS } from '../../../constants';

import styles from './FeaturedIn.module.sass';

const FeaturedIn = () => {
  return (
    <div className={styles.featuredIn}>
      <div className={styles.featuredInWrapper}>
        <h6 className={styles.featuredInLeftSide}>
          Featured In
        </h6>

        <ul className={styles.featuredList}>
          <li className={styles.featuredItem}>
            <a
              href="http://www.forbes.com/sites/forbestreptalks/2016/07/11/not-sure-how-to-name-a-startup-squadhelp-will-crowdsource-it-for-199"
              className={styles.featuredLink}>
              <img
                src={`${CONSTANTS.STATIC_IMAGES_PATH}forbes.svg`}
                alt="forbes"
                className={styles.featuredImg} 
              />
            </a>
          </li>

          <li className={styles.featuredItem}>
            <a
              className={styles.featuredLink}
              href="https://thenextweb.com/news/changing-startups-name-tale-crowdsourcing-843-domain-names"  
            >
              <img
                src={`${CONSTANTS.STATIC_IMAGES_PATH}TNW.svg`}
                alt="forbes"
                className={styles.featuredImg} 
              />
            </a>
          </li>

          <li className={styles.featuredItem}>
            <a
              className={styles.featuredLink}
              href="http://www.chicagotribune.com/bluesky/originals/ct-squadhelp-startup-names-bsi-20170331-story.html"  
            >
              <img
                src={`${CONSTANTS.STATIC_IMAGES_PATH}chicago.svg`}
                alt="forbes"
                className={styles.featuredImg}   
              />
            </a>
          </li>

          <li className={styles.featuredItem}>
            <a
              className={styles.featuredLink}
              href="http://mashable.com/2011/04/01/make-money-crowdworking/"  
            >
              <img
                src={`${CONSTANTS.STATIC_IMAGES_PATH}Mashable.svg`}
                alt="forbes"
                className={styles.featuredImg}  
              />
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
};

export default FeaturedIn;
