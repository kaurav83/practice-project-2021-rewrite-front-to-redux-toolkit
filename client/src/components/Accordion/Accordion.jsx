import React, { useState } from "react";
import classNames from 'classnames';

import styles from './Accordion.module.sass';

const Accordion = ({ data }) => {
  const [selected, setSelected] = useState(null);

  const toggle = (id) => {
    if (selected === id) {
      return setSelected(null);
    }

    setSelected(id);
  };

  return (
    <ul className={styles.accordion}>
      {data && data.map((item) => (
        <li className={styles.accordionItem} key={item.id}>
          <div
            className={classNames(styles.accordionTitle, {
              [styles.isOpen]: selected === item.id
            })}
            onClick={() => toggle(item.id)}
          >
            <h2 className={styles.title}>
              {item.title}
            </h2>

            <span className={classNames(styles.indicator, 'fas fa-arrow-right small', {
              [styles.isOpen]: selected === item.id
            })} />
          </div>

          <div
            dangerouslySetInnerHTML={{ __html: item.content }}
            className={classNames(styles.content, {
              [styles.show]: selected === item.id
            })}
          />
        </li>
      ))}
    </ul>
  );
};

export default Accordion;
