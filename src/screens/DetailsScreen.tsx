// src/screens/DetailsScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Linking, Dimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { fetchMovieDetails, fetchActors, fetchSimilarMovies } from '../redux/slices/movieSlice';
import api from '../services/api';
import Icon from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

const DetailsScreen = ({ route }) => {
  const { movieId } = route.params;
  const dispatch = useDispatch();
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    dispatch(fetchMovieDetails(movieId));
    dispatch(fetchActors(movieId));
    dispatch(fetchSimilarMovies(movieId));
    fetchMovieVideos();
  }, [dispatch, movieId]);

  const fetchMovieVideos = async () => {
    try {
      const response = await api.get(`/movie/${movieId}/videos`);
      setVideos(response.data.results);
    } catch (error) {
      console.error(error);
    }
  };

  const { movieDetails, actors, similarMovies, isLoading } = useSelector((state: RootState) => state.movies);

  if (isLoading || !movieDetails) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  const renderVideoThumbnails = () => {
    return videos.map((video) => (
      <TouchableOpacity key={video.id} onPress={() => Linking.openURL(`https://www.youtube.com/watch?v=${video.key}`)}>
        <View style={styles.videoContainer}>
          <Image
            source={{ uri: `https://img.youtube.com/vi/${video.key}/0.jpg` }}
            style={styles.videoThumbnail}
          />
          <Icon name="logo-youtube" size={30} color="red" style={styles.youtubeIcon} />
        </View>
      </TouchableOpacity>
    ));
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.movieTitle}>{movieDetails.title}</Text>
      </View>
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}` }}
        style={styles.posterImage}
      />
      <View style={styles.infoContainer}>
        <Text style={styles.sectionTitle}>Overview</Text>
        <Text style={styles.overviewText}>{movieDetails.overview}</Text>
        <Text style={styles.sectionTitle}>Actors</Text>
        <ScrollView horizontal>
          {actors.map((actor) => (
            <View key={actor.id} style={styles.actorContainer}>
              <Image
                source={{ uri: `https://image.tmdb.org/t/p/w500${actor.profile_path}` }}
                style={styles.actorImage}
              />
              <Text style={styles.actorName}>{actor.name}</Text>
            </View>
          ))}
        </ScrollView>
        <Text style={styles.sectionTitle}>Videos</Text>
        <ScrollView horizontal>
          {renderVideoThumbnails()}
        </ScrollView>
        <Text style={styles.sectionTitle}>Similar Movies</Text>
        <ScrollView horizontal>
          {similarMovies.map((movie) => (
            <TouchableOpacity key={movie.id} onPress={() => navigation.navigate('Details', { movieId: movie.id })}>
              <View style={styles.movieItem}>
                <Image
                  source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
                  style={styles.similarMovieImage}
                />
                <Text style={styles.similarMovieTitle}>{movie.title}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  loadingText: {
    color: '#fff',
    fontSize: 18,
  },
  titleContainer: {
    backgroundColor: '#000',
    borderColor: 'yellow',
    borderWidth: 1,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  movieTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  posterImage: {
    width: '100%',
    height: width * 1.5,
  },
  infoContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  overviewText: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 20,
  },
  actorContainer: {
    marginRight: 10,
    alignItems: 'center',
  },
  actorImage: {
    width: 60,
    height: 90,
  },
  actorName: {
    color: '#fff',
    fontSize: 12,
    textAlign: 'center',
  },
  videoContainer: {
    marginRight: 10,
    alignItems: 'center',
  },
  videoThumbnail: {
    width: 150,
    height: 100,
  },
  youtubeIcon: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -15 }, { translateY: -15 }],
  },
  movieItem: {
    marginRight: 10,
    alignItems: 'center',
  },
  similarMovieImage: {
    width: 100,
    height: 150,
  },
  similarMovieTitle: {
    color: '#fff',
    fontSize: 12,
    textAlign: 'center',
  },
});

export default DetailsScreen;
