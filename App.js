import React, {useState, useRef, useEffect} from 'react';
import {View, Animated, Dimensions} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Loader from './Components/Loader';
import MainMenu from './Components/Menu';
import Settings from './Components/Settings';
import PlaceDetails from './Components/PlaceDetails';
import FavoritesScreen from './Components/FavoritesScreen';
import MiniGame from './Components/MiniGame';

import {AudioProvider} from './Components/AudioContext';
import {VibrationProvider} from './Components/VibrationContext';

import {
  EventsList,
  EventDetails,
  FavoritesEventsScreen,
} from './Components/Events';

// Импортируем MyDay как объект, где:
// MyDayList, RouteDetails, AddRouteStep1, AddRouteStep2
import MyDayList from './Components/MyDayList';

// Кастомный таб-бар
import CustomTabBar from './Components/CustomTabBar';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={{headerShown: false}}
      tabBar={props => <CustomTabBar {...props} />}>
      <Tab.Screen
        name="MenuTab"
        component={MainMenu}
        options={{title: 'Menu'}}
      />

      <Tab.Screen
        name="EventsTab"
        component={EventsList}
        options={{title: 'Events'}}
      />

      <Tab.Screen
        name="MyDayTab"
        component={MyDayList.MyDayList}
        options={{title: 'MyDayList'}}
      />

      <Tab.Screen
        name="SettingsTab"
        component={Settings}
        options={{title: 'Settings'}}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  const Route = () => {
    const [louderIsEnded, setLouderIsEnded] = useState(false);

    return (
      <NavigationContainer>
        {!louderIsEnded ? (
          <Loader onEnd={() => setLouderIsEnded(true)} />
        ) : (
          <Stack.Navigator
            initialRouteName="Tabs"
            screenOptions={{headerShown: false}}>
            {/* Табы как главный экран */}
            <Stack.Screen name="Tabs" component={MyTabs} />

            {/* Экраны PlaceDetails, FavoritesScreen, MiniGame */}
            <Stack.Screen name="PlaceDetails" component={PlaceDetails} />
            <Stack.Screen name="FavoritesScreen" component={FavoritesScreen} />
            <Stack.Screen name="MiniGame" component={MiniGame} />

            {/* Экраны для событий: детальный и избранные */}
            <Stack.Screen name="EventDetails" component={EventDetails} />
            <Stack.Screen
              name="FavoritesEvents"
              component={FavoritesEventsScreen}
            />

            {/* Экраны для MyDay: детали маршрута, добавление/редактирование */}
            <Stack.Screen
              name="RouteDetails"
              component={MyDayList.RouteDetails}
            />
            <Stack.Screen
              name="AddRouteStep1"
              component={MyDayList.AddRouteStep1}
            />
            <Stack.Screen
              name="AddRouteStep2"
              component={MyDayList.AddRouteStep2}
            />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    );
  };

  ///////// Louder
  const [louderIsEnded, setLouderIsEnded] = useState(false);
  const appearingAnim = useRef(new Animated.Value(0)).current;
  const appearingSecondAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(appearingAnim, {
      toValue: 1,
      duration: 3500,
      useNativeDriver: true,
    }).start();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      Animated.timing(appearingSecondAnim, {
        toValue: 1,
        duration: 7500,
        useNativeDriver: true,
      }).start();
      //setLouderIsEnded(true);
    }, 500);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setLouderIsEnded(true);
    }, 8000);
  }, []);

  return (
    <AudioProvider>
      <VibrationProvider>
        {!louderIsEnded ? (
          <View
            style={{
              position: 'relative',
              flex: 1,
              //backgroundColor: 'rgba(0,0,0)',
            }}>
            <Animated.Image
              source={require('./assets/newDiz/load1.jpg')}
              style={{
                //...props.style,
                opacity: appearingAnim,
                width: '100%',
                height: '100%',
                position: 'absolute',
              }}
            />
            <Animated.Image
              source={require('./assets/newDiz/load2.jpg')}
              style={{
                //...props.style,
                opacity: appearingSecondAnim,
                width: '100%',
                height: '100%',
                position: 'absolute',
              }}
            />
          </View>
        ) : (
          <Route />
        )}
      </VibrationProvider>
    </AudioProvider>
  );
}
