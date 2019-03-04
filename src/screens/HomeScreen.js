import React, { Component } from 'react'
import {
  AsyncStorage,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity
} from 'react-native'
import Modal from 'react-native-modal'

class HomeScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      hasOnboarded: true,
      allowPushNotifications: false
    }
  }

  _handleEnable = () => {
    this.setState({ hasOnboarded: true, allowPushNotifications: true })
    this._storeData('@ChristChapelSH:hasOnboarded', true)
  }

  _handleDismiss = () => {
    this.setState({ hasOnboarded: true, allowPushNotifications: false })
    this._storeData('@ChristChapelSH:hasOnboarded', true)
  }

  async _storeData(key, item) {
    try {
      var result = await AsyncStorage.setItem(key, JSON.stringify(item))
    } catch (error) {
      console.log('[DEBUG] data storage failed: ', error.message)
    }
  }

  async removeItemValue(key) {
    try {
      await AsyncStorage.removeItem(key)
      this.setState({ hasOnboarded: false })
      return true
    } catch (exception) {
      return false
    }
  }

  async _retrieveData(key) {
    try {
      const value = await AsyncStorage.getItem(key)
      if (value !== null) {
        // We have data!!
      }
      return value
    } catch (error) {
      console.log('AsyncStorage fetch failed: ', error)
    }
  }

  async componentDidMount() {
    this._retrieveData('@ChristChapelSH:hasOnboarded')
      .then(value => {
        // we have data
      })
      .catch(error => {
        console.log('[DEBUG] data retrieve failed')
      })

    let storedValue = await AsyncStorage.getItem('@ChristChapelSH:hasOnboarded')
    if (this.state.hasOnboarded !== storedValue) {
      this.setState({ hasOnboarded: storedValue })
    }
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={[styles.container]}>
          <Text>Home Tab Screen</Text>
          <Text>
            Has Onboarded: {this.state.hasOnboarded ? 'True' : 'False'}
          </Text>
          <Text>
            Allow Push Notifications:{' '}
            {this.state.allowPushNotifications ? 'True' : 'False'}
          </Text>
          <TouchableOpacity
            onPress={() => this.removeItemValue('@ChristChapelSH:hasOnboarded')}
          >
            <Text>Remove Stored On Boarded Key</Text>
          </TouchableOpacity>
        </View>
        <Modal
          isVisible={!this.state.hasOnboarded}
          style={styles.modalOnboardContainer}
        >
          <View
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
          >
            <Text>Allow Push Notification</Text>
            <TouchableOpacity onPress={this._handleEnable}>
              <Text>Enable</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this._handleDismiss}>
              <Text>No Thanks</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </SafeAreaView>
    )
  }
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  modalOnboardContainer: {
    borderRadius: 10,
    flex: 0,
    margin: 0,
    top: '75%',
    height: '25%',
    backgroundColor: '#FFF'
  }
})
