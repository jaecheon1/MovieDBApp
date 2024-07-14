// src/redux/slices/searchSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const fetchMoviesBySearch = createAsyncThunk(
  'search/fetchMoviesBySearch',
  async (query: string) => {
    const response = await api.get(`/search/movie?query=${query}`);
    return response.data.results;
  }
);

export const fetchActorsBySearch = createAsyncThunk(
  'search/fetchActorsBySearch',
  async (query: string) => {
    const response = await api.get(`/search/person?query=${query}`);
    return response.data.results;
  }
);

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    results: [],
    filter: 'popularity', // 기본 필터값
    favorites: [], // 즐겨찾기 목록
    isLoading: false,
    error: null,
  },
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    toggleFavorite: (state, action) => {
      const movie = action.payload;
      const index = state.favorites.findIndex(fav => fav.id === movie.id);
      if (index >= 0) {
        state.favorites.splice(index, 1); // 이미 즐겨찾기에 있으면 제거
      } else {
        state.favorites.push(movie); // 없으면 추가
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMoviesBySearch.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchMoviesBySearch.fulfilled, (state, action) => {
        state.isLoading = false;
        state.results = action.payload;
      })
      .addCase(fetchMoviesBySearch.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(fetchActorsBySearch.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchActorsBySearch.fulfilled, (state, action) => {
        state.isLoading = false;
        state.results = action.payload;
      })
      .addCase(fetchActorsBySearch.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { setFilter, toggleFavorite } = searchSlice.actions;

export default searchSlice.reducer;
