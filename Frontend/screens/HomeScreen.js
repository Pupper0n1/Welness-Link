import { React, useState, useEffect } from 'react';
import { View, Text, ScrollView, StatusBar, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import Animated, { FadeIn, FadeInDown, FadeInUp } from 'react-native-reanimated';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
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
      height: 120,
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

  const handleAddAppointment = () => {
    navigation.navigate('Appointments');
  };

  const handleAddSymptom = () => {
    navigation.navigate('Symptoms');
  }

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
      
      <View style={styles.view}>
        <Text style={styles.text}>Dr. Gerald</Text>
        <Text style={styles.description}>Appointment Date: </Text>
        <Text style={styles.description}>Notes: </Text>
      </View>

      <View style={styles.view}>
        <Text style={styles.text}>Dr. Gerald</Text>
        <Text style={styles.description}>Appointment Date: </Text>
        <Text style={styles.description}>Notes: </Text>
      </View>

      <View style={styles.view}>
        <Text style={styles.text}>Dr. Gerald</Text>
        <Text style={styles.description}>Appointment Date: </Text>
        <Text style={styles.description}>Notes: </Text>
      </View>
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

    const handleAddMedicine = () => {
      navigation.navigate('Medicine');
    };

    const [firstName, setFirstName] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch('http://192.168.255.242:8000/user/me');
                if (response.ok) {
                    const userData = await response.json();
                    setFirstName(userData.first_name);
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

    <View style={styles.header}>
    <Text style={styles.welcomeText}>Welcome {firstName},</Text>
    <TouchableOpacity onPress={handleAddMedicine}>
        <Text style={styles.addButton}>+</Text>
    </TouchableOpacity>
    </View>

    <View style={styles.container}>
      <StatusBar backgroundColor="black" barStyle="light-content" />
      
      <View style={styles.view}>
        <Text style={styles.text}>Lisinopril</Text>
        <Text style={styles.description}>Bought on: </Text>
        <Text style={styles.description}>Expires: </Text>
      </View>

      <View style={styles.view}>
        <Text style={styles.text}>Lisinopril</Text>
        <Text style={styles.description}>Bought on: </Text>
        <Text style={styles.description}>Expires: </Text>
      </View>

      <View style={styles.view}>
        <Text style={styles.text}>Lisinopril</Text>
        <Text style={styles.description}>Bought on: </Text>
        <Text style={styles.description}>Expires: </Text>
      </View>

      <View style={styles.view}>
        <Text style={styles.text}>Lisinopril</Text>
        <Text style={styles.description}>Bought on: </Text>
        <Text style={styles.description}>Expires: </Text>
      </View>

      <View style={styles.view}>
        <Text style={styles.text}>Lisinopril</Text>
        <Text style={styles.description}>Bought on: </Text>
        <Text style={styles.description}>Expires: </Text>
      </View>

      <View style={styles.view}>
        <Text style={styles.text}>Lisinopril</Text>
        <Text style={styles.description}>Bought on: </Text>
        <Text style={styles.description}>Expires: </Text>
      </View>
    </View>
    </ScrollView>
    </>
    );
  };

  const MedicineScreen = () => (
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
          
          <View style={styles.view}>
            <Text style={styles.text}>Lisinopril</Text>
          </View>

          <View style={styles.view}>
            <Text style={styles.text}>Lisinopril</Text>
          </View>

          <View style={styles.view}>
            <Text style={styles.text}>Lisinopril</Text>
          </View>
        </View>
      </ScrollView>
    </>
  );
  

const SettingsScreen = () => {
  const navigation = useNavigation();

  const handleLogout = async () => {
    //logout Logic
    try {
          await AsyncStorage.removeItem('token');
          navigation.navigate('Login');
      } catch (error) {
          console.error('Error occurred during logout:', error);
      }
  };

    return(
    <>
    <ScrollView style={styles.scrollView}>
        <Text style={styles.profileInfo}>First Name: John</Text>
        <Text style={styles.profileInfo}>Last Name: Smith</Text>
        <Text style={styles.profileInfo}>E-Mail: John@email.com</Text>
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
