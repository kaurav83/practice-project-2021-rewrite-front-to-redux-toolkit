import React, { useState } from 'react';

import { CONSTANTS } from '../../constants';

import Modal from '../Modal/Modal';
import styles from './ModerateOffers.module.sass';

const Offer = ({ offer, setOfferStatus }) => {
  const {
    displayName,
    email,
    status,
    text,
    offer_id,
    user_id,
    contestId,
  } = offer;

  const [isOpenModal, setOpenModal] = useState(false);
  const [statusOffer, setStatusOffer] = useState('');

  const resolveOffer = (statusOffer) => {
    setOpenModal(true);
    setStatusOffer(statusOffer);
  };

  const rejectOffer = (statusOffer) => {
    setOpenModal(true);
    setStatusOffer(statusOffer);
  };

  return (
    <tr>
      <td>{offer_id}</td>

      <td>{displayName}</td>

      <td>
        <a className={styles.emailLink} href="mailto:service@squadhelp.com">
          {email}
        </a>
      </td>

      <td>
        {text}
      </td>

      <td>{status}</td>

      {offer.status === CONSTANTS.OFFER_STATUS_PENDING
        ? (
          <td>
            <div className={styles.btnsContainer}>
              <button type="button" onClick={() => resolveOffer('resolve')} className={styles.resolveBtn}>
                Resolve
              </button>

              <button type="button" onClick={() => rejectOffer('reject')} className={styles.rejectBtn}>
                Reject
              </button>
            </div>

            {isOpenModal && (
              <Modal onClose={() => setOpenModal(false)}>
                <div className={styles.modalContainer}>
                  <p className={styles.modalText}>Are you sure?</p>

                  <div className={styles.modalButtonGroup}>
                    <button
                      onClick={() => setOfferStatus(user_id, offer_id, statusOffer, contestId, email)}
                      className={styles.modalBtn}  
                    >
                      Yes
                    </button>

                    <button
                      onClick={() => setOpenModal(false)}
                      className={styles.modalBtn}    
                    >
                      No
                    </button>
                  </div>
                </div>
              </Modal>
            )}
          </td>
        )
        : (
          <td>
            <span>-</span>
          </td>
        )}
    </tr>
  )
};

export default Offer;
