import React, { useState, useEffect } from 'react'
import { View, Alert, Text } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { User } from '../components/get/User'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TextInput, Button, Card, Title, ActivityIndicator } from 'react-native-paper'
import { ChangePassStyle } from '../assets/styles/ChangePassStyle'
import { theme } from '../assets/styles/style'

interface ChangePassProps {
  navigation: any
}

export default function ChangePasswordScreen(props: ChangePassProps) {
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmNewPassword, setConfirmNewPassword] = useState('')
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false)
  const [isNewConfirmPasswordVisible, setIsNewConfirmPasswordVisible] = useState(false)
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadCurrentUser = async () => {
      try {
        const userData = await AsyncStorage.getItem('currentUser')
        const user = userData ? (JSON.parse(userData) as User) : null
        setCurrentUser(user)
      } catch (error) {
        console.error('Failed to load user data')
      } finally {
        setLoading(false)
      }
    }
    loadCurrentUser()
  }, [])

  const validatePassword = (password: string) => {
    const passwordCriteria = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/
    return passwordCriteria.test(password)
  }

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible)
  }

  const toggleNewPasswordVisibility = () => {
    setIsNewPasswordVisible(!isNewPasswordVisible)
  }

  const toggleNewConfirmPasswordVisibility = () => {
    setIsNewConfirmPasswordVisible(!isNewConfirmPasswordVisible)
  }

  const handleChangePassword = async () => {
    if (!currentUser) {
      Alert.alert('No user is currently logged in.')
      return
    }

    if (newPassword !== confirmNewPassword) {
      Alert.alert("Passwords don't match")
      return
    }

    if (currentPassword !== currentUser.password) {
      Alert.alert('Current password is incorrect')
      return
    }

    if (!validatePassword(newPassword)) {
      Alert.alert(
        'New password must be at least 8 characters long and include 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character.'
      )
      return
    }

    try {
      const usersData = await AsyncStorage.getItem('users')
      const users: User[] = usersData ? JSON.parse(usersData) : []
      const updatedUsers = users.map((user) =>
        user.username === currentUser.username ? { ...user, password: newPassword } : user
      )

      await AsyncStorage.setItem('users', JSON.stringify(updatedUsers))
      await AsyncStorage.setItem('currentUser', JSON.stringify({ ...currentUser, password: newPassword }))

      Alert.alert('Password changed successfully')
      props.navigation.navigate('HomePage')
    } catch (error) {
      Alert.alert('Failed to change password')
    }
  }

  return (

    <SafeAreaView style={ChangePassStyle.container}>
      <View style={ChangePassStyle.content}>
        {loading ? (
          <View style={ChangePassStyle.loadingContainer}>
            <ActivityIndicator
              animating={true}
              color={theme.colors.primary}
              size="large" />
            <Text style={{ marginTop: 20 }}>Loading user data...</Text>
          </View>
        ) : (
          <Card style={ChangePassStyle.card}>
            <Card.Content>
              <Title style={ChangePassStyle.title}>Update Your Password</Title>
              <TextInput
                label="Current Password"
                value={currentPassword}
                onChangeText={setCurrentPassword}
                secureTextEntry = {!isPasswordVisible}
                right = { <TextInput.Icon
                  icon = {isPasswordVisible ? 'eye-outline' : 'eye-off-outline'}
                  onPress={togglePasswordVisibility}
                  color = {'rgb(101, 37, 131)'} />}
                  style = {ChangePassStyle.input} 
              />
              <TextInput
                label="New Password"
                value={newPassword}
                onChangeText={setNewPassword}
                secureTextEntry = {!isNewPasswordVisible}
                right = { <TextInput.Icon
                  icon = {isNewPasswordVisible ? 'eye-outline' : 'eye-off-outline'}
                  onPress={toggleNewPasswordVisibility}
                  color = {'rgb(101, 37, 131)'} />}
                  style = {ChangePassStyle.input} 
              />
              <TextInput
                label="Confirm New Password"
                value={confirmNewPassword}
                onChangeText={setConfirmNewPassword}
                secureTextEntry = {!isNewConfirmPasswordVisible}
                right = { <TextInput.Icon
                  icon = {isNewConfirmPasswordVisible ? 'eye-outline' : 'eye-off-outline'}
                  onPress={toggleNewConfirmPasswordVisibility}
                  color = {'rgb(101, 37, 131)'} />}
                  style = {ChangePassStyle.input} 
              />
              <Button
                mode="contained"
                onPress={handleChangePassword}
                style={ChangePassStyle.buttonContainer}>
                Submit
              </Button>
              <Button
                mode="contained"
                onPress={() => props.navigation.navigate('HomePage')}
                style={ChangePassStyle.cancelButton}>
                Back
              </Button>
            </Card.Content>
          </Card>
        )}
      </View>
    </SafeAreaView>

  )
}
