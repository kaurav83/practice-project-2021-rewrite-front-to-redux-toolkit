import React, { useState } from 'react';

import { CONSTANTS } from '../../constants';

import Modal from '../Modal/Modal';
import styles from './ModerateOffers.module.sass';

const Offer = ({ offer, setOfferModeration }) => {
  const {
    offer_id,
    displayName,
    email,
    status,
    text,
    fileName,
    approved,
  } = offer;

  const [isOpenModal, setOpenModal] = useState(false);
  const [statusModeration, setStatusModeration] = useState('');

  const approveOffer = (status) => {
    setOpenModal(true);
    setStatusModeration(status);
  };

  const disapproveOffer = (status) => {
    setOpenModal(true);
    setStatusModeration(status);
  };

  return (
    <tr>
      <td>{displayName}</td>

      <td>
        <a className={styles.emailLink} href="mailto:service@squadhelp.com">
          {email}
        </a>
      </td>

      {text && (
        <td>
          {text}
        </td>
      )}

      {fileName && (
        <td>
          {fileName}
        </td>
      )}

      <td>{status}</td>

      {offer.approved === CONSTANTS.OFFER_MODERATION
        ? (
          <td>
            <div className={styles.btnsContainer}>
              <button
                type="button"
                onClick={() => approveOffer(CONSTANTS.OFFER_APPROVE)}
                className={styles.resolveBtn}
              >
                Approve
              </button>

              <button
                type="button"
                onClick={() => disapproveOffer(CONSTANTS.OFFER_DISAPPROVE)}
                className={styles.rejectBtn}
              >
                Disapprove
              </button>
            </div>

            {isOpenModal && (
              <Modal onClose={() => setOpenModal(false)}>
                <div className={styles.modalContainer}>
                  <p className={styles.modalText}>Are you sure?</p>

                  <div className={styles.modalButtonGroup}>
                    <button
                      onClick={() => setOfferModeration(offer_id, statusModeration, email)}
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
            <span>{approved}</span>
          </td>
        )}
    </tr>
  )
};

export default Offer;
