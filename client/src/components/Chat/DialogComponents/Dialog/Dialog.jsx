import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import className from 'classnames';

import {
  getDialogMessages,
  clearMessageList,
} from '../../../../store/slices/chatSlice';

import ChatHeader from '../../ChatComponents/ChatHeader/ChatHeader';
import ChatInput from '../../ChatComponents/ChatInut/ChatInput';
import styles from './Dialog.module.sass';

const Dialog = ({ userId }) => {
  const dispatch = useDispatch();
  const {
    chatData,
    interlocutor,
    messages,
  } = useSelector((state) => state.chatStore);

  const messagesEnd = useRef();

  useEffect(() => {
    return () => dispatch(clearMessageList());
  }, [dispatch]);

  useEffect(() => {
    scrollToBottom();
    // eslint-disable-next-line
  }, [messagesEnd.current]);

  useEffect(() => {
    dispatch(
      getDialogMessages({ interlocutorId: interlocutor?.id })
    );
  }, [interlocutor?.id, dispatch]);

  const scrollToBottom = () => {
    messagesEnd.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const renderMainDialog = () => {
    const messagesArray = [];
    let currentTime = moment();

    messages.forEach((message, i) => {
      if (!currentTime.isSame(message.createdAt, 'date')) {
        messagesArray.push(
          <div key={message.createdAt} className={styles.date}>
            {moment(message.createdAt).format('MMMM DD, YYYY')}
          </div>
        );

        currentTime = moment(message.createdAt);
      }

      messagesArray.push(
        <div
          key={message._id}
          className={className(
            userId === message.sender ? styles.ownMessage : styles.message
          )}
        >
          <span>{message.body}</span>

          <span className={styles.messageTime}>
            {moment(message.createdAt).format('HH:mm')}
          </span>

          <div ref={messagesEnd} />
        </div>
      );
    });

    return <div className={styles.messageList}>{messagesArray}</div>;
  };

  const blockMessage = () => {
    const { blackList, participants } = chatData;
    const userIndex = participants.indexOf(userId);
    let message;

    if (chatData && blackList[userIndex]) {
      message = 'You block him';
    } else if (chatData && blackList.includes(true)) {
      message = 'He block you';
    }

    return (
      <span className={styles.messageBlock}>
        {message}
      </span>
    );
  };

  return (
    <>
      {interlocutor && <ChatHeader userId={userId} />}

      {renderMainDialog()}

      <div ref={messagesEnd} />

      {chatData && chatData.blackList.includes(true)
        ? blockMessage()
        : <ChatInput />
      }
    </>
  );
}

export default Dialog;
