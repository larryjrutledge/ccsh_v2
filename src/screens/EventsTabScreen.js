// https://github.com/naoufal/react-native-accordion
// https://github.com/jacklam718/react-native-popup-dialog
import React, { Component } from 'react'
import {
  Button,
  Linking,
  ListView,
  Text,
  View,
  StatusBar,
  SafeAreaView,
  Platform
} from 'react-native'
import { connect } from 'react-redux'
import { LinearGradient } from 'expo'
import { Feather } from '@expo/vector-icons'

import { NavigationEvents } from 'react-navigation'
import StatusBarHeight from '@expo/status-bar-height'

import * as Constants from 'src/config/Constants'
import { decodeBlogTitle, getBlogImage } from 'src/config/Utils'
import EventList from 'src/components/EventList'
import { eventListFetch } from 'src/actions/eventActions'
import Header from 'src/components/Header'

class EventsTabScreen extends Component {
  constructor() {
    super()

    this.state = {
      statusBarHeight: null
    }
  }

  componentDidMount() {
    if (Platform.OS === 'ios') {
      this.syncHeight()
      StatusBarHeight.addEventListener(this.onStatusBarHeightChanged)
    }
  }

  componentWillUnMount() {
    if (Platform.OS === 'ios') {
      StatusBarHeight.removeEventListener(this.onStatusBarHeightChanged)
    }
  }

  onStatusBarHeightChanged = height => {
    this.state.useListener && this.setState({ statusBarHeight: height })
  }

  syncHeight = async () => {
    const height = await StatusBarHeight.getAsync()
    this.setState({ statusBarHeight: height })
  }

  fetchEventData = () => {
    const today = new Date().getDay()
    if (
      (!Array.isArray(this.props.eventData) ||
        !this.props.eventData.length ||
        today === Constants.DAY_OF_WEEK.WEDNESDAY) &&
      today !== this.props.lastFetchedDay
    ) {
      this.props.eventListFetch(
        Constants.EVENT_INITIAL_PAGE,
        Constants.EVENT_PER_PAGE,
        true,
        false
      )
    }
  }

  render() {
    return (
      <LinearGradient colors={['#232526', '#414345']} style={{ flex: 1 }}>
        <StatusBar barStyle="light-content" />
        <NavigationEvents onDidFocus={payload => this.fetchEventData()} />

        <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent' }}>
          <Header
            {...this.props}
            left={<Feather name="menu" size={20} color={'white'} />}
            leftPress={() => {
              this.props.navigation.openDrawer()
            }}
            title="Upcoming Events"
          />
          <View
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
          >
            <EventList
              nav={this.props.navigation}
              statusBarHeight={this.state.statusBarHeight}
            />
            {/* <Text style={{ color: 'white' }}>This is the events page</Text> */}
            {/* <ListView
              dataSource={this.state.dataSource}
              renderRow={this._renderRow}
            /> */}
          </View>
        </SafeAreaView>
      </LinearGradient>
    )
  }
}

const mapStateToProps = state => {
  return {
    errorMessage: state.eventReducer.errorMessage,
    hasError: state.eventReducer.hasError,
    isInitialLoad: state.eventReducer.isInitialLoad,
    isRefreshLoad: state.eventReducer.isRefreshLoad,
    eventData: state.eventReducer.data,
    lastFetchedPage: state.eventReducer.lastFetchedPage,
    lastFetchedDay: state.eventReducer.lastFetchedDay
  }
}

const mapDispatchToProps = dispatch => {
  return {
    eventListFetch: (
      fetchPage,
      fetchPerPage,
      fetchInitialLoad,
      fetchRefreshLoad
    ) =>
      dispatch(
        eventListFetch(
          fetchPage,
          fetchPerPage,
          fetchInitialLoad,
          fetchRefreshLoad
        )
      )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventsTabScreen)
