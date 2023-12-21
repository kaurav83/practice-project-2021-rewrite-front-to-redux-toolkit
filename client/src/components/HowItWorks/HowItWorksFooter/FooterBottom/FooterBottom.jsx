import React from 'react';

import LinkedInIcon from '../../../SvgComponents/linkedInIcon'
import InstagramIcon from '../../../SvgComponents/instagramIcon';
import TwitterIcon from '../../../SvgComponents/twitterIcon';
import FacebookIcon from '../../../SvgComponents/facebookIcon';
import styles from './FooterBottom.module.sass';

const FooterBottom = () => {
  return (
    <div className={styles.footerBottom}>
      <div className={styles.footerBottomWrapper}>
        <span className={styles.copyright}>
          Copyright © 2023 Squadhelp Inc
        </span>

        <a
          href="https://www.shopperapproved.com/reviews/squadhelp.com/"
          rel="nofollow"
          target="shopperapproved"
          className={styles.footerInfo}
        >
          <div itemScope="" itemType="https://schema.org/SoftwareApplication">
            <span itemProp="name">Squadhelp.com</span>
            <link itemProp="applicationCategory" href="https://schema.org/BusinessApplication" />
            <meta itemProp="url" content="https://squadhelp.com" />
            has a Shopper Approved rating of
            <div itemProp="aggregateRating" itemScope="" itemType="http://schema.org/AggregateRating">
              <span itemProp="ratingValue">4.9</span>/<span itemProp="bestRating">5</span>
              based on <span itemProp="ratingCount">2782</span> ratings and reviews
            </div>
          </div>
        </a>

        <ul className={styles.socialMediaList}>
          <li className={styles.socialMediaItem}>
            <a
              href="https://www.linkedin.com/company/squadhelp/"
              target="_blank"
              rel="noreferrer"
              className={styles.socialMediaLink}
            >
              <LinkedInIcon />
            </a>
          </li>

          <li className={styles.socialMediaItem}>
            <a
              href="https://www.instagram.com/squadhelpinc/"
              target="_blank"
              rel="noreferrer"
              className={styles.socialMediaLink}
            >
              <InstagramIcon />
            </a>
          </li>

          <li className={styles.socialMediaItem}>
            <a
              href="https://twitter.com/squadhelp"
              target="_blank"
              rel="noreferrer"
              className={styles.socialMediaLink}
            >
              <TwitterIcon />
            </a>
          </li>

          <li className={styles.socialMediaItem}>
            <a
              href="https://www.facebook.com/squadhelpinc"
              target="_blank"
              rel="noreferrer"
              className={styles.socialMediaLink}
            >
              <FacebookIcon />
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
};

export default FooterBottom;
