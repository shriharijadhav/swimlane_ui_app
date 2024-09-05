import { configureStore } from '@reduxjs/toolkit';
import lanesReducer from './slices/lanesSlice';
import rulesReducer from './slices/rulesSlice';

const store = configureStore({
  reducer: {
    lanes: lanesReducer,
    rules: rulesReducer,
  },
});

export default store;
