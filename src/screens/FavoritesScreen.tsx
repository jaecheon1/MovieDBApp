// src/screens/FavoritesScreen.tsx
import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const FavoritesScreen = ({ navigation }) => {
  const favorites = useSelector((state: RootState) => state.movies.favorites);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favorites</Text>
      <FlatList
        data={favorites}
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
    backgroundColor: '#000',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
  },
  movieItem: {
    margin: 10,
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
  },
});

export default FavoritesScreen;
