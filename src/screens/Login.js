import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleLogin = () => {
    navigation.navigate('Loading'); 
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/cookin.jpg')}
        style={styles.imageBackground}
      >
        <View style={styles.overlay}>
          <Text style={styles.welcomeText}>Welcome! 👋</Text>
          <Text style={styles.subtitle}>Sign in to continue</Text>
        </View>
      </ImageBackground>

      <LinearGradient
        colors={['#1a1a3b', '#0d0d1f']}
        style={styles.gradient}
      >
        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <Icon name="envelope" size={20} color="#fff" />
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#999"
              onChangeText={(text) => setEmail(text)}
              value={email}
            />
          </View>

          <View style={styles.inputContainer}>
            <Icon name="lock" size={20} color="#fff" />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#999"
              secureTextEntry={true}
              onChangeText={(text) => setPassword(text)}
              value={password}
            />
            <Icon name="eye" size={20} color="#999" />
          </View>

          <TouchableOpacity
            style={styles.signInButton}
            onPress={handleLogin}
          >
            <Text style={styles.signInText}>Log In</Text>
          </TouchableOpacity>

          <Text style={styles.orText}>Or login with</Text>
          <View style={styles.socialContainer}>
            <TouchableOpacity style={styles.socialButton}>
              <Icon name="google" size={20} color="#DB4437" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <Icon name="facebook" size={20} color="#3b5998" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.signUpText}>Don't have an account? Sign up</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBackground: {
    width: width,
    height: height * 0.4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject, 
    backgroundColor: 'rgba(26, 26, 59, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 20,
    color: '#aaa',
  },
  gradient: {
    flex: 1,
    shadowColor: '#fff',
  },
  formContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333',
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 15,
    width: '100%',
    marginBottom: 15,
  },
  input: {
    flex: 1,
    color: '#fff',
    marginLeft: 10,
  },
  signInButton: {
    backgroundColor: '#6C63FF',
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    width: '100%',
    marginBottom: 15,
  },
  signInText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  orText: {
    color: '#aaa',
    marginVertical: 10,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '40%',
    marginBottom: 20,
  },
  socialButton: {
    padding: 10,
  },
  signUpText: {
    color: '#6C63FF',
    marginBottom: 20,
  },
});
