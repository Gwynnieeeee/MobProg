import { View, Text } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { greyColor, primaryColor, TabsStyle } from '@/assets/styles/TabsStyle'
import DashboardPage from './DashboardPage'
import ProfilePage from './ProfilePage'
import SettingsPage from './SettingsPage'

const Tab = createBottomTabNavigator()

const HomePage = ()  => {
  
  return (

    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: TabsStyle.tabbar,
        tabBarActiveTintColor: primaryColor,
        tabBarInactiveTintColor: greyColor,
        tabBarLabelStyle: {
          fontSize: 15,
          marginTop: 15
        }
      }}>
      <Tab.Screen
        name='DashboardPage'
        component={DashboardPage}
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color })  => 
            <FontAwesome 
              size = {36} 
              name = 'home'  
              color = {color} />}} />
      <Tab.Screen
        name='ProfilePage'
        component={ProfilePage}
        options={{
          title: 'Profile',
          tabBarIcon: ({ color })  => 
            <FontAwesome 
              size = {36} 
              name = 'user'  
              color = {color} />}} />
      <Tab.Screen
        name='SettingsPage'
        component={SettingsPage}
        options={{
          title: 'Settings',
          tabBarIcon: ({ color })  => 
            <FontAwesome 
              size = {36} 
              name = 'cog'  
              color = {color} />}} />
    </Tab.Navigator>

  )
}

export default HomePage