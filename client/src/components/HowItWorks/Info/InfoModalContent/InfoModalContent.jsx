import React, { memo } from 'react';
import classNames from 'classnames';

import styles from './InfoModalContent.module.sass'

const InfoModalContent = memo(({ close }) => {
  return (
    <div className={styles.modalContent}>
      <div className={styles.modalBody}>
        <h4 className={styles.modalTitle}>
          We Stand By Our Process.
        </h4>

        <p className={styles.modalPromiseText}>
          If you are not satisfied receive
        </p>

        <ul className={styles.mediaList}>
          <li className={styles.mediaItem}>
            <span className={classNames(styles.mediaIconWrapper, styles.heart)}>
              <span className={classNames(styles.mediaIcon, 'fas fa-heart')}></span>
            </span>

            <p className={styles.mediaText}>
              Complimentary extension of your contest timeline.
            </p>
          </li>

          <li className={styles.mediaItem}>
            <span className={classNames(styles.mediaIconWrapper, styles.smile)}>
              <span className={classNames(styles.mediaIcon, 'fas fa-smile')}></span>
            </span>

            <p className={styles.mediaText}>
              Complimentary consultation with a Squadhelp branding consultant.
            </p>
          </li>

          <li className={styles.mediaItem}>
            <span className={classNames(styles.mediaIconWrapper, styles.studiovinari)}>
              <span className={classNames(styles.mediaIcon, 'fab fa-studiovinari')}></span>
            </span>

            <p className={styles.mediaText}>
              Apply your contest award toward the purchase of any premium name from our Marketplace.
            </p>
          </li>

          <li className={styles.mediaItem}>
            <span className={classNames(styles.mediaIconWrapper, styles.steam)}>
              <span className={classNames(styles.mediaIcon, 'fab fa-steam-symbol')}></span>
            </span>

            <p className={styles.mediaText}>
              Partial refund for Gold and Platinum packages.{' '}
              <a
                href="https://helpdesk.squadhelp.com/important-sh-policies/contest-holder/refund-policy"
                target="_blank"
                rel="noreferrer"
                className={styles.mediaLink}
              >
                Read more.
              </a>
            </p>
          </li>

          <li className={styles.mediaItem}>
            <span className={classNames(styles.mediaIconWrapper, styles.tenis)}>
              <span className={classNames(styles.mediaIcon, 'fas fa-table-tennis')}></span>
            </span>

            <p className={styles.mediaText}>
              No-questions-asked refund within 10 days for any marketplace domains purchased.{' '}
              <a
                href="https://helpdesk.squadhelp.com/domain-marketplace/domain-marketplace-terms-conditions-for-buyers"
                target="_blank"
                rel="noreferrer"
                className={styles.mediaLink}
              >
                Read more.
              </a>
            </p>
          </li>
        </ul>
      </div>

      <div className={styles.modalBtnWrapper}>
        <button
          type="button"
          onClick={close}
          className={styles.modalBtn}
        >
          Close
        </button>
      </div>
    </div>
  )
});

export default InfoModalContent;
