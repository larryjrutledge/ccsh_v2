import React from 'react'
import { createStackNavigator } from 'react-navigation'

import BlogTabScreen from 'src/screens/BlogTabScreen'
import BlogItemScreen from 'src/screens/BlogItemScreen'

const BlogStackNavigator = createStackNavigator({
  BlogList: {
    screen: BlogTabScreen,
    headerMode: 'none',
    navigationOptions: {
      header: null
    }
  },
  BlogItem: {
    screen: BlogItemScreen,
    headerMode: 'none',
    navigationOptions: {
      header: null
    }
  }
})

export default BlogStackNavigator

// headerMode: 'none',
// navigationOptions: {
//   title: 'Prayer Request',
//   header: null
// }
