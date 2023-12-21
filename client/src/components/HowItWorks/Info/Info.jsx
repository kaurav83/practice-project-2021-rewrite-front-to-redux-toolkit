import React, { useState } from 'react';
import classNames from 'classnames';

import Modal from '../../Modal/Modal';
import InfoModalContent from './InfoModalContent/InfoModalContent';
import CallbackPhone from '../../SvgComponents/callbackPhone';
import styles from './Info.module.sass';

const Info = () => {
  const [isOpenModal, setOpenModal] = useState(false);
  const [isOpenBooking, setOpenBooking] = useState(false);

  return (
    <div className={styles.info}>
      <div className={styles.infoWrapper}>
        <div className={styles.infoLeftSide}>
          <div className={styles.infoContent}>
            <span className={styles.infoBgChevron}>
              <span className={classNames(styles.iconChevron, "fas fa-angle-right")} />
            </span>

            <h4 className={styles.infoLeftTitle}>
              Pay a Fraction of cost vs hiring an agency
            </h4>

            <p className={styles.infoDescription}>
              For as low as $199, our naming contests and marketplace allow you to get an amazing brand quickly and affordably.
            </p>
          </div>

          <span className={styles.infoSeparator} />

          <div className={styles.infoContent}>
            <span className={styles.infoBgChevron}>
              <span className={classNames(styles.iconChevron, "fas fa-angle-right")} />
            </span>

            <h4 className={styles.infoLeftTitle}>
              Satisfaction Guarantee
            </h4>

            <p className={styles.infoDescription}>
              Of course! We have policies in place to ensure that you are satisfied with your experience.{' '}

              <button
                type="button"
                className={styles.infoBtn}
                onClick={() => setOpenModal(true)}
              >
                Learn more
              </button>
            </p>

            {isOpenModal && (
              <Modal onClose={() => setOpenModal(false)}>
                <InfoModalContent close={() => setOpenModal(false)} />
              </Modal>
            )}
          </div>
        </div>

        <div className={styles.infoRightSide}>
          <h4 className={styles.infoRightTitle}>
            Questions?
          </h4>

          <p className={styles.infoRightDescription}>
            Speak with a Squadhelp platform expert to learn more and get your questions answered.
          </p>

          <button
            type="button"
            className={styles.infoRightBtn}
            onClick={() => setOpenBooking(true)}
          >
            Schedule Consultation
          </button>

          {isOpenBooking && (
            <Modal>
              <div className={styles.booking}>
                <iframe src="https://calendly.com/squadhelp/new?embed_domain=www.squadhelp.com&amp;embed_type=PopupText" width="100%" height="100%" frameBorder="0" title="Select a Date &amp; Time - Calendly" />
              
                <span 
                  className={classNames(styles.bookingClose, 'fas fa-times')}
                  onClick={() => setOpenBooking(false)}
                />
              </div>
            </Modal>
          )}

          <a className={styles.infoLinkPhone} href="tel:(877)355-3585">
            <CallbackPhone />

            <span className={styles.infoPhoneText}>
              (877) 355-3585
            </span>
          </a>

          <span className={styles.proposal}>
            Call us for assistance
          </span>
        </div>
      </div>
    </div>
  )
};

export default Info;
