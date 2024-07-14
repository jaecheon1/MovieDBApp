import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '../../services/api';

export const fetchMovieDetails = createAsyncThunk(
  'movies/fetchMovieDetails',
  async (movieId: number) => {
    const response = await api.get(`/movie/${movieId}`);
    return response.data;
  }
);

export const fetchSimilarMovies = createAsyncThunk(
  'movies/fetchSimilarMovies',
  async (movieId: number) => {
    const response = await api.get(`/movie/${movieId}/similar`);
    return response.data.results;
  }
);

export const fetchActors = createAsyncThunk(
  'movies/fetchActors',
  async (movieId: number) => {
    const response = await api.get(`/movie/${movieId}/credits`);
    return response.data.cast;
  }
);

export const fetchMoviesByCategory = createAsyncThunk(
  'movies/fetchMoviesByCategory',
  async (category: string) => {
    const response = await api.get(`/movie/${category}`);
    return { category, results: response.data.results };
  }
);

const movieSlice = createSlice({
  name: 'movies',
  initialState: {
    movieDetails: null,
    similarMovies: [],
    actors: [],
    popular: [],
    top_rated: [],
    now_playing: [],
    upcoming: [],
    favorites: [],
    isLoading: false,
    error: null,
    ratings: {},
  },
  reducers: {
    toggleFavorite: (state, action: PayloadAction<number>) => {
      const movieId = action.payload;
      if (state.favorites.includes(movieId)) {
        state.favorites = state.favorites.filter(id => id !== movieId);
      } else {
        state.favorites.push(movieId);
      }
    },
    addRating: (state, action: PayloadAction<{ movieId: number, rating: number }>) => {
      const { movieId, rating } = action.payload;
      state.ratings[movieId] = rating;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovieDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchMovieDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.movieDetails = action.payload;
      })
      .addCase(fetchMovieDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(fetchSimilarMovies.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchSimilarMovies.fulfilled, (state, action) => {
        state.isLoading = false;
        state.similarMovies = action.payload;
      })
      .addCase(fetchSimilarMovies.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(fetchActors.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchActors.fulfilled, (state, action) => {
        state.isLoading = false;
        state.actors = action.payload;
      })
      .addCase(fetchActors.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(fetchMoviesByCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchMoviesByCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state[action.payload.category] = action.payload.results;
      })
      .addCase(fetchMoviesByCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { toggleFavorite, addRating } = movieSlice.actions;

export default movieSlice.reducer;
