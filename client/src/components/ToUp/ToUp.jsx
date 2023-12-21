import React, { useState, useEffect } from "react";
import classNames from 'classnames';

import styles from './ToUp.module.sass';

const ToUp = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 0) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <>
      {isVisible && (
        <span className={styles.toUp} onClick={scrollToTop}>
          <span className={classNames(styles.arrow, 'fas fa-arrow-up')} />
        </span>
      )}
    </>
  );
};

export default ToUp;
