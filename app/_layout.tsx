import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { Link, useNavigation } from '@react-navigation/native'; // Import useNavigation
import Icon from 'react-native-vector-icons/MaterialIcons';
import Ico from 'react-native-vector-icons/FontAwesome';
import { Stack } from 'expo-router';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeRightSideHeader from './HeaderComponent/HomeRightSideHeader';
import HomeLeftSideHeader from './HeaderComponent/HomeLeftSideHeader';
import otpvarification from './otpvarification';
import profile from './EditProduct';
import  shopDetails from './AddShopDetails';
import { HomeDrowerScreenNavigationProp } from '../types/navigation';
import EditProduct from './EditProduct';
import ActiveOffers from './DrawerScreens/ActiveOffers';
import Rating from './DrawerScreens/Rating';
import Account from './DrawerScreens/EditAccount';

 function HomeStack() {
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

      <Stack.Screen name="AddProductDetails" options={{ title: 'Add Document Details', headerStyle: { backgroundColor: '#fff' } }} />
      <Stack.Screen name="createaccount" options={{ title: 'Create Account', headerStyle: { backgroundColor: '#fff' } }} />
      <Stack.Screen name="otpvarification" options={{ title: 'Verify OTP', headerStyle: { backgroundColor: '#fff' } }} />
      <Stack.Screen name="resetpassword" options={{ title: 'Reset Password', headerStyle: { backgroundColor: '#fff' } }} />
    </Stack>
  );
}

function MyDrawer() {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator screenOptions={{ headerShown: false, drawerStyle: {
      width: 200, // Set width of the drawer
      backgroundColor: '#f7f7f7', // Set background color of the drawer
    },}} >
      <Drawer.Screen name="Home" component={HomeStack} options={{ drawerIcon: ({ color, size }) => (<Icon name="home" color={color} size={size} />) }} />
      <Drawer.Screen name="Shop Details" component={shopDetails} options={{ drawerIcon: ({ color, size }) => (<Icon name="store" color={color} size={size} />) }} />
      <Drawer.Screen name="Active Offers" component={ActiveOffers} options={{ drawerIcon: ({ color, size }) => (<Icon name="local-offer" color={color} size={size} />) }} />
      <Drawer.Screen name="Rating" component={Rating} options={{ drawerIcon: ({ color, size }) => (<Ico name="star" color={color} size={size} />) }} />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
      <MyDrawer/>
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
