import { View, Text, Alert, Image, ImageBackground } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Button, Card, TextInput } from 'react-native-paper'
import { ScrollView, TouchableOpacity } from 'react-native'
import { RegisterStyle } from '../assets/styles/RegisterStyle'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import * as ImagePicker from 'expo-image-picker'
import { ProfileStyle } from '@/assets/styles/ProfileStyle'

interface RegisterPageProps { 
  navigation: any
}

const RegisterPage = (props: RegisterPageProps) => { 

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false)
  const [imageUri, setImageUri] = useState<string | null>(null)
  const navigation = useNavigation()

  const validatePassword = (password: string) => { 
    const passwordCriteria = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/
    return passwordCriteria.test(password)
  }

  const validateEmail = (email: string) => { 
    const emailCriteria = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailCriteria.test(email)
  }

  const validatePhoneNumber = (phone: string) => { 
    const phoneCriteria = /^[0-9]+$/
    return phoneCriteria.test(phone)
  }

  const handleSignIn = () => { 
    setUsername('')
    setPassword('')
    setFirstName('')
    setLastName('')
    setConfirmPassword('')
    setPhoneNumber('')
    setImageUri(null)
    props.navigation.navigate('index')
  }

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible)
  }

  const toggleConfirmPasswordVisibility = () => {
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
  }
  
  const selectImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync()

    if (!permissionResult.granted) {
      Alert.alert("Permission to access camera roll is required!")
      return
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
      aspect: [1, 1],
      allowsEditing: true,
    })

    if (!result.canceled) {
      setImageUri(result.assets[0].uri)
    }
  }

  
  const handleSignUp = async () => { 

    if (!validateEmail(username)) { 
      Alert.alert("Please enter a valid email address.")
      console.log('Please enter a valid email address.')
      return
    }

    if (!validatePassword(password)) { 
      Alert.alert(
        "Password must met requirements"
      )
      console.log("Password must met requirements")
      return
    }

    if (password !== confirmPassword) { 
      Alert.alert("Passwords don't match")
      console.log("Passwords don't match")
      return
    }

    if (!validatePhoneNumber(phoneNumber)) { 
      Alert.alert("Phone number must contain only numbers")
      console.log("Phone number must contain only numbers")
      return
    }

    try { 
      const usersData = await AsyncStorage.getItem('users')
      const users = usersData ? JSON.parse(usersData) : []
      const userExists = users.some((user: { username: string }) => user.username === username)

      if (userExists) { 
        Alert.alert("Username (email) already exists")
        console.log("Username (email) already exists")
        return
      }

      const newUser = { username, password, firstName, lastName, phoneNumber, imageUri }
      users.push(newUser)
      await AsyncStorage.setItem('users', JSON.stringify(users))

      setUsername('')
      setPassword('')
      setFirstName('')
      setLastName('')
      setConfirmPassword('')
      setPhoneNumber('')
      setImageUri(null)
      Alert.alert("Registration successful")
      console.log("Registration successful")
      props.navigation.navigate('index')
      
    } catch (error) { 
      Alert.alert("Failed to register")
      console.log("Failed to register")
    }
  }

  return (
    <ImageBackground 
    source={require('../assets/images/background1.jpg')}
    style={ProfileStyle.backgroundImage}
  >

    <SafeAreaView style = {RegisterStyle.content}>
      <ScrollView>
        <View style = {RegisterStyle.view}>
            {imageUri && (
                <Image
                  source={{ uri: imageUri }}
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: 50,
                    alignSelf: 'center',
                    marginBottom: 15,
                  }}
                />
              )}

              <Button
                mode="contained"
                onPress={selectImage}
                style={RegisterStyle.cardButton}
              >
                Select Profile Picture
              </Button>
              <TextInput
                value = {firstName}
                onChangeText = {setFirstName}
                label = {"First Name"}
                style = {RegisterStyle.input}
              />
              <TextInput
                value = {lastName}
                onChangeText = {setLastName}
                label = {"Last Name"}
                style = {RegisterStyle.input}
              />
              <TextInput
                value = {username}
                onChangeText = {setUsername}
                label = {"Email"}
                keyboardType = 'email-address'
                style = {RegisterStyle.input}
              />
              <TextInput
                value = {password}
                onChangeText = {setPassword}
                label = {"Password"}
                secureTextEntry = {!isPasswordVisible}
                right = { <TextInput.Icon
                  icon = {isPasswordVisible ? 'eye-outline' : 'eye-off-outline'}
                  onPress={togglePasswordVisibility}
                  color = {'rgb(101, 37, 131)'} />}
                  style = {RegisterStyle.input} 
              />
              <TextInput
                value = {confirmPassword}
                onChangeText = {setConfirmPassword}
                label = {"Confirm Password"}
                secureTextEntry = {!isConfirmPasswordVisible}
                right = { <TextInput.Icon
                  icon = {isConfirmPasswordVisible ? 'eye-outline' : 'eye-off-outline'}
                  onPress={toggleConfirmPasswordVisibility}
                  color = {'rgb(101, 37, 131)'} />}
                  style = {RegisterStyle.input} 
              />
              <TextInput
                value = {phoneNumber}
                onChangeText = {setPhoneNumber}
                label = {"Phone Number"}
                keyboardType = 'phone-pad'
                style = {RegisterStyle.input}
              />
              <Button
                onPress = {handleSignUp}
                mode = 'contained'
                style = {RegisterStyle.cardButton}>
                Sign Up
              </Button>
              <Button
                onPress = {handleSignIn}
                mode = 'contained'
                style = {RegisterStyle.cardButton}>
                Sign In
                </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
    </ImageBackground>

  )
}

export default RegisterPage
