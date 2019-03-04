import React from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import { ActionSheetProvider } from '@expo/react-native-action-sheet'
import { AppLoading, FileSystem, Asset, Font, Icon } from 'expo'
import * as firebase from 'firebase'

import FirebaseKeys from './api/FirebaseKeys.js'
import { storeItem, retrieveItem, removeItem } from './config/Storage'
import { store, persistor } from './config/Store'
import * as Constants from 'src/config/Constants'
import HomeDrawerNavigator from 'src/navigators/HomeDrawerNavigator'
import Init from 'src/Init'
import {
  registerForCamera,
  registerForCameraRoll
} from 'src/config/Permissions'

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      allowPushNotifications: false,
      checkedSignIn: false,
      hasOnboarded: true,
      isLoadingComplete: false,
      isAuthenticationReady: true,
      isAuthenticated: true,
      signedIn: false
    }

    // Initialize firebase
    if (!firebase.apps.length) {
      firebase.initializeApp(FirebaseKeys.FirebaseConfig)
    }
  }

  componentDidMount() {
    registerForCamera()
      .then(console.log('Camera Permission Granted'))
      .catch(error => {
        throw new Error('Camera Permission Denied', error)
      })

    registerForCameraRoll()
      .then(console.log('Camera Roll Permission Granted'))
      .catch(error => {
        throw new Error('Camera Roll Permission Denied', error)
      })

    FileSystem.getInfoAsync(Constants.IMAGE_CACHE_LOC)
      .then(opts => {
        if (!opts.exists) {
          FileSystem.makeDirectoryAsync(Constants.IMAGE_CACHE_LOC).catch(e => {
            console.log('Unable to create image cache directory: ', e)
            throw new Error('Unable to create image cache directory: ', e)
          })
        }
      })
      .catch(e => {
        console.log('Error retrieving folder information: ', e)
        throw new Error('Error retrieving folder information: ', e)
      })
  }

  render() {
    const {
      isLoadingComplete,
      isAuthenticationReady
      // isAuthenticated
    } = this.state

    if (
      (!isLoadingComplete || !isAuthenticationReady) &&
      !this.props.skipLoadingScreen
    ) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      )
    } else {
      return (
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <ActionSheetProvider>
              <Init />
            </ActionSheetProvider>
          </PersistGate>
        </Provider>
      )
    }
  }

  _loadResourcesAsync = () => {}

  _handleLoadingError = error => {
    // In this case, you might want to export the error to your error
    // reporting service. For example Sentry
    console.warn(error)
  }

  _handleFinishLoading = () => {
    // retrieveItem('profile-image/data')
    //   .then(item => {
    //     // item && this.props.setProfileImageData(item)
    //     console.log('[DEBUG] profile image data: ')
    //     console.log(item)
    //   })
    //   .catch(err => {
    //     alert('Error: ' + err)
    //   })

    this.setState({ isLoadingComplete: true })
  }
}

export default App
