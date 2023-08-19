import { configureStore } from '@reduxjs/toolkit';
import moviesDataReducer from './reducer';

const store = configureStore({
  reducer: {
    data: moviesDataReducer, 
  },
});

export default store;