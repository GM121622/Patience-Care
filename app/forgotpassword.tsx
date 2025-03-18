import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { forgotPasswordScreenNavigationProp } from '../types/navigation';
import { API_URL } from "./constants";
import axios from 'axios';

const ForgetPasswordScreen = () => {
  const [mobileNumber, setMobileNumber] = useState<string>(''); // Mobile number state
  const navigation = useNavigation<forgotPasswordScreenNavigationProp>(); // Correctly typed navigation

  const handleSendOTP = async () => {
    // Validate the mobile number before proceeding
    if (!validateMobileNumber(mobileNumber)) {
      Alert.alert('Invalid Number', 'Please enter a valid 10-digit mobile number');
      return;
    }

    try {
      // Send OTP to the backend
      const response = await axios.post(`${API_URL}/auth/send/otpNumber`, null, {
        params: {
            mobileNumber: mobileNumber,
        },
    });

      if (response.data.responseStatus === 'Success') {
        // Navigate to OTP verification screen
        navigation.navigate('otpvarification', { 
          username: mobileNumber,
          from: 'forgotPassword' 
        });
      } else {
        Alert.alert('Error', 'Failed to send OTP. Please try again.');
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
      Alert.alert('Error', 'An error occurred while sending OTP. Please try again.');
    }
  };

  // Mobile number validation function
  const validateMobileNumber = (number: string): boolean => {
    const cleanNumber = number.replace(/\s+/g, '');
    const regex = /^[1-9][0-9]{9}$/;
    return regex.test(cleanNumber);
  };

  return (
    <View style={styles.container}>
      <Image 
        source={require('../assets/images/applogo.png')}
        style={styles.shoppingImage}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter your registered mobile number"
        placeholderTextColor="#aaa"
        keyboardType="phone-pad"
        value={mobileNumber}
        onChangeText={(text) => setMobileNumber(text)}
        maxLength={10}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleSendOTP}>
        <Text style={styles.buttonText}>Send OTP</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  shoppingImage: {
    width: '70%',
    height: 250,
    marginBottom: 15,
  },
  input: {
    height: 50,
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#32CD32',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ForgetPasswordScreen;