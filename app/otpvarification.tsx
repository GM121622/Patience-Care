import React, { useState, useLayoutEffect, useRef, useCallback } from 'react';
import { useNavigation, RouteProp, useRoute } from '@react-navigation/native';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert, BackHandler } from 'react-native';
import { OtpVarificationScreenNavigationProp } from '../types/navigation';
import axios from 'axios'; // Import axios for making API requests
import { API_URL} from "./constants";


// Define type for route params
type OTPVerificationScreenParams = {
  firstName: string;
  username: string;
  password: string;
  role: string;
  from: string;
};

const OTPVerificationScreen = () => {
  const route = useRoute<RouteProp<{ params: OTPVerificationScreenParams }, 'params'>>();
  const { firstName, username, password, role, from } = route.params; // ✅ Type-safe access
  const [otp, setOtp] = useState<string[]>(['', '', '', '']);
  const navigation = useNavigation<OtpVarificationScreenNavigationProp>();
  const inputs = useRef<TextInput[]>([]);

  const handleBackPress = useCallback(() => {
    navigation.goBack();
    return true;
  }, [navigation]);

  useLayoutEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackPress);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    };
  }, [handleBackPress]);

  const handleInputChange = (value: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleVerifyOTP = async () => {
    const enteredOTP = otp.join('');
    console.log('Entered OTP:', enteredOTP);
  
    try {
      const response = await axios.post(`${API_URL}/auth/verify/otpNumber`, {
        otpNumber: enteredOTP, // Match the field name expected by the backend
        firstName,
        username,
        password,
        role,
    }, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
  
      const data = await response.data;
      console.log('API Response:', data);
  
      if (response.status === 200) {
        if (from === 'forgotPassword') {
          navigation.replace('resetpassword',{username});
        } else if (from === 'createaccount') {
          Alert.alert('Success', 'OTP verified successfully');
          navigation.replace('index', { firstName, username, password, role });
        }
      } else {
        Alert.alert('Verification Failed', data.message || 'Invalid OTP');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/applogo.png')} style={styles.shoppingImage} />
      <Text style={styles.subtitle}>Verify your mobile number</Text>
      <Text style={styles.instructions}>Enter your OTP code here</Text>

      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={(el) => (inputs.current[index] = el!)}
            style={styles.otpInput}
            keyboardType="numeric"
            maxLength={1}
            value={digit}
            onChangeText={(value) => handleInputChange(value, index)}
            onKeyPress={(e) => {
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
        Don't receive any OTP?{' '}
        <Text style={styles.resendLink} onPress={() => console.log('Resend OTP')}>
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
  subtitle: {
    fontSize: 18,
    color: '#555',
    marginBottom: 10,
    marginTop: 20,
  },
  shoppingImage: {
    width: '60%',
    height: 250,
    marginBottom: -15,
  },
  instructions: {
    fontSize: 14,
    color: '#555',
    marginBottom: 20,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '60%',
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
