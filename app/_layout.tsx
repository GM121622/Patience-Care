import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { Link, useNavigation } from '@react-navigation/native'; // Import useNavigation
import Icon from 'react-native-vector-icons/MaterialIcons';
import Ico from 'react-native-vector-icons/FontAwesome';
import { Stack } from 'expo-router';


export default function HomeStack() {
  return (
    <Stack initialRouteName="index" screenOptions={{
      headerStyle: { backgroundColor: 'tomato' },
      headerTintColor: '#000',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="forgotpassword" options={{
        title: 'Forgot Password',
        headerTintColor: '#000',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerStyle: { backgroundColor: '#fff' }
      }} />

      <Stack.Screen name="createaccount" options={{ title: 'Create Account', headerStyle: { backgroundColor: '#fff' } }} />

    </Stack>
  );
}

const styles = StyleSheet.create({
  customButton: {
    backgroundColor: 'tomato',  // Red background color
    paddingVertical: 6,     // Vertical padding
    paddingHorizontal: 20,   // Horizontal padding
    borderRadius: 8,
    marginRight: 45,       // Border radius for rounded corners
  },
  buttonText: {
    color: 'black',          // White text color
    fontSize: 16,            // Font size
    fontWeight: 'bold',      // Bold text
  },
});
