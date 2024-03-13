import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import DropDownPicker from 'react-native-dropdown-picker';

const MedicineScreen = () => {
  const navigation = useNavigation();
  const medicineData = [
    { label: 'Medicine A', value: 'Medicine A' },
    { label: 'Medicine B', value: 'Medicine B' },
    { label: 'Medicine C', value: 'Medicine C' },
  ];
  const [selectedMedicine, setSelectedMedicine] = useState(medicineData[0].value);

  const handleGoBack = () => {
    navigation.goBack();
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
      <View style={styles.container}>
        {/* Dropdown */}
        <DropDownPicker
          items={medicineData}
          defaultValue={selectedMedicine}
          containerStyle={{ height: 40, width: 200 }}
          style={{ backgroundColor: '#fafafa' }}
          itemStyle={{
            justifyContent: 'flex-start'
          }}
          dropDownStyle={{ backgroundColor: '#fafafa' }}
          onChangeItem={item => setSelectedMedicine(item.value)}
        />
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MedicineScreen;
