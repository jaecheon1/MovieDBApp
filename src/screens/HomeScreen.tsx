import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Dimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMoviesByCategory } from '../redux/slices/movieSlice';
import { RootState } from '../redux/store';
import MovieSlider from '../components/MovieSlider';
import Icon from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMoviesByCategory('popular'));
    dispatch(fetchMoviesByCategory('top_rated'));
    dispatch(fetchMoviesByCategory('now_playing'));
    dispatch(fetchMoviesByCategory('upcoming'));
  }, [dispatch]);

  const categories = [
    { title: 'Now Playing', key: 'now_playing' },
    { title: 'Popular', key: 'popular' },
    { title: 'Top Rated', key: 'top_rated' },
    { title: 'Upcoming', key: 'upcoming' },
  ];

  const movies = {
    now_playing: useSelector((state: RootState) => state.movies.now_playing),
    popular: useSelector((state: RootState) => state.movies.popular),
    top_rated: useSelector((state: RootState) => state.movies.top_rated),
    upcoming: useSelector((state: RootState) => state.movies.upcoming),
  };

  const renderTopRatedMovies = (movies) => {
    const pages = [];
    for (let i = 0; i < movies.length; i += 4) {
      pages.push(movies.slice(i, i + 4));
    }

    return (
      <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false}>
        {pages.map((page, pageIndex) => (
          <View key={pageIndex} style={styles.page}>
            {page.map((movie, movieIndex) => (
              <TouchableOpacity key={movieIndex} onPress={() => navigation.navigate('Details', { movieId: movie.id })}>
                <View style={styles.movieItemVertical}>
                  <Image source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }} style={styles.movieImageVertical} />
                  <View style={styles.movieInfoVertical}>
                    <Text style={styles.movieTitleVertical}>{movie.title}</Text>
                    <Text style={styles.moviePopularity}>Popularity: <Text style={styles.moviePopularityNumber}>{movie.popularity}</Text></Text>
                  </View>
                  <Icon name="chevron-forward-outline" size={14} color="#fff" style={styles.arrowIcon} />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </ScrollView>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <MovieSlider movies={movies.now_playing} />

      {categories.map((category) => (
        <View key={category.key} style={styles.category}>
          <View style={styles.categoryHeader}>
            <Text style={styles.categoryTitle}>{category.title}</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Category', { category: category.key })}>
              <Text style={styles.seeAll}>See All <Icon name="chevron-forward-outline" size={16} color="#fff" /></Text>
            </TouchableOpacity>
          </View>
          {category.key === 'top_rated' ? (
            renderTopRatedMovies(movies[category.key])
          ) : (
            <ScrollView horizontal>
              {movies[category.key]?.map((movie) => (
                <TouchableOpacity key={movie.id} onPress={() => navigation.navigate('Details', { movieId: movie.id })}>
                  <View style={styles.movieItem}>
                    <Image source={{ uri: `https://image.tmdb.org/t/p/w500${movie.backdrop_path}` }} style={category.key === 'popular' ? styles.movieImagePopular : styles.movieImage} />
                    <View style={styles.movieInfo}>
                      <Text style={styles.movieTitle}>{movie.title}</Text>
                      <Text style={styles.moviePopularity}>Popularity: <Text style={styles.moviePopularityNumber}>{movie.popularity}</Text></Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#000',
  },
  category: {
    marginTop: 20,
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  seeAll: {
    color: 'green',
    fontSize: 16,
  },
  movieItem: {
    flexDirection: 'column',
    margin: 10,
  },
  movieItemVertical: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    width: width * 0.9,
  },
  movieImage: {
    width: 100,
    height: 150,
  },
  movieImagePopular: {
    width: width * 0.7,
    height: 150,
  },
  movieImageVertical: {
    width: 60,
    height: 90,
  },
  movieInfo: {
    marginTop: 10,
    alignItems: 'center',
  },
  movieInfoVertical: {
    marginLeft: 10,
    width: width * 0.5,
  },
  movieTitle: {
    color: '#fff',
    fontSize: 14,
  },
  movieTitleVertical: {
    color: '#fff',
    fontSize: 12,
    textAlign: 'left',
  },
  moviePopularity: {
    color: '#fff',
    fontSize: 12,
  },
  moviePopularityNumber: {
    color: 'green',
  },
  page: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  partialMovies: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  partialMovieItem: {
    margin: 5,
  },
  partialMovieImage: {
    width: 60,
    height: 90,
  },
  arrowIcon: {
    position: 'absolute',
    right: 0,
  },
});

export default HomeScreen;
