import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { SettingsStyle } from '../assets/styles/SettingsStyle'
import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect, useState } from 'react'
import { User } from '../components/get/User'
import { Button } from 'react-native-paper'

interface ProfilePageProps {
  navigation: any
}

const SettingsPage = (props: ProfilePageProps) => {

  const [currentUser, setCurrentUser] = useState<User | null>(null)

  useEffect(()  => {
    const loadCurrentUser = async ()  => {
      try {
        const userData = await AsyncStorage.getItem('currentUser')
        const user = userData ? (JSON.parse(userData) as User) : null
        setCurrentUser(user)
      } catch (error) {
        console.error('Failed to load user data')
      }
    }
    loadCurrentUser()
  }, [])

  const handleLogout = async ()  => {
    try {
      await AsyncStorage.removeItem('currentUser')
      props.navigation.navigate('index')
    } catch (error) {
      console.error('Logout failed')
    }
  }

  return (

    <View style = {SettingsStyle.container}>
      <Text style = {SettingsStyle.welcome}>Settings Page</Text>
      <TouchableOpacity style = {SettingsStyle.button} onPress={() => props.navigation.navigate('EditProfilePage')}>
        <Text style = {SettingsStyle.buttonText}>
          Edit Profile
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style = {SettingsStyle.button} onPress = {()  => props.navigation.navigate('ChangePassword')}>
        <Text style = {SettingsStyle.buttonText}>
          Change Password
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style = {SettingsStyle.button} onPress = {handleLogout}>
        <Text style = {SettingsStyle.buttonText}>
          Logout
        </Text>
      </TouchableOpacity>
    </View>
    
  )
}

export default SettingsPage
