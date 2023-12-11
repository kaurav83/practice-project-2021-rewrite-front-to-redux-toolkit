import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';

import { CONSTANTS } from '../../../../constants';
import {
  changeChatFavorite,
  changeChatBlock,
  changeShowAddChatToCatalogMenu,
} from '../../../../store/slices/chatSlice';

import DialogBox from '../DialogBox/DialogBox';
import styles from './DialogList.module.sass';

const DialogList = ({ preview, userId, removeChat }) => {
  const dispatch = useDispatch();
  const { chatMode } = useSelector((state) => state.chatStore);

  const changeFavorite = useCallback((data, event) => {
    dispatch(changeChatFavorite(data));
    event.stopPropagation();
  }, [dispatch]);

  const changeBlackList = useCallback((data, event) => {
    dispatch(changeChatBlock(data));
    event.stopPropagation();
  }, [dispatch]);

  const changeShowCatalogCreation = useCallback((event, chatId) => {
    dispatch(changeShowAddChatToCatalogMenu(chatId));
    event.stopPropagation();
  }, [dispatch]);

  const onlyFavoriteDialogs = (chatPreview, userId) =>
    chatPreview.favoriteList[chatPreview.participants.indexOf(userId)];

  const onlyBlockDialogs = (chatPreview, userId) =>
    chatPreview.blackList[chatPreview.participants.indexOf(userId)];

  const getTimeStr = useCallback((time) => {
    const currentTime = moment();

    if (currentTime.isSame(time, 'day')) return moment(time).format('HH:mm');
    if (currentTime.isSame(time, 'week')) return moment(time).format('dddd');
    if (currentTime.isSame(time, 'year')) return moment(time).format('MM DD');

    return moment(time).format('MMMM DD, YYYY');
  }, []);

  const renderPreview = (filterFunc) => {
    const arrayList = [];

    preview.forEach((chatPreview, index) => {
      const dialogNode = (
        <DialogBox
          interlocutor={chatPreview.interlocutor}
          chatPreview={chatPreview}
          userId={userId}
          key={index}
          getTimeStr={getTimeStr}
          changeFavorite={changeFavorite}
          changeBlackList={changeBlackList}
          chatMode={chatMode}
          catalogOperation={
            chatMode === CONSTANTS.CATALOG_PREVIEW_CHAT_MODE
              ? removeChat
              : changeShowCatalogCreation
          }
        />
      );

      if (filterFunc && filterFunc(chatPreview, userId)) {
        arrayList.push(dialogNode);
      } else if (!filterFunc) {
        arrayList.push(dialogNode);
      }
    });

    return arrayList.length
      ? arrayList
      : <span className={styles.notFound}>Not found</span>;
  };

  const renderChatPreview = () => {
    if (chatMode === CONSTANTS.FAVORITE_PREVIEW_CHAT_MODE) {
      return renderPreview(onlyFavoriteDialogs);
    }

    if (chatMode === CONSTANTS.BLOCKED_PREVIEW_CHAT_MODE) {
      return renderPreview(onlyBlockDialogs);
    }

    return renderPreview();
  };

  return (
    <div className={styles.previewContainer}>
      {renderChatPreview()}
    </div>
  );
};

export default DialogList;
