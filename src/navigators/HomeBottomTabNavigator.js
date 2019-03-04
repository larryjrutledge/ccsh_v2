import React, { Component } from 'react'
import { Linking } from 'react-native'
import { createBottomTabNavigator, StackActions } from 'react-navigation'

import { FontAwesome, MaterialIcons, Feather } from '@expo/vector-icons'

import HomeTabScreen from 'src/screens/HomeTabScreen'
import SermonTabScreen from 'src/screens/SermonTabScreen'
import BlogTabScreen from 'src/screens/BlogTabScreen'
import EventsTabScreen from 'src/screens/EventsTabScreen'
import BibleTabScreen from 'src/screens/BibleTabScreen'
import GiveTabScreen from 'src/screens/GiveTabScreen'

// import BlogCollapse from 'src/screens/BlogCollapse'
import HomeStackNavigator from 'src/navigators/HomeStackNavigator'
import BlogStackNavigator from 'src/navigators/BlogStackNavigator'

const HomeBottomTabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: HomeStackNavigator,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <FontAwesome name="home" size={20} color={tintColor} />
        )
      }
    },
    Blog: {
      screen: BlogStackNavigator,
      navigationOptions: {
        tabBarLabel: 'Blog',
        tabBarIcon: ({ tintColor }) => (
          <FontAwesome name="book" size={20} color={tintColor} />
        )
      }
    },
    // Blog: {
    //   screen: BlogItemStack
    //   // screen: BlogCollapse,
    //   // navigationOptions: {
    //   //   tabBarLabel: 'Blog',
    //   //   tabBarIcon: ({ tintColor }) => (
    //   //     <FontAwesome name="book" size={20} color={tintColor} />
    //   //   )
    //   // }
    // },
    Sermon: {
      screen: SermonTabScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <MaterialIcons name="mic-none" size={20} color={tintColor} />
        )
        // tabBarOnPress: () => {
        //   Linking.openURL(
        //     'https://itunes.apple.com/us/podcast/christ-chapel-at-spring-hill/id1223836816'
        //   )
        // }
      }
    },
    Event: {
      screen: EventsTabScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <FontAwesome name="calendar" size={20} color={tintColor} />
        )
      }
    },
    Bible: {
      screen: BibleTabScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <FontAwesome name="book" size={20} color={tintColor} />
        ),
        tabBarOnPress: () => {
          Linking.openURL('https://www.bible.com/bible')
        }
      }
    },
    Give: {
      screen: GiveTabScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <FontAwesome name="heart-o" size={20} color={tintColor} />
        )
      }
    }
  },
  {
    initialRouteName: 'Home',
    order: ['Home', 'Blog', 'Sermon', 'Event', 'Bible', 'Give'],
    tabBarOptions: {
      activeTintColor: '#FFF',
      inactiveTintColor: '#777',
      style: {
        backgroundColor: '#161616'
      }
    }
  }
)

export default HomeBottomTabNavigator
