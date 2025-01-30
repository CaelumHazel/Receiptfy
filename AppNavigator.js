import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import StartScreen from './src/screens/Start';
import LoginScreen from './src/screens/Login';
import RegisterScreen from './src/screens/Register';
import LoadingScreen from './src/screens/Loading';
import HomeScreen from './src/screens/Home';
import DetailScreen from './src/screens/Detail'
import MapScreen from './src/screens/MapScreen';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Start" component={StartScreen} />
      <Stack.Screen name="Login" component={LoginScreen}/>
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Loading" component={LoadingScreen}/>
      <Stack.Screen name="MapScreen" component={MapScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Detail" component={DetailScreen}/>
    </Stack.Navigator>
  );
}
