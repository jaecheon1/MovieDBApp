import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCelebrities } from '../redux/slices/celebritySlice';
import { RootState } from '../redux/store';
import Icon from 'react-native-vector-icons/Ionicons';

const CelebritiesScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCelebrities('popular'));
  }, [dispatch]);

  const celebrities = useSelector((state: RootState) => state.celebrities.popular);

  const renderPopularCelebrities = ({ item }) => (
    <TouchableOpacity
      key={item.id}
      onPress={() => navigation.navigate('Details', { celebrityId: item.id })}
      style={styles.popularItem}
    >
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${item.profile_path}` }}
        style={styles.popularImage}
      />
      <Text style={styles.celebrityName}>{item.name}</Text>
      <Text style={styles.celebrityPopularity}>
        Popularity: <Text style={styles.celebrityPopularityNumber}>{item.popularity}</Text>
      </Text>
    </TouchableOpacity>
  );

  const ListHeader = () => (
    <View style={styles.category}>
      <View style={styles.categoryHeader}>
        <Text style={styles.categoryTitle}>Popular</Text>
        <TouchableOpacity onPress={() => navigation.navigate('CelebrityCategory', { category: 'popular' })}>
          <Text style={styles.seeAll}>See All <Icon name="chevron-forward-outline" size={16} color="#fff" /></Text>
        </TouchableOpacity>
      </View>
      <View style={styles.popularContainer}>
        <FlatList
          data={celebrities.slice(0, 20)}
          renderItem={renderPopularCelebrities}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </View>
  );

  return (
    <FlatList
      data={[]} // 빈 데이터를 전달하여 전체 화면을 스크롤할 수 있게 함
      renderItem={null}
      ListHeaderComponent={ListHeader}
      keyExtractor={() => "key"} // 고유한 키를 전달
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 10,
    backgroundColor: '#000', // 배경색을 일치시킴
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
  popularContainer: {
    flexDirection: 'column',
  },
  popularItem: {
    width: 140,
    marginBottom: 20,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  popularImage: {
    width: '100%',
    height: 140,
    borderRadius: 10,
  },
  celebrityName: {
    color: '#fff',
    fontSize: 14,
    marginTop: 5,
    textAlign: 'center',
  },
  celebrityPopularity: {
    color: '#fff',
    textAlign: 'center',
  },
  celebrityPopularityNumber: {
    color: 'green',
  },
  arrowIcon: {
    position: 'absolute',
    right: 0,
  },
});

export default CelebritiesScreen;
