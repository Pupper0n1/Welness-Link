import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Button, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';

export const SymptomsScreen = () => {
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [intensity, setIntensity] = useState('');
  const [notes, setNotes] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [symptoms, setSymptoms] = useState([]);

  useEffect(() => {
    fetchSymptoms();
  }, []);

  const fetchSymptoms = async () => {
    try {
      const response = await fetch('http://192.168.255.242:8000/symptom');
      if (response.ok) {
        const fetchedSymptoms = await response.json();
        setSymptoms(fetchedSymptoms);
      } else {
        Alert.alert('Error', 'Failed to fetch symptoms. Please try again later.');
      }
    } catch (error) {
      console.error('Error fetching symptoms:', error);
      Alert.alert('Error', 'An error occurred while fetching symptoms. Please try again later.');
    }
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  const handleAdd = async () => {
    if (!value) {
      Alert.alert('Error', 'Please select a symptom.');
      return;
    }

    if (!intensity) {
      Alert.alert('Error', 'Please enter the intensity of the symptom.');
      return;
    }

    try {
      const formattedDate = formatDate(date);
      const response = await fetch('http://192.168.255.242:8000/symptom/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ symptomId: value, intensity: parseInt(intensity, 10), notes, date: formattedDate }),
      });

      if (response.ok) {
        Alert.alert('Success', 'Symptom added successfully.', [
          { text: 'OK', onPress: () => navigation.goBack() }
        ]);
        setValue(null);
        setIntensity('');
        setNotes('');
        setDate(new Date());
      } else {
        Alert.alert('Error', 'Failed to add symptom. Please try again later.');
      }
    } catch (error) {
      console.error('Error adding symptom:', error);
      Alert.alert('Error', 'An error occurred while adding symptom. Please try again later.');
    }
  };

  return (
    <>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack}>
          <MaterialIcons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Add Symptoms</Text>
      </View>

      {/* Content */}
      <Text style={styles.label}>Symptom</Text>
      <View style={styles.container}>
        
        {/* Dropdown */}
        <DropDownPicker
          open={open}
          value={value}
          items={symptoms.map(symptom => ({ label: symptom.name, value: symptom.id }))}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setSymptoms}
          containerStyle={{ width: '90%' }}
          placeholder="Select Symptom"
        />
      </View>

      <Text style={styles.label}>Intensity (0-10)</Text>
      <TextInput style={styles.smallInput} placeholder="5/10" keyboardType="numeric" value={intensity} onChangeText={setIntensity}></TextInput>

      {/* Input for Notes */}
      <Text style={styles.label}>Symptom Notes</Text>
        <TextInput
            style={styles.input}
            multiline={true}
            numberOfLines={4}
            placeholder="Feeling weak and dehydrated..."
            onChangeText={text => setNotes(text)}
            value={notes}
      />

      {/* Symptom Date Picker */}

        <Text style={styles.label}>Symptom Date</Text>

        <View style={styles.container}>
            <TouchableOpacity onPress={showDatepicker} style={styles.addButton}>
            <Text style={styles.buttonText}>Select Symptom Date</Text>
            </TouchableOpacity>
            {showDatePicker && (
            <DateTimePicker
                value={date}
                mode="date"
                display="default"
                onChange={onChange}
                maximumDate={new Date()}
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
    marginTop: 100,
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

export default SymptomsScreen;
