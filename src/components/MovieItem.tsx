import React from 'react';
import { TouchableOpacity, Text, Image, StyleSheet, View } from 'react-native';

const MovieItem = React.memo(({ movie, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title}>{movie.title}</Text>
      </View>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  image: {
    width: 50,
    height: 75,
    marginRight: 10,
  },
  info: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 18,
    flexShrink: 1,
  },
});

export default MovieItem;
