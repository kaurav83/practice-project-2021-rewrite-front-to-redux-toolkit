import React, { useRef, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { saveContestToStore } from '../../store/slices/contestCreationSlice';

import NextButton from '../../components/NextButton/NextButton';
import ContestForm from '../../components/ContestForm/ContestForm';
import BackButton from '../../components/BackButton/BackButton';
import ProgressBar from '../../components/ProgressBar/ProgressBar';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import styles from './ContestCreationPage.module.sass';

const ContestCreationPage = (props) => {
  const formRef = useRef();
  const dispatch = useDispatch();
  const { contestCreationStore, bundleStore } = useSelector((state) => state);
  
  useEffect(() => {
    if (!bundleStore.bundle) {
      props.history.replace('/startContest');
    }
  }, [bundleStore.bundle, props]);

  const contestData = contestCreationStore.contests[props.contestType]
    ? contestCreationStore.contests[props.contestType]
    : { contestType: props.contestType };

  const handleSubmit = (values) => {
    dispatch(saveContestToStore({ type: props.contestType, info: values }));

    const route = bundleStore.bundle[props.contestType] === 'payment'
      ? '/payment'
      : `${bundleStore.bundle[props.contestType]}Contest`;

    props.history.push(route);
  };

  const submitForm = useCallback(() => {
    if (formRef.current) {
      formRef.current.handleSubmit();
    }
  }, []);

  return (
    <div>
      <Header />

      <div className={styles.startContestHeader}>
        <div className={styles.startContestInfo}>
          <h2>{props.title}</h2>

          <span>
            Tell us a bit more about your business as well as your preferences
            so that creatives get a better idea about what you are looking for
          </span>
        </div>

        <ProgressBar currentStep={2} />
      </div>

      <div className={styles.container}>
        <div className={styles.formContainer}>
          <ContestForm
            contestType={props.contestType}
            handleSubmit={handleSubmit}
            formRef={formRef}
            defaultData={contestData}
          />
        </div>
      </div>

      <div className={styles.footerButtonsContainer}>
        <div className={styles.lastContainer}>
          <div className={styles.buttonsContainer}>
            <BackButton />

            <NextButton submit={submitForm} />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ContestCreationPage;
