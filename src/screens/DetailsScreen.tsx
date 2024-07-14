import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Linking, Dimensions, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { fetchMovieDetails, fetchActors, fetchSimilarMovies, toggleFavorite, addRating } from '../redux/slices/movieSlice';
import api from '../services/api';
import Icon from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

const DetailsScreen = ({ route, navigation }) => {
  const { movieId } = route.params;
  const dispatch = useDispatch();
  const [videos, setVideos] = useState([]);
  const [ratingMode, setRatingMode] = useState(false);
  const [selectedRating, setSelectedRating] = useState(0);

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

  const { movieDetails, actors, similarMovies, isLoading, favorites, ratings } = useSelector((state: RootState) => state.movies);

  const isFavorite = favorites.includes(movieId);
  const userRating = ratings[movieId] || movieDetails?.vote_average || 0;

  const handleRateMovie = () => {
    if (selectedRating === 0) {
      Alert.alert("Please select a rating before submitting.");
    } else {
      dispatch(addRating({ movieId, rating: selectedRating }));
      setSelectedRating(0);
      setRatingMode(false);
    }
  };

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

  const renderStars = (rating, setRating = null) => {
    const fullStars = Math.floor(rating / 2);
    const halfStar = rating % 2 >= 1 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;

    return (
      <View style={styles.starContainer}>
        {Array(fullStars).fill().map((_, i) => (
          <TouchableOpacity key={`full-${i}`} onPress={() => setRating && setRating((i + 1) * 2)}>
            <Icon name="star" size={20} color="green" />
          </TouchableOpacity>
        ))}
        {halfStar === 1 && (
          <TouchableOpacity onPress={() => setRating && setRating(fullStars * 2 + 1)}>
            <Icon name="star-half" size={20} color="green" />
          </TouchableOpacity>
        )}
        {Array(emptyStars).fill().map((_, i) => (
          <TouchableOpacity key={`empty-${i}`} onPress={() => setRating && setRating((fullStars + halfStar + i + 1) * 2)}>
            <Icon name="star-outline" size={20} color="green" />
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.movieTitle}>{movieDetails.title}</Text>
      </View>
      <View style={styles.posterContainer}>
        <Image
          source={{ uri: `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}` }}
          style={styles.posterImage}
        />
        <TouchableOpacity
          onPress={() => dispatch(toggleFavorite(movieId))}
          style={styles.bookmarkIcon}>
          <Icon name={isFavorite ? "bookmark" : "bookmark-outline"} size={30} color={isFavorite ? "green" : "white"} />
        </TouchableOpacity>
        <View style={styles.movieInfo}>
          <View style={styles.ratingContainer}>
            {renderStars(userRating)}
            <Text style={styles.voteCount}>({movieDetails.vote_count})</Text>
            {!ratingMode && (
              <TouchableOpacity onPress={() => setRatingMode(true)} style={styles.rateButton}>
                <Text style={styles.rateButtonText}>Rate</Text>
              </TouchableOpacity>
            )}
          </View>
          {ratingMode && (
            <View style={styles.userRatingContainer}>
              {renderStars(selectedRating, setSelectedRating)}
              <TouchableOpacity onPress={handleRateMovie} style={styles.submitButton}>
                <Text style={styles.submitButtonText}>Submit</Text>
              </TouchableOpacity>
            </View>
          )}
          <Text style={styles.releaseDate}>Release date: {movieDetails.release_date}</Text>
          <Text style={styles.country}>Country: {movieDetails.production_countries.map(c => c.name).join(', ')}</Text>
          <Text style={styles.language}>Language: {movieDetails.original_language}</Text>
          <Text style={styles.revenue}>Revenue: {movieDetails.revenue}$</Text>
        </View>
      </View>
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
  posterContainer: {
    flexDirection: 'row',
    marginTop: 10,
    paddingHorizontal: 10,
  },
  posterImage: {
    width: 100,
    height: 150,
    borderRadius: 10,
  },
  bookmarkIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  movieInfo: {
    flex: 1,
    marginLeft: 20,
    justifyContent: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starContainer: {
    flexDirection: 'row',
  },
  voteCount: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 10,
  },
  releaseDate: {
    color: '#fff',
    fontSize: 16,
    marginTop: 5,
  },
  country: {
    color: '#fff',
    fontSize: 16,
    marginTop: 5,
  },
  language: {
    color: '#fff',
    fontSize: 16,
    marginTop: 5,
  },
  revenue: {
    color: '#fff',
    fontSize: 16,
    marginTop: 5,
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
  rateButton: {
    marginLeft: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: 'green',
    borderRadius: 5,
  },
  rateButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  submitButton: {
    marginLeft: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: 'green',
    borderRadius: 5,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  userRatingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
});

export default DetailsScreen;
