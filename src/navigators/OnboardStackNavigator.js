import React from 'react'
import { createAppContainer, createStackNavigator } from 'react-navigation'

import { FontAwesome } from '@expo/vector-icons'

import OnboardScreen from 'src/screens/OnboardScreen'

const OnboardStackNavigator = createStackNavigator({
  Home: {
    screen: OnboardScreen,
    headerMode: 'none',
    navigationOptions: {
      title: 'Onboard',
      header: null,
      tabBarIcon: ({ tintColor }) => (
        <FontAwesome name="home" size={20} color={tintColor} />
      )
    }
  }
})

export default OnboardStackNavigator
