import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { searchMovies } from '../redux/slices/movieSlice';
import { RootState } from '../redux/store';

const SearchScreen = ({ navigation }) => {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();
  const searchResults = useSelector((state: RootState) => state.movies.searchResults);
  const status = useSelector((state: RootState) => state.movies.status);

  const handleSearch = () => {
    dispatch(searchMovies(query));
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search Movies"
        placeholderTextColor="#888"
        value={query}
        onChangeText={setQuery}
        onSubmitEditing={handleSearch}
      />
      {status === 'loading' ? (
        <Text style={styles.text}>Loading...</Text>
      ) : (
        <FlatList
          data={searchResults}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => navigation.navigate('Details', { movieId: item.id })}>
              <View style={styles.movieContainer}>
                <Text style={styles.movieTitle}>{item.title}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
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
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 8,
    color: '#fff',
  },
  text: {
    fontSize: 18,
    color: '#fff',
  },
  movieContainer: {
    padding: 10,
    borderBottomColor: '#333',
    borderBottomWidth: 1,
  },
  movieTitle: {
    color: '#fff',
    fontSize: 16,
  },
});

export default SearchScreen;
