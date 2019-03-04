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
import Dialog, {
  DialogTitle,
  DialogButton,
  DialogFooter,
  DialogContent,
  ScaleAnimation
} from 'src/components/PopupDialog'

import * as Constants from 'src/config/Constants'
import Header from 'src/components/Header'
import { PrayerRequestForm } from 'src/forms'
import { getEmailList, sendFormEmail } from 'src/config/Utils'

const { width: MAX_WIDTH, height: MAX_HEIGHT } = Dimensions.get('window')
const IMAGE_HEIGHT = MAX_WIDTH / 3

class PrayerRequestScreen extends React.Component {
  constructor() {
    super()

    this.state = {
      showNotificationPopup: false,
      dialogMessage: ''
    }
  }

  _sendEmail = ({ name, email, phone, request }) => {
    var toList = []
    var ccList = []
    var bccList = []

    getEmailList('prayerRequestForm', 'toEmail')
      .then(emailList => {
        toList = emailList

        getEmailList('prayerRequestForm', 'ccEmail').then(emailList => {
          ccList = emailList

          getEmailList('prayerRequestForm', 'bccEmail').then(emailList => {
            bccList = emailList

            sendFormEmail(
              Constants.PRAYER_REQUEST_TEMPLATE_ID,
              Constants.FROM_EMAIL,
              'Prayer Request Form Submission',
              toList,
              ccList,
              bccList,
              {
                ['field' + 'Name']: name,
                ['field' + 'Email']: email,
                ['field' + 'Phone']: phone,
                ['field' + 'Request']: request
              }
            )
          })
        })
      })

      .catch(error => {
        console.log('Something went wrong: ', error)
      })
  }

  _storeInDB = ({ name, email, phone, request }) => {
    const createDate = Moment().format('YYYY-MM-DD HH:mm')
    const createMonth = Moment().format('MM')
    const createYear = Moment().format('YYYY')

    firebase
      .database()
      .ref(
        `forms/prayerRequest/${createYear}/${createMonth}/${name}/${createDate}`
      )
      .set({
        name,
        email,
        phone,
        request,
        createDate
      })
      .then(data => {
        this.setState({
          showNotificationPopup: true,
          dialogMessage:
            'Thank you for allowing us to join with you in prayer over your need.'
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

  handleSubmit = () => {
    const { nameValue, emailValue, phoneValue, requestValue } = this.state

    let nameError = ''
    let emailError = ''
    let phoneError = ''
    let requestError = ''

    if (nameValue === '') {
      nameError = 'required'
    }
    let emailRegEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    if (emailValue === '') {
      emailError = 'required'
    } else if (emailRegEx.test(emailValue) === false) {
      emailError = 'invalid'
    }
    if (phoneValue === '') {
      phoneError = 'required'
    }
    if (requestValue === '') {
      messageError = 'required'
    }

    if (
      nameError === '' &&
      emailError === '' &&
      phoneError === '' &&
      requestError === ''
    ) {
      this._storeInDB()
      this._sendEmail()
    } else {
      this.setState({
        nameError,
        emailError,
        phoneError,
        requestError
      })
    }
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

        <Dialog
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
        </Dialog>
        <Image
          resizeMode="cover"
          source={require('src/assets/images/header/prayer.jpg')}
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
            title="Prayer Request"
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
                  style={{ color: 'white', fontSize: 16, fontWeight: '300' }}
                >
                  Do you have a need that we can join with you in prayer over?
                  If you would like someone to follow up with you please include
                  your email address or phone number
                </Text>
              </View>
            </View>
            <PrayerRequestForm onSubmit={this._handleSubmit} />
          </KeyboardAwareScrollView>
        </SafeAreaView>
      </LinearGradient>
    )
  }
}

export default PrayerRequestScreen
