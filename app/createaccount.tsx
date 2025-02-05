import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // Correct import
import { CreateAccountScreenNavigationProp } from '../types/navigation';

const CreateAccountPage = () => {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [role, setRole] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation<CreateAccountScreenNavigationProp>(); // Enables navigation

  const validateForm = () => {
    // Name validation (ensure it's a non-empty string value)
    if (name == 'string') {
      Alert.alert('Validation Error', 'Please enter a valid name');
      return false;
    }

    // Mobile number validation (ensure it's a valid 10-digit number starting with 7, 8, or 9)
    const mobileRegex = /^[1-9][0-9]{9}$/;
    if (!mobileRegex.test(mobile)) {
      Alert.alert('Validation Error', 'Please enter a valid 10-digit mobile number');
      return false;
    }

    // Role validation (ensure a role is selected)
    if (role === '') {
      Alert.alert('Validation Error', 'Please select your role');
      return false;
    }

    // Password validation (ensure password is at least 6 characters long)
    if (password.length < 6) {
      Alert.alert('Validation Error', 'Password must be at least 6 digit long');
      return false;
    }

    return true;
  };

  const handleCreateAccount = () => {
    if (validateForm()) {
      // Proceed to OTP verification
      navigation.navigate('otpvarification');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      {/* Shopping Image */}
      <Image
        source={require('../assets/images/applogo.png')}  // Replace with your shopping-related image
        style={styles.shoppingImage}
        resizeMode="contain" // Ensure the image scales appropriately
      />

      {/* Name Input */}
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        placeholderTextColor="#a9a9a9"
        value={name}
        onChangeText={setName}
      />

      {/* Mobile Input */}
      <TextInput
        style={styles.input}
        placeholder="Enter mobile number"
        placeholderTextColor="#a9a9a9"
        keyboardType="phone-pad"
        value={mobile}
        onChangeText={setMobile}
        maxLength={10} // Ensure only 10 digits are entered
      />

      {/* Role Picker */}
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={role}
          onValueChange={(itemValue) => setRole(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Select your role" value="" />
          <Picker.Item label="Patient" value="buy" />
          <Picker.Item label="Doctor" value="shop" />
        </Picker>
      </View>

      {/* Password Input */}
      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        placeholderTextColor="#a9a9a9"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {/* Create Account Button */}
      <TouchableOpacity
        style={styles.loginButton}
        onPress={handleCreateAccount}>
        <Text style={styles.loginButtonText}>Create Account</Text>
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
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
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
    width: '90%',  // Ensure the image takes up the full width of the container
    height: 250, // Set a fixed height for the image (adjust based on your needs)
    marginTop: 20, // Space above the image
    marginBottom: 0, // Space below the image
  },
  pickerContainer: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 15,
    marginBottom: 15,
    justifyContent: 'center',
    backgroundColor: '#fff',
    overflow: 'hidden', // Ensures rounded corners are maintained for the Picker
  },
  picker: {
    width: '100%',
    height: '110%',
    color: '#000',
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
  backButton: {
    position: 'absolute',
    top: 40, // You can adjust the position as needed
    left: 20,
    padding: 10,
    backgroundColor: '#fff', // Background color for the back button
    borderRadius: 10,
  },
});

export default CreateAccountPage;
