import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { getPreviewChat } from '../../../../store/slices/chatSlice';

import DialogList from '../DialogList/DialogList';

const DialogListContainer = (props) => {
  const { messagesPreview, userId } = props;

  useEffect(() => {
    // props.getChatPreview();
  }, []);


  return (
    <DialogList preview={messagesPreview} userId={userId} />
  );
};

const mapStateToProps = (state) => state.chatStore;

const mapDispatchToProps = (dispatch) => ({
  getChatPreview: () => dispatch(getPreviewChat()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DialogListContainer);
