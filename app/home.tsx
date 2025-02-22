import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { loginScreenNavigationProp } from '../types/navigation';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // AsyncStorage for React Native

const Home = () => {
    const navigation = useNavigation<loginScreenNavigationProp>();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null); // error can be either string or null

    useEffect(() => {
        const fetchHomeData = async () => {
            try {
                // Get the JWT token from AsyncStorage
                const token = await AsyncStorage.getItem('jwtToken');

                if (!token) {
                    setError('Token not found, please log in again.');
                    setLoading(false);
                    return;
                }
                const response = await axios.get('http://192.168.1.2:8082/auth/details', {
                    headers: {
                        'Authorization': `Bearer ${token}`,  // Attach JWT token in Authorization header
                    },
                });

                // Set the response data
                setData(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching home data', error);
                if (error) {
                    navigation.navigate('index');
                }
                setLoading(false);
            }
        };

        fetchHomeData();
    }, []);  // The effect runs only once when the component mounts

    // Show loading spinner while fetching data
    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    // Handle any error that occurred during the API call
    if (error) {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Error: {error}</Text>
            </View>
        );
    }

    // Show the fetched data
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{data ? data : 'No data available'}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        textAlign: 'center',
        fontSize: 18,
    },
});

export default Home;
