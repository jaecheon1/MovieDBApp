import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

const MovieSlider = ({ movies }) => {
  const navigation = useNavigation();
  const scrollViewRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    if (!movies || movies.length === 0) return;

    const interval = setInterval(() => {
      setActiveSlide((prev) => {
        const nextIndex = prev + 1 >= movies.length ? 0 : prev + 1;
        scrollViewRef.current.scrollTo({ x: nextIndex * width, animated: true });
        return nextIndex;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [movies]);

  if (!movies || movies.length === 0) {
    return <Text style={styles.noMoviesText}>No movies available</Text>;
  }

  return (
    <View style={styles.sliderContainer}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
      >
        {movies.map((movie, index) => (
          <TouchableOpacity key={movie.id} onPress={() => navigation.navigate('Details', { movieId: movie.id })}>
            <View style={[styles.slide, { width }]}>
              <Image source={{ uri: `https://image.tmdb.org/t/p/w500${movie.backdrop_path}` }} style={styles.image} />
              <View style={styles.info}>
                <Text style={styles.title}>{movie.title}</Text>
                <Text style={styles.popularity}>Popularity: <Text style={styles.popularityNumber}>{movie.popularity}</Text></Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View style={styles.dotsContainer}>
        {movies.map((_, index) => (
          <Text key={`dot-${index}`} style={index === activeSlide ? styles.activeDot : styles.dot}>•</Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sliderContainer: {
    marginVertical: 10,
  },
  slide: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  info: {
    position: 'absolute',
    bottom: 10,
    left: 10,
  },
  title: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  popularity: {
    color: '#fff',
    fontSize: 12,
  },
  popularityNumber: {
    color: 'green',
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  dot: {
    fontSize: 10,
    color: 'white',
    marginHorizontal: 2,
  },
  activeDot: {
    fontSize: 10,
    color: 'green',
    marginHorizontal: 2,
  },
  noMoviesText: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 10,
  },
});

export default MovieSlider;
