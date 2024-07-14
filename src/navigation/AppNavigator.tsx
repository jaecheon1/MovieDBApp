// src/navigation/AppNavigator.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeScreen from '../screens/HomeScreen';
import CelebritiesScreen from '../screens/CelebritiesScreen';
import SearchScreen from '../screens/SearchScreen';
import ProfileScreen from '../screens/ProfileScreen';
import DetailsScreen from '../screens/DetailsScreen';
import CategoryScreen from '../screens/CategoryScreen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Text, View } from 'react-native';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const CustomHeader = ({ title }) => (
  <View style={{
    backgroundColor: '#000',
    borderWidth: 1,
    borderColor: 'yellow',
    width: '100%',
    justifyContent: 'center',
    paddingVertical: 10
  }}>
    <Text style={{
      color: '#fff',
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'left',
      paddingLeft: 20
    }}>
      {title}
    </Text>
  </View>
);

const HomeStackScreen = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="HomeScreen" component={HomeScreen} />
    <Stack.Screen
      name="Details"
      component={DetailsScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen name="Category" component={CategoryScreen} />
  </Stack.Navigator>
);

const CelebritiesStackScreen = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="CelebritiesScreen" component={CelebritiesScreen} />
  </Stack.Navigator>
);

const SearchStackScreen = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="SearchScreen" component={SearchScreen} />
  </Stack.Navigator>
);

const ProfileStackScreen = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
  </Stack.Navigator>
);

const AppNavigator = () => (
  <GestureHandlerRootView style={{ flex: 1 }}>
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size, focused }) => {
          let iconName;

          if (route.name === 'Movies') {
            iconName = focused ? 'film' : 'film-outline';
          } else if (route.name === 'Celebrities') {
            iconName = focused ? 'people' : 'people-outline';
          } else if (route.name === 'Search') {
            iconName = focused ? 'search' : 'search-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'green',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: '#000',
        },
        tabBarLabelStyle: {
          fontSize: 12,
          display: 'none',
        },
        tabBarLabel: ({ focused }) => {
          if (focused) {
            return <Text style={{ color: 'green', fontSize: 12 }}>{route.name}</Text>;
          }
          return null;
        },
      })}
    >
      <Tab.Screen
        name="Movies"
        component={HomeStackScreen}
        options={{
          header: () => <CustomHeader title="Movies" />
        }}
      />
      <Tab.Screen
        name="Celebrities"
        component={CelebritiesStackScreen}
        options={{
          header: () => <CustomHeader title="Celebrities" />
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchStackScreen}
        options={{
          header: () => <CustomHeader title="Search" />
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStackScreen}
        options={{
          header: () => <CustomHeader title="Profile" />
        }}
      />
    </Tab.Navigator>
  </GestureHandlerRootView>
);

export default AppNavigator;
