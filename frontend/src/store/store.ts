import { configureStore } from '@reduxjs/toolkit';
import recommendationReducer from './recommendation-slice';

export const store = configureStore({
  reducer: {
    recommendation: recommendationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;