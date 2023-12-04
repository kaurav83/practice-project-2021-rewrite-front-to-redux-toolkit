import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  getCatalogList,
  removeChatFromCatalog,
} from '../../../../store/slices/chatSlice';
import CatalogList from '../CatalogList/CatalogList';
import DialogList from '../../DialogComponents/DialogList/DialogList';

const CatalogListContainer = () => {
  const dispatch = useDispatch();
  const { id } = useSelector((state) => state.userStore.data);
  const {
    catalogList,
    isShowChatsInCatalog,
    currentCatalog,
    messagesPreview,
  } = useSelector((state) => state.chatStore);

  useEffect(() => {
    dispatch(getCatalogList());
  }, [dispatch]);

  const removeChatFromCatalogCallback = useCallback((event, chatId) => {
    const { _id } = currentCatalog;

    dispatch(removeChatFromCatalog({ chatId, catalogId: _id }));
    event.stopPropagation();
  }, [currentCatalog, dispatch]);

  const getDialogsPreview = () => {
    const { chats } = currentCatalog;
    const dialogsInCatalog = [];

    for (let i = 0; i < messagesPreview.length; i++) {
      for (let j = 0; j < chats.length; j++) {
        if (chats[j] === messagesPreview[i]._id) {
          dialogsInCatalog.push(messagesPreview[i]);
        }
      }
    }
    return dialogsInCatalog;
  };

  return (
    <>
      {isShowChatsInCatalog ? (
        <DialogList
          userId={id}
          preview={getDialogsPreview()}
          removeChat={removeChatFromCatalogCallback}
        />
      ) : (
        <CatalogList catalogList={catalogList} />
      )}
    </>
  );
};

export default CatalogListContainer;
