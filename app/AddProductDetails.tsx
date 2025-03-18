import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Modal, KeyboardAvoidingView, ScrollView, Platform, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as ImagePicker from 'expo-image-picker';
import { addProductDetailsScreenNavigationProp } from '../types/navigation';
import { useNavigation } from '@react-navigation/native';
import ImageViewer from 'react-native-image-zoom-viewer';
import axios from 'axios'; // Import axios for API calls
import { API_URL } from "./constants";

export default function ProductForm() {
  const [productName, setProductName] = useState<string>('');
  const [brandName, setBrandName] = useState<string>('');
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [productDetails, setProductDetails] = useState('');
  const [productNameError, setProductNameError] = useState<string>('');
  const [imageError, setImageError] = useState<string>('');
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const [hasGalleryPermission, setHasGalleryPermission] = useState<boolean | null>(null);
  const [save, setSave] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [textAreaHeight, setTextAreaHeight] = useState(40);

  const navigation = useNavigation<addProductDetailsScreenNavigationProp>();

  useEffect(() => {
    // Request camera and gallery permissions
    (async () => {
      const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
      const mediaLibraryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();

      setHasCameraPermission(cameraStatus.granted);
      setHasGalleryPermission(mediaLibraryStatus.granted);
    })();
  }, []);

  // Handle camera launch
  const handleCameraLaunch = async () => {
    if (hasCameraPermission) {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setImageUri(result.assets[0].uri);
        setImageError('');
      } else {
        setImageError('You have cancelled the camera capture.');
      }
    } else {
      setImageError('Camera permission is required to take a picture.');
    }
  };

  // Handle gallery launch
  const handleGalleryLaunch = async () => {
    if (hasGalleryPermission) {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        setImageUri(result.assets[0].uri);
        setImageError('');
      } else {
        setImageError('You have cancelled the image selection.');
      }
    } else {
      setImageError('Gallery permission is required to select an image.');
    }
  };

  const handleSave = async () => {
    let valid = true;

    if (productName.trim() === '') {
      setProductNameError('Please add document name.');
      valid = false;
    } else {
      setProductNameError('');
    }

    if (!imageUri) {
      setImageError('Please select a document image.');
      valid = false;
    } else {
      setImageError('');
    }

    if (valid) {
      try {
        // Convert image URI to base64
        if (!imageUri) {
          throw new Error('Image URI is null');
        }
        const response = await fetch(imageUri);
        const blob = await response.blob();
        const base64Image = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        });

        // Prepare the document data
        const documentData = {
          documentName: productName,
          documentImage: base64Image,
          documentValue: brandName,
          moreDetails: productDetails,
        };

        // Send the data to the backend API
        const apiResponse = await axios.post(`${API_URL}/doc/upload`, documentData, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (apiResponse.status === 200) {
          Alert.alert('Success', 'Document saved successfully!');
          console.log('API Response:', apiResponse.data);
          setSave(true);
          navigation.goBack();
        }
      } catch (error) {
        console.error('Error saving document:', error);
        Alert.alert('Error', 'Failed to save document. Please try again.');
      }
    }
  };

  const openZoomableImage = () => {
    setIsModalVisible(true);
  };

  const closeZoomableImage = () => {
    setIsModalVisible(false);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.title}>Documents</Text>

        <TextInput
          style={[styles.input, productNameError ? styles.errorInput : null]}
          placeholder="Enter document name"
          placeholderTextColor="#888"
          value={brandName}
          onChangeText={setBrandName}
        />

        <TextInput
          style={[styles.input, productNameError ? styles.errorInput : null]}
          placeholder="Enter document value"
          placeholderTextColor="#888"
          value={productName}
          onChangeText={setProductName}
        />
        {productNameError ? (
          <Text style={styles.productErrorText}>{productNameError}</Text>
        ) : null}

        <View style={styles.imageContainer}>
          <TouchableOpacity style={styles.imageButton}>
            <Text style={styles.imageButtonText}>Select document image</Text>
            <Icon
              name="camera-alt"
              size={35}
              color="#000"
              style={styles.icon}
              onPress={handleCameraLaunch}
            />
            <Icon
              name="add-circle"
              size={35}
              color="#000"
              style={styles.icon}
              onPress={handleGalleryLaunch}
            />
          </TouchableOpacity>
          {imageUri && (
            <TouchableOpacity onPress={openZoomableImage}>
              <Image source={{ uri: imageUri }} style={styles.selectedImage} />
            </TouchableOpacity>
          )}
          {imageError ? (
            <Text style={styles.errorText}>{imageError}</Text>
          ) : null}
        </View>

        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Add more details about document..."
          placeholderTextColor="#888"
          multiline
          value={productDetails}
          onChangeText={setProductDetails}
          onContentSizeChange={(e) => {
            const { height } = e.nativeEvent.contentSize;
            setTextAreaHeight(height);
          }}
        />

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>

        <Modal visible={isModalVisible} transparent={true} animationType="fade">
          <ImageViewer
            imageUrls={[{ url: imageUri || '' }]}
            onClick={closeZoomableImage}
          />
        </Modal>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  scrollView: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
    color: '#000',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    marginVertical: 8,
    backgroundColor: '#fff',
  },
  errorInput: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginTop: 5,
  },
  productErrorText: {
    color: 'red',
    fontSize: 14,
    marginTop: -5,
    marginLeft: 65,
  },
  imageContainer: {
    marginVertical: 10,
    alignItems: 'center',
  },
  imageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingVertical: 10,
    backgroundColor: '#fff',
    height: 45,
  },
  imageButtonText: {
    fontSize: 16,
    color: '#000',
    marginLeft: 10,
    marginRight: 65,
  },
  icon: {
    marginRight: 12,
    marginBottom: -10,
    marginTop: -10,
  },
  selectedImage: {
    width: 200,
    height: 140,
    marginTop: 10,
    borderRadius: 10,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  saveButton: {
    backgroundColor: 'tomato',
    paddingVertical: 15,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});