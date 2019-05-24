import React from 'react'
import {
  Dimensions,
  View,
  Text,
  Image,
  SafeAreaView,
  StatusBar
} from 'react-native'
import { LinearGradient } from 'expo'
import { Ionicons } from '@expo/vector-icons'

import Moment from 'moment'
import * as firebase from 'firebase'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import PopupDialog, {
  DialogTitle,
  DialogButton,
  DialogFooter,
  DialogContent,
  ScaleAnimation
} from 'src/components/PopupDialog'

import * as Constants from 'src/config/Constants'
import Header from 'src/components/Header'
import { NextStepsForm } from 'src/forms'
import { getEmailList, sendFormEmail } from 'src/config/Utils'

const { width: MAX_WIDTH, height: MAX_HEIGHT } = Dimensions.get('window')
const IMAGE_HEIGHT = MAX_WIDTH / 3

class NextStepsScreen extends React.Component {
  constructor() {
    super()

    this.state = {
      showNotificationPopup: false,
      dialogMessage: '',
      nameValue: '',
      emailValue: '',
      phoneValue: '',
      messageValue: '',
      nameError: '',
      emailError: '',
      phoneError: '',
      messageError: ''
    }
  }

  _sendEmail = ({ name, email, phone, message }) => {
    var toList = []
    var ccList = []
    var bccList = []

    getEmailList('nextStepsForm', 'toEmail')
      .then(emailList => {
        toList = emailList
        getEmailList('nextStepsForm', 'ccEmail').then(emailList => {
          ccList = emailList
          getEmailList('nextStepsForm', 'bccEmail').then(emailList => {
            bccList = emailList

            sendFormEmail(
              Constants.CONTACT_US_TEMPLATE_ID,
              Constants.FROM_EMAIL,
              'Contact Us Form Submission',
              toList,
              ccList,
              bccList,
              {
                ['field' + 'Name']: name,
                ['field' + 'Email']: email,
                ['field' + 'Phone']: phone,
                ['field' + 'Message']: message
              }
            )
          })
        })
      })

      .catch(error => {
        console.log('Something went wrong: ', error)
      })
  }

  _storeInDB = ({ name, email, phone, message }) => {
    const createDate = Moment().format('YYYY-MM-DD HH:mm')
    const createMonth = Moment().format('MM')
    const createYear = Moment().format('YY')

    firebase
      .database()
      .ref(`forms/nextsteps/${createYear}/${createMonth}/${name}/${createDate}`)
      .set({
        name,
        email,
        phone,
        message,
        createDate
      })
      .then(data => {
        this.setState({
          showNotificationPopup: true,
          dialogMessage:
            'Thank you for submitting your request to go through Next Steps. Someone will contact you soon with more details.'
        })
      })
      .catch(error => {
        this.setState({
          showNotificationPopup: true,
          dialogMessage:
            'There was an error with your request. Please try again, but if the issue persists notify someone on the tech team and provide them the following error information: ' +
            error
        })
      })
  }

  _handleSubmit = values => {
    this._storeInDB(values)
    this._sendEmail(values)
  }

  formatPhoneNumber = event => {
    const phoneNumberString = event.nativeEvent.text
    var cleaned = ('' + phoneNumberString).replace(/\D/g, '')
    var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)

    if (match) {
      return '(' + match[1] + ') ' + match[2] + '-' + match[3]
    }

    return phoneNumberString
  }

  render() {
    return (
      <LinearGradient
        colors={['#232526', '#414345']}
        style={{
          flex: 1
        }}
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 1 }}
      >
        <StatusBar barStyle="light-content" />

        <PopupDialog
          width={0.75}
          dialogAnimation={new ScaleAnimation()}
          visible={this.state.showNotificationPopup}
          onTouchOutside={() => {
            this.setState({ showNotificationPopup: false })
          }}
          dialogTitle={<DialogTitle title="Thank You" />}
          footer={
            <DialogFooter>
              <DialogButton
                text="OK"
                onPress={() => {
                  this.setState({ showNotificationPopup: false })
                  this.props.navigation.goBack()
                }}
              />
            </DialogFooter>
          }
        >
          <DialogContent>
            <Text>{this.state.dialogMessage}</Text>
          </DialogContent>
        </PopupDialog>
        <Image
          resizeMode="cover"
          source={require('src/assets/images/header/nextstep.jpg')}
          style={{ height: IMAGE_HEIGHT, width: MAX_WIDTH }}
        />
        <SafeAreaView
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            right: 0,
            backgroundColor: 'transparent'
          }}
        >
          <Header
            {...this.props}
            headerStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
            left={<Ionicons name="ios-arrow-back" size={20} color="white" />}
            leftPress={() => {
              this.props.navigation.goBack()
            }}
            title="Next Steps"
          />
          <KeyboardAwareScrollView
            style={{
              flex: 1,
              position: 'absolute',
              left: 0,
              right: 0,
              top: IMAGE_HEIGHT + 5,
              height: MAX_HEIGHT - 50 - IMAGE_HEIGHT,
              marginHorizontal: 10
            }}
            resetScrollToCoords={{ x: 0, y: 0 }}
            scrollEnabled={true}
            keyboardShouldPersistTaps="always"
          >
            <View
              style={{
                alignSelf: 'stretch',
                justifyContent: 'center',
                flexDirection: 'row',
                padding: 5,
                paddingTop: 10,
                paddingBottom: 20
              }}
            >
              <View style={{ flex: 5, justifyContent: 'center' }}>
                <Text
                  style={{ color: 'white', fontSize: 18, fontWeight: '300' }}
                >
                  !!! Next Steps Details Go here !!!
                </Text>
              </View>
            </View>
            <NextStepsForm onSubmit={this._handleSubmit} />
          </KeyboardAwareScrollView>
        </SafeAreaView>
      </LinearGradient>
    )
  }
}

export default NextStepsScreen
