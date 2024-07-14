import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMoviesByCategory } from '../redux/slices/movieSlice';
import { RootState } from '../redux/store';
import MovieSlider from '../components/MovieSlider';

const FilterScreen = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMoviesByCategory('popular'));
    dispatch(fetchMoviesByCategory('top_rated'));
    dispatch(fetchMoviesByCategory('upcoming'));
  }, [dispatch]);

  const movies = {
    popular: useSelector((state: RootState) => state.movies.popular),
    top_rated: useSelector((state: RootState) => state.movies.top_rated),
    upcoming: useSelector((state: RootState) => state.movies.upcoming),
    favorites: useSelector((state: RootState) => {
      const { favorites, popular, top_rated, upcoming } = state.movies;
      return favorites.map(id => (
        popular.find(movie => movie.id === id) ||
        top_rated.find(movie => movie.id === id) ||
        upcoming.find(movie => movie.id === id)
      )).filter(movie => movie !== undefined);
    }),
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.category}>
        <Text style={styles.categoryTitle}>Popular</Text>
        <MovieSlider movies={movies.popular.slice(0, 20)} />
      </View>
      <View style={styles.category}>
        <Text style={styles.categoryTitle}>Top Rated</Text>
        <MovieSlider movies={movies.top_rated.slice(0, 20)} />
      </View>
      <View style={styles.category}>
        <Text style={styles.categoryTitle}>New Releases</Text>
        <MovieSlider movies={movies.upcoming.slice(0, 20)} />
      </View>
      <View style={styles.category}>
        <Text style={styles.categoryTitle}>Favorites</Text>
        <MovieSlider movies={movies.favorites} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  category: {
    marginVertical: 10,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 10,
    marginBottom: 10,
  },
});

export default FilterScreen;
