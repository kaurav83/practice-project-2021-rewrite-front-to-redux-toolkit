import React, { useState } from 'react';
import classNames from 'classnames';

import Button from '../Button/Button';
import styles from './ButtonGroup.module.sass';

const buttonGroupData = [
  { id: 1, description: 'The Domain should exactly match the name' },
  { id: 2, description: 'But minor variations are allowed (Recommended)' },
  { id: 3, description: 'I am only looking for a name, not a Domain' },
];

const ButtonGroup = () => {
  const [activeId, setActiveId] = useState(2);

  return (
    <ul className={styles.buttonGroupList}>
      {buttonGroupData.map(({ id, description }) => {
        return (
          <li
            className={classNames(styles.groupItem, {
              [styles.groupItemActive]: id === activeId
            })}
            onClick={() => setActiveId(id)}
            key={id}
          >
            <Button
              type="button"
              className={classNames(styles.buttonFromGroup, {
                [styles.buttonActive]: id === activeId
              })}
              text={id === activeId ? 'Yes' : 'No'}
            />

            <p className={styles.buttonGroupText}>
              {description}
            </p>
          </li>
        )
      })}
    </ul>
  )
};

export default ButtonGroup;
