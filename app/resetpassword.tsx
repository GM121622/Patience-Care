import React, { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert, ScrollView } from 'react-native';
import axios from 'axios';
import { ResetpasswordScreenNavigationProp } from '../types/navigation';
import { API_URL } from "./constants";

const ResetPasswordPage = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigation = useNavigation<ResetpasswordScreenNavigationProp>();
  const route = useRoute();
  const { username } = route.params as { username: string };  // Get username (mobileNumber) from navigation params

  const validateForm = () => {
    if (password.length < 6) {
      Alert.alert('Validation Error', 'Password must be at least 6 characters long');
      return false;
    }
    if (password !== confirmPassword) {
      Alert.alert('Validation Error', 'Passwords should match');
      return false;
    }
    return true;
  };

  const handleResetPassword = async () => {
    if (!validateForm()) return;

    try {
      const response = await axios.post(`${API_URL}/auth/update/password`, null, {
        params: {
          mobileNumber: username,  // Send mobileNumber
          password: password       // Send new password
        },
      });

      if (response.status === 200) {
        Alert.alert('Success', 'Password reset successfully');
        navigation.navigate('index');
      } else {
        Alert.alert('Error', 'Failed to reset password');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong');
      console.error('Reset Password Error:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <Image
        source={require('../assets/images/applogo.png')}
        style={styles.shoppingImage}
        resizeMode="contain"
      />

      <TextInput
        style={styles.input}
        placeholder="Enter your new password"
        placeholderTextColor="#a9a9a9"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TextInput
        style={styles.input}
        placeholder="Re-enter your new password"
        placeholderTextColor="#a9a9a9"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      <TouchableOpacity style={styles.loginButton} onPress={handleResetPassword}>
        <Text style={styles.loginButtonText}>Reset Password</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
    fontSize: 16,
    color: '#000',
  },
  shoppingImage: {
    width: '90%',
    height: 250,
    marginTop: 20,
    marginBottom: 10,
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
});

export default ResetPasswordPage;
