import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Formik } from 'formik';

import { sendMessage } from '../../../../store/slices/chatSlice';
import { CONSTANTS } from '../../../../constants';

import FormInput from '../../../FormInput/FormInput';
import { Schems } from '../../../../utils/validators/validationSchems';
import styles from './ChatInput.module.sass';

const ChatInput = () => {
  const dispatch = useDispatch();
  const { interlocutor, chatData } = useSelector((state) => state.chatStore);
  const { id } = useSelector((state) => state.userStore.data);

  const submitHandler = useCallback((values, { resetForm }) => {
    if (values.message.trim()) {
      if (chatData) {
        dispatch(sendMessage({
          messageBody: values.message.trim(),
          recipient: interlocutor.id,
          userId: id,
          interlocutor: interlocutor,
          conversationId: chatData._id,
          participants: chatData.participants,
        }));
      } else {
        dispatch(sendMessage({
          messageBody: values.message.trim(),
          recipient: interlocutor.id,
          userId: id,
          interlocutor: interlocutor,
        }));
      }
    }

    resetForm();
  }, [dispatch, interlocutor, chatData]);

  return (
    <div className={styles.inputContainer}>
      <Formik
        onSubmit={submitHandler}
        initialValues={{ message: '' }}
        validationSchema={Schems.MessageSchema}
      >
        <Form className={styles.form}>
          <FormInput
            name="message"
            type="text"
            label="message"
            classes={{
              container: styles.container,
              input: styles.input,
              notValid: styles.notValid,
            }}
          />

          <button type="submit">
            <img
              src={`${CONSTANTS.STATIC_IMAGES_PATH}send.png`}
              alt="send Message"
            />
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default ChatInput;
