import React from "react";
import classNames from "classnames";

import { usePagination, DOTS } from "../../hooks/usePagination";

import styles from "./Pagination.module.sass";

const Pagination = (props) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
    totalPages,
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
    totalPages,
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  const lastPage = paginationRange[paginationRange.length - 1];

  return (
    <ul
      className={classNames(styles.paginationContainer)}
    >
      <li
        className={classNames(styles.paginationItem, {
          [styles.disabled]: currentPage === 1
        })}
        onClick={onPrevious}
      >
        <div>prev</div>
      </li>

      {paginationRange.map((pageNumber, i) => {
        if (pageNumber === DOTS) {
          return (
            <li key={i} className={classNames(styles.paginationItem, styles.dots)}>
              &#8230;
            </li>
          );
        }

        return (
          <li
            key={i}
            className={classNames(styles.paginationItem, {
              [styles.selected]: pageNumber === currentPage
            })}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </li>
        );
      })}

      <li
        className={classNames(styles.paginationItem, {
          [styles.disabled]: currentPage === lastPage
        })}
        onClick={onNext}
      >
        <div>next</div>
      </li>
    </ul>
  );
};

export default Pagination;
