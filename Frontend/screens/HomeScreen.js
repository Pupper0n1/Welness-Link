import { React, useState, useEffect, useCallback } from 'react';
import { View, Text, ScrollView, StatusBar, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import Animated, { FadeIn, FadeInDown, FadeInUp } from 'react-native-reanimated';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Tab = createBottomTabNavigator();

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
        width: '100%',
    },
    container: {
        alignItems: 'center',
    },
    welcomeText: {
        margin: 10,
        marginBottom: 20,
        fontSize: 25,
        fontStyle: 'italic',
    },
    view: {
      backgroundColor: '#38bdf8',
      width: '95%',
      borderRadius: 15,
      height: 135,
      marginBottom: 20,
      elevation: 10,
    },
    text: {
        color: 'white',
        marginTop: 15,
        margin: 10,
        fontSize: 20,
    },
    description: {
        color: 'white',
        marginLeft: 10,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    addButton: {
        fontSize: 30,
        marginRight: 10,
    },
    profileInfo: {
        fontSize: 20,
        margin: 10,
    },
    label: {
        fontSize: 15,
        marginLeft: 20,
        marginTop: 20,
        marginBottom: 5,
    },
    line: {
        borderBottomWidth: 1,
        borderColor: '#38bdf8',
        marginVertical: 10,
    }
  });

const EventsScreen = () => {
  const navigation = useNavigation();
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState({});

  const handleAddAppointment = () => {
    navigation.navigate('Appointments');
  };

  const handleAddSymptom = () => {
    navigation.navigate('Symptoms');
  };

  const formatAppointmentDate = (dateString) => {
    const dateObject = new Date(dateString);
    const year = dateObject.getFullYear();
    const month = ('0' + (dateObject.getMonth() + 1)).slice(-2);
    const day = ('0' + dateObject.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  };

  const fetchAppointments = async () => {
    try {
      const response = await fetch('http://192.168.255.242:8000/user/me/appointments');
      if (response.ok) {
        const userAppointments = await response.json();
        setAppointments(userAppointments);
      } else {
        console.error('Failed to fetch user appointments');
      }
    } catch (error) {
      console.error('Error occurred while fetching user appointments:', error);
    }
  };

  const fetchDoctors = async () => {
    try {
      const response = await fetch('http://192.168.255.242:8000/doctor');
      if (response.ok) {
        const doctorData = await response.json();
        const doctorMap = {};
        doctorData.forEach(doctor => {
          doctorMap[doctor.id] = doctor.name;
        });
        setDoctors(doctorMap);
      } else {
        console.error('Failed to fetch doctors');
      }
    } catch (error) {
      console.error('Error occurred while fetching doctors:', error);
    }
  };

  useEffect(() => {
    fetchAppointments();
    fetchDoctors();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchAppointments();
      fetchDoctors();
    }, [])
  );

    return(
    <>
    <ScrollView style={styles.scrollView}>

        <View style={styles.header}>
          <Text style={styles.welcomeText}>Upcoming Appointments,</Text>
          <TouchableOpacity onPress={handleAddAppointment}>
            <Text style={styles.addButton}>+</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.container}>
          <StatusBar backgroundColor="black" barStyle="light-content" />
          {appointments.map(appointment => (
            <View key={appointment.id} style={styles.view}>
              <Text style={styles.text}>{`Dr. ${doctors[appointment.doctorId] || 'Unknown'}`}</Text>
              <Text style={styles.description}>{`Date: ${formatAppointmentDate(appointment.date)}`}</Text>
              <Text style={styles.description}>{`Notes: ${appointment.description}`}</Text>
            </View>
          ))}
        </View>



    <View style={styles.header}>
    <Text style={styles.welcomeText}>Symptoms Tracking,</Text>
    <TouchableOpacity onPress={handleAddSymptom}>
        <Text style={styles.addButton}>+</Text>
    </TouchableOpacity>
    </View>

    
    <View style={styles.container}>
      <View style={styles.view}>
        <Text style={styles.text}>Fever</Text>
        <Text style={styles.description}>Starting Date: </Text>
        <Text style={styles.description}>Notes: </Text>
      </View>

      <View style={styles.view}>
        <Text style={styles.text}>Fever</Text>
        <Text style={styles.description}>Starting Date: </Text>
        <Text style={styles.description}>Notes: </Text>
      </View>

      <View style={styles.view}>
        <Text style={styles.text}>Fever</Text>
        <Text style={styles.description}>Starting Date: </Text>
        <Text style={styles.description}>Notes: </Text>
      </View>
    </View>
    </ScrollView>
    </>
    );
};

const HomeScreen = () => {
  const navigation = useNavigation();
  const [medicines, setMedicines] = useState([]);
  const [firstName, setFirstName] = useState('');

  const handleAddMedicine = () => {
    navigation.navigate('Medicine');
  };

  const fetchMedicines = async () => {
    try {
      const response = await fetch('http://192.168.255.242:8000/user/me/medicines');
      if (response.ok) {
        const userMedicines = await response.json();
        setMedicines(userMedicines);
      } else {
        console.error('Failed to fetch user medicines');
      }
    } catch (error) {
      console.error('Error occurred while fetching user medicines:', error);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://192.168.255.242:8000/user/me');
        if (response.ok) {
          const userData = await response.json();
          setFirstName(userData.firstName);
        } else {
          console.error('Failed to fetch user data');
        }
      } catch (error) {
        console.error('Error occurred while fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchMedicines();
    }, [])
  );

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Welcome {firstName},</Text>
        <TouchableOpacity onPress={handleAddMedicine}>
          <Text style={styles.addButton}>+</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        <StatusBar backgroundColor="black" barStyle="light-content" />
        {medicines.map(medicine => (
          <View key={medicine.medicineId} style={styles.view}>
            <Text style={styles.text}>{medicine.medicineName}</Text>
            <Text style={styles.description}>Dosage: {medicine.dosage}</Text>
            <Text style={styles.description}>Bought on: {medicine.boughtOn}</Text>
            <Text style={styles.description}>Expires: {medicine.expires}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

  const MedicineScreen = () => {
    const navigation = useNavigation();
    const [medicines, setMedicines] = useState([]);
  
    const handleMedicineSelected = (medicine) => {
      navigation.navigate('MedicineInformation', { medicine });
    };
  
    useEffect(() => {
      const fetchMedicines = async () => {
        try {
          const response = await fetch('http://192.168.255.242:8000/medicine');
          if (response.ok) {
            const medicineData = await response.json();
            setMedicines(medicineData.slice(0, 5));
          } else {
            console.error('Failed to fetch medicines');
          }
        } catch (error) {
          console.error('Error occurred while fetching medicines:', error);
        }
      };
  
      fetchMedicines();
    }, []);
  
    return (
      <>
        <ScrollView style={styles.scrollView}>
          <View className="flex items-center mx-5 space-y-4 mt-5">
            <Animated.View entering={FadeInDown.duration(1000).delay(200).springify()} className="bg-black/5 p-5 rounded-2xl w-full">
                <TextInput placeholder="Search Medicines..." placeholderTextColor={'gray'} />
            </Animated.View>
          </View>
  
          <Text style={styles.profileInfo}>Most Frequented</Text>
  
          <View style={styles.container}>
            <StatusBar backgroundColor="black" barStyle="light-content" />
            
            {medicines.map(medicine => (
              <TouchableOpacity key={medicine.id} style={styles.view} onPress={() => handleMedicineSelected(medicine)}>
                <Text style={styles.text}>{medicine.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </>
    );
  };

const SettingsScreen = () => {
  const navigation = useNavigation();
  const [userData, setUserData] = useState(null);

  const handleLogout = async () => {
    //logout Logic
    try {
          await AsyncStorage.removeItem('token');
          navigation.navigate('Login');
      } catch (error) {
          console.error('Error occurred during logout:', error);
      }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://192.168.255.242:8000/user/me');
        if (response.ok) {
          const userData = await response.json();
          setUserData(userData);
        } else {
          console.error('Failed to fetch user data');
        }
      } catch (error) {
        console.error('Error occurred while fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

    return(
    <>
    <ScrollView style={styles.scrollView}>
        {userData && (
          <>
            <Text style={styles.profileInfo}>First Name: {userData.firstName}</Text>
            <Text style={styles.profileInfo}>Last Name: {userData.lastName}</Text>
            <Text style={styles.profileInfo}>E-Mail: {userData.email}</Text>
          </>
        )}
        <View style={styles.line}></View>
        <View>
            <StatusBar backgroundColor="black" barStyle="light-content" />

            <Text style={styles.label}>Current E-Mail Address</Text>
            <View className="flex items-center mx-5 space-y-4">
            <Animated.View entering={FadeInDown.duration(1000).springify()} className="bg-black/5 p-5 rounded-2xl w-full">
                <TextInput placeholder="Current E-Mail Address" placeholderTextColor={'gray'} />
            </Animated.View>
            </View>

            <Text style={styles.label}>New E-Mail Address</Text>
            <View className="flex items-center mx-5 space-y-4">
            <Animated.View entering={FadeInDown.duration(1000).delay(200).springify()} className="bg-black/5 p-5 rounded-2xl w-full">
                <TextInput placeholder="New E-Mail Address" placeholderTextColor={'gray'} />
            </Animated.View>
            </View>

            <Animated.View className="w-full" style={{alignItems: 'center', marginTop: 10}} entering={FadeInDown.delay(400).duration(1000).springify()}>
                <TouchableOpacity className="w-[90%] bg-sky-400 p-3 rounded-2xl mb-3">
                    <Text className="text-xl font-bold text-white text-center">Update E-Mail</Text>
                </TouchableOpacity>
            </Animated.View>

            <View style={styles.line}></View>

            <Text style={styles.label}>Current Password</Text>
            <View className="flex items-center mx-5 space-y-4">
            <Animated.View entering={FadeInDown.duration(1000).springify()} className="bg-black/5 p-5 rounded-2xl w-full">
                <TextInput placeholder="Current Password" placeholderTextColor={'gray'} />
            </Animated.View>
            </View>

            <Text style={styles.label}>New Password</Text>
            <View className="flex items-center mx-5 space-y-4">
            <Animated.View entering={FadeInDown.duration(1000).delay(200).springify()} className="bg-black/5 p-5 rounded-2xl w-full">
                <TextInput placeholder="New Password" placeholderTextColor={'gray'} />
            </Animated.View>
            </View>

            <Animated.View className="w-full" style={{alignItems: 'center', marginTop: 10}} entering={FadeInDown.delay(400).duration(1000).springify()}>
                <TouchableOpacity className="w-[90%] bg-sky-400 p-3 rounded-2xl mb-3">
                    <Text className="text-xl font-bold text-white text-center">Update Password</Text>
                </TouchableOpacity>
            </Animated.View>

            <View style={styles.line}></View>

            <Animated.View className="w-full" style={{ alignItems: 'center', marginTop: 10 }} entering={FadeInDown.delay(400).duration(1000).springify()}>
              <TouchableOpacity className="w-[90%] bg-red-400 p-3 rounded-2xl mb-3" onPress={handleLogout}>
                <Text className="text-xl font-bold text-white text-center">Logout</Text>
              </TouchableOpacity>
            </Animated.View>
        </View>
    </ScrollView>
  </>
    );
};

const App = () => (
  <Tab.Navigator initialRouteName="Home">
    <Tab.Screen
      name="Events"
      component={EventsScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialIcons name="event" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="Home"
      component={HomeScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialIcons name="home" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="Medicines"
      component={MedicineScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <FontAwesome name="stethoscope" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="Settings"
      component={SettingsScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialIcons name="settings" color={color} size={size} />
        ),
      }}
    />
  </Tab.Navigator>
);

export default App;
