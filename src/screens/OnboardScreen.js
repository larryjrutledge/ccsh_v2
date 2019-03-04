import React from 'react'
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'
import { LinearGradient, ImagePicker, Notifications } from 'expo'

import { AntDesign, Ionicons } from '@expo/vector-icons'
import { connect } from 'react-redux'
import { connectActionSheet } from '@expo/react-native-action-sheet'

import {
  setProfileHasOnboarded,
  assignProfileImageData,
  clearProfileImageData,
  assignProfileUserName
} from 'src/actions/profileActions'

import OnboardSwiper, { Button } from 'src/components/OnboardSwiper'

const { width: MAX_WIDTH, height: MAX_HEIGHT } = Dimensions.get('window')
const IMAGE_HEIGHT = MAX_WIDTH / 3

class OnboardScreen extends React.Component {
  constructor(props) {
    super(props)

    if (props.hasOnboarded) {
      props.navigation.navigate('home')
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.hasOnboarded !== this.props.hasOnboarded) {
      if (this.props.hasOnboarded) {
        this.props.navigation.navigate('home')
      }
    }
  }

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

  handleOnPress = () => {
    this.props.setOnboarded(true)
  }

  render() {
    const { profileImageData, profileUserName } = this.props

    return (
      <OnboardSwiper onCompleteCallback={() => this.handleOnPress()}>
        {/* New First Screen */}
        <LinearGradient
          colors={['#232526', '#414345']}
          style={[styles.slide]}
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 1 }}
        >
          <Image
            resizeMode="cover"
            source={require('src/assets/images/header/home.png')}
            style={{ height: IMAGE_HEIGHT, width: MAX_WIDTH }}
          />
          <Text style={styles.header}>New! Version 2.0</Text>
          <Text style={styles.text}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas a
            auctor metus, in ultrices libero. Interdum et malesuada fames ac
            ante ipsum primis in faucibus. Vivamus vel leo odio. Sed tempor
            tincidunt ante molestie cursus.{' '}
          </Text>
        </LinearGradient>
        {/* User Profile Screen */}
        <LinearGradient
          colors={['#232526', '#414345']}
          style={[styles.slide]}
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 1 }}
        >
          <View style={{ flex: 2 }}>
            <TouchableOpacity onPress={this.openProfileActionSheet}>
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Text style={styles.header}>Profile Picture & Name</Text>
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
              </View>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flex: 1,
              alignSelf: 'stretch'
            }}
          >
            <TextInput
              style={{
                // alignSelf: 'stretch',
                // paddingTop: 2,
                // paddingBottom: 10,
                paddingHorizontal: 10,
                marginHorizontal: 60,
                fontSize: 20,
                fontWeight: '300',
                color: 'white',
                borderBottomColor: 'white',
                borderBottomWidth: 2
              }}
              autofocus
              autoCapitalize="words"
              autoCorrect={false}
              placeholder="Your Name"
              placeholderTextColor="white"
              textAlign="center"
            />
          </View>
        </LinearGradient>

        {/* Push Notification Screen */}
        <LinearGradient
          colors={['#232526', '#414345']}
          style={[styles.slide]}
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 1 }}
        >
          <AntDesign name="notification" {...iconStyles} />
          <Text style={styles.header}>Push Notifications</Text>
          <Text style={styles.text}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Text>
          <Button text="Enable Notifications" onPress={() => alert('enable')} />
          <TouchableOpacity onPress={() => alert('not now')}>
            <Text style={styles.text}>Not Now</Text>
          </TouchableOpacity>
        </LinearGradient>

        {/* First Screen */}
        {/* <View style={[styles.slide, { backgroundColor: '#C04DEE' }]}>
          <Ionicons name="ios-nutrition" {...iconStyles} />
          <Text style={styles.header}>EAT</Text>
          <Text style={styles.text}>
            Good nutrition is an important part of leading a healthy lifestyle
          </Text>
          <Button text="Test" onPress={() => alert('you pressed me')} />
        </View> */}
        {/* Second Screen */}
        {/* <View style={[styles.slide, { backgroundColor: '#4AAFEE' }]}>
          <Ionicons name="ios-cloud-upload" {...iconStyles} />
          <Text style={styles.header}>PRAY</Text>
          <Text style={styles.text}>
            Prayer is one of the most important things a Christian can do
          </Text>
        </View> */}
        {/* third screen */}
        {/* <View style={[styles.slide, { backgroundColor: '#FC515B' }]}>
          <Ionicons name="ios-heart" {...iconStyles} />
          <Text style={styles.header}>LOVE</Text>
          <Text style={styles.text}>Where there is love there is life</Text>
        </View> */}
      </OnboardSwiper>
    )
  }
}

const iconStyles = {
  size: 100,
  color: '#FFFFFF'
}

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15
  },
  header: {
    color: '#FFFFFF',
    fontFamily: 'Avenir',
    fontSize: 30,
    fontWeight: 'bold',
    marginVertical: 15
  },
  text: {
    color: '#FFFFFF',
    fontFamily: 'Avenir',
    fontSize: 18,
    marginVertical: 40,
    textAlign: 'center'
  }
})

const mapStateToProps = state => {
  return {
    hasOnboarded: state.profileReducer.profileHasOnboarded || false,
    profileImageData: state.profileReducer.profileImageData,
    profileUserName: state.profileReducer.profileUserName
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setOnboarded: bool => {
      dispatch(setProfileHasOnboarded(bool))
    },
    setProfileImageData: imageData =>
      dispatch(assignProfileImageData(imageData)),
    clearProfileImageData: () => dispatch(clearProfileImageData()),
    setProfileUserName: userName => dispatch(assignProfileUserName(userName))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(connectActionSheet(OnboardScreen))
