import React, { useState } from 'react'
import { View, Alert, ImageBackground } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { TextInput, Button, Card, Title, ActivityIndicator } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import { User } from '@/components/get/User'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from './_layout'
import { ChangePassStyle } from '@/assets/styles/ChangePassStyle'
import { theme } from '@/assets/styles/style'
import { ProfileStyle } from '@/assets/styles/ProfileStyle'


type ResetPasswordProps = NativeStackScreenProps<RootStackParamList, 'ResetPassword'>

export default function ResetPasswordScreen({ route, navigation }: ResetPasswordProps) {
  const [newPassword, setNewPassword] = useState('')
  const [confirmNewPassword, setConfirmNewPassword] = useState('')
  const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false)
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false)
  const [loading] = useState(false)

  const { email } = route.params

  const toggleNewPasswordVisibility = () => {
    setIsNewPasswordVisible(!isNewPasswordVisible)
  }

  const toggleConfirmPasswordVisibility = () => {
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
  }

  const validatePassword = (password: string) => {
    const passwordCriteria = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/
    return passwordCriteria.test(password)
  }
  
  const handlePasswordReset = async () => {
    if (newPassword !== confirmNewPassword) {
      Alert.alert("Passwords don't match")
      return
    }

    if (!validatePassword(newPassword)) {
      Alert.alert(
        'Password must be at least 8 characters long and include 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character.'
      )
      return
    }

    const usersData = await AsyncStorage.getItem('users')
    const users: User[] = usersData ? JSON.parse(usersData) : []

    const updatedUsers = users.map((user) =>
      user.username === email ? { ...user, password: newPassword } : user
    )

    await AsyncStorage.setItem('users', JSON.stringify(updatedUsers))
    Alert.alert("Password reset successful", "You can now log in with your new password.")
    navigation.navigate("index")
  }

  return (
    <ImageBackground 
    source={require('../assets/images/background1.jpg')}
    style={ProfileStyle.backgroundImage}
  >
    <SafeAreaView style={ChangePassStyle.container}>
      <View style={ChangePassStyle.content}>
              <Title style={ChangePassStyle.title}>Reset Your Password</Title>
              <TextInput
                label="New Password"
                value={newPassword}
                onChangeText={setNewPassword}
                secureTextEntry={!isNewPasswordVisible}
                right={
                  <TextInput.Icon
                    icon={isNewPasswordVisible ? 'eye-outline' : 'eye-off-outline'}
                    onPress={toggleNewPasswordVisibility}
                    color="rgb(101, 37, 131)"
                  />
                }
                style={ChangePassStyle.input}
              />
              <TextInput
                label="Confirm New Password"
                value={confirmNewPassword}
                onChangeText={setConfirmNewPassword}
                secureTextEntry={!isConfirmPasswordVisible}
                right={
                  <TextInput.Icon
                    icon={isConfirmPasswordVisible ? 'eye-outline' : 'eye-off-outline'}
                    onPress={toggleConfirmPasswordVisibility}
                    color="rgb(101, 37, 131)"
                  />
                }
                style={ChangePassStyle.input}
              />
              <Button mode="contained" onPress={handlePasswordReset} style={ChangePassStyle.buttonContainer}>
                Reset Password
              </Button>
              <Button
                mode="contained"
                onPress={() => navigation.navigate('index')}
                style={ChangePassStyle.cancelButton}
              >
                Back to Login
              </Button>

      </View>
    </SafeAreaView>
    </ImageBackground>
  )
}
