import { Alert, ImageBackground, Text, View } from "react-native"
import { TouchableOpacity } from "react-native"
import { Button, Card, TextInput } from "react-native-paper"
import { SafeAreaView } from "react-native-safe-area-context"
import { LoginStyle } from "../assets/styles/LoginStyle"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useState } from "react"
import { ProfileStyle } from "@/assets/styles/ProfileStyle"

interface LoginPageProps {
  navigation: any
}

export default function Index(props: LoginPageProps) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible)
  }

  const handleLogin = async ()  => {
    try {
      const usersData = await AsyncStorage.getItem('users')
      const users = usersData ? JSON.parse(usersData) : []

      const user = users.find((user: { username: string; password: string })  => user.username  ===  username && user.password  ===  password)
      if (user) {
        await AsyncStorage.setItem('currentUser', JSON.stringify(user))
        setUsername('')
        setPassword('')
        Alert.alert('Login successful')
        props.navigation.navigate('HomePage')
      } else {
        Alert.alert('Invalid username or password')
      }
    } catch (error) {
      console.error('Login failed')
    }
  }

  const handleRegister = () => {
    setUsername('')
    setPassword('')
    props.navigation.navigate("RegisterPage")
  }

  const clearAsyncStorage = async () => {
    try {
      await AsyncStorage.clear()
      console.log('AsyncStorage has been cleared.')
    } catch (error) {
      console.error('Failed to clear AsyncStorage:', error)
    }
  }

  const checkStoredUsers = async () => {
    try {
      const usersData = await AsyncStorage.getItem('users')
      console.log("Stored users:", usersData)
    } catch (error) {
      console.error("Failed to fetch stored users:", error)
    }
  }
  
  return (
    <ImageBackground 
    source={require('../assets/images/background1.jpg')}
    style={ProfileStyle.backgroundImage}
  >
    <SafeAreaView style = {LoginStyle.content}>
      <View style = {LoginStyle.view}>
            <TextInput
              value = {username}
              onChangeText = {setUsername}
              label = {"Email"}
              keyboardType = 'email-address'
              style = {LoginStyle.input}></TextInput>
            <TextInput
              value = {password}
              onChangeText = {setPassword}
              label = {"Password"}
              style = {LoginStyle.input}
              secureTextEntry = {!isPasswordVisible}
              right = { <TextInput.Icon
                icon = {isPasswordVisible ? 'eye-outline' : 'eye-off-outline'}
                onPress={togglePasswordVisibility}
                color = {'rgb(101, 37, 131)'} />} />
            <TouchableOpacity onPress={() => props.navigation.navigate("ForgotPassword")}>
              <Text style={LoginStyle.forgotPassword}>Forgot Password?</Text>
            </TouchableOpacity>
            <Button
              onPress = {handleLogin}
              mode = 'contained'
              style = {LoginStyle.cardButton}>Login</Button>
            <Button
              onPress = {handleRegister}
              mode = 'contained'
              style = {LoginStyle.cardButton}>Register</Button>
            {/*<Button
              onPress = {clearAsyncStorage}
              mode = 'contained'
              style = {LoginStyle.cardButton}>Clear</Button>
            <Button
              onPress = {checkStoredUsers}
              mode = 'contained'
              style = {LoginStyle.cardButton}>Check</Button>*/}
      </View>
    </SafeAreaView>
    </ImageBackground>

  )
}
