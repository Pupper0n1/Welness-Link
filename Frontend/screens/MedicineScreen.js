import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Button, TextInput, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';

export const MedicineScreen = () => {
  const navigation = useNavigation();

  const [selectedDays, setSelectedDays] = useState([]);

  const toggleDay = (day) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter((d) => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchMedicines();
  }, []);

  const fetchMedicines = async () => {
    try {
      const response = await fetch('http://192.168.255.242:8000/medicine');
      if (response.ok) {
        const medicines = await response.json();
        const medicineItems = medicines.map((medicine) => ({
          label: medicine.name,
          value: medicine.id,
        }));
        setItems(medicineItems);
      } else {
        Alert.alert('Error', 'Failed to fetch medicines. Please try again later.');
      }
    } catch (error) {
      console.error('Error fetching medicines:', error);
      Alert.alert('Error', 'An error occurred while fetching medicines. Please try again later.');
    }
  };

  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [expiryDate, setExpiryDate] = useState(null);
  const [dosage, setDosage] = useState(0);
  const [totalPills, setTotalPills] = useState('');

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
    setExpiryDate(currentDate);
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  const handleAdd = async () => {
    try {
      const medicineId = value;
      
      if (!medicineId) {
        Alert.alert('Error', 'Please select a medicine.');
        return;
      }
  
      if (!dosage) {
        Alert.alert('Error', 'Please enter the dosage.');
        return;
      }
  
      if (!totalPills) {
        Alert.alert('Error', 'Please enter the total number of pills.');
        return;
      }
  
      if (selectedDays.length === 0) {
        Alert.alert('Error', 'Please select at least one day.');
        return;
      }
  
      if (!expiryDate) {
        Alert.alert('Error', 'Please select the expiry date.');
        return;
      }
  
      const formattedExpiryDate = expiryDate.toISOString().split('T')[0];

      const formattedSelectedDays = selectedDays.map(day => {
        return { day: day.toString() };
      });
  
      const response = await fetch('http://192.168.255.242:8000/medicine/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ medicineId, dosage: parseInt(dosage), total: parseInt(totalPills), days: formattedSelectedDays, expires: formattedExpiryDate }),
      });
  
      if (response.ok) {
        Alert.alert('Success', 'Medicine added successfully.', [
          {
            text: 'OK',
            onPress: () => {
              navigation.goBack();
            }
          }
        ]);
      } else {
        Alert.alert('Error', 'Failed to add medicine. Please try again later.');
      }
    } catch (error) {
      console.error('Error adding medicine:', error);
      Alert.alert('Error', 'An error occurred while adding medicine. Please try again later.');
    }
  };
  
  return (
    <>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack}>
          <MaterialIcons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Add Medicine</Text>
      </View>

      <Text style={styles.label}>Medicine Name</Text>
      <View style={styles.container}>
        
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          containerStyle={{ width: '90%' }}
          placeholder="Select Medicine"
        />
      </View>

      <Text style={styles.label}>Dosage in mg</Text>
      <TextInput style={styles.smallInput} placeholder="Dosage in mg" keyboardType="numeric" value={dosage.toString()} onChangeText={setDosage}></TextInput>

      <Text style={styles.label}>Total Number of Pills</Text>
      <TextInput style={styles.smallInput} placeholder="Total number of pills" keyboardType="numeric" value={totalPills.toString()} onChangeText={setTotalPills}></TextInput>

      <View style={styles.daySelectionContainer}>
        <Text style={styles.label}>Select Days</Text>
        <View style={styles.dayButtons}>
          {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day) => (
            <TouchableOpacity
              key={day}
              style={[styles.dayButton, selectedDays.includes(day) && styles.selectedDayButton]}
              onPress={() => toggleDay(day)}>
              <Text style={[styles.dayButtonText, selectedDays.includes(day) && styles.selectedDayButtonText]}>
                {day}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <Text style={styles.label}>Expiry Date</Text>

      <View style={styles.container}>
          <TouchableOpacity onPress={showDatepicker} style={styles.addButton}>
          <Text style={styles.buttonText}>Select Expiry Date</Text>
          </TouchableOpacity>
          {showDatePicker && (
          <DateTimePicker
              value={date}
              mode="date"
              display="default"
              onChange={onChange}
          />
          )}
      </View>

      <View style={styles.addButtonContainer}>
          <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
              <Text style={styles.buttonText}>Add</Text>
          </TouchableOpacity>
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
    marginTop: 0,
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
    marginTop: 10,
    marginLeft: 20,
    marginBottom: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    marginTop: 10,
    marginLeft: 20,
    width: '90%',
    height: 150,
    borderColor: 'black',
    borderRadius: 10,
    backgroundColor: 'white',
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  smallInput: {
    marginTop: 10,
    marginLeft: 20,
    width: '90%',
    height: 50,
    borderColor: 'black',
    borderRadius: 10,
    backgroundColor: 'white',
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 13,
  },
  addButtonContainer: {
    marginTop: 50,
    alignItems: 'center',
  },
  addButton: {
    backgroundColor: '#38bef8',
    paddingLeft: 50,
    paddingRight: 50,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  daySelectionContainer: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 0,
  },
  dayButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  dayButton: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    margin: 5,
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 5,
  },
  selectedDayButton: {
    backgroundColor: '#333',
  },
  dayButtonText: {
    fontSize: 16,
    color: '#333',
  },
  selectedDayButtonText: {
    color: '#fff',
  },
});

export default MedicineScreen;
