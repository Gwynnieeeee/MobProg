import { View, Text} from 'react-native'
import React from 'react'
import { DashboardStyle } from '../assets/styles/DashboardStyle'

const DashboardPage = () => {
  
  return (

    <View style={DashboardStyle.container}>
      <Text style={DashboardStyle.welcome}>Dashboard</Text>
    </View>

    )
  }

export default DashboardPage