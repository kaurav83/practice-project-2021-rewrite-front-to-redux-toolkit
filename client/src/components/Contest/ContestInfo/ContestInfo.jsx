import React from 'react';
import { useDispatch } from 'react-redux';

import { CONSTANTS } from '../../../constants';
import { changeEditContest } from '../../../store/slices/contestByIdSlice';

import LogoContestSpecialInfo from './LogoContestSpecialInfo';
import NameContestSpecialInfo from './NameContestSpecialInfo';
import TaglineContestSpecialInfo from './TaglineContestSpecialInfo';
import styles from '../../Brief/Brief.module.sass';

const ContestInfo = props => {
  const dispatch = useDispatch();
  const { userId, contestData, role, goChat } = props;
  const {
    typeOfTagline,
    brandStyle,
    typeOfName,
    styleName,
    contestType,
    title,
    focusOfWork,
    targetCustomer,
    industry,
    originalFileName,
    fileName,
    User,
    status,
  } = contestData;

  const renderSpecialInfo = (() => {
    switch (contestType) {
      case CONSTANTS.NAME_CONTEST:
        return (
          <NameContestSpecialInfo
            typeOfName={typeOfName}
            styleName={styleName}
          />
        )
      case CONSTANTS.TAGLINE_CONTEST:
        return (
          <TaglineContestSpecialInfo
            typeOfTagline={typeOfTagline}
            nameVenture={contestData.nameVenture}
          />
        )
      case CONSTANTS.LOGO_CONTEST:
        return (
          <LogoContestSpecialInfo
            brandStyle={brandStyle}
            nameVenture={contestData.nameVenture}
          />
        )

      default:
        return;
    }
  });

  return (
    <div className={styles.mainContestInfoContainer}>
      <div className={styles.infoContainer}>
        <div className={styles.contestTypeContainer}>
          <div className={styles.dataContainer}>
            <span className={styles.label}>Contest Type</span>

            <span className={styles.data}>{contestType}</span>
          </div>

          {User.id === userId && status !== CONSTANTS.CONTEST_STATUS_FINISHED && (
            <div
              onClick={() => dispatch(changeEditContest(true))}
              className={styles.editBtn}
            >
              Edit
            </div>
          )}

          {role !== CONSTANTS.CUSTOMER && (
            <i onClick={goChat} className='fas fa-comments' />
          )}
        </div>

        <div className={styles.dataContainer}>
          <span className={styles.label}>Title of the Project</span>

          <span className={styles.data}>{title}</span>
        </div>
        
        {renderSpecialInfo()}

        <div className={styles.dataContainer}>
          <span className={styles.label}>
            What is your Business/ Brand about?
          </span>

          <span className={styles.data}>{focusOfWork}</span>
        </div>

        <div className={styles.dataContainer}>
          <span className={styles.label}>
            Description target customers of company{' '}
          </span>

          <span className={styles.data}>{targetCustomer}</span>
        </div>

        <div className={styles.dataContainer}>
          <span className={styles.label}>Industry of company</span>

          <span className={styles.data}>{industry}</span>
        </div>

        {originalFileName && (
          <div className={styles.dataContainer}>
            <span className={styles.label}>Additional File</span>

            <a
              target='_blank'
              className={styles.file}
              href={`${CONSTANTS.publicURL}${fileName}`}
              download={originalFileName}
              rel='noreferrer'
            >
              {originalFileName}
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContestInfo;
