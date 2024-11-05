import React, { useEffect, useState } from 'react'
import { View, Text, Alert, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Button, TextInput } from 'react-native-paper'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as ImagePicker from 'react-native-image-picker'
import { useNavigation } from '@react-navigation/native'
import { User } from '../components/get/User'
import { EditProfileStyle } from '@/assets/styles/EditProfileStyle'

interface EditProfileProps {
  navigation: any
}

const EditProfilePage = (props: EditProfileProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [imageUri, setImageUri] = useState<string | null>(null)
  const navigation = useNavigation()

  useEffect(() => {
    const loadCurrentUser = async () => {
      try {
        const userData = await AsyncStorage.getItem('currentUser')
        if (userData) {
          const user = JSON.parse(userData)
          setCurrentUser(user)
          setFirstName(user.firstName || '')
          setLastName(user.lastName || '')
          setPhoneNumber(user.phoneNumber || '')
          setImageUri(user.imageUri || null)
        }
      } catch (error) {
        console.error('Failed to load user data', error)
      }
    }
    loadCurrentUser()
  }, [])

  const selectImage = () => {
    ImagePicker.launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 0.8,
        maxWidth: 400,
        maxHeight: 400,
      },
      (response) => {
        if (response.assets && response.assets.length > 0 && response.assets[0].uri) {
          setImageUri(response.assets[0].uri)
        }
      }
    )
  }

  const handleSave = async () => {
    if (currentUser) {
      const updatedUser: User = {
        ...currentUser,
        firstName,
        lastName,
        phoneNumber,
        imageUri,
      }
  
      try {
        await AsyncStorage.setItem('currentUser', JSON.stringify(updatedUser))
  
        const usersData = await AsyncStorage.getItem('users')
        const users: User[] = usersData ? JSON.parse(usersData) : []
  
        const userIndex = users.findIndex((user: User) => user.username === currentUser.username)
        if (userIndex !== -1) {
          users[userIndex] = updatedUser
          await AsyncStorage.setItem('users', JSON.stringify(users))
        }
  
        Alert.alert('Profile updated successfully')
        console.log('Profile updated successfully')
        navigation.goBack()
      } catch (error) {
        console.error('Failed to save profile changes:', error)
        Alert.alert('Failed to update profile')
      }
    }
  }
  

  return (
    <SafeAreaView style={EditProfileStyle.container}>
      <View style={{ alignItems: 'center', marginBottom: 16 }}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={EditProfileStyle.profileImage} />
        ) : (
          <Image source={require('../assets/images/user.jpg')} style={{ width: 100, height: 100, borderRadius: 50 }} />
        )}
        <Button onPress={selectImage} mode="contained" style={EditProfileStyle.button}>
          Change Profile Picture
        </Button>
      </View>
      
      <TextInput label="First Name" value={firstName} onChangeText={setFirstName} style={{ marginBottom: 8 }} />
      <TextInput label="Last Name" value={lastName} onChangeText={setLastName} style={{ marginBottom: 8 }} />
      <TextInput label="Phone Number" value={phoneNumber} onChangeText={setPhoneNumber} keyboardType="phone-pad" style={{ marginBottom: 16 }} />
      
      <Button onPress={handleSave} mode="contained" style={EditProfileStyle.button}>
        Save Changes
      </Button>
      <Button onPress={() => props.navigation.navigate('HomePage')} mode="contained" style={EditProfileStyle.button}>
        Back
      </Button>
    </SafeAreaView>
  )
}

export default EditProfilePage
