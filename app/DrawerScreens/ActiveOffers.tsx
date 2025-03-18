import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; // Add icons (optional)

export default function SpecialOfferForm() {
  const [priceBefore, setPriceBefore] = useState('');
  const [priceAfter, setPriceAfter] = useState('');
  const [discountPercentage, setDiscountPercentage] = useState('');
  const [validFrom, setValidFrom] = useState(null); // State for "Valid from" date
  const [validTo, setValidTo] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false); // State for date picker visibility
  const [currentDateField, setCurrentDateField] = useState(''); // Track which field is being edited
  const navigation = useNavigation<addSpecialOfferDetailsScreenNavigationProp>();

  const handleGoBack = () => {
    if (validTo) {
        const options = {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          timeZone: 'Asia/Kolkata', // Ensures IST timezone
        };
        const formattedDate = validTo.toLocaleDateString('en-IN', options);
        alert('Offer automatically will end on ' + formattedDate);
      } else {
        alert('Please select a valid "Valid To" date.');
      }
    navigation.goBack();
  };

  const calculateDiscountPercentage = (before, after) => {
    if (before > 0) {
      const discount = ((before - after) / before) * 100;
      return discount.toFixed(2);
    }
    return '';
  };

  const handlePriceBeforeChange = (value) => {
    const before = parseFloat(value) || 0;
    const after = parseFloat(priceAfter) || 0;
    setPriceBefore(value);
    setDiscountPercentage(calculateDiscountPercentage(before, after));
  };

  const handlePriceAfterChange = (value) => {
    const after = parseFloat(value) || 0;
    const before = parseFloat(priceBefore) || 0;
    setPriceAfter(value);
    setDiscountPercentage(calculateDiscountPercentage(before, after));
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false); // Hide the date picker
    if (selectedDate) {
      if (currentDateField === 'validFrom') {
        setValidFrom(selectedDate);
      } else if (currentDateField === 'validTo') {
        setValidTo(selectedDate);
      }
    }
  };

  const showDatePickerForField = (field) => {
    setCurrentDateField(field);
    setShowDatePicker(true);
  };

  const formatFromDate = (date) => {
    if (!date) return 'Start Date';
    return date.toLocaleDateString();
  };

  const formatToDate = (date) => {
    if (!date) return 'End Date';
    return date.toLocaleDateString();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Special Offer</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter product name"
        placeholderTextColor="#888"
      />
      <View style={styles.rowContainer}>
        <TextInput
          style={[styles.input, styles.halfInput]}
          placeholder="Price before special offer"
          placeholderTextColor="#888"
          keyboardType="numeric"
          value={priceBefore}
          onChangeText={handlePriceBeforeChange}
        />
        <TextInput
          style={[styles.input, styles.halfInput]}
          placeholder="Price after special offer"
          placeholderTextColor="#888"
          keyboardType="numeric"
          value={priceAfter}
          onChangeText={handlePriceAfterChange}
        />
      </View>
      <TextInput
        style={styles.input}
        placeholder="Discount percentage"
        placeholderTextColor="#888"
        keyboardType="numeric"
        value={'Discount : '+discountPercentage+' %'}
        editable={false}
      />
      <View style={styles.rowContainer}>
        <TouchableOpacity
          style={[styles.dateButton, styles.halfInput]}
          onPress={() => showDatePickerForField('validFrom')}
        >
          <View style={styles.dateContent}>
            <Ionicons name="calendar" size={18} color="#888" />
            <Text style={styles.dateText}>{formatFromDate(validFrom)}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.dateButton, styles.halfInput]}
          onPress={() => showDatePickerForField('validTo')}
        >
          <View style={styles.dateContent}>
            <Ionicons name="calendar" size={18} color="#888" />
            <Text style={styles.dateText}>{formatToDate(validTo)}</Text>
          </View>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.saveButton} onPress={handleGoBack}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={new Date()}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleDateChange}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
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
    marginVertical: 10,
    backgroundColor: '#fff',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  halfInput: {
    width: '48%',
  },
  dateButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  dateContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 16,
    color: '#888',
    marginLeft: 8,
  },
  saveButton: {
    backgroundColor: 'tomato',
    paddingVertical: 15,
    borderRadius: 10,
    marginVertical: 15,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});
