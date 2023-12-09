import React, { useEffect, useCallback } from 'react';

import Spinner from '../Spinner/Spinner';
import styles from './ContestContainer.module.sass';

const ContestsContainer = (props) => {
  const {
    haveMore,
    loadMore,
    children,
    isFetching,
  } = props;

  const scrollHandler = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      if (haveMore) {
        loadMore(children.length);
      }
    }
  }, [children, haveMore, loadMore]);

  useEffect(() => {
    window.addEventListener('scroll', scrollHandler);

    return () => window.removeEventListener('scroll', scrollHandler);
  }, [isFetching, scrollHandler]);

  if (!isFetching && children && children.length === 0) {
    return <div className={styles.notFound}>Nothing not found</div>;
  }

  return (
    <div>
      {children}

      {isFetching && (
        <div className={styles.spinnerContainer}>
          <Spinner />
        </div>
      )}
    </div>
  );
}

export default ContestsContainer;
