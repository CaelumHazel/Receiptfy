import React, { useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';

export default function LoadingScreen({ navigation }) {
  useEffect(() => {
    // Simulate a delay, then navigate to the Home page
    const timer = setTimeout(() => {
      navigation.replace('Home'); // Replace with Home so it can't go back to loading
    }, 2000); // 2-second delay for loading animation

    return () => clearTimeout(timer); // Cleanup the timer when unmounting
  }, [navigation]);

  return (
    <LinearGradient colors={['#1a1a3b', '#0d0d1f']} style={styles.gradient}>
      <LinearGradient colors={['#0d0d1f', '#6C63FF']} style={styles.backgroundBox}/>
      <LinearGradient colors={['#6C63FF', '#0d0d1f']} style={styles.backgroundBox2}/>
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#6C63FF" />
        <Text style={styles.loadingText}>Hello Djuanda...</Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#ffffff',
    fontSize: 18,
    marginTop: 10,
    fontWeight:'bold',
  },
  backgroundBox: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '30%',
    borderBottomLeftRadius: 150, 
    borderBottomRightRadius: 150, 
  },
  backgroundBox2:{
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '30%',
    borderTopLeftRadius: 150, 
    borderTopRightRadius: 150, 
  },
});
