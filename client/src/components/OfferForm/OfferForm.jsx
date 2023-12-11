import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form } from 'formik';

import { Schems } from '../../utils/validators/validationSchems';
import { CONSTANTS } from '../../constants';
import {
  addOffer,
  clearAddOfferError,
} from '../../store/slices/contestByIdSlice';

import ImageUpload from '../InputComponents/ImageUpload/ImageUpload';
import FormInput from '../FormInput/FormInput';
import Error from '../Error/Error';
import styles from './OfferForm.module.sass';

const OfferForm = props => {
  const dispatch = useDispatch();
  const { addOfferError } = useSelector((state) => state.contestByIdStore);

  const renderOfferInput = () => {
    if (props.contestType === CONSTANTS.LOGO_CONTEST) {
      return (
        <ImageUpload
          name='offerData'
          classes={{
            uploadContainer: styles.imageUploadContainer,
            inputContainer: styles.uploadInputContainer,
            imgStyle: styles.imgStyle,
          }}
        />
      );
    }

    return (
      <FormInput
        name='offerData'
        classes={{
          container: styles.inputContainer,
          input: styles.input,
          warning: styles.fieldWarning,
          notValid: styles.notValid,
        }}
        type='text'
        label='your suggestion'
      />
    );
  };

  const setOffer = useCallback((values, { resetForm }) => {
    dispatch(clearAddOfferError());

    const data = new FormData();
    const { contestId, contestType, customerId } = props;

    data.append('contestId', contestId);
    data.append('contestType', contestType);
    data.append('offerData', values.offerData);
    data.append('customerId', customerId);

    dispatch(addOffer(data));
    resetForm();
  }, [dispatch, props]);

  const validationSchema =
    props.contestType === CONSTANTS.LOGO_CONTEST
      ? Schems.LogoOfferSchema
      : Schems.TextOfferSchema;

  return (
    <div className={styles.offerContainer}>
      {addOfferError && (
        <Error
          data={addOfferError.data}
          status={addOfferError.status}
          clearError={clearAddOfferError}
        />
      )}

      <Formik
        onSubmit={setOffer}
        initialValues={{
          offerData: '',
        }}
        validationSchema={validationSchema}
      >
        <Form className={styles.form}>
          {renderOfferInput()}

          <button type='submit' className={styles.btnOffer}>
            Send Offer
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default OfferForm;
