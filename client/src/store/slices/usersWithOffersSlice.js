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
  contests: null,
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


// -------- getContestsWithoutPagination
export const getContestsWithoutPagination = decorateAsyncThunk({
  key: `${USERS_WITH_OFFERS_SLICE_NAME}/getContests`,
  thunk: async payload => {
    const { data } = await restController.getContestsWithoutPagination(payload);

    return data;
  }
});

const getContestsWithoutPaginationExtraReducers = createExtraReducers({
  thunk: getContestsWithoutPagination,
  pendingReducer: state => {
    state.contests = null;
    state.isFetching = true;
    state.error = null;
  },
  fulfilledReducer: (state, { payload }) => {
    state.contests = payload;
    state.isFetching = false;
    state.error = null;
  },
  rejectedReducer,
})

const extraReducers = builder => {
  getUsersWithOffersExtraReducers(builder);
  getContestsWithoutPaginationExtraReducers(builder);
};

const usersWithOffersSlice = createSlice({
  name: USERS_WITH_OFFERS_SLICE_NAME,
  initialState,
  // reducers,
  extraReducers,
});

const { reducer } = usersWithOffersSlice;

export default reducer;
