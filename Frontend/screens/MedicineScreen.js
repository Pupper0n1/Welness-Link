import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';

export const MedicineScreen = () => {
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Medicine A', value: 'MedA'},
    {label: 'Medicine B', value: 'MedB'},
    {label: 'Medicine C', value: 'MedC'}
  ]);

  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [expiryDate, setExpiryDate] = useState(null);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
    setExpiryDate(currentDate);
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  return (
    <>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack}>
          <MaterialIcons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Medicine</Text>
      </View>

      {/* Content */}
      <Text style={styles.label}>Medicine name</Text>
      <View style={styles.container}>
        
        {/* Dropdown */}
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          containerStyle={{ width: '80%' }}
          placeholder="Medicine name"
        />
      </View>

      {/* Expiry Date Picker */}

        <Text style={styles.label}>Expiry Date</Text>

        <View style={styles.container}>

        <Button onPress={showDatepicker} title="Select Expiry Date" />
        {expiryDate && <Text style={styles.selectedDate}>Expiry Date is set to: {expiryDate.toLocaleDateString()}</Text>}
        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={onChange}
          />
        )}
        </View>
    </>
  );
};


const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginTop: 35,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  container: {
    alignItems: 'center',
  },
  label: {
    marginTop: 20,
    marginLeft: 45,
    marginBottom: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MedicineScreen;
