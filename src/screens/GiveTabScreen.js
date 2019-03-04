import React, { Component } from 'react'
import {
  Text,
  View,
  StatusBar,
  SafeAreaView,
  Image,
  Button,
  FlatList
} from 'react-native'
import { LinearGradient, SecureStore } from 'expo'

import { Feather } from '@expo/vector-icons'
import * as Constants from 'src/config/Constants'
import Header from 'src/components/Header'
import { sendFormEmail } from 'src/config/Utils'

class GiveTabScreen extends React.Component {
  buildEmail = () => {
    sendFormEmail(
      Constants.COMMGROUP_SIGNUP_TEMPLATE_ID,
      'no-reply@christchapel.live',
      'Spring 2019 Community Group Sign Up',
      [
        {
          name: 'Larry Rutledge (main account)',
          email: 'larryjrutledge@gmail.com'
        }
      ],
      [
        {
          name: 'Larry Rutledge (christ chapel)',
          email: 'lrutledge@christchapel.live'
        }
      ],
      [],
      {
        ['field' + 'Name']: 'John Doe',
        ['field' + 'Email']: 'jdoe@domain.com',
        ['field' + 'Phone']: '123-456-7890',
        ['field' + 'Group']: 'Test Group'
      }
    )
  }

  render() {
    return (
      <LinearGradient
        colors={['#232526', '#414345']} // https://uigradients.com/#MidnightCity
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
        }}
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 1 }}
      >
        <StatusBar barStyle="light-content" />
        <SafeAreaView
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <Header
            {...this.props}
            left={<Feather name="menu" size={20} color={'white'} />}
            leftPress={() => {
              this.props.navigation.openDrawer()
            }}
            title="Give"
          />

          <View
            style={{
              flex: 1,
              alignSelf: 'stretch',
              alignItems: 'center',
              justifyContent: 'flex-start'
            }}
          >
            <View
              style={{
                alignSelf: 'stretch',
                height: 50,
                paddingHorizontal: 10
              }}
            >
              <Text style={{ color: 'white' }}>
                Partner with us in our mission of reaching people with the
                life-giving message of Jesus
              </Text>
            </View>
            <View
              style={{
                alignSelf: 'stretch',
                height: 100,
                backgroundColor: 'white',
                borderColor: 'lightblue',
                borderWidth: 1,
                paddingBottom: 5,
                marginHorizontal: 5,
                borderRadius: 5
              }}
            >
              <Text style={{ color: 'black' }}>Give</Text>
              <Button onPress={() => this.buildEmail()} title="Build Email" />
            </View>
          </View>
        </SafeAreaView>
      </LinearGradient>
    )
  }
}

export default GiveTabScreen
