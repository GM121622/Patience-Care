import React, { useState, useLayoutEffect, useRef, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert, BackHandler } from 'react-native';
import { OtpVarificationScreenNavigationProp } from '../types/navigation';

const OTPVerificationScreen = () => {
  const [otp, setOtp] = useState<string[]>(['', '', '', '']);
  const navigation = useNavigation<OtpVarificationScreenNavigationProp>(); // Correctly typed navigation
  const inputs = useRef<TextInput[]>([]); 

  // Handling back button press
  const handleBackPress = useCallback(() => {
    navigation.goBack();  // Go back to the previous screen
    return true; // Prevent default behavior (which is to exit the app on back press)
  }, [navigation]);

  // Use layout effect to handle back button behavior on component mount
  useLayoutEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackPress);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress); // Clean up the event listener
    };
  }, [handleBackPress]);

  const handleInputChange = (value: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to the next input field if current value is filled
    if (value && index < 3) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleVerifyOTP = () => {
    const enteredOTP = otp.join('');
    console.log('Entered OTP:', enteredOTP);
    if (enteredOTP === '1234') { 
      navigation.navigate('index');
    } else {
      console.log('Incorrect OTP'); 
      Alert.alert('Incorrect OTP', 'Please enter the correct OTP.');
    }
  };

  // Handle Resend OTP button click
  const handleResendOTP = () => {
    alert( 'OTP Resent,A new OTP has been sent to your registered mobile number.')
  };

  return (
    <View style={styles.container}>
      <Image 
        source={require('../assets/images/applogo.png')}  // replace with your shopping-related image
        style={styles.shoppingImage}
      />
      <Text style={styles.subtitle}>Verify your mobile number</Text>
      <Text style={styles.instructions}>Enter your OTP code here</Text>

      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={(el) => (inputs.current[index] = el!)} // Store the input reference
            style={styles.otpInput}
            keyboardType="numeric"
            maxLength={1}
            value={digit}
            onChangeText={(value) => handleInputChange(value, index)} // Explicitly define the type of 'value'
            onKeyPress={(e) => {
              // Focus on the previous input field when the backspace key is pressed
              if (e.nativeEvent.key === 'Backspace' && !digit && index > 0) {
                inputs.current[index - 1]?.focus();
              }
            }}
          />
        ))}
      </View>

      <TouchableOpacity style={styles.verifyButton} onPress={handleVerifyOTP}>
        <Text style={styles.verifyButtonText}>Verify OTP</Text>
      </TouchableOpacity>

      <Text style={styles.resendText}>
        don't receive any OTP?{' '}
        <Text style={styles.resendLink} onPress={handleResendOTP}>
          Resend OTP
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 18,
    color: '#555',
    marginBottom: 10,
    marginTop: 20,
  },
  shoppingImage: {
    width: '60%', // Adjust width to fit the container
    height: 250, // Set a fixed height for the image (adjust based on your needs)
    marginBottom: -15, // Add margin for spacing
  },
  instructions: {
    fontSize: 14,
    color: '#555',
    marginBottom: 20,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',  // Ensures even space between OTP inputs
    width: '60%',  // Controls the width of OTP input container
    marginBottom: 20,
  },
  otpInput: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    textAlign: 'center',
    fontSize: 18,
    backgroundColor: '#fff',
  },
  verifyButton: {
    backgroundColor: '#32CD32',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginBottom: 20,
  },
  verifyButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  resendText: {
    fontSize: 14,
    color: '#555',
  },
  resendLink: {
    color: '#007bff',
    fontWeight: 'bold',
  },
});

export default OTPVerificationScreen;
