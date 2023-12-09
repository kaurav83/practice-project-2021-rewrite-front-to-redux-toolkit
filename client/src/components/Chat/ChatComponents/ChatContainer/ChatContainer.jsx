import React, { Suspense } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';

import { changeChatShow } from '../../../../store/slices/chatSlice';

import { ChatLazy } from '../Chat/Chat.lazy';
import Spinner from '../../../Spinner/Spinner';
import styles from '../Chat/Chat.module.sass';

const ChatContainer = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.userStore);
  const { isShow } = useSelector((state) => state.chatStore);
  
  return (
    <>
      {data
        ? (
          <div className={classNames(styles.chatContainer, {
            [styles.showChat]: isShow,
          })}>
            <Suspense fallback={<Spinner />}>
              <ChatLazy />
            </Suspense>

            <div className={styles.toggleChat} onClick={() => dispatch(changeChatShow())}>
              {isShow ? 'Hide Chat' : 'Show Chat'}
            </div>
          </div>
        )
        : null}
    </>
  );
};

export default ChatContainer;
