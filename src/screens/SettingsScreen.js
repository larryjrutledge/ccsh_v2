import React from 'react'
import {
  TextInput,
  Text,
  View,
  Image,
  SafeAreaView,
  TouchableOpacity
} from 'react-native'
import { connect } from 'react-redux'
import * as firebase from 'firebase'

import { ImagePicker, Notifications } from 'expo'
import { connectActionSheet } from '@expo/react-native-action-sheet'
import { PURGE } from 'redux-persist'
import {
  assignProfileImageData,
  clearProfileImageData,
  assignProfileUserName,
  assignProfileAdmin
} from 'src/actions/profileActions'

class SettingsScreen extends React.Component {
  takeProfilePhoto = async () => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: 'Images',
      quality: 0,
      allowsEditing: true,
      base64: true,
      aspect: [4, 3]
    })

    if (!result.cancelled) {
      const imageData = 'data:image/png;base64,' + result.base64
      this.props.setProfileImageData(imageData)
    }
  }

  pickPhotoFromCameraRoll = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: 'Images',
      quality: 0,
      allowsEditing: true,
      base64: true,
      aspect: [4, 3]
    })

    if (!result.cancelled) {
      const imageData = 'data:image/png;base64,' + result.base64
      this.props.setProfileImageData(imageData)
    }
  }

  openProfileActionSheet = () => {
    let options = ['Take Photo', 'Choose from Library', 'Cancel']
    let cancelButtonIndex = 2

    this.props.showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        title: 'Pick a Profile Image'
      },
      buttonIndex => {
        switch (buttonIndex) {
          case 0:
            this.takeProfilePhoto()
            break
          case 1:
            this.pickPhotoFromCameraRoll()
            break
        }
      }
    )
  }

  setUser = () => {
    firebase
      .database()
      .ref(`users/Larry Rutledge`)
      .set({
        userName: 'larryjrutledge',
        fullName: 'Larry Rutledge',
        email: 'larryjrutledge@gmail.com',
        isAdmin: true
      })
      .then(data => {})
      .catch(error => {
        Alert.alert(
          'There was an error with your request. Please try again, but if the issue persists notify someone on the tech team and provide them the following error information: ',
          error
        )
      })
  }

  getUser = () => {
    // this.setUser()
    firebase
      .database()
      .ref(`users/Larry Rutledge`)
      .once('value')
      .then()
  }

  clearLocalNotifications = () => {
    Notifications.cancelAllScheduledNotificationsAsync()
  }

  render() {
    const { profileImageData, profileUserName, profileIsAdmin } = this.props

    // this.getUser()
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <TouchableOpacity onPress={this.openProfileActionSheet}>
            <View
              style={{
                width: 190,
                height: 190,
                borderRadius: 95,
                backgroundColor: '#232323',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <View
                style={{
                  width: 185,
                  height: 185,
                  borderRadius: 92,
                  backgroundColor: 'white',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {profileImageData !== '' ? (
                  <Image
                    source={{ uri: profileImageData }}
                    style={{
                      width: 180,
                      height: 180,
                      borderRadius: 90
                    }}
                  />
                ) : (
                  <Image
                    source={require('../assets/generic-profile-picture.png')}
                    style={{ width: 180, height: 180, borderRadius: 90 }}
                  />
                )}
              </View>
            </View>
          </TouchableOpacity>
          <TextInput
            style={{
              height: 40,
              width: 100,
              borderColor: 'gray',
              borderWidth: 1
            }}
            onChangeText={text => this.props.setProfileUserName(text)}
            value={profileUserName}
          />
          <Text>Settings Screen</Text>
          <TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>
            <Text>Open Drawer</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.props.purgeLocalStorage()}>
            <Text>Purge Local Storage</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.setProfileAdmin(!profileIsAdmin)}
          >
            <Text>Set Admin: {profileIsAdmin ? 'False' : 'True'}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.clearLocalNotifications()}>
            <Text>Clear Local Notifications</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    )
  }
}

const mapStateToProps = state => {
  return {
    profileImageData: state.profileReducer.profileImageData,
    profileUserName: state.profileReducer.profileUserName,
    profileIsAdmin: state.profileReducer.profileIsAdmin
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setProfileImageData: imageData =>
      dispatch(assignProfileImageData(imageData)),
    clearProfileImageData: () => dispatch(clearProfileImageData()),
    setProfileUserName: userName => dispatch(assignProfileUserName(userName)),
    setProfileAdmin: isAdmin => dispatch(assignProfileAdmin(isAdmin)),
    purgeLocalStorage: () =>
      dispatch({ type: PURGE, key: 'root', result: () => null })
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(connectActionSheet(SettingsScreen))
