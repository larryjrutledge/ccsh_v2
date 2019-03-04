import React from 'react'
import { View, Text, Image, Dimensions, TouchableOpacity } from 'react-native'
import { Audio, KeepAwake, LinearGradient } from 'expo'

import { Feather, MaterialIcons, Octicons } from '@expo/vector-icons'

import Slider from 'react-native-slider'
import Moment from 'moment'

import CardFlip from 'src/components/CardFlip'
import { BarIndicator } from 'src/components/Indicators'
import { CachedProgressiveImage } from 'src/components/Image'
import { getMMSSFromMillis } from 'src/config/Utils'

var { width: SCREEN_WIDTH } = Dimensions.get('window')
class AudioPlayer extends React.Component {
  constructor() {
    super()

    this.playbackInstance = null
    this.isSeeking = false
    this.shouldPlayAtEndOfSeek = false

    this.state = {
      playbackInstancePosition: null,
      playbackInstanceDuration: null,
      shouldPlay: false,
      isLoaded: false,
      isPlaying: false,
      isBuffering: false,
      isLoading: false,
      isMuted: false,
      volume: 1,
      rate: 1.0,
      cardSide: 'text'
    }
  }

  componentDidMount() {
    Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      playThroughEarpieceAndroid: true
    })
  }

  _onCardFlip = cardIndex => {
    const newCardSide = cardIndex === 0 ? 'text' : 'image'
    this.setState({
      cardSide: newCardSide
    })
  }

  _onPlaybackStatusUpdate = status => {
    if (status.isLoaded) {
      this.setState({
        playbackInstancePosition: status.positionMillis,
        playbackInstanceDuration: status.durationMillis,
        shouldPlay: status.shouldPlay,
        isLoaded: status.isLoaded,
        isPlaying: status.isPlaying,
        isBuffering: status.isBuffering,
        rate: status.rate,
        volume: status.volume,
        isMuted: status.isMuted
      })

      if (status.didJustFinish) {
        this.playbackInstance.setPositionAsync(0)
        KeepAwake.deactivate()
      }
    } else {
      if (status.error) {
        console.log('FATAL PLAYER ERROR: ${status.error}')
      }
    }
  }

  _handleMute = () => {
    if (this.playbackInstance !== null) {
      this.playbackInstance.setIsMutedAsync(!this.state.isMuted)
    }
  }

  _handleRewind = () => {
    if (this.playbackInstance !== null && !this.isSeeking) {
      this.isSeeking = true
      let seekPosition = 0

      if (this.state.playbackInstancePosition >= 30000) {
        seekPosition = this.state.playbackInstancePosition - 30000
      }

      if (this.shouldPlayAtEndOfSeek) {
        this.playbackInstance.playFromPositionAsync(seekPosition)
      } else {
        this.playbackInstance.setPositionAsync(seekPosition)
      }

      this.isSeeking = false
    }
  }

  _handleFastForward = () => {
    if (this.playbackInstance !== null && !this.isSeeking) {
      this.isSeeking = true
      let seekPosition = this.state.playbackInstanceDuration

      if (
        this.state.playbackInstancePosition <
        this.state.playbackInstanceDuration - 30000
      ) {
        seekPosition = this.state.playbackInstancePosition + 30000
      }

      if (this.shouldPlayAtEndOfSeek) {
        this.playbackInstance.playFromPositionAsync(seekPosition)
      } else {
        this.playbackInstance.setPositionAsync(seekPosition)
      }

      this.isSeeking = false
    }
  }

  _handlePlayPause = () => {
    if (this.playbackInstance !== null) {
      if (this.state.isPlaying) {
        this.playbackInstance.pauseAsync()
        KeepAwake.deactivate()
      } else {
        this.playbackInstance.playAsync()
        KeepAwake.activate()
      }
    }
  }

  _getSeekSliderPosition = () => {
    if (
      this.playbackInstance !== null &&
      this.state.playbackInstancePosition !== null &&
      this.state.playbackInstanceDuration !== null
    ) {
      return (
        this.state.playbackInstancePosition /
        this.state.playbackInstanceDuration
      )
    }
  }

  _onSeekSliderSlidingComplete = async value => {
    if (this.playbackInstance !== null) {
      this.isSeeking = false
      const seekPosition = value * this.state.playbackInstanceDuration

      if (this.shouldPlayAtEndOfSeek) {
        this.playbackInstance.playFromPositionAsync(seekPosition)
      } else {
        this.playbackInstance.setPositionAsync(seekPosition)
      }
    }
  }

  _onSeekSliderValueChange = value => {
    if (this.playbackInstance !== null && !this.isSeeking) {
      this.isSeeking = true
      this.shouldPlayAtEndOfSeek = this.state.shouldPlay
      this.playbackInstance.pauseAsync()
    }
  }

  handleClose = async () => {
    if (this.playbackInstance !== null) {
      KeepAwake.deactivate()
      await this.playbackInstance.stopAsync()
      await this.playbackInstance.unloadAsync()
      this.playbackInstance.setOnPlaybackStatusUpdate(null)
      this.playbackInstance = null
    }
  }

  createPlayer = async () => {
    const source = {
      uri: this.props.audio_url
    }

    const initialState = {
      shouldPlay: false,
      rate: this.state.rate,
      volume: this.state.volume
    }

    const { sound, status } = await Audio.Sound.createAsync(
      source,
      initialState,
      this._onPlaybackStatusUpdate
    )

    this.playbackInstance = sound
    this.playbackInstance.playAsync()

    KeepAwake.activate()
  }

  newAudio = async () => {
    if (this.playbackInstance !== null) {
      this.playbackInstance.unloadAsync()
    }

    this.setState(
      {
        isLoaded: false
      },
      () => {
        this.createPlayer()
      }
    )
  }

  render() {
    return (
      <LinearGradient
        colors={['#0f2027', '#203a43', '#2c5364', '#203a43', '#0f2027']}
        // colors={['#0f0c29', '#302b63', '#24243e']} // use for MMM version
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'flex-start'
        }}
      >
        <View
          style={{
            alignItems: 'center',
            alignSelf: 'stretch',
            paddingVertical: 10
          }}
        >
          <Text style={{ color: 'white', fontSize: 20, fontWeight: '400' }}>
            {this.props.speaker}
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            width: SCREEN_WIDTH,
            backgroundColor: 'transparent',
            paddingHorizontal: 50
          }}
        >
          <CardFlip
            ref={card => {
              this.card = card
            }}
            style={{
              flex: 1
            }}
            onFlip={side => this._onCardFlip(side)}
          >
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => this.card.flip()}
              style={{
                flex: 1,
                borderRadius: 5,
                shadowColor: 'rgba(0,0,0,0.5}',
                shadowOffset: {
                  width: 0,
                  height: 1
                },
                shadowOpacity: 0.5
              }}
            >
              <CachedProgressiveImage
                resizeMode="contain"
                resizeMethod="scale"
                style={{
                  flex: 1,
                  borderColor: 'white',
                  borderWidth: 2,
                  width: undefined,
                  height: undefined
                }}
                // source={this.getSource()}
                source={{
                  uri: this.props.image_url
                }}
                ttl={30}
              />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => this.card.flip()}
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#1e1e1e',
                borderRadius: 5,
                shadowColor: 'rgba(0,0,0,0.5}',
                shadowOffset: {
                  width: 0,
                  height: 1
                },
                shadowOpacity: 0.5
              }}
            >
              <View
                style={{
                  flex: 1,
                  borderColor: 'white',
                  borderWidth: 2,

                  alignItems: 'flex-start',
                  justifyContent: 'flex-start',
                  padding: 20
                }}
              >
                <Text
                  style={{ color: 'white', fontSize: 18, fontWeight: '400' }}
                >
                  {Moment(this.props.published).format('dddd MMM D, Y')}
                </Text>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 16,
                    fontWeight: '200',
                    paddingTop: 20
                  }}
                >
                  {this.props.summary}
                </Text>
              </View>
            </TouchableOpacity>
          </CardFlip>
        </View>
        <View
          style={{
            alignSelf: 'stretch',
            height: 100
          }}
        >
          <View
            style={{
              alignSelf: 'stretch',
              marginHorizontal: 30,
              marginTop: 5
            }}
          >
            <View
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                right: 0,
                flexDirection: 'row',
                justifyContent: 'space-between'
              }}
            >
              <Text
                style={{
                  color: 'white',
                  fontSize: 10,
                  fontWeight: '100'
                }}
              >
                {getMMSSFromMillis(this.state.playbackInstancePosition)}
              </Text>
              {this.state.isBuffering ? (
                <Text
                  style={{
                    color: 'white',
                    fontSize: 10,
                    fontWeight: '100'
                  }}
                >
                  Loading Audio...
                </Text>
              ) : null}
              <Text
                style={{
                  color: 'white',
                  fontSize: 10,
                  fontWeight: '100'
                }}
              >
                {getMMSSFromMillis(this.state.playbackInstanceDuration)}
              </Text>
            </View>
            {/* <View style={{ position: 'absolute', left: 0, top: 0 }}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 10,
                  fontWeight: '100'
                }}
              >
                {getMMSSFromMillis(this.state.playbackInstancePosition)}
              </Text>
            </View>
            <View style={{ position: 'absolute', right: 0, top: 0 }}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 10,
                  fontWeight: '100'
                }}
              >
                {getMMSSFromMillis(this.state.playbackInstanceDuration)}
              </Text>
            </View> */}
            <Slider
              minimumTrackTintColor="#13a9d6"
              thumbStyle={{
                width: 30,
                height: 10,
                shadowColor: 'black',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.5,
                shadowRadius: 1
              }}
              thumbTintColor="#0c6692"
              value={this._getSeekSliderPosition() || 0}
              onValueChange={this._onSeekSliderChange}
              onSlidingComplete={this._onSeekSliderSlidingComplete}
              disabled={this.playbackInstance === null}
            />
          </View>

          <View
            style={{
              alignSelf: 'stretch',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginHorizontal: 10,
              paddingHorizontal: 65,
              flexDirection: 'row'
            }}
          >
            <View
              style={{
                position: 'absolute',
                left: 10,
                top: 8,
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {this.state.isMuted ? (
                <TouchableOpacity onPress={this._handleMute}>
                  <Octicons name="unmute" size={20} color="white" />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={this._handleMute}>
                  <Octicons name="mute" size={20} color="white" />
                </TouchableOpacity>
              )}
            </View>
            <TouchableOpacity
              disabled={this.state.isBuffering}
              onPress={this._handleRewind}
            >
              <MaterialIcons name="replay-30" size={36} color="white" />
            </TouchableOpacity>
            {this.state.isPlaying ? (
              <TouchableOpacity
                disabled={this.state.isBuffering}
                onPress={this._handlePlayPause}
              >
                <Feather name="pause-circle" size={36} color="white" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                disabled={this.state.isBuffering}
                onPress={this._handlePlayPause}
              >
                <Feather name="play-circle" size={36} color="white" />
              </TouchableOpacity>
            )}
            <TouchableOpacity
              disabled={this.state.isBuffering}
              onPress={this._handleFastForward}
            >
              <MaterialIcons name="forward-30" size={36} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    )
  }
}

export default AudioPlayer
