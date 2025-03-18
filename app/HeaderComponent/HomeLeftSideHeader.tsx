import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation
import Icon from 'react-native-vector-icons/MaterialIcons';
import Ico from 'react-native-vector-icons/FontAwesome';
import { Stack } from 'expo-router';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { HomeDrowerScreenNavigationProp } from '../../types/navigation';


 const ShopDetails=()=>{
      const navigation = useNavigation<HomeDrowerScreenNavigationProp>();

  return (
   <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center',marginLeft:5 }}>
               <TouchableOpacity onPress={() => navigation.openDrawer()}>
                 <Icon name="menu" size={30} color="#000" /> {/* Drawer icon */}
               </TouchableOpacity>
             </View>
  )
}

export default ShopDetails;