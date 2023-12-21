import React from 'react';
import { Link } from 'react-router-dom';

import LightningIcon from '../../../SvgComponents/lightningIcon';
import MagnifierIcon from '../../../SvgComponents/magnifierIcon';
import styles from './FooterMiddle.module.sass';

const FooterMiddle = () => {
  return (
    <div className={styles.footerMiddle}>
      <h2 className={styles.footerTitle}>
        Trending Searches
      </h2>

      <div className={styles.tranding}>
        <p className={styles.trandingText}>
          Explore our unique, hand-picked brand & business names for sale
          along with a matching, premium domain name. Buy instantly for a
          fixed low price.
        </p>

        <ul className={styles.trandingListLinks}>
          <li className={styles.trandingItemLink}>
            <Link
              to="/premium-domains-for-sale/all/length/Short"
              className={styles.trandingLink}
            >
              <LightningIcon />

              Short Names
            </Link>
          </li>

          <li className={styles.trandingItemLink}>
            <Link
              to="/premium-domains-for-sale/all/syllable_count/1%20Syllable"
              className={styles.trandingLink}
            >
              <LightningIcon />

              One Word
            </Link>
          </li>

          <li className={styles.trandingItemLink}>
            <Link
              to="/premium-domains-for-sale/all/length/4%20Letters"
              className={styles.trandingLink}
            >
              <LightningIcon />

              4-letter
            </Link>
          </li>

          <li className={styles.trandingItemLink}>
            <Link
              to="/premium-domains-for-sale/all/length/5%20Letters"
              className={styles.trandingLink}
            >
              <LightningIcon />

              5-letter
            </Link>
          </li>
        </ul>

        <div className={styles.search}>
          <input
            type="text"
            className={styles.field}
            placeholder="Search  over 75,000 Names"
          />

          <button
            type="button"
            className={styles.searchBtn}
          >
            <MagnifierIcon />
          </button>
        </div>
      </div>
    </div>
  )
};

export default FooterMiddle;
