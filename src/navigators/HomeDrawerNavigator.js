import React from 'react'
import { createAppContainer, createDrawerNavigator } from 'react-navigation'
import { FontAwesome, MaterialIcons, SimpleLineIcons } from '@expo/vector-icons'

import { connect } from 'react-redux'

import HomeBottomTabNavigator from 'src/navigators/HomeBottomTabNavigator'
import ContactScreen from 'src/screens/ContactScreen'
import PrayerRequestScreen from 'src/screens/PrayerRequestScreen'
import LocationScreen from 'src/screens/LocationScreen'
import SettingsScreen from 'src/screens/SettingsScreen'
import NextStepsScreen from 'src/screens/NextStepsScreen'
import AdminScreen from 'src/screens/AdminScreen'
import Drawer from 'src/components/Drawer'

const HomeDrawerNavigator = createDrawerNavigator(
  {
    Home: {
      screen: HomeBottomTabNavigator,
      navigationOptions: {
        drawerLabel: 'Home',
        drawerIcon: ({ tintColor }) => (
          <FontAwesome name="home" size={20} color={tintColor} />
        )
      }
    },
    Location: {
      screen: LocationScreen,
      navigationOptions: {
        drawerLabel: 'Location',
        drawerIcon: ({ tintColor }) => (
          <SimpleLineIcons name="location-pin" size={20} color={tintColor} />
        )
      }
    },
    NextSteps: {
      screen: NextStepsScreen,
      navigationOptions: {
        drawerLabel: 'Next Steps',
        drawerIcon: ({ tintColor }) => (
          <SimpleLineIcons
            name="arrow-right-circle"
            size={20}
            color={tintColor}
          />
        )
      }
    },
    Prayer: {
      screen: PrayerRequestScreen,
      navigationOptions: {
        drawerLabel: 'Prayer Request',
        drawerIcon: ({ tintColor }) => (
          <SimpleLineIcons name="fire" size={20} color={tintColor} />
        )
      }
    },
    Settings: {
      screen: SettingsScreen,
      navigationOptions: {
        drawerLabel: 'Settings',
        drawerIcon: ({ tintColor }) => (
          <MaterialIcons name="mic-none" size={20} color={tintColor} />
        )
      }
    },
    Contact: {
      screen: ContactScreen,
      navigationOptions: {
        drawerLabel: 'Contact Us',
        drawerIcon: ({ tintColor }) => (
          <SimpleLineIcons name="envelope" size={20} color={tintColor} />
        )
      }
    },
    Admin: {
      screen: AdminScreen,
      navigationOptions: {
        drawerLabel: 'Admin',
        drawerIcon: ({ tintColor }) => (
          <MaterialIcons name="mic-none" size={20} color={tintColor} />
        )
      }
    }
  },
  {
    contentComponent: Drawer
  }
)

const mapStateToProps = state => {
  return {
    profileIsAdmin: state.profileReducer.profileIsAdmin
  }
}

export default connect(mapStateToProps)(HomeDrawerNavigator)
