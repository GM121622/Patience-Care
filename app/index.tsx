import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { loginScreenNavigationProp } from '../types/navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios'; // Import axios for making API requests
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage to store the JWT token securely
import { API_URL} from "./constants";

const LoginScreen = () => {
  const navigation = useNavigation<loginScreenNavigationProp>();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [username, setUsername] = useState(''); // Mobile number
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // To handle error messages if login fails

  const navigateToCreateAccount = () => {
    navigation.navigate('createaccount');
  };

  const navigateToForgotPassword = () => {
    navigation.navigate('forgotpassword');
  };

  // Handle login
  const handleLogin = async () => {
    try {
      // API request to backend to authenticate the user
      const response = await axios.post(`${API_URL}/auth/login`, {
        username,
        password,
      });

      // Check if token is received
      if (response.data && response.data.trim() !== "") {
        console.log(response.data);
        await AsyncStorage.setItem('jwtToken', response.data);
        navigation.navigate('home');
      } else {
        setError('Invalid credentials, please try again.');
      }
    } catch (err) {
      setError('Error logging in. Please check your credentials.');
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/applogo.png')}
        style={styles.shoppingImage}
      />

      <Text style={styles.subHeader}>Welcome back!</Text>

      {/* Username input (mobile number) */}
      <TextInput
        style={styles.input}
        placeholder="Enter mobile number"
        keyboardType="phone-pad"
        placeholderTextColor="#aaa"
        value={username}
        onChangeText={setUsername}
      />

      {/* Password input */}
      <TextInput
        style={styles.input}
        placeholder="Enter Password"
        secureTextEntry={!passwordVisible}
        placeholderTextColor="#aaa"
        value={password}
        onChangeText={setPassword}
      />

      {/* Show Password Row */}
      <View style={styles.showPasswordRow}>
        <TouchableOpacity
          style={[styles.checkbox, passwordVisible && styles.checkboxSelected]}
          onPress={() => setPasswordVisible(!passwordVisible)}
        >
          {/* Display eye icon based on password visibility */}
          <Icon
            name={passwordVisible ? 'eye-slash' : 'eye'}
            size={20}
            color={passwordVisible ? '#007bff' : '#aaa'}
          />
        </TouchableOpacity>
        <Text style={styles.showPasswordText}>Show Password</Text>
        <TouchableOpacity onPress={navigateToForgotPassword}>
          <Text style={styles.forgotPassword}>Forgot Password</Text>
        </TouchableOpacity>
      </View>

      {/* Error message */}
      {error && <Text style={styles.errorText}>{error}</Text>}

      {/* Login button */}
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>

      {/* Create Account Section */}
      <View style={styles.createAccountContainer}>
        <TouchableOpacity onPress={navigateToCreateAccount}>
          <Text>
          <Text>Not yet registered?{' '}</Text>
            <Text style={styles.createAccountText}>Create Account</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: 'flex-start', // Align content from the top
  },
  shoppingImage: {
    width: '70%',
    height: 250,
    marginTop: 30,
    marginBottom: 10,
  },
  subHeader: {
    fontSize: 14,
    color: '#555',
    marginBottom: 10,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    fontSize: 16,
  },
  showPasswordRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 3,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxSelected: {
    backgroundColor: '#007bff',
  },
  showPasswordText: {
    flex: 1,
  },
  forgotPassword: {
    color: '#007bff',
    fontWeight: '600',
  },
  loginButton: {
    backgroundColor: '#32CD32',
    width: '100%',
    padding: 15,
    alignItems: 'center',
    borderRadius: 8,
    marginVertical: 15,
  },
  loginButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  createAccountContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  createAccountText: {
    fontSize: 14,
    color: '#007bff',
    fontWeight: '600',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
  },
});

export default LoginScreen;
