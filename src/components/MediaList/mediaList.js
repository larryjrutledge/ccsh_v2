// https://reactnativeexample.com/react-native-accordion-collapse-component/

import React from 'react'
import { TouchableOpacity, FlatList, Text, View } from 'react-native'

import {
  Collapse,
  CollapseHeader,
  CollapseBody
} from 'accordion-collapse-react-native'

import { AntDesign, Feather, Ionicons } from '@expo/vector-icons'

import { CachedProgressiveImage } from 'src/components/Image'

import * as Constants from 'src/config/Constants'
import styles from './styles'

class MediaList extends React.Component {
  constructor() {
    super()

    this.state = {
      selectedIndex: null
    }
  }

  componentWillReceiveProps() {
    this.setState({
      selectedIndex: null
    })
  }

  onToggle(index) {
    let selected = index
    if (selected === this.state.selectedIndex) {
      selected = null
    }

    this.setState({ selectedIndex: selected }, () => {
      if (this.props.onToggle) {
        this.props.onToggle(selected)
      }
    })
  }

  _handleTrackPress = item => {
    alert('You pressed: ' + item.albumKey + ':' + item.key)
  }

  _keyExtractor = (item, index) => item.key
  _renderTrackItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => this._handleTrackPress(item)}>
        <View
          style={{
            backgroundColor: 'transparent',
            borderRadius: 5,
            borderBottomColor: 'gray',
            borderBottomWidth: 1,
            height: 30,
            marginLeft: 15,
            marginBottom: 1,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.4,
            shadowRadius: 1,
            elevation: 5,
            flexDirection: 'row',
            alignSelf: 'stretch',
            alignItems: 'flex-start'
          }}
        >
          <View
            style={{
              flex: 7,
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'flex-start',
              alignSelf: 'stretch',
              paddingLeft: 20,
              paddingRight: 10
            }}
          >
            <Text
              ellipsizeMode="tail"
              numberOfLines={1}
              style={{ color: 'white', fontSize: 14, fontWeight: '400' }}
            >
              {item.title}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  _renderItem = (item, index) => {
    if (item.tracks !== undefined && item.tracks.length > 0) {
      return (
        <Collapse
          key={index}
          isCollapsed={this.state.selectedIndex === index}
          onToggle={isCollapsed => this.onToggle(index)}
          style={{ width: '100%' }}
        >
          <CollapseHeader>
            <View
              style={{
                backgroundColor: 'white',
                borderRadius: 5,
                height: 60,
                marginHorizontal: 10,
                marginBottom: 1,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.4,
                shadowRadius: 1,
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
                    uri: item.cover
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
                  numberOfLines={2}
                  style={{ fontSize: 14, fontWeight: '400' }}
                >
                  {item.title}
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'column',
                  alignSelf: 'stretch',
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingHorizontal: 5
                }}
              >
                <TouchableOpacity
                  style={{
                    flex: 1,
                    flexDirection: 'column',
                    alignSelf: 'stretch',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                  onPress={() => alert('you clicked play: ' + item.key)}
                >
                  <Feather name="play-circle" size={24} />
                </TouchableOpacity>
              </View>
            </View>
          </CollapseHeader>
          <CollapseBody style={{ paddingHorizontal: 10, marginBottom: 5 }}>
            <FlatList
              data={item.tracks}
              keyExtractor={this._keyExtractor}
              renderItem={this._renderTrackItem}
            />
            {/* {item.tracks.map((track, index) => this._renderTrack(track, index))} */}

            {/* {item.tracks.map((track, index) => this._renderTrack(track, index))} */}
            {/* <Text style={{ color: 'white' }}>{item.type}</Text> */}
          </CollapseBody>
        </Collapse>
      )
    }

    return null
  }
  render() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'flex-start',
          justifyContent: 'flex-start'
        }}
      >
        {this.props.data.map((item, index) => this._renderItem(item, index))}
      </View>
    )
  }
}

export default MediaList
