import { React, useState, useEffect, useCallback } from 'react';
import { View, Text, ScrollView, StatusBar, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
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
      height: 155,
      marginBottom: 20,
      elevation: 10,
    },
    viewEventsAppointments: {
      backgroundColor: '#38bdf8',
      width: '95%',
      borderRadius: 15,
      height: 120,
      marginBottom: 20,
      elevation: 10,
    },
    viewEventsSymptoms: {
      backgroundColor: '#38bdf8',
      width: '95%',
      borderRadius: 15,
      height: 140,
      marginBottom: 20,
      elevation: 10,
    },
    viewMedicines: {
      backgroundColor: '#38bdf8',
      width: '95%',
      borderRadius: 15,
      height: 60,
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
  const [symptoms, setSymptoms] = useState([]);

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

  const fetchSymptoms = async () => {
    try {
      const response = await fetch('http://192.168.255.242:8000/user/me/symptoms');
      if (response.ok) {
        const userSymptoms = await response.json();
        setSymptoms(userSymptoms);
      } else {
        console.error('Failed to fetch user symptoms');
      }
    } catch (error) {
      console.error('Error occurred while fetching user symptoms:', error);
    }
  };

  useEffect(() => {
    fetchAppointments();
    fetchDoctors();
    fetchSymptoms();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchAppointments();
      fetchDoctors();
      fetchSymptoms();
    }, [])
  );

  const handleDeleteAppointment = (appointmentId) => {
    Alert.alert(
      'Delete Appointment',
      'Are you sure you want to delete this appointment?',
      [
        {
          text: 'CANCEL',
          style: 'cancel',
        },
        {
          text: 'DELETE',
          onPress: async () => {
            try {
              const response = await fetch(`http://192.168.255.242:8000/appointment/appointment/${appointmentId}`, {
                method: 'DELETE',
              });
  
              if (response.ok) {
                Alert.alert('Success', 'Appointment deleted successfully.');
                // Fetch appointments again to update the list
                fetchAppointments();
              } else {
                Alert.alert('Error', 'Failed to delete appointment. Please try again later.');
              }
            } catch (error) {
              console.error('Error deleting appointment:', error);
              Alert.alert('Error', 'An error occurred while deleting appointment. Please try again later.');
            }
          },
        },
      ],
      { cancelable: false }
    );
  };  

  const handleDeleteSymptom = (symptomId) => {
    Alert.alert(
      'Delete Symptom',
      'Are you sure you want to delete this symptom?',
      [
        {
          text: 'CANCEL',
          style: 'cancel',
        },
        {
          text: 'DELETE',
          onPress: async () => {
            try {
              const response = await fetch(`http://192.168.255.242:8000/symptom/delete/${symptomId}`, {
                method: 'DELETE',
              });
  
              if (response.ok) {
                Alert.alert('Success', 'Symptom deleted successfully.');
                // Fetch symptoms again to update the list
                fetchSymptoms();
              } else {
                Alert.alert('Error', 'Failed to delete symptom. Please try again later.');
              }
            } catch (error) {
              console.error('Error deleting symptom:', error);
              Alert.alert('Error', 'An error occurred while deleting symptom. Please try again later.');
            }
          },
        },
      ],
      { cancelable: false }
    );
  };  

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
            <TouchableOpacity key={appointment.id} style={styles.viewEventsAppointments} onLongPress={() => handleDeleteAppointment(appointment.appointmentId)}>
              <Text style={styles.text}>{`Dr. ${doctors[appointment.doctorId] || 'Unknown'}`}</Text>
              <Text style={styles.description}>{`Date: ${formatAppointmentDate(appointment.date)}`}</Text>
              <Text style={styles.description}>{`Notes: ${appointment.description}`}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.header}>
          <Text style={styles.welcomeText}>Symptoms Tracking,</Text>
          <TouchableOpacity onPress={handleAddSymptom}>
            <Text style={styles.addButton}>+</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.container}>
          {symptoms.map(symptom => (
            <TouchableOpacity key={symptom.symptomId} style={styles.viewEventsSymptoms} onLongPress={() => handleDeleteSymptom(symptom.symptomId)}>
              <Text style={styles.text}>{symptom.symptomName}</Text>
              <Text style={styles.description}>{`Date: ${symptom.date}`}</Text>
              <Text style={styles.description}>{`Intensity: ${symptom.intensity}`}</Text>
              <Text style={styles.description}>{`Notes: ${symptom.notes}`}</Text>
            </TouchableOpacity>
          ))}
        </View>
    </ScrollView>
    </>
    );
};

const HomeScreen = () => {
  const navigation = useNavigation();
  const [medicines, setMedicines] = useState([]);
  const [medicinesToday, setMedicinesToday] = useState([]);
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

  const fetchMedicinesToday = async () => {
    try {
      const response = await fetch('http://192.168.255.242:8000/user/me/medicines/today');
      if (response.ok) {
        const todayMedicines = await response.json();
        setMedicinesToday(todayMedicines);
      } else {
        console.error('Failed to fetch today\'s medicines');
      }
    } catch (error) {
      console.error('Error occurred while fetching today\'s medicines:', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchMedicines();
      fetchMedicinesToday();
    }, [])
  );

  const isMedicineToday = (medicine) => {
    const isToday = medicinesToday.find((todayMedicine) => todayMedicine.medicineId === medicine.medicineId);
    return !!isToday;
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

  const handleDeleteMedicine = async (medicineId) => {
    try {
      const response = await fetch(`http://192.168.255.242:8000/medicine/remove/${medicineId}`, {
        method: 'POST'
      });
      if (response.ok) {
        // Remove the deleted medicine from the state
        setMedicines(medicines.filter(medicine => medicine.medicineId !== medicineId));
      } else {
        console.error('Failed to delete medicine');
      }
    } catch (error) {
      console.error('Error occurred while deleting medicine:', error);
    }
  };

  const handlePressHoldMedicine = (medicineId) => {
    Alert.alert(
      'Delete Medicine',
      'Are you sure you want to delete this medicine?',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Delete',
          onPress: () => handleDeleteMedicine(medicineId)
        }
      ],
      { cancelable: true }
    );
  };

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
        {medicines.map((medicine) => (
          <TouchableOpacity onLongPress={() => handlePressHoldMedicine(medicine.medicineId)} style={[styles.view, styles.touchableOpacity]} key={medicine.medicineId}>
            <Text style={styles.text}>
              {isMedicineToday(medicine) ? `${medicine.medicineName} (Today)` : medicine.medicineName}
            </Text>
            <Text style={styles.description}>Dosage: {medicine.dosage}</Text>
            <Text style={styles.description}>Pills Left: {medicine.total}</Text>
            <Text style={styles.description}>Expires: {medicine.expires}</Text>
            <Text style={styles.description}>Days to Take: {medicine.days.map(day => day.day).join(', ')}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};


  const MedicineScreen = () => {
    const navigation = useNavigation();
    const [medicines, setMedicines] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredMedicines, setFilteredMedicines] = useState([]);

    const handleMedicineSelected = (medicine) => {
        navigation.navigate('MedicineInformation', { medicine });
    };

    const filterMedicines = () => {
        const filtered = medicines.filter(medicine =>
            medicine.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredMedicines(filtered);
    };

    useEffect(() => {
        const fetchMedicines = async () => {
            try {
                const response = await fetch('http://192.168.255.242:8000/medicine');
                if (response.ok) {
                    const medicineData = await response.json();
                    setMedicines(medicineData);
                } else {
                    console.error('Failed to fetch medicines');
                }
            } catch (error) {
                console.error('Error occurred while fetching medicines:', error);
            }
        };

        fetchMedicines();
    }, []);

    useEffect(() => {
        filterMedicines();
    }, [searchQuery, medicines]);

    return (
        <>
            <ScrollView style={styles.scrollView}>
                <View className="flex items-center mx-5 space-y-4 mt-5">
                    <Animated.View entering={FadeInDown.duration(1000).delay(200).springify()} className="bg-black/5 p-5 rounded-2xl w-full">
                        <TextInput
                            placeholder="Search Medicines..."
                            placeholderTextColor={'gray'}
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                        />
                    </Animated.View>
                </View>

                <Text style={styles.profileInfo}>Most Frequented</Text>

                <View style={styles.container}>
                    <StatusBar backgroundColor="black" barStyle="light-content" />

                    {filteredMedicines.map(medicine => (
                        <TouchableOpacity key={medicine.id} style={styles.viewMedicines} onPress={() => handleMedicineSelected(medicine)}>
                            <Text style={styles.text}>{medicine.name}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </>
    );
};


// const SettingsScreen = () => {
//   const navigation = useNavigation();
//   const [userData, setUserData] = useState(null);
//   const [newEmail, setNewEmail] = useState('');
//   const [currentPassword, setCurrentPassword] = useState('');
//   const [currentPassword1, setCurrentPassword1] = useState('');
//   const [newPassword, setNewPassword] = useState('');

//   const handleLogout = async () => {
//     //logout Logic
//     try {
//           await AsyncStorage.removeItem('token');
//           navigation.navigate('Login');
//       } catch (error) {
//           console.error('Error occurred during logout:', error);
//       }
//   };

//   useEffect(() => {
//     fetchUserData();
//   }, []);

//   const fetchUserData = async () => {
//     try {
//       const response = await fetch('http://192.168.255.242:8000/user/me');
//       if (response.ok) {
//         const userData = await response.json();
//         setUserData(userData);
//       } else {
//         console.error('Failed to fetch user data');
//       }
//     } catch (error) {
//       console.error('Error occurred while fetching user data:', error);
//     }
//   };

//   const updateEmail = async () => {
//     try {
//       const response = await fetch('http://192.168.255.242:8000/user', {
//         method: 'PATCH',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           username: userData.username,
//           firstName: userData.firstName,
//           lastName: userData.lastName,
//           email: newEmail,
//           password: currentPassword
//         })
//       });
  
//       const responseData = await response.json();
  
//       if (response.ok) {
//         fetchUserData();
//         setCurrentPassword('');
//         setNewEmail('');
//         setCurrentPassword1('');
//         setNewPassword('');
//         Alert.alert('Success', 'Email updated successfully');
//       } else {
//         console.error('Failed to update profile:', responseData);
//       }
//     } catch (error) {
//       console.error('Error updating profile:', error);
//     }
//   };

//   const updatePassword = async () => {
//     try {
//       const response = await fetch('http://192.168.255.242:8000/user', {
//         method: 'PATCH',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           username: userData.username,
//           firstName: userData.firstName,
//           lastName: userData.lastName,
//           email: userData.email,
//           password: newPassword
//         })
//       });
  
//       const responseData = await response.json();
  
//       if (response.ok) {
//         fetchUserData();
//         setCurrentPassword('');
//         setNewEmail('');
//         setCurrentPassword1('');
//         setNewPassword('');
//         Alert.alert('Success', 'Password updated successfully');
//       } else {
//         console.error('Failed to update profile:', responseData);
//       }
//     } catch (error) {
//       console.error('Error updating profile:', error);
//     }
//   };

//     return(
//     <>
//     <ScrollView style={styles.scrollView}>
//         {userData && (
//           <>
//             <Text style={styles.profileInfo}>First Name: {userData.firstName}</Text>
//             <Text style={styles.profileInfo}>Last Name: {userData.lastName}</Text>
//             <Text style={styles.profileInfo}>E-Mail: {userData.email}</Text>
//           </>
//         )}
//         <View style={styles.line}></View>
//         <View>
//             <StatusBar backgroundColor="black" barStyle="light-content" />

//             <Text style={styles.label}>Current Password</Text>
//             <View className="flex items-center mx-5 space-y-4">
//                 <TextInput value={currentPassword} onChangeText={setCurrentPassword} secureTextEntry={true} placeholder="Current Password" placeholderTextColor={'gray'} className="bg-black/5 p-5 rounded-2xl w-full"/>
//             </View>

//             <Text style={styles.label}>New E-Mail Address</Text>
//             <View className="flex items-center mx-5 space-y-4">
//                 <TextInput value={newEmail} onChangeText={setNewEmail} placeholder="New E-Mail Address" placeholderTextColor={'gray'} className="bg-black/5 p-5 rounded-2xl w-full"/>
//             </View>

//             <TouchableOpacity onPress={updateEmail} className="w-[90%] bg-sky-400 p-3 rounded-2xl mb-3" style={{alignItems: 'center', marginTop: 10, marginLeft: 20}}>
//                 <Text className="text-xl font-bold text-white text-center">Update E-Mail</Text>
//             </TouchableOpacity>

//             <View style={styles.line}></View>

//             <Text style={styles.label}>Current Password</Text>
//             <View className="flex items-center mx-5 space-y-4">
//                 <TextInput value={currentPassword1} onChangeText={setCurrentPassword1} secureTextEntry={true} placeholder="Current Password" placeholderTextColor={'gray'} className="bg-black/5 p-5 rounded-2xl w-full"/>
//             </View>

//             <Text style={styles.label}>New Password</Text>
//             <View className="flex items-center mx-5 space-y-4">
//                 <TextInput value={newPassword} onChangeText={setNewPassword} secureTextEntry={true} placeholder="New Password" placeholderTextColor={'gray'} className="bg-black/5 p-5 rounded-2xl w-full"/>
//             </View>

//             <TouchableOpacity onPress={updatePassword} className="w-[90%] bg-sky-400 p-3 rounded-2xl mb-3" style={{alignItems: 'center', marginTop: 10, marginLeft: 20}}>
//                 <Text className="text-xl font-bold text-white text-center">Update Password</Text>
//             </TouchableOpacity>

//             <View style={styles.line}></View>

//             <TouchableOpacity className="w-[90%] bg-red-400 p-3 rounded-2xl mb-3" style={{ alignItems: 'center', marginTop: 10, marginLeft: 20 }} onPress={handleLogout}>
//               <Text className="text-xl font-bold text-white text-center">Logout</Text>
//             </TouchableOpacity>
//         </View>
//     </ScrollView>
//   </>
//     );
// };

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
                <TextInput placeholder="Current E-Mail Address" placeholderTextColor={'gray'} className="bg-black/5 p-5 rounded-2xl w-full"/>
            </View>

            <Text style={styles.label}>New E-Mail Address</Text>
            <View className="flex items-center mx-5 space-y-4">
                <TextInput placeholder="New E-Mail Address" placeholderTextColor={'gray'} className="bg-black/5 p-5 rounded-2xl w-full"/>
            </View>

            <TouchableOpacity className="w-[90%] bg-sky-400 p-3 rounded-2xl mb-3" style={{alignItems: 'center', marginTop: 10, marginLeft: 20}}>
                <Text className="text-xl font-bold text-white text-center">Update E-Mail</Text>
            </TouchableOpacity>

            <View style={styles.line}></View>

            <Text style={styles.label}>Current Password</Text>
            <View className="flex items-center mx-5 space-y-4">
                <TextInput placeholder="Current Password" placeholderTextColor={'gray'} className="bg-black/5 p-5 rounded-2xl w-full"/>
            </View>

            <Text style={styles.label}>New Password</Text>
            <View className="flex items-center mx-5 space-y-4">
                <TextInput placeholder="New Password" placeholderTextColor={'gray'} className="bg-black/5 p-5 rounded-2xl w-full"/>
            </View>

            <TouchableOpacity className="w-[90%] bg-sky-400 p-3 rounded-2xl mb-3" style={{alignItems: 'center', marginTop: 10, marginLeft: 20}}>
                <Text className="text-xl font-bold text-white text-center">Update Password</Text>
            </TouchableOpacity>

            <View style={styles.line}></View>

            <TouchableOpacity className="w-[90%] bg-red-400 p-3 rounded-2xl mb-3" style={{ alignItems: 'center', marginTop: 10, marginLeft: 20 }} onPress={handleLogout}>
              <Text className="text-xl font-bold text-white text-center">Logout</Text>
            </TouchableOpacity>
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
