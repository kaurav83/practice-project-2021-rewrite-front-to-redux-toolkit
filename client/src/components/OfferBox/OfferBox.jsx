import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Rating from 'react-rating';
import { withRouter } from 'react-router-dom';
import isEqual from 'lodash/isEqual';
import classNames from 'classnames';

import { goToExpandedDialog } from '../../store/slices/chatSlice';
import {
  changeMark,
  clearChangeMarkError,
  changeShowImage,
} from '../../store/slices/contestByIdSlice';
import { CONSTANTS } from '../../constants';

import Modal from '../Modal/Modal';
import styles from './OfferBox.module.sass';

const OfferBox = (props) => {
  const {
    data,
    contestType,
    contestCreatorId,
    userId,
    contestStatus
  } = props;

  const {
    avatar,
    firstName,
    lastName,
    email,
    rating
  } = data.User;

  const dispatch = useDispatch();
  const { id, role } = useSelector((state) => state.userStore.data);
  const { messagesPreview } = useSelector((state) => state.chatStore);

  const [isOpenModal, setOpenModal] = useState(false);
  const [statusOffer, setStatusOffer] = useState('');

  const findConversationInfo = () => {
    const participants = [id, data.User.id];

    participants.sort(
      (participant1, participant2) => participant1 - participant2
    );

    for (let i = 0; i < messagesPreview.length; i++) {
      if (isEqual(participants, messagesPreview[i].participants)) {
        return {
          participants: messagesPreview[i].participants,
          _id: messagesPreview[i]._id,
          blackList: messagesPreview[i].blackList,
          favoriteList: messagesPreview[i].favoriteList,
        };
      }
    }

    return null;
  };

  const needButtons = (offerStatus) => {
    return (
      contestCreatorId === userId &&
      contestStatus === CONSTANTS.CONTEST_STATUS_ACTIVE &&
      offerStatus === CONSTANTS.OFFER_STATUS_PENDING
    );
  };

  const resolveOffer = () => {
    setOpenModal(true);
    setStatusOffer('resolve');
  };

  const rejectOffer = () => {
    setOpenModal(true);
    setStatusOffer('reject');
  };

  const changeMarkCallback = (value) => {
    dispatch(clearChangeMarkError());
    dispatch(changeMark({
      mark: value,
      offerId: data.id,
      isFirst: !data.mark,
      creatorId: data.User.id,
    }));
  };

  const offerStatus = () => {
    const { status } = data;

    if (status === CONSTANTS.OFFER_STATUS_REJECTED) {
      return (
        <i
          className={classNames('fas fa-times-circle reject', styles.reject)}
        />
      );
    }

    if (status === CONSTANTS.OFFER_STATUS_WON) {
      return (
        <i
          className={classNames('fas fa-check-circle resolve', styles.resolve)}
        />
      );
    }

    return null;
  };

  const goChat = () => {
    dispatch(goToExpandedDialog({
      interlocutor: data.User,
      conversationData: findConversationInfo(),
    }));
  };

  const handleSetStatusOffer = () => {
    setOpenModal(false);
    props.setOfferStatus(data.User.id, data.id, statusOffer)
  };

  return (
    <div className={styles.offerContainer}>
      {offerStatus()}

      <div className={styles.mainInfoContainer}>
        <div className={styles.userInfo}>
          <div className={styles.creativeInfoContainer}>
            <img
              src={
                avatar === 'anon.png'
                  ? CONSTANTS.ANONYM_IMAGE_PATH
                  : `${CONSTANTS.publicURL}${avatar}`
              }
              alt="user"
            />

            <div className={styles.nameAndEmail}>
              <span>{`${firstName} ${lastName}`}</span>

              <span>{email}</span>
            </div>
          </div>

          <div className={styles.creativeRating}>
            <span className={styles.userScoreLabel}>
              Creative Rating
            </span>

            <Rating
              initialRating={rating}
              fractions={2}
              fullSymbol={
                <img
                  src={`${CONSTANTS.STATIC_IMAGES_PATH}star.png`}
                  alt="star"
                />
              }
              placeholderSymbol={
                <img
                  src={`${CONSTANTS.STATIC_IMAGES_PATH}star.png`}
                  alt="star"
                />
              }
              emptySymbol={
                <img
                  src={`${CONSTANTS.STATIC_IMAGES_PATH}star-outline.png`}
                  alt="star-outline"
                />
              }
              readonly
            />
          </div>
        </div>

        <div className={styles.responseConainer}>
          {contestType === CONSTANTS.LOGO_CONTEST
            ? (
              <img
                onClick={() =>
                  dispatch(changeShowImage({
                    imagePath: data.fileName,
                    isShowOnFull: true,
                  }))
                }
                className={styles.responseLogo}
                src={`${CONSTANTS.publicURL}${data.fileName}`}
                alt="logo"
              />
            )
            : (
              <span className={styles.response}>
                {data.text}
              </span>
            )}

          {data.User.id !== id && (
            <Rating
              fractions={2}
              fullSymbol={
                <img
                  src={`${CONSTANTS.STATIC_IMAGES_PATH}star.png`}
                  alt="star"
                />
              }
              placeholderSymbol={
                <img
                  src={`${CONSTANTS.STATIC_IMAGES_PATH}star.png`}
                  alt="star"
                />
              }
              emptySymbol={
                <img
                  src={`${CONSTANTS.STATIC_IMAGES_PATH}star-outline.png`}
                  alt="star"
                />
              }
              onClick={changeMarkCallback}
              placeholderRating={data.mark}
            />
          )}
        </div>

        {role !== CONSTANTS.CREATOR && (
          <i onClick={goChat} className="fas fa-comments" />
        )}

        {needButtons(data.status) && (
          <div className={styles.btnsContainer}>
            <div onClick={() => resolveOffer()} className={styles.resolveBtn}>
              Resolve
            </div>

            <div onClick={() => rejectOffer()} className={styles.rejectBtn}>
              Reject
            </div>
          </div>
        )}

        {isOpenModal && (
          <Modal onClose={() => setOpenModal(false)}>
            <div className={styles.modalContainer}>
              <p className={styles.modalText}>Are you sure?</p>
              <div className={styles.modalButtonGroup}>
                <button
                  onClick={handleSetStatusOffer}
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
      </div>
    </div>
  );
};

export default withRouter(OfferBox);
