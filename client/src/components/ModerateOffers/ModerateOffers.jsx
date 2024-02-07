import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setOfferStatus } from '../../store/slices/contestByIdSlice';
import {
  getUsersWithOffers,
  getContestsWithoutPagination,
} from '../../store/slices/usersWithOffersSlice';

import Pagination from '../Pagination/Pagination';
import Offer from './Offer';
import Spinner from '../Spinner/Spinner';
import styles from './ModerateOffers.module.sass';

const ModerateOffers = () => {
  const dispatch = useDispatch();

  const {
    error,
    isFetching,
    offers,
    contests,
  } = useSelector((state) => state.usersWithOffers);

  useEffect(() => {
    dispatch(getUsersWithOffers(1));
    dispatch(getContestsWithoutPagination());
  }, [dispatch]);

  const setOfferStatusContest = async (creatorId, offerId, command, contestId) => {
    const { orderId, priority } = contests.find((contest) => contest.id === contestId);

    const obj = {
      command,
      offerId,
      creatorId,
      orderId,
      priority,
      contestId,
    };
    await dispatch(setOfferStatus(obj));
    await dispatch(getUsersWithOffers(offers.page));
    await dispatch(getContestsWithoutPagination());
  };

  const handleChangePage = (page) => {
    dispatch(getUsersWithOffers(page));
    dispatch(getContestsWithoutPagination());
  }

  if (isFetching) {
    return (
      <div className={styles.moderateSpinner}>
        <Spinner />;
      </div>
    )
  }

  if (!offers) {
    return (
      <p className={styles.alternativeContent}>
        There's no offsers yet.
      </p>
    )
  }

  return (
    <div className={styles.moderateOffers}>
      {!!offers && (
        <div className={styles.tableWrapper}>
          <table>
            <thead>
              <tr>
                <th>OrderId</th>

                <th>Display name</th>

                <th>Email</th>

                <th>Message</th>

                <th>Status</th>

                <th>Set status</th>
              </tr>
            </thead>

            <tbody>
              {offers.formattedData.map((offer) => {
                return (
                  <Offer
                    offer={offer}
                    key={offer.offer_id}
                    setOfferStatus={setOfferStatusContest}
                  />
                )
              })}
            </tbody>
          </table>
        </div>
      )}

      {!!offers && (
        <div className={styles.paginationOffers}>
          <Pagination
            currentPage={offers.page}
            totalCount={offers.totalCount}
            pageSize={offers.itemsPerPage}
            onPageChange={(page) => handleChangePage(page)}
            totalPages={offers.totalPages}
          />
        </div>
      )}
    </div>
  )
};

export default ModerateOffers;
