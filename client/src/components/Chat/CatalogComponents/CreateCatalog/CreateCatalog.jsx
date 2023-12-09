import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form } from 'formik';

import { createCatalog } from '../../../../store/slices/chatSlice';
import { Schems } from '../../../../utils/validators/validationSchems';

import FormInput from '../../../FormInput/FormInput';
import styles from './CreateCatalog.module.sass';

const CreateCatalog = (props) => {
  const dispatch = useDispatch();
  const { addChatId } = useSelector((state) => state.chatStore);

  const click = (values) => {
    dispatch(createCatalog({
      catalogName: values.catalogName,
      chatId: addChatId
    }));
  };

  return (
    <Formik
      onSubmit={click}
      initialValues={{ catalogName: '' }}
      validationSchema={Schems.CatalogSchema}
    >
      <Form className={styles.form}>
        <FormInput
          name="catalogName"
          type="text"
          label="name of catalog"
          classes={{
            container: styles.inputContainer,
            input: styles.input,
            warning: styles.fieldWarning,
            notValid: styles.notValid,
          }}
        />

        <button type="submit">Create Catalog</button>
      </Form>
    </Formik>
  );
};

export default CreateCatalog;
