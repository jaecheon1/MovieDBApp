// src/screens/SearchScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { fetchMoviesBySearch, fetchActorsBySearch } from '../redux/slices/searchSlice';

const SearchScreen = () => {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('movies');
  const dispatch = useDispatch();

  const searchResults = useSelector((state: RootState) => state.search);

  const handleSearch = () => {
    if (category === 'movies') {
      dispatch(fetchMoviesBySearch(query));
    } else {
      dispatch(fetchActorsBySearch(query));
    }
  };

  const renderResultItem = ({ item }) => (
    <TouchableOpacity style={styles.resultItem}>
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path || item.profile_path}` }}
        style={styles.resultImage}
      />
      <Text style={styles.resultText}>{item.title || item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          placeholderTextColor="#aaa"
          value={query}
          onChangeText={setQuery}
        />
        <TouchableOpacity onPress={handleSearch} style={styles.searchButton}>
          <Icon name="search-outline" size={24} color="green" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={searchResults.results}
        renderItem={renderResultItem}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={
          <View style={styles.initialView}>
            <Icon name="search-outline" size={100} color="#fff" />
            <Text style={styles.initialText}>Search Any Movie</Text>
          </View>
        }
        ListFooterComponent={
          <View style={styles.categoryContainer}>
            <TouchableOpacity
              style={[styles.categoryButton, category === 'movies' && styles.categoryButtonActive]}
              onPress={() => setCategory('movies')}
            >
              <Text style={[styles.categoryText, category === 'movies' && styles.categoryTextActive]}>Movies</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.categoryButton, category === 'actors' && styles.categoryButtonActive]}
              onPress={() => setCategory('actors')}
            >
              <Text style={[styles.categoryText, category === 'actors' && styles.categoryTextActive]}>Actors</Text>
            </TouchableOpacity>
          </View>
        }
        contentContainerStyle={styles.resultsContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 10,
  },
  searchBar: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderColor: '#444',
    borderWidth: 1,
    borderRadius: 5,
    color: '#fff',
    paddingHorizontal: 10,
  },
  searchButton: {
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  categoryButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#444',
  },
  categoryButtonActive: {
    backgroundColor: 'green',
  },
  categoryText: {
    color: '#fff',
  },
  categoryTextActive: {
    color: '#000',
  },
  loadingText: {
    color: '#fff',
    textAlign: 'center',
    marginTop: 20,
  },
  resultsContainer: {
    paddingBottom: 20,
  },
  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  resultImage: {
    width: 50,
    height: 75,
    borderRadius: 5,
    marginRight: 10,
  },
  resultText: {
    color: '#fff',
    fontSize: 16,
  },
  initialView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  initialText: {
    color: '#fff',
    fontSize: 18,
    marginTop: 10,
  },
});

export default SearchScreen;
