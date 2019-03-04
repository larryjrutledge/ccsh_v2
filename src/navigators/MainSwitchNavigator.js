import React from 'react'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'

import HomeDrawerNavigator from 'src/navigators/HomeDrawerNavigator'
import OnboardStackNavigator from 'src/navigators/OnboardStackNavigator'

const MainSwitchNavigator = createSwitchNavigator(
  {
    onboard: OnboardStackNavigator,
    home: HomeDrawerNavigator
  },
  {
    initialRouteName: 'onboard'
  }
)

export default createAppContainer(MainSwitchNavigator)
