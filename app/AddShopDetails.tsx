import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Picker } from '@react-native-picker/picker';
import * as Location from "expo-location";
import Icon from "react-native-vector-icons/MaterialIcons";
import axios from "axios";
import { addShopDetailsScreenNavigationProp } from "../types/navigation";
import { useNavigation } from '@react-navigation/native';

const ShopDetailsScreen = () => {
  const [shopName, setShopName] = useState("");
  const [location, setLocation] = useState("");  
  const [formattedAddress, setFormattedAddress] = useState("");  
  const [status, setStatus] = useState("Open");
  const [details, setDetails] = useState("");
  const [shopNameError, setShopNameError] = useState("");  // Error message for shop name
  const [locationError, setLocationError] = useState("");  // Error message for location
  
  const GOOGLE_API_KEY = "YsQ"; 
  const navigation = useNavigation<addShopDetailsScreenNavigationProp>();

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const requestLocationPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setLocationError("Permission to access location was denied.");
    }
  };

  const handleGetLocation = async () => {
    try {
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      const { latitude, longitude } = location.coords;
      fetchAddressFromCoordinates(latitude, longitude);
    } catch (error) {
      setLocationError("Unable to fetch location. Please try again.");
      console.error(error);
    }
  };

  // Function to get address from Google Places API
  const fetchAddressFromCoordinates = async (latitude, longitude) => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_API_KEY}`
      );

      if (response.data.status === "OK") {
        const results = response.data.results;
        if (results.length > 0) {
          const formattedAddress = results[0].formatted_address;
          setFormattedAddress(formattedAddress);
        } else {
          setLocationError("No address found for this location.");
        }
      } else {
        setLocationError("Failed to fetch address.");
      }
    } catch (error) {
      setLocationError("An error occurred while fetching address.");
      console.error(error);
    }
  };

  const handleSave = () => {
    let valid = true;
    // Validate Shop Name
    if (!shopName.trim()) {
      setShopNameError("Please add shop name!");
      valid = false;
    } else {
      setShopNameError("");  // Clear the error if valid
    }

    // Validate Location
    if (!location.trim() && !formattedAddress) {
      setLocationError("Please add location!");
      valid = false;
    } else {
      setLocationError("");  // Clear the error if valid
    }

    if (valid) {
      // If all fields are valid, show success message and navigate back
      console.log("Shop details saved successfully!");
      alert("Shop details saved successfully!");
      navigation.goBack();
      console.log({
        shopName,
        location,
        formattedAddress,
        status,
        details,
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Thriftes</Text>

      <TextInput
        style={[
          styles.input,
          shopNameError && styles.errorInput,
        ]}
        placeholder="Enter shop name"
        value={shopName}
        onChangeText={setShopName}
      />
      {shopNameError ? (
        <Text style={styles.errorText}>{shopNameError}</Text>
      ) : null}

      <View style={styles.inputWithIcon}>
        <TextInput
          style={[
            styles.inputText,
            (locationError || !location.trim() && !formattedAddress) && styles.errorInput,
          ]}
          placeholder="Enter shop location"
          value={location || formattedAddress}
          onChangeText={setLocation}
        />
        <TouchableOpacity onPress={handleGetLocation}>
          <Icon name="location-pin" size={24} color="#000" style={styles.icon} />
        </TouchableOpacity>
      </View>
      {locationError ? (
        <Text style={styles.errorText}>{locationError}</Text>
      ) : null}

      {formattedAddress ? (
        <Text style={styles.addressText}>{`Address: ${formattedAddress}`}</Text>
      ) : null}

      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={status}
          onValueChange={(itemValue) => setStatus(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Open" value="Open" />
          <Picker.Item label="Closed" value="Closed" />
        </Picker>
      </View>

      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Enter more details about shop and product..."
        value={details}
        onChangeText={setDetails}
        multiline
        numberOfLines={4}
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    alignItems: "center",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    marginBottom: 15,
  },
  inputWithIcon: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    marginBottom: 15,
  },
  inputText: {
    flex: 1,
    fontSize: 16,
    color: "#000",
  },
  icon: {
    marginLeft: 10,
  },
  addressText: {
    fontSize: 16,
    color: "green",
    marginBottom: 10,
  },
  pickerContainer: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 15,
    marginBottom: 15,
    justifyContent: "center",
    backgroundColor: "#fff",
    overflow: "hidden",
  },
  picker: {
    width: "100%",
    height: "110%",
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  saveButton: {
    backgroundColor: "tomato",
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  errorInput: {
    borderColor: "red", // Turns the border red when there's an error
  },
  errorText: {
    color: "red",  // Error message text is red
    fontSize: 14,
    marginTop: -15,
    marginBottom: 10,


  },
});

export default ShopDetailsScreen;
