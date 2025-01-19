import React, { useState, useEffect } from 'react'; // useEffect instead of useLayoutEffect
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image,Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Link } from 'expo-router';
import Icon from 'react-native-vector-icons/FontAwesome'; // Importing FontAwesome for the eye icon
import { loginScreenNavigationProp } from '../types/navigation';



const LoginScreen = () => {

  const navigation = useNavigation<loginScreenNavigationProp>();
  const [passwordVisible, setPasswordVisible] = useState(false);

  const navigateToCreateAccount = () => {
    navigation.navigate('createaccount');  // Navigate to Create Account page
  };

  const navigateToForgotPassword = () => {
    navigation.navigate('forgotpassword');  // Navigate to Create Account page
  };

  return (
    <View style={styles.container}>
      <Image 
        source={require('../assets/images/applogo.png')}  // replace with your shopping-related image
        style={styles.shoppingImage}
      />
      
      <Text style={styles.subHeader}>Welcome back!</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter mobile number"
        keyboardType="phone-pad"
        placeholderTextColor="#aaa"
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Password"
        secureTextEntry={!passwordVisible}
        placeholderTextColor="#aaa"
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

      <TouchableOpacity
      style={styles.loginButton}
      onPress={() => navigation.navigate('home')}>
      <Text style={styles.loginButtonText}>Login</Text>
    </TouchableOpacity>

      {/* Create Account Section */}
      <View style={styles.createAccountContainer}>
        <TouchableOpacity onPress={navigateToCreateAccount}>
          <Text>Not yet registered ? <Text style={styles.createAccountText}>Create Account</Text></Text>
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
    width: '70%',  // Ensure the image takes up the full width of the container
    height: 250, // Set a fixed height for the image (adjust based on your needs)
    marginTop: 30, // Space above the image
    marginBottom:10, // Space below the image
  },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    marginVertical: 10,
    marginTop: -30, // Adjust app name position higher
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
  noAccountText: {
    fontSize: 14,
    color: '#555',
  },
  createAccountText: {
    fontSize: 14,
    color: '#007bff',
    fontWeight: '600',
  },
  textSize: {
    fontSize: 14,
    fontWeight: 'bold',
  }
});

export default LoginScreen;
