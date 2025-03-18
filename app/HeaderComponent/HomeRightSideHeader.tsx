import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation
import Icon from 'react-native-vector-icons/MaterialIcons';
import Ico from 'react-native-vector-icons/FontAwesome';
import { Stack } from 'expo-router';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { HomeDrowerScreenNavigationProp } from '../../types/navigation';
import Account from '../DrawerScreens/EditAccount';


const ShopDetails = () => {
  const navigation = useNavigation<HomeDrowerScreenNavigationProp>();
  const [blinkAnim] = useState(new Animated.Value(1)); // 1 is the initial opacity

  useEffect(() => {
    // Blink the button text by continuously animating its opacity
    Animated.loop(
      Animated.sequence([
        Animated.timing(blinkAnim, {
          toValue: 0, // Fade out
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(blinkAnim, {
          toValue: 1, // Fade in
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [blinkAnim]);

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      {/* Add Shop Details Button with blinking effect */}
      <TouchableOpacity style={styles.customButton} onPress={() => navigation.navigate('AddShopDetails')}>
        <Animated.View style={{ opacity: blinkAnim }}>
          <Text style={styles.buttonText}>Add Shop Details</Text>
        </Animated.View>
      </TouchableOpacity>
      {/* Profile Icon */}
      <TouchableOpacity onPress={() => navigation.navigate('Account')}>
        <Icon name="account-circle" size={30} color="#000" style={{ marginLeft: 8,marginRight:4 }} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  customButton: {
    backgroundColor: 'tomato',  // Red background color
    paddingVertical: 6,     // Vertical padding
    paddingHorizontal: 20,   // Horizontal padding
    borderRadius: 8,
    marginRight: 42,       // Border radius for rounded corners
  },
  buttonText: {
    color: 'black',          // White text color
    fontSize: 16,            // Font size
    fontWeight: 'bold',      // Bold text
  },
});

export default ShopDetails;