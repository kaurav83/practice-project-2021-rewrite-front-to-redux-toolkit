import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';
import isEqual from 'lodash/isEqual';
import LightBox from 'react-image-lightbox';

import { CONSTANTS } from '../../constants';
import { goToExpandedDialog } from '../../store/slices/chatSlice';
import {
  getContestById,
  setOfferStatus,
  clearSetOfferStatusError,
  changeEditContest,
  changeContestViewMode,
  changeShowImage,
} from '../../store/slices/contestByIdSlice';

import Header from '../../components/Header/Header';
import ContestSideBar from '../../components/ContestSideBar/ContestSideBar';
import OfferBox from '../../components/OfferBox/OfferBox';
import OfferForm from '../../components/OfferForm/OfferForm';
import Brief from '../../components/Brief/Brief';
import Spinner from '../../components/Spinner/Spinner';
import TryAgain from '../../components/TryAgain/TryAgain';
import Error from '../../components/Error/Error';
import styles from './ContestPage.module.sass';
import 'react-image-lightbox/style.css';

const ContestPage = (props) => {
  const dispatch = useDispatch();

  const {
    isShowOnFull,
    imagePath,
    error,
    isFetching,
    isBrief,
    contestData,
    offers,
    setOfferStatusError,
  } = useSelector((state) => state.contestByIdStore);
  const { messagesPreview } = useSelector((state) => state.chatStore);
  const userStore = useSelector((state) => state.userStore);
  const role = userStore?.data?.role;

  const getDataContest = useCallback(() => {
    const { params } = props.match;
    dispatch(getContestById({ contestId: params.id }));
  }, [dispatch, props.match]);

  useEffect(() => {
    getDataContest();

    return () => dispatch(changeEditContest(false));
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!userStore.data) {
      props.history.push('/login');
    }

    if (userStore.data?.role === CONSTANTS.MODERATOR) {
      props.history.push('/');
    }
  }, [userStore.data, props]);

  const setOffersList = () => {
    const array = offers.map((offer) => {
      return (
        <OfferBox
          data={offer}
          key={offer.id}
          setOfferStatus={setOfferStatusContest}
          contestType={contestData.contestType}
          date={new Date()}
          contestStatus={contestData.status}
          contestCreatorId={contestData.User.id}
          userId={userStore.data.id}
        />
      )
    });

    return array.length !== 0
      ? array
      : (
        <div className={styles.notFound}>
          There is no suggestion at this moment
        </div>
      );
  };

  const setOfferStatusContest = async (creatorId, offerId, command) => {
    await dispatch(clearSetOfferStatusError());
    const { id, orderId, priority } = contestData;
    const obj = {
      command,
      offerId,
      creatorId,
      orderId,
      priority,
      contestId: id,
    };
    await dispatch(setOfferStatus(obj));
    await dispatch(getContestById({ contestId: props.match.params.id }));
  };

  const findConversationInfo = (interlocutorId) => {
    const { id } = userStore.data;
    const participants = [id, interlocutorId];
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

  const goChat = () => {
    const { User } = contestData;
    dispatch(goToExpandedDialog({
      interlocutor: User,
      conversationData: findConversationInfo(User.id),
    }));
  };

  const renderContent = () => {
    if (error) {
      return (
        <div className={styles.tryContainer}>
          <TryAgain getData={getDataContest} />
        </div>
      )
    } else if (isFetching) {
      return (
        <div className={styles.containerSpinner}>
          <Spinner />
        </div>
      )
    }

    return (
      <div className={styles.mainInfoContainer}>
        <div className={styles.infoContainer}>
          <div className={styles.buttonsContainer}>
            <span
              onClick={() => dispatch(changeContestViewMode(true))}
              className={classNames(styles.btn, {
                [styles.activeBtn]: isBrief,
              })}
            >
              Brief
            </span>

            <span
              onClick={() => dispatch(changeContestViewMode(false))}
              className={classNames(styles.btn, {
                [styles.activeBtn]: !isBrief,
              })}
            >
              Offer
            </span>
          </div>

          {isBrief ? (
            <Brief
              contestData={contestData}
              role={role}
              goChat={goChat}
            />
          ) : (
            <div className={styles.offersContainer}>
              {role === CONSTANTS.CREATOR &&
                contestData.status === CONSTANTS.CONTEST_STATUS_ACTIVE && (
                  <OfferForm
                    contestType={contestData.contestType}
                    contestId={contestData.id}
                    customerId={contestData.User.id}
                  />
                )}

              {setOfferStatusError && (
                <Error
                  data={setOfferStatusError.data}
                  status={setOfferStatusError.status}
                  clearError={clearSetOfferStatusError}
                />
              )}

              <div className={styles.offers}>{setOffersList()}</div>
            </div>
          )}
        </div>

        <ContestSideBar
          contestData={contestData}
          totalEntries={offers.length}
        />
      </div>
    );
  };

  return (
    <div>
      {isShowOnFull && (
        <LightBox
          mainSrc={`${CONSTANTS.publicURL}${imagePath}`}
          onCloseRequest={() =>
            dispatch(changeShowImage({ isShowOnFull: false, imagePath: null }))
          }
        />
      )}

      <Header />

      {renderContent()}
    </div>
  );
}

export default ContestPage;
