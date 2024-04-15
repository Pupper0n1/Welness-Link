import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { useNavigation } from '@react-navigation/native'
import Animated, { FadeInDown } from 'react-native-reanimated';
import link from '../link.json';

export default function SignupScreen() {
    const navigation = useNavigation();

    const [formData, setFormData] = useState({
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });

    const handleSignup = async () => {
        try {
            const response = await fetch(`${link.link}/user`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                navigation.navigate('Home');
            } else {
                Alert.alert('Signup Failed', 'Please check your details and try again.');
            }
        } catch (error) {
            console.error('Error signing up:', error);
            Alert.alert('Error', 'An unexpected error occurred. Please try again later.');
        }
    };

    const handleChangeText = (key, value) => {
        setFormData(prevState => ({
            ...prevState,
            [key]: value
        }));
    };
  return (
    <View className="bg-white h-full w-full">
      <StatusBar style="black" />
      
      <View  className="w-full flex justify-around pt-28">

        <View className="flex items-center mx-5 space-y-4">
            <Animated.View 
                entering={FadeInDown.duration(1000).springify()} 
                className="bg-black/5 p-5 rounded-2xl w-full">
                <TextInput
                    placeholder="Username"
                    placeholderTextColor={'gray'}
                    value={formData.username}
                    onChangeText={text => handleChangeText('username', text)}
                />
            </Animated.View>
            <Animated.View 
                entering={FadeInDown.duration(1000).springify()} 
                className="bg-black/5 p-5 rounded-2xl w-full">
                <TextInput
                    placeholder="First Name"
                    placeholderTextColor={'gray'}
                    value={formData.firstName}
                    onChangeText={text => handleChangeText('firstName', text)}
                />
            </Animated.View>
            <Animated.View 
                entering={FadeInDown.duration(1000).springify()} 
                className="bg-black/5 p-5 rounded-2xl w-full">
                <TextInput
                    placeholder="Last Name"
                    placeholderTextColor={'gray'}
                    value={formData.lastName}
                    onChangeText={text => handleChangeText('lastName', text)}
                />
            </Animated.View>
            <Animated.View 
                entering={FadeInDown.delay(200).duration(1000).springify()} 
                className="bg-black/5 p-5 rounded-2xl w-full">
                <TextInput
                    placeholder="Email"
                    placeholderTextColor={'gray'}
                    value={formData.email}
                    onChangeText={text => handleChangeText('email', text)}
                />
            </Animated.View>
            <Animated.View 
                entering={FadeInDown.delay(400).duration(1000).springify()} 
                className="bg-black/5 p-5 rounded-2xl w-full mb-3">
                <TextInput
                    placeholder="Password"
                    placeholderTextColor={'gray'}
                    secureTextEntry
                    value={formData.password}
                    onChangeText={text => handleChangeText('password', text)}
                />
            </Animated.View>

            <Animated.View className="w-full" entering={FadeInDown.delay(600).duration(1000).springify()}>
                <TouchableOpacity className="w-full bg-sky-400 p-3 rounded-2xl mb-3" onPress={handleSignup}>
                    <Text className="text-xl font-bold text-white text-center">SignUp</Text>
                </TouchableOpacity>
            </Animated.View>

            <Animated.View 
                entering={FadeInDown.delay(800).duration(1000).springify()} 
                className="flex-row justify-center">

                <Text>Already have an account? </Text>
                <TouchableOpacity onPress={()=> navigation.push('Login')}>
                    <Text className="text-sky-600">Login</Text>
                </TouchableOpacity>

            </Animated.View>
        </View>
      </View>
    </View>
  )
}