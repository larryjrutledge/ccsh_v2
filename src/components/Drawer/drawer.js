import React from 'react'
import {
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import { connect } from 'react-redux'

import { DrawerItems } from 'react-navigation'

import styles from './styles'

const Drawer = props => {
  return (
    <SafeAreaView style={[styles.mainContainer, { backgroundColor: 'black' }]}>
      <View
        style={[
          styles.container,
          { backgroundColor: 'transparent', marginVertical: 20 }
        ]}
      >
        <View style={styles.profileBorderDark}>
          <View style={styles.profileBorderLight}>
            {props.profileImageData !== '' ? (
              <Image
                source={{ uri: props.profileImageData }}
                style={styles.profileImage}
              />
            ) : (
              <Image
                source={require('../../assets/generic-profile-picture.png')}
                style={styles.profileImage}
              />
            )}
          </View>
        </View>
        <TouchableOpacity onPress={() => props.navigation.navigate('Settings')}>
          {props.profileUserName !== '' ? (
            <Text style={{ marginTop: 10, color: 'white' }}>
              {props.profileUserName}
            </Text>
          ) : (
            <Text style={{ marginTop: 10, color: 'white' }}>Sign In</Text>
          )}
        </TouchableOpacity>
        {/* <View style={styles.authContainer}>
          <TouchableOpacity>
            <Text>Sign In</Text>
          </TouchableOpacity>
          <Text>/</Text>
          <TouchableOpacity>
            <Text>Sign Up</Text>
          </TouchableOpacity>
        </View> */}
      </View>
      <ScrollView style={{ backgroundColor: 'white' }}>
        <DrawerItems
          {...props}
          onItemPress={route => {
            props.navigation.closeDrawer()
            props.navigation.navigate(route.route.routeName)
          }}
          items={props.items.filter(
            item =>
              item.routeName !== 'Admin' ||
              (item.routeName === 'Admin' && props.profileIsAdmin)
          )}
        />
      </ScrollView>
      <View
        style={[styles.bottomInfoBlockContainer, { backgroundColor: 'white' }]}
      >
        <Text>Expo Version: {Expo.Constants.expoVersion}</Text>
        {/* <Text>Device Name: {Expo.Constants.deviceName}</Text>
        <Text>Device Year: {Expo.Constants.deviceYearClass}</Text>
        <Text>
          isDevice: {Expo.Constants.isDevice ? 'On Device' : 'In Simulator'}
        </Text>
        <Text>Status Bar Height: {Expo.Constants.statusBarHeight}</Text>
        <Text style={{ color: '#ccc', fontSize: 10 }}>
          build: {Expo.Constants.manifest.ios.buildNumber} || platform:{' '}
          {Platform.OS}
        </Text> */}
      </View>
    </SafeAreaView>
  )
}

const mapStateToProps = state => {
  return {
    profileImageData: state.profileReducer.profileImageData,
    profileUserName: state.profileReducer.profileUserName,
    profileIsAdmin: state.profileReducer.profileIsAdmin
  }
}

export default connect(mapStateToProps)(Drawer)
