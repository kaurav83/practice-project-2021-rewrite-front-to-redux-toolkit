import React from 'react';
import { useDispatch } from 'react-redux';
import classNames from 'classnames';

import { CONSTANTS } from '../../../../constants';
import { goToExpandedDialog } from '../../../../store/slices/chatSlice';

import styles from './DialogBox.module.sass';

const DialogBox = props => {
  const dispatch = useDispatch();
  const {
    chatPreview,
    userId,
    getTimeStr,
    changeFavorite,
    changeBlackList,
    catalogOperation,
    chatMode,
    interlocutor,
  } = props;

  const {
    favoriteList,
    participants,
    blackList,
    _id,
    text,
    createAt,
  } = chatPreview;

  const isFavorite = favoriteList[participants.indexOf(userId)];
  const isBlocked = blackList[participants.indexOf(userId)];

  return (
    <div
      className={styles.previewChatBox}
      onClick={() =>
        dispatch(goToExpandedDialog({
          interlocutor,
          conversationData: {
            participants,
            _id,
            blackList,
            favoriteList,
          },
        }))
      }
    >
      {interlocutor && (
        <img
          src={
            interlocutor.avatar === 'anon.png'
              ? CONSTANTS.ANONYM_IMAGE_PATH
              : `${CONSTANTS.publicURL}${interlocutor.avatar}`
          }
          alt='user'
        />
      )}

      <div className={styles.infoContainer}>
        <div className={styles.interlocutorInfo}>
          {interlocutor && (
            <span className={styles.interlocutorName}>
              {interlocutor.firstName}
            </span>
          )}

          <span className={styles.interlocutorMessage}>{text}</span>
        </div>
        
        <div className={styles.buttonsContainer}>
          <span className={styles.time}>{getTimeStr(createAt)}</span>

          <i
            onClick={event =>
              changeFavorite(
                {
                  conversationId: _id,
                  participants,
                  favoriteFlag: !isFavorite,
                },
                event
              )
            }
            className={classNames({
              'far fa-heart': !isFavorite,
              'fas fa-heart': isFavorite,
            })}
          />

          <i
            onClick={event =>
              changeBlackList(
                event,
                {
                  conversationId: _id,
                  participants,
                  blackListFlag: !isBlocked,
                }
              )
            }
            className={classNames({
              'fas fa-user-lock': !isBlocked,
              'fas fa-unlock': isBlocked,
            })}
          />

          <i
            onClick={event => catalogOperation(event, _id)}
            className={classNames({
              'far fa-plus-square':
                chatMode !== CONSTANTS.CATALOG_PREVIEW_CHAT_MODE,
              'fas fa-minus-circle':
                chatMode === CONSTANTS.CATALOG_PREVIEW_CHAT_MODE,
            })}
          />
        </div>
      </div>
    </div>
  );
};

export default DialogBox;
