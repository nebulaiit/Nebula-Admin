import { configureStore } from '@reduxjs/toolkit'
import courseReducer from './courseSlice';
import toastReducer from '../redux/toastSlice';

export const store = configureStore({
  
   reducer: {
    toast: toastReducer,
    course: courseReducer
  }
})