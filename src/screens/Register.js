import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Dimensions, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebaseConfig'; // Jika firebaseConfig di root

console.log(auth);

export default function RegisterScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert("Success", "Account created successfully!");
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert("Registration Failed", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/cookin.jpg')}
        style={styles.imageBackground}
      >

        <View style={styles.overlay}>
          <Text style={styles.welcomeText}>Create Account</Text>
          <Text style={styles.subtitle}>Sign up to get started</Text>
        </View>
      </ImageBackground>

      <LinearGradient
        colors={['#1a1a3b', '#0d0d1f']}
        style={styles.gradient}
      >
        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <Icon name="user" size={20} color="#fff" />
            <TextInput
              style={styles.input}
              placeholder="Username"
              placeholderTextColor="#999"
              onChangeText={(text) => setUsername(text)}
              value={username}
            />
          </View>

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
          </View>

          <View style={styles.inputContainer}>
            <Icon name="lock" size={20} color="#fff" />
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              placeholderTextColor="#999"
              secureTextEntry={true}
              onChangeText={(text) => setConfirmPassword(text)}
              value={confirmPassword}
            />
          </View>

          <TouchableOpacity 
          style={styles.signUpButton}
          onPress={handleRegister}>
            <Text style={styles.signUpText}>Sign up</Text>
          </TouchableOpacity>

          <Text style={styles.orText}>Or sign up with</Text>

          <View style={styles.socialContainer}>
            <TouchableOpacity style={styles.socialButton}>
              <Icon name="google" size={20} color="#DB4437" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <Icon name="facebook" size={20} color="#3b5998" />
            </TouchableOpacity>
          </View>

          <Text style={styles.logtxt}></Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loginText}>Already have an account? Sign in</Text>
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
    paddingTop: 20,
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
  signUpButton: {
    backgroundColor: '#6C63FF',
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    width: '100%',
    marginBottom: 15,
  },
  signUpText: {
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
  loginText: {
    color: '#6C63FF',
    bottom: 25,
  },
});
