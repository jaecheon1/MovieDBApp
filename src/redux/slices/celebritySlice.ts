// src/redux/slices/celebritySlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const fetchCelebrities = createAsyncThunk(
  'celebrities/fetchCelebrities',
  async (category: string) => {
    const response = await api.get(`/person/${category}`);
    return { category, results: response.data.results };
  }
);

const celebritySlice = createSlice({
  name: 'celebrities',
  initialState: {
    popular: [],
    trending: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCelebrities.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCelebrities.fulfilled, (state, action) => {
        state.isLoading = false;
        state[action.payload.category] = action.payload.results;
      })
      .addCase(fetchCelebrities.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default celebritySlice.reducer;
