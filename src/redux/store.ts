import { configureStore } from '@reduxjs/toolkit';
import movieReducer from './slices/movieSlice';
import celebrityReducer from './slices/celebritySlice';
import searchReducer from './slices/searchSlice';

export const store = configureStore({
  reducer: {
    movies: movieReducer,
    celebrities: celebrityReducer,
    search: searchReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
