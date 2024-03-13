import React from 'react';
import { View, Text, ScrollView, StatusBar, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import Animated, { FadeIn, FadeInDown, FadeInUp } from 'react-native-reanimated';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'

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
    <TouchableOpacity onPress={()=> console.log("hi")}>
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
  
    return(
    <>
    <ScrollView style={styles.scrollView}>

    <View style={styles.header}>
    <Text style={styles.welcomeText}>Welcome John,</Text>
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

  const ProfileScreen = () => (
    <>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.profileInfo}>First Name: John</Text>
        <Text style={styles.profileInfo}>Last Name: Smith</Text>
        <Text style={styles.profileInfo}>Birthdate: 01-01-2000</Text>
        <Text style={styles.profileInfo}>Age: 24</Text>
        <Text style={styles.profileInfo}>Gender: Male</Text>
        <Text style={styles.profileInfo}>Country: Canada</Text>
        <Text style={styles.profileInfo}>E-Mail: John@email.com</Text>
      </ScrollView>
    </>
  );
  

const SettingsScreen = () => (
    <>
    <ScrollView style={styles.scrollView}>
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
        </View>
    </ScrollView>
  </>
);

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
      name="Profile"
      component={ProfileScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <FontAwesome name="user" color={color} size={size} />
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
