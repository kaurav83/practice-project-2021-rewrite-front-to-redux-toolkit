import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { CONSTANTS } from '../../constants';
import { updateBundle } from '../../store/slices/bundleSlice';

import BundleBox from '../../components/BundleBox/BundleBox';
import Footer from '../../components/Footer/Footer';
import ProgressBar from '../../components/ProgressBar/ProgressBar';
import Header from '../../components/Header/Header';
import ButtonGroup from '../../components/ButtonGroup/ButtonGroup';
import styles from './StartContestPage.module.sass';

const StartContestPage = props => {
  const dispatch = useDispatch();
  const userStore = useSelector((state) => state.userStore);

  useEffect(() => {
    if (userStore.data?.role !== CONSTANTS.CUSTOMER) {
      props.history.replace('/');
    }
  }, [userStore, props]);

  const setBundle = useCallback((bundleStr) => {
    const array = bundleStr.toLowerCase().split('+');
    const bundleList = {};
    bundleList.first = array[0];

    for (let i = 0; i < array.length; i++) {
      bundleList[array[i]] = i === array.length - 1 ? 'payment' : array[i + 1];
    }
    
    dispatch(updateBundle(bundleList));
    props.history.push(`/startContest/${bundleList.first}Contest`);
  }, [dispatch, props]);

  return (
    <div>
      <Header />
      <div className={styles.startContestHeader}>
        <div className={styles.startContestInfo}>
          <h2>START A CONTEST</h2>
          
          <span>
            Launching a contest on Squadhelp is very simple. Select the type of
            contest you would like to launch from the list below. Provide a
            detailed brief and select a pricing package. Begin receiving
            submissions instantly!
          </span>
        </div>

        <ProgressBar currentStep={1} />
      </div>
      
      <div className={styles.baseBundleContainer}>
        <div className={styles.infoBaseBundles}>
          <span className={styles.headerInfo}>
            Our Most Popular
            <span>Categories</span>
          </span>

          <span className={styles.info}>
            Pick from our most popular categories, launch a contest and begin
            receiving submissions right away
          </span>

          <hr />
        </div>

        <div className={styles.baseBundles}>
          <BundleBox
            path={['Name.png']}
            header='Name'
            describe='Get up and running with the perfect name.'
            setBundle={setBundle}
          />

          <BundleBox
            path={['Logo.png']}
            header='Logo'
            describe='Kickstart your venture with a unique, memorable logo.'
            setBundle={setBundle}
          />

          <BundleBox
            path={['Tagline.png']}
            header='Tagline'
            describe='Connect deeply with your target audience with an on-target tagline.'
            setBundle={setBundle}
          />
        </div>
      </div>

      <div className={styles.combinedBundles}>
        <div className={styles.infoCombinedBundles}>
          <span className={styles.headerInfo}>
            Save With Our Bundle Packages
          </span>

          <span className={styles.info}>
            Launch multiple contests and pay a discounted bundle price
          </span>

          <hr />
        </div>

        <div className={styles.baseBundles}>
          <BundleBox
            path={['Name.png', 'Logo.png']}
            header='Name+Logo'
            describe='Get the essentials needed to establish your brand together and save.'
            setBundle={setBundle}
          />

          <BundleBox
            path={['Name.png', 'Tagline.png']}
            header='Name+Tagline'
            describe='Communicate your vision with the perfect Name/Tagline combo.'
            setBundle={setBundle}
          />

          <BundleBox
            path={['Logo.png', 'Tagline.png']}
            header='Tagline+Logo'
            describe='Description for Logo + Tagline will come here.'
            setBundle={setBundle}
          />

          <BundleBox
            path={['Name.png', 'Logo.png', 'Tagline.png']}
            header='Name+Tagline+Logo'
            describe='Establish your entire brand identity and save with this bundle.'
            setBundle={setBundle}
          />
        </div>
      </div>

      <div className={styles.buttonGroup}>
        <ButtonGroup />
      </div>

      <Footer />
    </div>
  );
};

export default StartContestPage;
