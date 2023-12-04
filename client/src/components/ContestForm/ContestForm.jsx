import React, { useEffect, useCallback } from 'react';
import { Form, Formik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { CONSTANTS } from '../../constants';
import { getDataForContest } from '../../store/slices/dataForContestSlice';
import { Schems } from '../../utils/validators/validationSchems';

import Spinner from '../Spinner/Spinner';
import FormInput from '../FormInput/FormInput';
import SelectInput from '../SelectInput/SelectInput';
import FieldFileInput from '../InputComponents/FieldFileInput/FieldFileInput';
import FormTextArea from '../InputComponents/FormTextArea/FormTextArea';
import TryAgain from '../TryAgain/TryAgain';
import OptionalSelects from '../OptionalSelects/OptionalSelects';
import styles from './ContestForm.module.sass';

const variableOptions = {
  [CONSTANTS.NAME_CONTEST]: {
    styleName: '',
    typeOfName: '',
  },
  [CONSTANTS.LOGO_CONTEST]: {
    nameVenture: '',
    brandStyle: '',
  },
  [CONSTANTS.TAGLINE_CONTEST]: {
    nameVenture: '',
    typeOfTagline: '',
  },
};

const ContestForm = (props) => {
  const {
    handleSubmit,
    formRef,
    defaultData,
    contestType,
  } = props;

  const { isEditContest } = useSelector((state) => state.contestByIdStore);
  const {
    isFetching,
    error,
    data,
  } = useSelector((state) => state.dataForContest);
  const dispatch = useDispatch();

  const getPreference = useCallback(() => {
    switch (contestType) {
      case CONSTANTS.NAME_CONTEST: {
        dispatch(getDataForContest({
          characteristic1: 'nameStyle',
          characteristic2: 'typeOfName',
        }));
        break;
      }
      case CONSTANTS.TAGLINE_CONTEST: {
        dispatch(getDataForContest({ characteristic1: 'typeOfTagline' }));
        break;
      }
      case CONSTANTS.LOGO_CONTEST: {
        dispatch(getDataForContest({ characteristic1: 'brandStyle' }));
        break;
      }

      default:
        dispatch(getDataForContest({
          characteristic1: 'nameStyle',
          characteristic2: 'typeOfName',
        }));
        break;
    }
  }, [contestType, dispatch]);

  useEffect(() => {
    getPreference();
  }, [getPreference]);

  if (error) {
    return <TryAgain getData={getPreference} />;
  }

  if (isFetching) {
    return <Spinner />;
  }

  return (
    <>
      <div className={styles.formContainer}>
        <Formik
          initialValues={{
            title: '',
            industry: '',
            focusOfWork: '',
            targetCustomer: '',
            file: '',
            ...variableOptions[contestType],
            ...defaultData,
          }}
          onSubmit={handleSubmit}
          validationSchema={Schems.ContestSchem(contestType)}
          innerRef={formRef}
          enableReinitialize
        >
          <Form>
            <div className={styles.inputContainer}>
              <span className={styles.inputHeader}>Title of contest</span>

              <FormInput
                name="title"
                type="text"
                label="Title"
                classes={{
                  container: styles.componentInputContainer,
                  input: styles.input,
                  warning: styles.warning,
                }}
              />
            </div>

            <div className={styles.inputContainer}>
              <SelectInput
                name="industry"
                classes={{
                  inputContainer: styles.selectInputContainer,
                  inputHeader: styles.selectHeader,
                  selectInput: styles.select,
                  warning: styles.warning,
                }}
                header="Describe industry associated with your venture"
                optionsArray={data.industry}
              />
            </div>

            <div className={styles.inputContainer}>
              <span className={styles.inputHeader}>
                What does your company / business do?
              </span>

              <FormTextArea
                name="focusOfWork"
                type="text"
                label="e.g. We`re an online lifestyle brand that provides stylish and high quality apparel to the expert eco-conscious shopper"
                classes={{
                  container: styles.componentInputContainer,
                  inputStyle: styles.textArea,
                  warning: styles.warning,
                }}
              />
            </div>

            <div className={styles.inputContainer}>
              <span className={styles.inputHeader}>
                Tell us about your customers
              </span>

              <FormTextArea
                name="targetCustomer"
                type="text"
                label="customers"
                classes={{
                  container: styles.componentInputContainer,
                  inputStyle: styles.textArea,
                  warning: styles.warning,
                }}
              />
            </div>

            <OptionalSelects
              contestType={contestType}
              data={data}
              isFetching={isFetching}
            />

            <FieldFileInput
              name="file"
              classes={{
                fileUploadContainer: styles.fileUploadContainer,
                labelClass: styles.label,
                fileNameClass: styles.fileName,
                fileInput: styles.fileInput,
                warning: styles.warning,
              }}
              type="file"
            />

            {isEditContest ? (
              <button type="submit" className={styles.changeData}>
                Set Data
              </button>
            ) : null}
          </Form>
        </Formik>
      </div>
    </>
  );
}

export default withRouter(ContestForm);
