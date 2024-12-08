import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import StartScreen from './src/screens/Start';
import LoginScreen from './src/screens/Login';
import RegisterScreen from './src/screens/Register';
import LoadingScreen from './src/screens/Loading';
import HomeScreen from './src/screens/Home';
import FreshSmoothieScreen from './src/screens/Juice';
import AvocadoSaladScreen from './src/screens/Avocado';
import SpaghettiScreen from './src/screens/Pasta';
import PizzaScreen from './src/screens/Pizza';
import GadoScreen from './src/screens/Gado-gado';
import SotoScreen from './src/screens/Soto'

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Start" component={StartScreen} />
      <Stack.Screen name="Login" component={LoginScreen}/>
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Loading" component={LoadingScreen}/>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="FreshSmoothie" component={FreshSmoothieScreen} />
      <Stack.Screen name="AvocadoSalad" component={AvocadoSaladScreen} />
      <Stack.Screen name="Spaghetti" component={SpaghettiScreen} />
      <Stack.Screen name="Pizza" component={PizzaScreen} />
      <Stack.Screen name="Gado-gado" component={GadoScreen} />
      <Stack.Screen name="Soto" component={SotoScreen} />
    </Stack.Navigator>
  );
}
