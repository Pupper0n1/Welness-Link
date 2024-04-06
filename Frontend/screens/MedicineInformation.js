import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';

const MedicineInformation = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { medicine } = route.params;
  const [company, setCompany] = useState(null);

  const handleGoBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    fetch(`http://192.168.255.242:8000/company/${medicine.companyId}`)
      .then(response => response.json())
      .then(data => setCompany(data))
      .catch(error => console.error('Error fetching company:', error));
  }, [medicine.companyId]);

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
        <Text style={styles.text}>Type: {medicine.DIN}</Text>
        <Image source={{ uri: `http://192.168.255.242:8000/medicine/image/${medicine.image}` }} style={{ height: 50, width: 50 }} />
        {company && (
          <>
            <Text style={styles.text}>Company: {company.name}</Text>
            <Image source={{ uri: `http://192.168.255.242:8000/company/image/${company.logo}` }} style={{ height: 50, width: 50 }} />
          </>
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
