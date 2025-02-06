import React, { useState, useLayoutEffect, useRef, useCallback } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert, BackHandler } from 'react-native';
import { OtpVarificationScreenNavigationProp } from '../types/navigation';

const OTPVerificationScreen = () => {
  const [otp, setOtp] = useState<string[]>(['', '', '', '']);
  const navigation = useNavigation<OtpVarificationScreenNavigationProp>();
  const inputs = useRef<TextInput[]>([]);
  const route = useRoute<OTPVerificationScreenRouteProp>();
  

  // Handle back button press
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

  const handleVerifyOTP = () => {
    const enteredOTP = otp.join('');
    console.log('Entered OTP:', enteredOTP);

    if (enteredOTP === '1234') {
      if (route.params?.from === 'forgotPassword') {
        navigation.replace('resetpassword');
      } else if (route.params?.from === 'createaccount') {
        navigation.replace('index');
      }
    } else {
      console.log('Incorrect OTP');
      Alert.alert('Incorrect OTP', 'Please enter the correct OTP.');
    }
  };

  const handleResendOTP = () => {
    alert('OTP Resent, A new OTP has been sent to your registered mobile number.');
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/applogo.png')}
        style={styles.shoppingImage}
      />
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
