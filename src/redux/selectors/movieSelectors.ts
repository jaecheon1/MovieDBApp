// src/redux/selectors/movieSelectors.ts
import { createSelector } from 'reselect';
import { RootState } from '../store';

const selectMoviesState = (state: RootState) => state.movies;

export const selectNowPlayingMovies = createSelector(
  [selectMoviesState],
  (moviesState) => moviesState.nowPlaying || []
);

export const selectPopularMovies = createSelector(
  [selectMoviesState],
  (moviesState) => moviesState.popular || []
);

export const selectTopRatedMovies = createSelector(
  [selectMoviesState],
  (moviesState) => moviesState.topRated || []
);

export const selectUpcomingMovies = createSelector(
  [selectMoviesState],
  (moviesState) => moviesState.upcoming || []
);

export const selectMoviesStatus = createSelector(
  [selectMoviesState],
  (moviesState) => moviesState.status
);
