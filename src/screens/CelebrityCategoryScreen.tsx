import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCelebrities } from '../redux/slices/celebritySlice';
import { RootState } from '../redux/store';

const CelebrityCategoryScreen = ({ route, navigation }) => {
  const { category } = route.params;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCelebrities(category));
  }, [dispatch, category]);

  const celebrities = useSelector((state: RootState) => state.celebrities[category]);

  const renderCelebrityItem = ({ item }) => (
    <TouchableOpacity
      key={item.id}
      onPress={() => navigation.navigate('Details', { celebrityId: item.id })}
      style={styles.item}
    >
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${item.profile_path}` }}
        style={styles.image}
      />
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.popularity}>
        Popularity: <Text style={styles.popularityNumber}>{item.popularity}</Text>
      </Text>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={celebrities}
      renderItem={renderCelebrityItem}
      keyExtractor={(item) => item.id.toString()}
      onEndReachedThreshold={0.5}
      onEndReached={() => dispatch(fetchCelebrities(category))}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#000', // 배경색을 일치시킴
  },
  item: {
    flex: 1,
    padding: 10,
    marginBottom: 20,
    alignItems: 'center',
    backgroundColor: '#000',
  },
  image: {
    width: 100,
    height: 150,
    borderRadius: 10,
  },
  name: {
    color: '#fff',
    fontSize: 14,
    marginTop: 5,
    textAlign: 'center',
  },
  popularity: {
    color: '#fff',
    textAlign: 'center',
  },
  popularityNumber: {
    color: 'green',
  },
});

export default CelebrityCategoryScreen;
