import React from 'react';
import { Form, Formik } from 'formik';
import { useSelector } from 'react-redux';

import { clearUserError } from '../../store/slices/userSlice';
import { Schems } from '../../utils/validators/validationSchems';

import ImageUpload from '../InputComponents/ImageUpload/ImageUpload';
import FormInput from '../FormInput/FormInput';
import Error from '../Error/Error';
import styles from './UpdateUserInfoForm.module.sass';

const UpdateUserInfoForm = ({ onSubmit }) => {
  const {
    data,
    error
  } = useSelector((state) => state.userStore);
  const initialValues = {
    firstName: data.firstName,
    lastName: data.lastName,
    displayName: data.displayName,
  };

  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={initialValues}
      validationSchema={Schems.UpdateUserSchema}
    >
      <Form className={styles.updateContainer}>
        {error && (
          <Error
            data={error.data}
            status={error.status}
            clearError={clearUserError}
          />
        )}
        
        <div className={styles.container}>
          <span className={styles.label}>First Name</span>

          <FormInput
            name='firstName'
            type='text'
            label='First Name'
            classes={{
              container: styles.inputContainer,
              input: styles.input,
              warning: styles.error,
              notValid: styles.notValid,
            }}
          />
        </div>

        <div className={styles.container}>
          <span className={styles.label}>Last Name</span>

          <FormInput
            name='lastName'
            type='text'
            label='LastName'
            classes={{
              container: styles.inputContainer,
              input: styles.input,
              warning: styles.error,
              notValid: styles.notValid,
            }}
          />
        </div>

        <div className={styles.container}>
          <span className={styles.label}>Display Name</span>

          <FormInput
            name='displayName'
            type='text'
            label='Display Name'
            classes={{
              container: styles.inputContainer,
              input: styles.input,
              warning: styles.error,
              notValid: styles.notValid,
            }}
          />
        </div>

        <ImageUpload
          name='file'
          classes={{
            uploadContainer: styles.imageUploadContainer,
            inputContainer: styles.uploadInputContainer,
            imgStyle: styles.imgStyle,
          }}
        />

        <button type='submit'>
          Submit
        </button>
      </Form>
    </Formik>
  );
};

export default UpdateUserInfoForm;
