// src/redux/actions/movieActions.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchMovies = createAsyncThunk('movies/fetchMovies', async () => {
  const response = await axios.get('https://api.themoviedb.org/3/movie/popular?api_key=d8e0e613fcbf81cf57bfce1baf6bd90c');
  return response.data.results;
});
