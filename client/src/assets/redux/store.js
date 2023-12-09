// store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice/userSlice.js';

const store = configureStore({
  reducer: {
    user: userReducer,
  },
 
});

export default store;
