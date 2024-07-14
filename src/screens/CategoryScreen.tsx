// src/screens/CategoryScreen.tsx
import React, { useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMoviesByCategory } from '../redux/slices/movieSlice';
import { RootState } from '../redux/store';

const CategoryScreen = ({ route, navigation }) => {
  const { category } = route.params;
  const dispatch = useDispatch();
  const movies = useSelector((state: RootState) => state.movies[category]);
  const status = useSelector((state: RootState) => state.movies.status);

  useEffect(() => {
    dispatch(fetchMoviesByCategory(category));
  }, [dispatch, category]);

  if (status === 'loading') {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    );
  }

  if (!movies || movies.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No movies available in this category.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={movies.slice(0, 20)} // 20개만 가져오기
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('Details', { movieId: item.id })}>
            <View style={styles.movieItem}>
              <Image source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }} style={styles.image} />
              <Text style={styles.movieTitle}>{item.title}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#000', // 배경색을 검은색으로 설정
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: '#fff',
    fontSize: 16,
  },
  movieItem: {
    margin: 10,
    flexDirection: 'row',
  },
  image: {
    width: 100,
    height: 150,
    borderRadius: 10,
  },
  movieTitle: {
    color: '#fff',
    textAlign: 'center',
    marginTop: 5,
    marginLeft: 10,
  },
});

export default CategoryScreen;
