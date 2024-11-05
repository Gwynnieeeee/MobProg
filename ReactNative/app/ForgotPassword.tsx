  import React, { useState } from 'react'
import { View, Alert } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { TextInput, Button, Card, Title, ActivityIndicator } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import { NavigationProp } from '@react-navigation/native'
import { User } from '@/components/get/User'
import { RootStackParamList } from './_layout'
import { ChangePassStyle } from '@/assets/styles/ChangePassStyle'
import { theme } from '@/assets/styles/style'

interface ForgotPasswordProps {
  navigation: NavigationProp<RootStackParamList, 'ForgotPassword'>
}

export default function ForgotPassword({ navigation }: ForgotPasswordProps) {

  const [email, setEmail] = useState('')
  const [loading] = useState(false)

  const handleEmailSubmit = async () => {
    const usersData = await AsyncStorage.getItem('users')
    const users: User[] = usersData ? JSON.parse(usersData) : []

    const user = users.find((user: User) => user.username === email)

    if (user) {
      Alert.alert("Email found", "You can now reset your password.")
      navigation.navigate("ResetPassword", { email })
    } else {
      Alert.alert("Email not found", "This email is not registered.")
    }
  }

  return (
    <SafeAreaView style={ChangePassStyle.container}>
      <View style={ChangePassStyle.content}>
        {loading ? (
          <View style={ChangePassStyle.loadingContainer}>
            <ActivityIndicator animating={true} color={theme.colors.primary} size="large" />
          </View>
        ) : (
          <Card style={ChangePassStyle.card}>
            <Card.Content>
              <Title style={ChangePassStyle.title}>Forgot Password</Title>
              <TextInput
                label="Email Address"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                style={ChangePassStyle.input}
              />
              <Button mode="contained" onPress={handleEmailSubmit} style={ChangePassStyle.buttonContainer}>
                Submit
              </Button>
              <Button
                mode="contained"
                onPress={() => navigation.navigate('index')}
                style={ChangePassStyle.cancelButton}
              >
                Back to Login
              </Button>
            </Card.Content>
          </Card>
        )}
      </View>
    </SafeAreaView>
  )
}
