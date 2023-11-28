import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import className from 'classnames';

import {
  getDialogMessages,
  clearMessageList,
} from '../../../../store/slices/chatSlice';

import ChatHeader from '../../ChatComponents/ChatHeader/ChatHeader';
import ChatInput from '../../ChatComponents/ChatInut/ChatInput';
import styles from './Dialog.module.sass';

const Dialog = (props) => {
  const { chatData, userId } = props;

  const messagesEnd = useRef();

  useEffect(() => {
    return () => props.clearMessageList();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messagesEnd.current]);

  useEffect(() => {
    props.getDialog({ interlocutorId: props.interlocutor.id });
  }, [props.interlocutor.id]);

  const scrollToBottom = () => {
    messagesEnd.current.scrollIntoView({ behavior: 'smooth' });
  };

  const renderMainDialog = () => {
    const messagesArray = [];
    const { messages, userId } = props;
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
    const { userId, chatData } = props;
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
      <ChatHeader userId={userId} />

      {renderMainDialog()}

      <div ref={messagesEnd} />

      {chatData && chatData.blackList.includes(true)
        ? blockMessage()
        : <ChatInput />
      }
    </>
  );
}

const mapStateToProps = (state) => state.chatStore;

const mapDispatchToProps = (dispatch) => ({
  getDialog: (data) => dispatch(getDialogMessages(data)),
  clearMessageList: () => dispatch(clearMessageList()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dialog);
