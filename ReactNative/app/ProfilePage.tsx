import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useState } from 'react'
import { View, Text, Image, ImageBackground } from 'react-native'
import { Card, TextInput } from 'react-native-paper'
import { User } from '../components/get/User'
import { ProfileStyle } from '../assets/styles/ProfileStyle'
import { useFocusEffect } from '@react-navigation/native'
import { FontAwesome } from '@expo/vector-icons';

interface ProfilePageProps {
  navigation: any
}

const ProfilePage = (props: ProfilePageProps)  => {
  const [currentUser, setCurrentUser] = useState<User | null>(null)

  const loadCurrentUser = async () => {
    try {
      const userData = await AsyncStorage.getItem('currentUser')
      const user = userData ? JSON.parse(userData) : null
      setCurrentUser(user)
    } catch (error) {
      console.error('Failed to load user data')
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      loadCurrentUser()
    }, [])
  )

  const defaultImageUri = '../assets/images/user.jpg'
  
  return (

    <View style={ProfileStyle.container}>
      <ImageBackground 
        source={require('../assets/images/background1.jpg')}
        style={ProfileStyle.backgroundImage}
      >
        {currentUser ? (
          <Card style={ProfileStyle.card}>
            <View style={ProfileStyle.profileImageContainer}>
              <Image
                source={{ uri: currentUser.imageUri || defaultImageUri }}
                style={ProfileStyle.profileImage}
              />
            </View>
            <Text style={ProfileStyle.followers}>Followers: 12,000</Text>
            <Text style={ProfileStyle.username}>{currentUser.firstName} {currentUser.lastName}</Text>
            <Text style={ProfileStyle.subtitle}>Tiktok streamer</Text>
            <View style={ProfileStyle.tagsContainer}>
              <Text style={ProfileStyle.tag}>Photographer</Text>
              <Text style={ProfileStyle.tag}>Gamer</Text>
              <Text style={ProfileStyle.tag}>Hairstylist</Text>
              <Text style={ProfileStyle.tag}>Writer</Text>
            </View>
            <View style={ProfileStyle.infoSection}>
              <View style={ProfileStyle.infoCard}><Text>Age</Text><Text>21</Text></View>
              <View style={ProfileStyle.infoCard}><Text>Location</Text><Text>Cebu</Text></View>
              <View style={ProfileStyle.infoCard}><Text>Hobbies</Text><Text>Writing</Text></View>
              <View style={ProfileStyle.infoCard}><Text>Height</Text><Text>130cm</Text></View>
            </View>
            <View style={ProfileStyle.socialIcons}>
              <FontAwesome name="facebook" size={24} color="black" />
              <FontAwesome name="twitter" size={24} color="black" />
              <FontAwesome name="instagram" size={24} color="black" />
            </View>
          </Card>
        ) : (
          <Text>Loading user data...</Text>
        )}
      </ImageBackground>
    </View>

  )
}

export default ProfilePage
