import React, { Component } from 'react'
import {
  Alert,
  AppState,
  Dimensions,
  Button,
  Image,
  Text,
  View,
  StatusBar,
  ScrollView,
  SafeAreaView,
  TouchableOpacity
} from 'react-native'
import { LinearGradient, Notifications } from 'expo'
import * as firebase from 'firebase'

import * as Constants from 'src/config/Constants'

import {
  setBadgeNumber,
  registerForPushNotifications
} from 'src/config/PushNotifications'

const today = new Date().getDay()
const { width: MAX_WIDTH, height: MAX_HEIGHT } = Dimensions.get('window')
const IMAGE_HEIGHT = MAX_WIDTH / 3

class HomeTabScreen extends Component {
  constructor() {
    super()
    this.state = {
      appState: AppState.currentState,
      pushEnabled: false,
      pushData: 'this is a test'
    }
  }

  _handleUpdate(doUpdate = false) {
    if (doUpdate) {
      Expo.Updates.reloadFromCache()
    } else {
      alert('The app will update next time you launch it.')
    }
  }

  async checkUpdate() {
    if (!__DEV__) {
      const { isAvailable } = await Expo.Updates.checkForUpdateAsync()
      if (isAvailable) {
        await Expo.Updates.fetchUpdateAsync()
        Alert.alert(
          'New Version Available',
          'There is a new version of the app available. Do you want to update the app now?',
          [
            { text: 'Yes', onPress: () => this._handleUpdate(true) },
            { text: 'No', onPress: () => this._handleUpdate(false) }
          ],
          { cancelable: false }
        )
      }
    }
  }

  handleAppStateChange = nextAppState => {
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      setBadgeNumber(0)
      this.checkUpdate()
    }
    this.setState({ appState: nextAppState })
  }

  componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChange)
    this.checkUpdate()

    registerForPushNotifications().then(token => {
      if (token) {
        this.setState({ pushEnabled: true })

        const deviceID = Expo.Constants.installationId
        const pushToken = token

        firebase
          .database()
          .ref(`devicePushTokens/${deviceID}`)
          .set({ pushToken })
          .then(data => {})
          .catch(error => {
            Alert.alert('There was an error with your request.', error)
          })

        this.notificationSubscription = Notifications.addListener(
          this.handlePushNotification
        )
      } else {
        this.setState({ pushEnabled: false })
      }
      return Promise.resolve()
    })
  }

  componentWillUnmount() {
    this.notificationSubscription.remove()
    AppState.removeEventListener('change', this.handleAppStateChange)
  }

  handlePushNotification = ({ data, origin }) => {
    if (origin === 'selected') {
      // user opened app via push
      // if (data.route) {
      //   this.props.navigation.navigate('Fast', { fast_day: data.routeData })
      // }
    } else if (origin === 'received') {
      Alert.alert(data.title, data.body, [
        { text: 'Cancel', onPress: () => {}, style: 'cancel' },
        {
          text: 'OK',
          onPress: () => {
            this.props.navigation.navigate('Fast', {
              fast_day: data.routeData
            })
          }
        }
      ])
    }

    if (data !== null) {
      this.setState({
        pushData: JSON.stringify(data)
      })
    }

    Alert.alert(data.title, data.body, [
      { text: 'Cancel', onPress: () => {}, style: 'cancel' },
      {
        text: 'OK',
        onPress: () => {
          alert('you pressed ok')
        }
      }
    ])
  }

  render() {
    return (
      <LinearGradient
        // colors={['#0f2028', '#203a43', '#2c5364']} // https://uigradients.com/#MoonlitAsteroid
        // colors={['#141e30', '#243b55']} // https://uigradients.com/#Royal
        //colors={['#444444', '#434343']} // https://uigradients.com/#DeepSpace
        colors={['#232526', '#414345']} // https://uigradients.com/#MidnightCity
        // colors={['#283048', '#859398']} // https://uigradients.com/#Titanium
        //colors={['#16222a', '#3a6073']} //https://uigradients.com/#Mirage
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
          style={{
            flex: 1,
            justifyContent: 'flex-start',
            alignItems: 'center'
          }}
        >
          <Image
            resizeMode="cover"
            source={require('src/assets/images/header/home.png')}
            style={{ height: IMAGE_HEIGHT, width: MAX_WIDTH }}
          />
          <ScrollView
            bounces={false}
            style={{
              // flex: 5,
              alignSelf: 'stretch'
            }}
          >
            <View
              style={{
                alignSelf: 'stretch',
                height: 150,
                backgroundColor: 'white',
                borderColor: 'lightblue',
                borderWidth: 1,
                paddingBottom: 5,
                marginHorizontal: 5,
                borderRadius: 5
              }}
            >
              <Text style={{ color: 'black' }}>Give</Text>
              <Button
                onPress={() => alert('you pressed build email')}
                title="Build Email"
              />
            </View>
            <View
              style={{
                alignSelf: 'stretch',
                height: 150,
                backgroundColor: 'white',
                borderColor: 'lightblue',
                borderWidth: 1,
                paddingBottom: 5,
                marginHorizontal: 5,
                borderRadius: 5
              }}
            >
              <Text style={{ color: 'black' }}>Give</Text>
              <Button
                onPress={() => alert('you pressed build email')}
                title="Build Email"
              />
            </View>
            <View
              style={{
                alignSelf: 'stretch',
                height: 150,
                backgroundColor: 'white',
                borderColor: 'lightblue',
                borderWidth: 1,
                paddingBottom: 5,
                marginHorizontal: 5,
                borderRadius: 5
              }}
            >
              <Text style={{ color: 'black' }}>Give</Text>
              <Button
                onPress={() => alert('you pressed build email')}
                title="Build Email"
              />
            </View>

            <View
              style={{
                alignSelf: 'stretch',
                height: 150,
                backgroundColor: 'white',
                borderColor: 'lightblue',
                borderWidth: 1,
                paddingBottom: 5,
                marginHorizontal: 5,
                borderRadius: 5
              }}
            >
              <Text style={{ color: 'black' }}>Give</Text>
              <Button
                onPress={() => alert('you pressed build email')}
                title="Build Email"
              />
            </View>
          </ScrollView>
          {/* <View style={{ flex: 1 }}>
            <Text style={{ color: 'white' }}>Home Tab Screen</Text>
            {today === Constants.DAY_OF_WEEK.SATURDAY ? (
              <Text style={{ color: 'white' }}>Today is Saturday</Text>
            ) : (
              <Text style={{ color: 'white' }}> Today is not Saturday</Text>
            )}
            <Text style={{ color: 'white' }}> Today is: {today} </Text>

            <TouchableOpacity
              onPress={() => this.props.navigation.openDrawer()}
            >
              <Text>Open Drawer</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.props.navigation.openDrawer()}
            >
              <LinearGradient
                colors={['#4c669f', '#3b5998', '#192f6a']}
                style={{ padding: 10, alignItems: 'center', borderRadius: 5 }}
              >
                <Text
                  style={{
                    backgroundColor: 'transparent',
                    fontSize: 15,
                    color: '#fff'
                  }}
                >
                  Open Drawer
                </Text>
              </LinearGradient>
            </TouchableOpacity>
            <View style={{ borderColor: 'yellow', borderWidth: 3 }}>
              <Text style={{ color: 'white' }}>{this.state.pushData}</Text>
            </View>
          </View> */}
        </SafeAreaView>
      </LinearGradient>
    )
  }
}

export default HomeTabScreen
