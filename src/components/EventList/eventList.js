import React from 'react'
import {
  Image,
  FlatList,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Linking,
  Platform,
  Picker
} from 'react-native'
import { Notifications } from 'expo'
import { connect } from 'react-redux'
import { NavigationEvents } from 'react-navigation'
import { Feather, FontAwesome } from '@expo/vector-icons'

import Dialog, {
  DialogTitle,
  DialogFooter,
  DialogButton,
  DialogContent,
  ScaleAnimation
} from 'src/components/PopupDialog'
import Collapsible from 'react-native-collapsible'
import _ from 'lodash'

import { eventListFetch } from 'src/actions/eventActions'

import * as Constants from 'src/config/Constants'
import { CachedProgressiveImage } from 'src/components/Image'
import * as Indicators from 'src/components/Indicators'
import styles from './styles'

class EventList extends React.Component {
  constructor() {
    super()

    this.state = {
      expanded: null,
      notificationItem: null,
      showNotificationPopup: false
    }
  }

  renderFooter = isLoading => {
    if (!isLoading) return null

    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: '#CED0CE'
        }}
      >
        <View style={{ flex: 1 }}>
          <Indicators.DotIndicator
            count={3}
            color="white"
            animationDuration={800}
          />
        </View>
      </View>
    )
  }

  handleRefresh = () => {
    this.props.eventListFetch(
      Constants.EVENT_INITIAL_PAGE,
      Constants.EVENT_PER_PAGE,
      false,
      true
    )
  }

  handleLoadMore = () => {
    this.props.eventListFetch(
      this.props.lastFetchedPage + 1,
      Constants.EVENT_PER_PAGE,
      false,
      false
    )
  }

  renderIsLoading = () => {
    return (
      <View style={{ flex: 1 }}>
        <Indicators.DotIndicator count={3} color="white" />
      </View>
    )
  }

  toggle = index => {
    if (this.state.expanded === index) {
      this.setState({
        expanded: null
      })
    } else {
      this.setState({
        expanded: index
      })
    }
  }

  openLink = url => {
    Linking.openURL(url)
  }

  openMap = venue => {
    const { address, city, province, zip } = venue

    const appleMapUrl =
      'https://maps.apple.com/maps?f=q&source=s_q&hl=en&geocode=&q='
    const googleMapUrl =
      'https://maps.google.com/maps?f=q&source=s_q&hl=en&geocode=&q='

    const mapAddress =
      address.replace(/ /g, '+') +
      '+' +
      city.replace(/ /g, '+') +
      '+' +
      province +
      '+' +
      zip

    if (Platform.OS === 'ios') {
      Linking.openURL(appleMapUrl + mapAddress)
    } else {
      Linking.openURL(googleMapUrl + mapAddress)
    }
  }

  eventNotification = item => {
    this.setState({
      notificationItem: item,
      showNotificationPopup: true
    })
  }

  scheduleReminderNotification = () => {
    const { notificationItem } = this.state

    console.log('[DEBUG] schedule Reminder Notifications')
    this.setState({ showNotificationPopup: false })
    const localNotification = {
      title: notificationItem.title,
      body: notificationItem.description,
      data: {
        title: notificationItem.title,
        body: notificationItem.description
      },
      ios: {
        sound: true
      },
      android: {
        sound: true,
        priority: 'high',
        vibrate: true
      }
    }

    const schedulingOptions = {
      time:
        new Date(notificationItem.eventUTC.replace(/ /g, 'T')) -
        60 * 1000 * Constants.NOTIFICATION_MINUTES_BEFORE_EVENT
    }

    Notifications.scheduleLocalNotificationAsync(
      localNotification,
      schedulingOptions
    ).catch(e => {
      console.log('Error scheduling notification: ', e)
    })
  }

  renderItem = ({ item, index }) => {
    const itemDate = new Date(item.eventUTC.replace(/ /g, 'T')).getTime()
    const currentDate = new Date().getTime()
    const notificationDate = new Date() - 60 * 1000 * 30

    if (itemDate >= currentDate) {
      return (
        <View style={styles.listItemContainer}>
          <TouchableWithoutFeedback
            key={item.id}
            onPress={() => this.toggle(index)}
          >
            <View style={styles.listRowContainer}>
              <View style={styles.imageContainer}>
                <CachedProgressiveImage
                  resizeMode="cover"
                  style={styles.image}
                  // source={this.getSource()}
                  source={{
                    uri: item.imageUrl
                  }}
                  ttl={30}
                />
              </View>
              <View
                style={{
                  flexDirection: 'column',
                  padding: 5
                }}
              >
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={styles.titleText}
                >
                  {item.title}
                </Text>
                <Text style={styles.dateText}>{item.date}</Text>
                <Text style={styles.timeText}>{item.time}</Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
          <Collapsible
            collapsed={index !== this.state.expanded}
            align="center"
            style={styles.detailContainer}
          >
            <View style={styles.detailRowContainer}>
              <View style={styles.descriptionContainer}>
                <Text>{item.description}</Text>
              </View>

              <View style={styles.actionBarContainer}>
                <View style={styles.actionButtonContainer}>
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => this.openLink(item.linkUrl)}
                  >
                    <Feather name="external-link" size={22} color="white" />
                  </TouchableOpacity>
                </View>
                <View style={styles.actionButtonContainer}>
                  {itemDate >= notificationDate ? (
                    <TouchableOpacity
                      style={styles.actionButton}
                      onPress={() => this.eventNotification(item)}
                    >
                      <Feather name="bell" size={22} color="white" />
                    </TouchableOpacity>
                  ) : (
                    <View style={styles.actionButton}>
                      <Feather name="bell" size={22} color="lightgray" />
                    </View>
                  )}
                </View>
                <View style={styles.actionButtonContainer}>
                  {item.venue.address === '' ? (
                    <View style={styles.actionButton}>
                      <FontAwesome
                        name="map-marker"
                        size={22}
                        color="lightgray"
                      />
                    </View>
                  ) : (
                    <TouchableOpacity
                      style={styles.actionButton}
                      onPress={() => this.openMap(item.venue)}
                    >
                      <FontAwesome name="map-marker" size={22} color="white" />
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </View>
          </Collapsible>
        </View>
      )
    }
  }

  renderEventList = () => {
    const { eventData } = this.props

    return (
      <View style={styles.listContainer}>
        <NavigationEvents
          onDidBlur={payload => {
            this.setState({
              expanded: false
            })
          }}
        />
        <FlatList
          ref="eventListRef"
          data={eventData}
          keyExtractor={(eventData, index) => index.toString()}
          renderItem={this.renderItem}
          ListFooterComponent={renderFooter(this.props.isRefreshLoad)}
          refreshing={this.props.isRefreshLoad}
          onRefresh={() => this.handleRefresh()}
          onEndReached={_.debounce(() => this.handleLoadMore(), 1000)}
          onEndReachedThreshold={1}
        />
        <Dialog
          width={0.75}
          dialogAnimation={new ScaleAnimation()}
          visible={this.state.showNotificationPopup}
          onTouchOutside={() => {
            this.setState({ showNotificationPopup: false })
          }}
          dialogTitle={<DialogTitle title="Set Reminder" />}
          footer={
            <DialogFooter>
              <DialogButton
                text="NO"
                onPress={() => {
                  this.setState({ showNotificationPopup: false })
                }}
              />
              <DialogButton
                text="YES"
                onPress={() => this.scheduleReminderNotification()}
              />
            </DialogFooter>
          }
        >
          <DialogContent>
            <Text>
              Would you like to create a notification reminder for this event?
            </Text>
          </DialogContent>
        </Dialog>
      </View>
    )
  }

  render() {
    const { isInitialLoad } = this.props

    return (
      <View style={[styles.container, { backgroundColor: 'transparent' }]}>
        {isInitialLoad ? this.renderIsLoading() : this.renderEventList()}
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    isInitialLoad: state.eventReducer.isInitialLoad || false,
    isRefreshLoad: state.eventReducer.isRefreshLoad || false,
    eventData: state.eventReducer.data,
    lastFetchedPage: state.eventReducer.lastFetchedPage
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
)(EventList)
