import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Button, TextInput, Alert, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import link from '../link.json';

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

  const [doctorId, setDoctorId] = useState(null);
  const [time, setTime] = useState('');
  const [open1, setOpen1] = useState(false);
  const [value1, setValue1] = useState(null);
  const [items1, setItems1] = useState([]);
  const [availableTimes, setAvailableTimes] = useState([]);

  const fetchAppointments = (selectedTime) => {
    if (doctor) {
      const formattedDate = selectedTime.toISOString().split('T')[0];
      console.log(formattedDate);
      const endpoint = `http://192.168.255.242:8000/appointment/${doctor}?day=${formattedDate}`;
      console.log("API call to endpoint: ", endpoint);

      fetch(endpoint)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log("Response from endpoint:", data);
        // generateAvailableTimes(data);
        const availableTimes = generateAvailableTimes(data);
        setAvailableTimes(availableTimes);
        setItems1(availableTimes.map(time => ({ label: time, value: time })));
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
    } else {
      console.error("Doctor ID is not selected.");
    }
  };

  const generateAvailableTimes = (bookedTimes) => {
    const availableTimesList = [];
    for (let i = 8; i <= 15; i++) {
        const time = `${i.toString().padStart(2, '0')}:00:00`;
        if (!bookedTimes.includes(time)) {
            availableTimesList.push(time);
        }
        const time2 = `${i.toString().padStart(2, '0')}:30:00`;
        if (!bookedTimes.includes(time2)) {
            availableTimesList.push(time2);
        }
    }
    return availableTimesList;
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await fetch(`${link.link}/doctor`);
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
    // const modifiedDate = new Date(date.getTime() - 86400000);
    const formattedDate = date.toISOString().split('T')[0];
    if (!doctor) {
      Alert.alert('Error', 'Please select a doctor.');
      return;
    }
    if (!date) {
      Alert.alert('Error', 'Please select an appointment date.');
      return;
    }

    console.log(date);
    console.log(formattedDate);
    console.log(`${formattedDate}T${value1}`);

    try {
      const response = await fetch(`${link.link}/appointment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          doctorId: doctor,
          date: `${formattedDate}T${value1}`,
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

  const dateTest = (selectedDate) => {
    // selectedDate = new Date(selectedDate.getTime() - 86400000)
    fetchAppointments(selectedDate);
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
      <ScrollView>
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
              dateTest(selectedDate);
            }}
          />
        )}
      </View>

      {/* Appointment Time Picker */}
      <Text style={styles.label}>Appointment Time</Text>
      <View style={styles.container}>
        {/* Dropdown */}
        <DropDownPicker
          open={open1}
          value={value1}
          // items={items1}
          items={availableTimes.map(time => ({ label: time, value: time }))}
          setOpen={setOpen1}
          setValue={setValue1}
          // setItems={setItems1}
          containerStyle={{ width: '90%' }}
          placeholder="Time"
          onChangeValue={(selectedTime) => setTime(selectedTime)}
        />
      </View>

      {/* Add Button */}
      <View style={styles.addButtonContainer}>
        <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
      </View>
      </ScrollView>

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
    height: 50,
    borderColor: 'black',
    borderRadius: 10,
    backgroundColor: 'white',
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  addButtonContainer: {
    marginTop: 210,
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
