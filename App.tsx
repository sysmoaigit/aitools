import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { Text } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HomeScreen from './src/screens/HomeScreen';
import SearchScreen from './src/screens/SearchScreen';
import FavoritesScreen from './src/screens/FavoritesScreen';
import ToolDetailScreen from './src/screens/ToolDetailScreen';

const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();
const SearchStack = createNativeStackNavigator();
const FavStack = createNativeStackNavigator();

const screenOptions = {
  headerStyle: { backgroundColor: '#0F172A' },
  headerTintColor: '#F8FAFC',
};

function HomeStackScreen() {
  return (
    <HomeStack.Navigator screenOptions={screenOptions}>
      <HomeStack.Screen name="HomeMain" component={HomeScreen} options={{ title: 'SYSmoAI Tools' }} />
      <HomeStack.Screen name="ToolDetail" component={ToolDetailScreen} />
    </HomeStack.Navigator>
  );
}

function SearchStackScreen() {
  return (
    <SearchStack.Navigator screenOptions={screenOptions}>
      <SearchStack.Screen name="SearchMain" component={SearchScreen} options={{ title: 'Search' }} />
      <SearchStack.Screen name="ToolDetail" component={ToolDetailScreen} />
    </SearchStack.Navigator>
  );
}

function FavStackScreen() {
  return (
    <FavStack.Navigator screenOptions={screenOptions}>
      <FavStack.Screen name="FavMain" component={FavoritesScreen} options={{ title: 'Favorites' }} />
      <FavStack.Screen name="ToolDetail" component={ToolDetailScreen} />
    </FavStack.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar style="auto" />
        <Tab.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: '#0F172A' },
            headerTintColor: '#F8FAFC',
            tabBarStyle: { backgroundColor: '#0F172A', borderTopColor: '#1E293B' },
            tabBarActiveTintColor: '#38BDF8',
            tabBarInactiveTintColor: '#64748B',
            headerShown: false,
          }}
        >
          <Tab.Screen
            name="HomeTab"
            component={HomeStackScreen}
            options={{
              tabBarLabel: 'Tools',
              tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 18 }}>🧰</Text>,
            }}
          />
          <Tab.Screen
            name="SearchTab"
            component={SearchStackScreen}
            options={{
              tabBarLabel: 'Search',
              tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 18 }}>🔍</Text>,
            }}
          />
          <Tab.Screen
            name="FavTab"
            component={FavStackScreen}
            options={{
              tabBarLabel: 'Saved',
              tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 18 }}>⭐</Text>,
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
