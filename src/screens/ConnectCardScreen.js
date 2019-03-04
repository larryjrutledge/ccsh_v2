import React from 'react'
import {
  Dimensions,
  View,
  Text,
  Image,
  SafeAreaView,
  StatusBar
} from 'react-native'
import { connect } from 'react-redux'
import { LinearGradient } from 'expo'
import { Ionicons } from '@expo/vector-icons'

import Moment from 'moment'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Dialog, {
  DialogTitle,
  DialogButton,
  DialogFooter,
  DialogContent,
  ScaleAnimation
} from 'src/components/PopupDialog'

import * as Constants from 'src/config/Constants'
import * as firebase from 'firebase'
import Header from 'src/components/Header'
import { ConnectCardForm } from 'src/forms'
import { getEmailList, sendFormEmail } from 'src/config/Utils'
import { connectCardSetFormAttribute } from 'src/actions/connectCardActions'

const { width: MAX_WIDTH, height: MAX_HEIGHT } = Dimensions.get('window')
const IMAGE_HEIGHT = MAX_WIDTH / 3

class ConnectCardScreen extends React.Component {
  constructor() {
    super()

    this.state = {
      showNotificationPopup: false,
      dialogMessage: ''
    }
  }

  // _storeInDB = values => {
  //   const createDate = Moment().format('YYYY-MM-DD HH:mm')
  //   const createDay = Moment().format('YYYY-MM-DD')
  //   firebase
  //     .database()
  //     .ref(
  //       `forms/connectCard/${createDay}/${values.service_time}/${
  //         values.fullName
  //       }`
  //     )
  //     .set({
  //       Service: values.service_time,
  //       FullName: values.fullName,
  //       EMail: values.email,
  //       Address: values.address_street,
  //       City: values.address_city,
  //       State: values.address_state,
  //       PostalCode: values.address_postal,
  //       Phone: values.phone,
  //       GuestType: values.guest_type,
  //       MarketingType: values.marketing_type,
  //       NextStep_FollowChrist: values.nextStepFollowChrist,
  //       NextStep_Recommit: values.nextStepRecommitLife,
  //       NextStep_WaterBaptism: values.nextStepWaterBaptism,
  //       NextStep_NextStepsInfo: values.nextStepNextStepInfo,
  //       NextStep_CommunityGroup: values.nextStepCommunityGroup,
  //       createDate
  //     })
  //     .then(data => {
  //       this.setState({
  //         showNotificationPopup: true,
  //         dialogMessage: 'Thank you for checking in....'
  //       })
  //     })
  //     .catch(error => {
  //       this.setState({
  //         showNotificationPopup: true,
  //         dialogMessage:
  //           'There was an error with your request. Please try again, but if the issue persists notify someone on the tech team and provide them the following error information: ' +
  //           error
  //       })
  //     })
  // }

  storeUpdateUser = values => {
    var user_name = values.fullName
    if (values.fullName !== this.props.profileUserName)
      user_name = this.props.profileUserName

    const createDate = Moment().format('YYYY-MM-DD HH:mm')
    firebase
      .database()
      .ref(`connect/${user_name}`)
      .set({
        Service: values.service_time,
        FullName: values.fullName,
        EMail: values.email,
        Address: values.address_street,
        City: values.address_city,
        State: values.address_state,
        PostalCode: values.address_postal,
        Phone: values.phone,
        GuestType: values.guest_type,
        MarketingType: values.marketing_type,
        NextStep_FollowChrist: values.nextStepFollowChrist,
        NextStep_Recommit: values.nextStepRecommitLife,
        NextStep_WaterBaptism: values.nextStepWaterBaptism,
        NextStep_NextStepsInfo: values.nextStepNextStepInfo,
        NextStep_CommunityGroup: values.nextStepCommunityGroup,
        createDate
      })
  }

  storeCheckIn = values => {
    var user_name = values.fullName
    if (values.fullName !== this.props.profileUserName)
      user_name = this.props.profileUserName

    const createDate = Moment().format('YYYY-MM-DD HH:mm')
    const checkinDay = Moment().format('YYYY-MM-DD')
    const service = values.service_time === 1 ? '9 AM' : '10:30 AM'

    firebase
      .database()
      .ref(`checkin/${checkinDay}/${service}`)
      .set({
        UserName: user_name,
        FullName: values.fullName,
        EMail: values.email,
        createDate
      })
  }

  storeConnectNextSteps(values) {
    var user_name = values.fullName
    if (values.fullName !== this.props.profileUserName)
      user_name = this.props.profileUserName

    const createDate = Moment().format('YYYY-MM-DD HH:mm')
    const createDay = Moment().format('YYYY-MM-DD')

    if (values.nextStepFollowChrist) {
      firebase
        .database()
        .ref(`connect_nextsteps/follow_christ/${createDay}/${user_name}`)
        .set({
          UserName: user_name,
          FullName: values.fullName,
          createDate
        })
    }
    if (values.nextStepRecommitLife) {
      firebase
        .database()
        .ref(`connect_nextsteps/recommit/${createDay}/${user_name}`)
        .set({
          UserName: user_name,
          FullName: values.fullName,
          createDate
        })
    }
    if (values.nextStepWaterBaptism) {
      firebase
        .database()
        .ref(`connect_nextsteps/water_baptim/${createDay}/${user_name}`)
        .set({
          UserName: user_name,
          FullName: values.fullName,
          createDate
        })
    }
    if (values.nextStepNextStepInfo) {
      firebase
        .database()
        .ref(`connect_nextsteps/nextstep_info/${createDay}/${user_name}`)
        .set({
          UserName: user_name,
          FullName: values.fullName,
          createDate
        })
    }
    if (values.nextStepCommunityGroup) {
      firebase
        .database()
        .ref(`connect_nextsteps/community_group/${createDay}/${user_name}`)
        .set({
          UserName: user_name,
          FullName: values.fullName,
          createDate
        })
    }
  }

  _storeInDB = values => {
    this.storeUpdateUser(values)
    this.storeCheckIn(values)
    this.storeConnectNextSteps(values)
  }

  _handleSubmit = values => {
    // // store in redux
    this.props.setServiceTime(values.service_time)
    this.props.setFullName(values.fullName)
    this.props.setEmail(values.email)
    this.props.setAddressStreet(values.address_street)
    this.props.setAddressCity(values.address_city)
    this.props.setAddressState(values.address_state)
    this.props.setAddressPostal(values.address_postal)
    this.props.setPhone(values.phone)
    this.props.setGuestType(values.guest_type)
    this.props.setMarketingType(values.marketing_type)
    this.props.setNextStepFollowChrist(values.nextStepFollowChrist)
    this.props.setNextStepRecommitLife(values.nextStepRecommitLife)
    this.props.setNextStepWaterBaptism(values.nextStepWaterBaptism)
    this.props.setNextStepNextStepInfo(values.nextStepNextStepInfo)
    this.props.setNextStepCommunityGroup(values.nextStepCommunityGroup)

    this._storeInDB(values)
  }

  render() {
    return (
      <LinearGradient
        colors={['#232526', '#414345']} // https://uigradients.com/#MidnightCity
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
          source={require('src/assets/images/header/connect.jpg')}
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
            title="Connection Card"
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
                  Connection Card --- instructional text
                </Text>
              </View>
            </View>

            <ConnectCardForm
              storedValues={this.props.storedValues}
              onSubmit={this._handleSubmit}
            />
          </KeyboardAwareScrollView>
        </SafeAreaView>
      </LinearGradient>
    )
  }
}

const mapStateToProps = state => {
  return {
    profileUserName: state.profileReducer.profileUserName,
    storedValues: {
      service_time: state.connectCardReducer.service_time,
      fullName:
        state.profileReducer.profileUserName === ''
          ? state.connectCardReducer.fullName
          : state.profileReducer.profileUserName,
      email: state.connectCardReducer.email,
      address_street: state.connectCardReducer.address_street,
      address_city: state.connectCardReducer.address_city,
      address_state: state.connectCardReducer.address_state,
      address_postal: state.connectCardReducer.address_postal,
      phone: state.connectCardReducer.phone,
      guest_type: state.connectCardReducer.guest_type,
      marketing_type: state.connectCardReducer.marketing_type,
      nextStepFollowChrist: state.connectCardReducer.nextStepFollowChrist,
      nextStepRecommitLife: state.connectCardReducer.nextStepRecommitLife,
      nextStepWaterBaptism: state.connectCardReducer.nextStepWaterBaptism,
      nextStepNextStepInfo: state.connectCardReducer.nextStepNextStepInfo,
      nextStepCommunityGroup: state.connectCardReducer.nextStepCommunityGroup
    }
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setServiceTime: service_time => {
      dispatch(connectCardSetFormAttribute('service_time', service_time))
    },
    setFullName: fullName => {
      dispatch(connectCardSetFormAttribute('fullName', fullName))
    },
    setEmail: email => {
      dispatch(connectCardSetFormAttribute('email', email))
    },
    setAddressStreet: addressStreet => {
      dispatch(connectCardSetFormAttribute('address_street', addressStreet))
    },
    setAddressCity: addressCity => {
      dispatch(connectCardSetFormAttribute('address_city', addressCity))
    },
    setAddressState: addressState => {
      dispatch(connectCardSetFormAttribute('address_state', addressState))
    },
    setAddressPostal: addressPostal => {
      dispatch(connectCardSetFormAttribute('address_postal', addressPostal))
    },
    setPhone: phone => {
      dispatch(connectCardSetFormAttribute('phone', phone))
    },
    setGuestType: guest_type => {
      dispatch(connectCardSetFormAttribute('guest_type', guest_type))
    },
    setMarketingType: marketing_type => {
      dispatch(connectCardSetFormAttribute('marketing_type', marketing_type))
    },
    setNextStepFollowChrist: checked => {
      dispatch(connectCardSetFormAttribute('nextStepFollowChrist', checked))
    },
    setNextStepRecommitLife: checked => {
      dispatch(connectCardSetFormAttribute('nextStepRecommitLife', checked))
    },
    setNextStepWaterBaptism: checked => {
      dispatch(connectCardSetFormAttribute('nextStepWaterBaptism', checked))
    },
    setNextStepNextStepInfo: checked => {
      dispatch(connectCardSetFormAttribute('nextStepNextStepInfo', checked))
    },
    setNextStepCommunityGroup: checked => {
      dispatch(connectCardSetFormAttribute('nextStepCommunityGroup', checked))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectCardScreen)
