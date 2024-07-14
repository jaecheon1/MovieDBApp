import { configureStore } from '@reduxjs/toolkit';
import movieReducer from './slices/movieSlice';
import celebrityReducer from './slices/celebritySlice';

export const store = configureStore({
  reducer: {
    movies: movieReducer,
    celebrities: celebrityReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
