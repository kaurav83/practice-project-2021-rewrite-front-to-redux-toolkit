import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  getUsersWithOffers,
  setStatusOfferModeration,
} from '../../store/slices/usersWithOffersSlice';

import Pagination from '../Pagination/Pagination';
import Offer from './Offer';
import Spinner from '../Spinner/Spinner';
import styles from './ModerateOffers.module.sass';

const ModerateOffers = () => {
  const dispatch = useDispatch();

  const {
    isFetching,
    offers,
  } = useSelector((state) => state.usersWithOffers);

  useEffect(() => {
    dispatch(getUsersWithOffers(1));
  }, [dispatch]);

  const setStatusModeration = async (offerId, command, email) => {
    const obj = {
      command,
      offerId,
      email,
    };

    await dispatch(setStatusOfferModeration(obj));
    await dispatch(getUsersWithOffers(offers.page));
  };

  const handleChangePage = (page) => {
    dispatch(getUsersWithOffers(page));
  }

  if (isFetching) {
    return (
      <div className={styles.moderateSpinner}>
        <Spinner />;
      </div>
    )
  }

  if (!offers || !offers.formattedData.length) {
    return (
      <p className={styles.alternativeContent}>
        There's no offsers yet.
      </p>
    )
  }

  return (
    <div className={styles.moderateOffers}>
      <div className={styles.tableWrapper}>
        <table>
          <thead>
            <tr>
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
                  setOfferModeration={setStatusModeration}
                />
              )
            })}
          </tbody>
        </table>
      </div>

      <div className={styles.paginationOffers}>
        <Pagination
          currentPage={+offers.page}
          totalCount={offers.totalCount}
          pageSize={offers.itemsPerPage}
          onPageChange={(page) => handleChangePage(page)}
          totalPages={offers.totalPages}
        />
      </div>
    </div>
  )
};

export default ModerateOffers;
