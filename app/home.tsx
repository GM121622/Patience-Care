import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, Image, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { StarRatingDisplay } from 'react-native-star-rating-widget';
import { useNavigation } from '@react-navigation/native';
import { editProductDetailsScreenNavigationProp } from '../types/navigation';
import AsyncStorage from '@react-native-async-storage/async-storage'; // For storing and retrieving JWT token

const products = [
  {
    id: '1',
    brand: 'Document Name',
    title: 'Document value',
    image: require('../assets/images/applogo.png'),
  },
  {
    id: '2',
    brand: 'Document Name',
    title: 'Document value',
    image: require('../assets/images/applogo.png'),
  },
  {
    id: '3',
    brand: 'Document Name',
    title: 'Document value',
    image: require('../assets/images/applogo.png'),
  },
  {
    id: '4',
    brand: 'Document Name',
    title: 'Document value',
    image: require('../assets/images/applogo.png'),
  },
];

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(products);
  const navigation = useNavigation<editProductDetailsScreenNavigationProp>();
  const [lastTap, setLastTap] = useState(0);
  const [token, setToken] = useState<string | null>(null); // State to store JWT token

  // Check for JWT token on component mount
  useEffect(() => {
    const checkAuthentication = async () => {
      const storedToken = await AsyncStorage.getItem('jwtToken'); // Retrieve token from AsyncStorage
      if (storedToken) {
        setToken(storedToken); // Set token in state
      } else {
        // Redirect to login if no token is found
        Alert.alert('Authentication Required', 'Please log in to access this page.');
        navigation.navigate('index'); // Replace 'Login' with your login screen name
      }
    };

    checkAuthentication();
  }, [navigation]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = products.filter(product =>
      product.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const handleAddProduct = () => {
    if (token) {
      navigation.navigate('AddProductDetails');
    } else {
      Alert.alert('Authentication Required', 'Please log in to add a product.');
      navigation.navigate('Login'); // Redirect to login if no token is found
    }
  };

  const handleDoubleClick = (productId) => {
    const currentTime = Date.now();
    const timeDiff = currentTime - lastTap;

    if (timeDiff < 300 && timeDiff > 0) {  // Double click detected (300ms interval)
      if (token) {
        console.log('Navigating to EditProduct');
        navigation.navigate('EditProduct');
      } else {
        Alert.alert('Authentication Required', 'Please log in to edit a product.');
        navigation.navigate('Login'); // Redirect to login if no token is found
      }
    }
    setLastTap(currentTime);
  };

  const renderProduct = ({ item }) => (
    <View style={styles.card}>
      <TouchableOpacity onPress={() => handleDoubleClick(item.id)}>
        <Image source={item.image} style={styles.productImage} />
        <Text style={styles.brandName}>{item.brand}</Text>
        <Text style={styles.productName}>{item.title}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchBarContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search Document..."
          value={searchQuery}
          onChangeText={handleSearch}
        />
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={() => handleSearch(searchQuery)}>
            <Icon name="search" size={20} color="gray" style={styles.searchIcon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleAddProduct}>
            <Icon name="add-circle" size={40} color="green" style={styles.addIcon} />
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        renderItem={renderProduct}
        numColumns={2}
        contentContainerStyle={styles.grid}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 15,
    marginVertical: 10,
    marginLeft: 18,
  },
  searchBar: {
    flex: 1,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    paddingLeft: 15,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchIcon: {
    marginLeft: -30,
  },
  addIcon: {
    marginLeft: 10,
    marginRight: 3,
  },
  grid: {
    padding: 10,
  },
  card: {
    flex: 1,
    margin: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 3,
    alignItems: 'center',
    padding: 10,
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
    alignSelf: 'center',
  },
  brandName: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  productName: {
    fontSize: 14,
    marginBottom: 5,
    textAlign: 'center',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  previousPrice: {
    fontSize: 12,
    textDecorationLine: 'line-through',
    color: '#888',
    marginRight: 5,
  },
  currentPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
  discount: {
    fontSize: 12,
    color: 'green',
    marginLeft: 5,
  },
});

export default App;