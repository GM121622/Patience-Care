import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { forgotPasswordScreenNavigationProp } from '../types/navigation';

const ForgetPasswordScreen = () => {
  const [mobileNumber, setMobileNumber] = useState<string>(''); // Mobile number state
  const navigation = useNavigation<forgotPasswordScreenNavigationProp>(); // Correctly typed navigation

  const handleSendOTP = () => {
    // Validate the mobile number before proceeding
    if (!validateMobileNumber(mobileNumber)) {
      Alert.alert('Invalid Number', 'Please enter a valid 10-digit mobile number');
      return;
    }
    else{
            navigation.navigate('otpvarification');
    }

    console.log('Mobile Number:', mobileNumber);
    // Add logic for sending OTP
    Alert.alert(`OTP sent to: ${mobileNumber}`);
  };

  // Mobile number validation function
  const validateMobileNumber = (number: string): boolean => {
    // Remove spaces and ensure that the number contains only digits
    const cleanNumber = number.replace(/\s+/g, ''); // Remove any spaces
    const regex = /^[1-9][0-9]{9}$/; // Number must start with 7, 8, or 9 and be 10 digits

    // Validate that the number is exactly 10 digits and starts with a valid digit
    return regex.test(cleanNumber);
  };

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <Image 
        source={require('../assets/images/applogo.png')}  // replace with your shopping-related image
        style={styles.shoppingImage}
      />

      {/* Mobile Input */}
      <TextInput
        style={styles.input}
        placeholder="Enter your registered mobile number"
        placeholderTextColor="#aaa"
        keyboardType="phone-pad"
        value={mobileNumber}
        onChangeText={(text) => setMobileNumber(text)}
        maxLength={10} // Limit input to 10 digits for the mobile number
      />

      {/* Send OTP Button */}
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
    alignItems: 'center', // Align content horizontally
  },
  shoppingImage: {
    width: '70%', // Adjust width to fit the container
    height: 250, // Set a fixed height for the image (adjust based on your needs)
    marginBottom: 15, // Add margin for spacing
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 20, // Added margin to space out the title and input fields
  },
  input: {
    height: 50,
    width: '100%', // Make input take up full width of container
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20, // Spacing between input and button
    fontSize: 16, // Adjust font size for better visibility
  },
  button: {
    backgroundColor: '#32CD32', // Button color
    paddingVertical: 12,
    paddingHorizontal: 40, // Horizontal padding for a wider button
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20, // Space between the button and the next elements
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  backButton: {
    flexDirection: 'row', // Align icon and text horizontally
    alignItems: 'center',
    marginTop: 20, // Space from other components
  },
  backButtonText: {
    color: '#007BFF',
    fontSize: 16,
    marginLeft: 8, // Space between icon and text
  },
});

export default ForgetPasswordScreen;
