import React, { Component } from 'react'
import {
  TouchableOpacity,
  Text,
  View,
  StatusBar,
  SafeAreaView,
  ScrollView,
  LayoutAnimation
} from 'react-native'
import { NavigationEvents } from 'react-navigation'

import { LinearGradient } from 'expo'
import { AntDesign, Feather } from '@expo/vector-icons'

import { connect } from 'react-redux'
import Moment from 'moment'

import { mediaPlayerFetch } from 'src/actions/mediaPlayerActions'
import * as Constants from 'src/config/Constants'

import AudioPlayer from 'src/components/AudioPlayer'
import MediaList from 'src/components/MediaList'
import Header from 'src/components/Header'

class MediaPlayerScreen extends Component {
  constructor() {
    super()

    this.state = {
      showPlayer: false,
      mediaList: []
    }
  }

  fetchMediaList = mediaType => {
    this.props.mediaListFetch(mediaType)
  }

  render() {
    return (
      <LinearGradient colors={['#232526', '#414345']} style={{ flex: 1 }}>
        <StatusBar barStyle="light-content" />
        <NavigationEvents
          onDidFocus={payload => this.fetchMediaList(Constants.MEDIA_TYPE.ALL)}
        />

        <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent' }}>
          <Header
            {...this.props}
            left={<Feather name="menu" size={20} color={'white'} />}
            leftPress={() => {
              this.props.navigation.openDrawer()
            }}
            title={
              this.state.showPlayer ? this.state.selected.title : 'Media Player'
            }
            right={
              this.state.showPlayer ? (
                <AntDesign name="closecircleo" size={20} color="white" />
              ) : null
            }
            rightPress={() => {
              // this._closeAudioPlayer()
              alert('You pressed me!')
            }}
          />
          <View style={{ flex: 2 }}>
            <AudioPlayer />
          </View>
          <View style={{ flex: 1 }}>
            <ScrollView>
              <MediaList data={this.props.mediaList} />
            </ScrollView>
          </View>
        </SafeAreaView>
      </LinearGradient>
    )
  }
}

const mapStateToProps = state => {
  return {
    errorMessage: state.mediaPlayerReducer.errorMessage,
    hasError: state.mediaPlayerReducer.hasError,
    mediaList: state.mediaPlayerReducer.data
  }
}

const mapDispatchToProps = dispatch => {
  return {
    mediaListFetch: mediaType => dispatch(mediaPlayerFetch(mediaType))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MediaPlayerScreen)
