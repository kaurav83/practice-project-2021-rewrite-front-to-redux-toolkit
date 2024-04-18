import { createSlice } from '@reduxjs/toolkit';

import * as restController from '../../api/rest/restController';
import {
  decorateAsyncThunk,
  rejectedReducer,
  createExtraReducers,
} from '../../utils/store';

const USERS_WITH_OFFERS_SLICE_NAME = 'getUsersWithOffers';

const initialState = {
  isFetching: true,
  error: null,
  offers: null,
};

//---------- getUsersWithOffers
export const getUsersWithOffers = decorateAsyncThunk({
  key: `${USERS_WITH_OFFERS_SLICE_NAME}/getOffers`,
  thunk: async payload => {
    const { data } = await restController.getUsersWithOffers(payload);

    return data;
  },
});

const getUsersWithOffersExtraReducers = createExtraReducers({
  thunk: getUsersWithOffers,
  pendingReducer: state => {
    state.isFetching = true;
    state.error = null;
    state.offers = null;
  },
  fulfilledReducer: (state, { payload }) => {
    state.isFetching = false;
    state.error = null;
    state.offers = payload;
  },
  rejectedReducer,
});

// -------- setStatusOfferModeration
export const setStatusOfferModeration = decorateAsyncThunk({
  key: `${USERS_WITH_OFFERS_SLICE_NAME}/changeStatusModeration`,
  thunk: async payload => {
    const { data } = await restController.changeStatusOfferByModerator(payload);

    return data;
  }
});

const setStatusOfferModerationExtraReducers = createExtraReducers({
  thunk: setStatusOfferModeration,
  fulfilledReducer: (state, { payload }) => {
    state.offers.formattedData.forEach((offer) => {
      if (offer.offer_id === payload.offerId) {
        offer.approved = payload.command;
      }
    });
    state.isFetching = false;
    state.error = null;
  },
  rejectedReducer,
});

const extraReducers = builder => {
  getUsersWithOffersExtraReducers(builder);
  setStatusOfferModerationExtraReducers(builder);
};

const usersWithOffersSlice = createSlice({
  name: USERS_WITH_OFFERS_SLICE_NAME,
  initialState,
  // reducers,
  extraReducers,
});

const { reducer } = usersWithOffersSlice;

export default reducer;
