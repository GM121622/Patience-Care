import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { StarRatingDisplay } from 'react-native-star-rating-widget';

export default function Rating() {
    return (
        <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
            <StarRatingDisplay rating={2} starSize={40} />
            <Text style={{fontSize: 24, fontWeight: 'bold',marginTop:10}}>Your Shop Rating  </Text>
        </View>
    );
};
