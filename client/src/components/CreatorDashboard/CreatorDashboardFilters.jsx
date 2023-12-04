import React from 'react';
import { useDispatch } from 'react-redux';
import classNames from 'classnames';
import queryString from 'query-string';

import { setNewCreatorFilter } from '../../store/slices/contestsSlice';

import styles from './CreatorDashboard.module.sass';


const types = [
  '',
  'name,tagline,logo',
  'name',
  'tagline',
  'logo',
  'name,tagline',
  'logo,tagline',
  'name,logo',
];

const CreatorDashboardFilters = (props) => {
  const {
    isFetching,
    creatorFilter,
    dataForContest,
    history,
  } = props;

  const dispatch = useDispatch();

  const parseParamsToUrl = (creatorFilter) => {
    const obj = {};

    Object.keys(creatorFilter).forEach((el) => {
      if (creatorFilter[el]) obj[el] = creatorFilter[el];
    });

    history.push(`/Dashboard?${queryString.stringify(obj)}`);
  };

  const changePredicate = ({ name, value }) => {
    dispatch(setNewCreatorFilter({
      [name]: value === 'Choose industry' ? null : value,
    }));

    parseParamsToUrl({
      ...creatorFilter,
      ...{ [name]: value === 'Choose industry' ? null : value },
    });
  };

  const renderSelectType = () => {
    const array = [];

    types.forEach(
      (el, i) =>
        !i ||
        array.push(
          <option key={i - 1} value={el}>
            {el}
          </option>
        )
    );

    return (
      <select
        onChange={({ target }) =>
          changePredicate({
            name: 'typeIndex',
            value: types.indexOf(target.value),
          })
        }
        value={types[creatorFilter.typeIndex] || ''}
        className={styles.input}
      >
        {array}
      </select>
    );
  };

  const renderIndustryType = () => {
    const array = [];
    const industry = dataForContest.data?.industry;

    if (!industry) {
      return history.push('/');
    }

    array.push(
      <option key={0} value={null}>
        Choose industry
      </option>
    );

    industry.forEach((industry, i) =>
      array.push(
        <option key={i + 1} value={industry}>
          {industry}
        </option>
      )
    );

    return (
      <select
        onChange={({ target }) =>
          changePredicate({
            name: 'industry',
            value: target.value,
          })
        }
        value={creatorFilter.industry || ''}
        className={styles.input}
      >
        {array}
      </select>
    );
  };

  return (
    <div className={styles.filterContainer}>
      <span className={styles.headerFilter}>Filter Results</span>

      <div className={styles.inputsContainer}>
        <div
          onClick={() =>
            changePredicate({
              name: 'ownEntries',
              value: !creatorFilter.ownEntries,
            })
          }
          className={classNames(styles.myEntries, {
            [styles.activeMyEntries]: creatorFilter.ownEntries,
          })}
        >
          My Entries
        </div>

        <div className={styles.inputContainer}>
          <span>By contest type</span>

          {renderSelectType()}
        </div>

        <div className={styles.inputContainer}>
          <span>By contest ID</span>

          <input
            type="text"
            onChange={({ target }) =>
              changePredicate({
                name: 'contestId',
                value: target.value,
              })
            }
            name="contestId"
            value={creatorFilter.contestId}
            className={styles.input}
          />
        </div>

        {!isFetching && (
          <div className={styles.inputContainer}>
            <span>By industry</span>

            {renderIndustryType()}
          </div>
        )}
        <div className={styles.inputContainer}>
          <span>By amount award</span>

          <select
            onChange={({ target }) =>
              changePredicate({
                name: 'awardSort',
                value: target.value,
              })
            }
            value={creatorFilter.awardSort}
            className={styles.input}
          >
            <option value="desc">Descending</option>

            <option value="asc">Ascending</option>
          </select>
        </div>
      </div>
    </div>
  )
};

export default CreatorDashboardFilters;