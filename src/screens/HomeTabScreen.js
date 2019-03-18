import React, { Component } from 'react'
import {
  Alert,
  AppState,
  Dimensions,
  Button,
  FlatList,
  Image,
  Text,
  View,
  StatusBar,
  ScrollView,
  SafeAreaView,
  TouchableOpacity
} from 'react-native'
import { LinearGradient, Notifications } from 'expo'
import { Feather } from '@expo/vector-icons'
import * as firebase from 'firebase'

import * as Constants from 'src/config/Constants'
import {
  setBadgeNumber,
  registerForPushNotifications
} from 'src/config/PushNotifications'

import { CachedProgressiveImage } from 'src/components/Image'

const { width: MAX_WIDTH, height: MAX_HEIGHT } = Dimensions.get('window')
const IMAGE_HEIGHT = MAX_WIDTH / 3

class HomeTabScreen extends Component {
  constructor() {
    super()
    this.state = {
      appState: AppState.currentState,
      pushEnabled: false,
      pushData: 'this is a test',
      mainItemList: []
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

  getItemList = async () => {
    const _today = new Date().getDay()
    var itemList = []
    var snapshot = await firebase
      .database()
      .ref(Constants.MAIN_SCREEN_ROUTE)
      .orderByChild('Position')
      .once('value')

    if (snapshot.exists()) {
      snapshot.forEach(snap => {
        var val = snap.val()

        if (val.Published) {
          if (
            !val.DayOfWeek ||
            _today === Constants.DAY_OF_WEEK[val.DayOfWeek.toUpperCase()]
          ) {
            itemList.push({
              title: val.Title,
              imgUrl: val.Image,
              route: val.Route,
              dayOfWeek: val.DayOfWeek || 'NONE'
            })
          }
        }
      })
    }

    return itemList
  }

  componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChange)
    this.checkUpdate()

    this.getItemList().then(itemList =>
      this.setState({
        mainItemList: itemList
      })
    )

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

  renderItem = item => {
    return (
      <TouchableOpacity
        style={{
          alignSelf: 'stretch',
          marginHorizontal: 5,
          marginBottom: 3
          // paddingBottom: 5
        }}
        onPress={() => alert('You pressed: ' + item.item.route)}
      >
        <CachedProgressiveImage
          resizeMode="cover"
          // resizeMethod="scale"
          style={{
            height: 200,
            alignSelf: 'stretch'
          }}
          source={{
            uri: item.item.imgUrl
          }}
          ttl={30}
        />

        <View
          style={{
            position: 'absolute',
            height: 35,
            left: 0,
            bottom: 0,
            right: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)'
          }}
        />
        <Text
          style={{
            position: 'absolute',
            width: '100%',
            textAlign: 'center',
            bottom: 0 + 5,
            color: 'white',
            fontSize: 20,
            fontWeight: '300'
          }}
        >
          {item.item.title}
        </Text>
      </TouchableOpacity>
    )
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
          <View
            style={{
              alignSelf: 'stretch',
              alignItems: 'center',
              width: MAX_WIDTH
            }}
          >
            <TouchableOpacity
              onPress={() => this.props.navigation.openDrawer()}
              style={{
                position: 'absolute',
                padding: 10,
                left: 0,
                top: 18
              }}
            >
              <Feather name="menu" size={20} color={'white'} />
            </TouchableOpacity>
            <Image
              resizeMode="center"
              source={require('src/assets/images/header/home.png')}
              style={{
                height: IMAGE_HEIGHT - 45,
                width: MAX_WIDTH - 70
              }}
            />
          </View>
          <View
            style={{
              alignSelf: 'stretch',
              flex: 1
            }}
          >
            <FlatList
              style={{
                alignSelf: 'stretch'
              }}
              data={this.state.mainItemList}
              keyExtractor={(data, index) => index.toString()}
              renderItem={this.renderItem}
            />
          </View>
        </SafeAreaView>
      </LinearGradient>
    )
  }
}

export default HomeTabScreen
