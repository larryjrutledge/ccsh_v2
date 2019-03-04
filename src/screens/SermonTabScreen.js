import React, { Component } from 'react'
import {
  TouchableOpacity,
  Text,
  View,
  StatusBar,
  SafeAreaView,
  FlatList,
  LayoutAnimation
} from 'react-native'
import { NavigationEvents } from 'react-navigation'

import { LinearGradient } from 'expo'
import { AntDesign, Feather } from '@expo/vector-icons'

import { connect } from 'react-redux'
import Moment from 'moment'

import { sermonAudioFetch } from 'src/actions/sermonAudioActions'
import AudioPlayer from 'src/components/AudioPlayer'
import Header from 'src/components/Header'
import { CachedProgressiveImage } from 'src/components/Image'

class SermonTabScreen extends Component {
  constructor() {
    super()

    this.state = {
      showPlayer: false,
      selected: {
        title: 'UNKNOWN TITLE',
        summary: 'UNKNOWN SUMMARY',
        speaker: 'UNKNOWN SPEAKER',
        published: 'UNKNOWN PUB DATE',
        audio_url: 'UNKNOWN AUDIO_URL',
        image_url: 'UNKNOWN IMAGE_URL'
      }
    }
  }

  _showPlayer = async index => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)
    this.setState(
      {
        showPlayer: true,
        selected: {
          title: this.props.audioData[index].title,
          summary: this.props.audioData[index].summary,
          speaker: this.props.audioData[index].speaker,
          published: this.props.audioData[index].published,
          audio_url: this.props.audioData[index].audio_url,
          image_url: this.props.audioData[index].image_url
        }
      },
      () => {
        this.child.newAudio()
      }
    )
  }

  _hidePlayer = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    this.setState({
      showPlayer: false
    })
  }

  _onPlaybackStatusUpdate = status => {
    this.setState({
      isPlaying: status.isPlaying
    })
  }

  _closeAudioPlayer = () => {
    this.child.handleClose()

    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    this.setState({
      showPlayer: false
    })
  }

  fetchSermonList = () => {
    this.props.sermonAudioFetch()
  }

  renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity onPress={() => this._showPlayer(index)}>
        <View
          style={{
            backgroundColor: 'white',
            borderRadius: 5,
            height: 60,
            marginHorizontal: 10,
            marginVertical: 2,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.4,
            shadowRadisu: 1,
            elevation: 5,
            flexDirection: 'row',
            alignSelf: 'stretch',
            alignItems: 'flex-start'
          }}
        >
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              borderRadius: 5,
              marginRight: 5,
              padding: 5
            }}
          >
            <CachedProgressiveImage
              resizeMode="contain"
              resizeMethod="scale"
              style={{
                flex: 1
              }}
              source={{
                uri: item.image_url
              }}
              ttl={30}
            />
          </View>
          <View
            style={{
              flex: 4,
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'flex-start',
              alignSelf: 'stretch',
              paddingRight: 10
            }}
          >
            <Text
              ellipsizeMode="tail"
              numberOfLines={1}
              style={{ fontSize: 16, fontWeight: '400' }}
            >
              {item.title}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignSelf: 'stretch'
              }}
            >
              <Text style={{ fontSize: 12, fontStyle: 'italic' }}>
                {item.speaker}
              </Text>
              <Text style={{ fontSize: 12, fontWeight: '100' }}>
                {Moment(item.published).format('MMM D, YYYY')}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <LinearGradient colors={['#232526', '#414345']} style={{ flex: 1 }}>
        <StatusBar barStyle="light-content" />
        <NavigationEvents onDidFocus={payload => this.fetchSermonList()} />

        <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent' }}>
          <Header
            {...this.props}
            left={<Feather name="menu" size={20} color={'white'} />}
            leftPress={() => {
              this.props.navigation.openDrawer()
            }}
            title={
              this.state.showPlayer
                ? this.state.selected.title
                : 'Listen to Sermon'
            }
            right={
              this.state.showPlayer ? (
                <AntDesign name="closecircleo" size={20} color="white" />
              ) : null
            }
            rightPress={() => {
              this._closeAudioPlayer()
            }}
          />
          <View style={{ flex: 1 }}>
            {this.state.showPlayer ? (
              <View style={{ flex: 2 }}>
                <AudioPlayer
                  ref={instance => {
                    this.child = instance
                  }}
                  title={this.state.selected.title}
                  summary={this.state.selected.summary}
                  speaker={this.state.selected.speaker}
                  published={this.state.selected.published}
                  audio_url={this.state.selected.audio_url}
                  image_url={this.state.selected.image_url}
                  onStatusUpdate={status =>
                    this._onPlaybackStatusUpdate(status)
                  }
                />
              </View>
            ) : null}
            <View style={{ flex: 1 }}>
              <FlatList
                data={this.props.audioData}
                keyExtractor={(data, index) => index.toString()}
                renderItem={this.renderItem}
              />
            </View>
          </View>
        </SafeAreaView>
      </LinearGradient>
    )
  }
}

const mapStateToProps = state => {
  return {
    errorMessage: state.sermonAudioReducer.errorMessage,
    hasError: state.sermonAudioReducer.hasError,
    audioData: state.sermonAudioReducer.data
  }
}

const mapDispatchToProps = dispatch => {
  return {
    sermonAudioFetch: () => dispatch(sermonAudioFetch())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SermonTabScreen)
