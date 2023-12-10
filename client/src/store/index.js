import { configureStore } from '@reduxjs/toolkit';

import { createReducerManager } from './createReducerManager';

import { initSocket } from '../api/ws/socketController';
import authReducer from './slices/authSlice';
import userReducer from './slices/userSlice';
import dataForContestReducer from './slices/dataForContestSlice';
import paymentReducer from './slices/paymentSlice';
import contestsReducer from './slices/contestsSlice';
import contestCreationReducer from './slices/contestCreationSlice';
import bundleReducer from './slices/bundleSlice';
import contestByIdReducer from './slices/contestByIdSlice';
import contestUpdationReducer from './slices/contestUpdationSlice';
import chatReducer from './slices/chatSlice';

export const createReduxStore = (initialState, asyncReducers) => {
  const rootReducers = {
    ...asyncReducers,
    userStore: userReducer,
    auth: authReducer,
    dataForContest: dataForContestReducer,
    payment: paymentReducer,
    contestByIdStore: contestByIdReducer,
    contestsList: contestsReducer,
    contestCreationStore: contestCreationReducer,
    bundleStore: bundleReducer,
    contestUpdationStore: contestUpdationReducer,
    chatStore: chatReducer,
  };

  const reducerManager = createReducerManager(rootReducers);

  const store = configureStore({
    reducer: reducerManager.reduce,
    devTools: 'development',
    preloadedState: initialState,
  });

  store.reducerManager = reducerManager;

  initSocket(store);

  return store;
};
