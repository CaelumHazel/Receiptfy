import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function StartScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <LinearGradient colors={['#0d0d1f', '#6C63FF']} style={styles.backgroundBox}/>
      <LinearGradient colors={['#6C63FF', '#0d0d1f']} style={styles.backgroundBox2}/>
      <Image source={require('../assets/image1.png')} style={styles.image} />
      <Text style={styles.title}>
        Recipe
        <Text style={styles.highlight}>It</Text>
      </Text>
      <Text style={styles.subtitle}>Everybody can Cook</Text>
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.replace('Login')}
      >
        <Text style={styles.buttonText}>Let’s Cook</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d0d1f',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundBox: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '30%',
    borderBottomLeftRadius: 150, 
    borderBottomRightRadius: 150, 
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 36,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  highlight: {
    color: '#6C63FF', 
  },
  subtitle: {
    fontSize: 16,
    color: '#cccccc',
    marginBottom: 40,
  },
  button: {
    position: 'absolute',
    bottom: 50,
    backgroundColor: '#6C63FF',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 30,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
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
