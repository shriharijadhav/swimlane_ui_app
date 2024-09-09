import { configureStore } from '@reduxjs/toolkit';
import lanesReducer, { persistStateMiddleware } from './features/lanesSlice';
 
const store = configureStore({
  reducer: {
    lanes: lanesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(persistStateMiddleware), // Add the persist middleware
});

export default store;
