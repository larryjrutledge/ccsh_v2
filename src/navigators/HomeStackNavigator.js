import React from 'react'
import { createStackNavigator } from 'react-navigation'

import { FontAwesome } from '@expo/vector-icons'

import HomeTabScreen from 'src/screens/HomeTabScreen'
import ContactScreen from 'src/screens/ContactScreen'
import PrayerRequestScreen from 'src/screens/PrayerRequestScreen'
import LocationScreen from 'src/screens/LocationScreen'
import NextStepsScreen from 'src/screens/NextStepsScreen'
import ConnectCardScreen from 'src/screens/ConnectCardScreen'

const HomeStackNavigator = createStackNavigator({
  Home: {
    screen: HomeTabScreen,
    headerMode: 'none',
    navigationOptions: {
      title: 'Home',
      header: null,
      tabBarIcon: ({ tintColor }) => (
        <FontAwesome name="home" size={20} color={tintColor} />
      )
    }
  },
  Connect: {
    screen: ConnectCardScreen,
    headerMode: 'none',
    navigationOptions: {
      title: 'Connect',
      header: null
    }
  },
  NextSteps: {
    screen: NextStepsScreen,
    headerMode: 'none',
    navigationOptions: {
      title: 'Next Steps',
      header: null
    }
  },
  Contact: {
    screen: ContactScreen,
    headerMode: 'none',
    navigationOptions: {
      title: 'Contact',
      header: null
    }
  },
  Prayer: {
    screen: PrayerRequestScreen,
    headerMode: 'none',
    navigationOptions: {
      title: 'Prayer Request',
      header: null
    }
  },
  Location: {
    screen: LocationScreen,
    headerMode: 'none',
    navigationOptions: {
      title: 'Location',
      header: null
    }
  }
})

export default HomeStackNavigator
