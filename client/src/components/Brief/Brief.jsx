import React from 'react';
import { withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  updateContest,
  clearContestUpdationStore,
} from '../../store/slices/contestUpdationSlice';

import ContestForm from '../ContestForm/ContestForm';
import ContestInfo from '../Contest/ContestInfo/ContestInfo';
import Error from '../Error/Error';
import styles from './Brief.module.sass';

const Brief = (props) => {
  const dispatch = useDispatch();
  const { isEditContest } = useSelector((state) => state.contestByIdStore);
  const { contestUpdationStore, userStore } = useSelector((state) => state);

  const setNewContestData = (values) => {
    const data = new FormData();
    Object.keys(values).forEach((key) => {
      if (key !== 'file' && values[key]) data.append(key, values[key]);
    });
    if (values.file instanceof File) {
      data.append('file', values.file);
    }
    data.append('contestId', props.contestData.id);

    dispatch(updateContest(data));
  };

  const getContestObjInfo = () => {
    const {
      focusOfWork,
      industry,
      nameVenture,
      styleName,
      targetCustomer,
      title,
      brandStyle,
      typeOfName,
      typeOfTagline,
      originalFileName,
      contestType,
    } = props.contestData;
    const data = {
      focusOfWork,
      industry,
      nameVenture,
      styleName,
      targetCustomer,
      title,
      brandStyle,
      typeOfName,
      typeOfTagline,
      originalFileName,
      contestType,
    };
    const defaultData = {};
    Object.keys(data).forEach((key) => {
      if (data[key]) {
        if (key === 'originalFileName') {
          defaultData.file = { name: data[key] };
        } else {
          defaultData[key] = data[key];
        }
      }
    });

    return defaultData;
  };

  const {
    contestData,
    role,
    goChat,
  } = props;
  const { error } = contestUpdationStore;
  const { id } = userStore.data;

  if (!isEditContest) {
    return (
      <ContestInfo
        userId={id}
        contestData={contestData}
        role={role}
        goChat={goChat}
      />
    );
  }

  return (
    <div className={styles.contestForm}>
      {error && (
        <Error
          data={error.data}
          status={error.status}
          clearError={clearContestUpdationStore}
        />
      )}
      <ContestForm
        contestType={contestData.contestType}
        defaultData={getContestObjInfo()}
        handleSubmit={setNewContestData}
      />
    </div>
  );
};

export default withRouter(Brief);
