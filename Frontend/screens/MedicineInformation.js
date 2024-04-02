import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';

const MedicineInformation = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { medicine } = route.params;

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack}>
          <MaterialIcons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Medicine Information</Text>
      </View>

      <View style={styles.container}>
        <Text style={styles.text}>Name: {medicine.name}</Text>
        <Text style={styles.text}>DIN: {medicine.DIN}</Text>
        <Text style={styles.text}>Notes: {medicine.Notes}</Text>
        <Text style={styles.text}>Usage: {medicine.usage}</Text>
        <Text style={styles.text}>Type: {medicine.type}</Text>
        {/* Add more details as needed */}
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
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default MedicineInformation;
