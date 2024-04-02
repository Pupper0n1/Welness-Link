import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Button, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';

export const AppointmentsScreen = () => {
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([]);

  const [doctor, setDoctor] = useState(null);
  const [paragraph, setParagraph] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await fetch('http://192.168.255.242:8000/doctor');
      if (response.ok) {
        const doctors = await response.json();
        const doctorItems = doctors.map((doctor, index) => ({
          label: doctor.name,
          value: doctor.id.toString(),
        }));
        setItems(doctorItems);
      } else {
        Alert.alert('Error', 'Failed to fetch doctors. Please try again later.');
      }
    } catch (error) {
      console.error('Error fetching doctors:', error);
      Alert.alert('Error', 'An error occurred while fetching doctors. Please try again later.');
    }
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  const handleAdd = async () => {
    if (!doctor) {
      Alert.alert('Error', 'Please select a doctor.');
      return;
    }
    if (!date) {
      Alert.alert('Error', 'Please select an appointment date.');
      return;
    }

    try {
      const response = await fetch('http://192.168.255.242:8000/user/appointment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          doctorId: doctor,
          date,
          description: paragraph,
        }),
      });

      if (response.ok) {
        Alert.alert('Success', 'Appointment added successfully.');
        navigation.goBack();
      } else {
        Alert.alert('Error', 'Failed to add appointment. Please try again later.');
      }
    } catch (error) {
      console.error('Error adding appointment:', error);
      Alert.alert('Error', 'An error occurred while adding the appointment. Please try again later.');
    }
  };

  return (
    <>

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack}>
          <MaterialIcons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Add Appointment</Text>
      </View>

      {/* Content */}
      <Text style={styles.label}>Doctor's name</Text>
      <View style={styles.container}>
        {/* Dropdown */}
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          containerStyle={{ width: '90%' }}
          placeholder="Doctor's name"
          onChangeValue={(selectedDoctor) => setDoctor(selectedDoctor)}
        />
      </View>

      {/* Input for Notes */}
      <Text style={styles.label}>Appointment Notes</Text>
      <TextInput
        style={styles.input}
        multiline={true}
        numberOfLines={4}
        placeholder="Must fast for at least 12 hours..."
        onChangeText={(text) => setParagraph(text)}
        value={paragraph}
      />

      {/* Appointment Date Picker */}
      <Text style={styles.label}>Appointment Date</Text>
      <View style={styles.container}>
        <TouchableOpacity onPress={showDatepicker} style={styles.addButton}>
          <Text style={styles.buttonText}>Select Appointment Date</Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              setShowDatePicker(false);
              setDate(selectedDate || date);
            }}
          />
        )}
      </View>

      {/* Add Button */}
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
    marginTop: 20,
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
  addButtonContainer: {
    marginTop: 200,
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
});

export default AppointmentsScreen;
