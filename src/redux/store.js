import { configureStore } from '@reduxjs/toolkit';
import lanesReducer from './features/lanesSlice';
 
const store = configureStore({
  reducer: {
    lanes: lanesReducer,
  },
});

export default store;
