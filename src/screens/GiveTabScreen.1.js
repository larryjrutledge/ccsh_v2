import React, { Component } from 'react'
import {
  Text,
  View,
  StatusBar,
  SafeAreaView,
  Image,
  Button
} from 'react-native'
import { connect } from 'react-redux'

import { FileSystem, LinearGradient } from 'expo'
import { Feather } from '@expo/vector-icons'

import { cacheImageFetch, cacheImageClear } from 'src/actions/cacheImageActions'
import * as Constants from 'src/config/Constants'
import Header from 'src/components/Header'
import { CachedImage } from 'src/components/Image'

class GiveTabScreen extends Component {
  giveOnlinePress = () => {
    Linking.openURL(Constants.GIVE_URL)
  }

  listCacheDirectory = async () => {
    const files = await FileSystem.readDirectoryAsync(Constants.IMAGE_CACHE_LOC)
    console.log('[DEBUG] Cache Files:')

    files.map(async fileUri => {
      const imgFileExt = fileUri
        .split('#')
        .shift()
        .split('?')
        .shift()
        .split('/')
        .pop()
        .split('.')
        .pop()
      if (
        ['jpg', 'jpeg', 'png', 'gif', 'jpeg+-thumb', '+jpeg'].includes(
          imgFileExt
        )
      ) {
        await FileSystem.deleteAsync(`${Constants.IMAGE_CACHE_LOC + fileUri}`)
        console.log('[DEBUG] - ' + fileUri + ' [DELETED]')
      } else {
        console.log('[DEBUG] - ' + fileUri + ' - (' + imgFileExt + ') [IGNORE]')
      }
    })
  }

  getSource() {
    // console.log('[DEBUG] getSource()')
    // console.log(this.props.localUri)
    if (this.props.localUri) {
      return { uri: this.props.localUri }
    }
  }

  render() {
    return (
      <LinearGradient colors={['#232526', '#414345']} style={{ flex: 1 }}>
        <StatusBar barStyle="light-content" />

        <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent' }}>
          <Header
            {...this.props}
            left={<Feather name="menu" size={20} color={'white'} />}
            leftPress={() => {
              this.props.navigation.openDrawer()
            }}
            title="Give"
          />
          <View
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
          >
            <Text style={{ color: 'white' }}>This is the giving page</Text>
            <Text style={{ color: 'white' }}>
              Loading Count:{' '}
              {(this.props.imageLoading && this.props.imageLoading.count) || 0}
            </Text>
            <Button
              onPress={() =>
                this.props.cacheImageFetch(
                  'https://images.pexels.com/photos/671557/pexels-photo-671557.jpeg?w=750',
                  15
                )
              }
              title="Fetch Image"
            />
            <Button
              onPress={() => this.listCacheDirectory()}
              title="Clear Cache"
            />
            <Button
              onPress={() => this.props.cacheImageClear()}
              title="Clear Cache Store"
            />
            <Text style={{ color: 'white' }}>
              {this.props.loading ? 'Loading: true' : 'Loading: false'}
            </Text>
            <Text style={{ color: 'white' }}>{this.props.localUri}</Text>
            {/* {this.props.localUri ? ( */}
            <CachedImage
              style={{
                width: 300,
                height: 300,
                borderColor: 'yellow',
                borderWidth: 1,
                backgroundColor: '#cdcdcd'
              }}
              // source={this.getSource()}
              source={{
                uri:
                  'https://images.pexels.com/photos/671557/pexels-photo-671557.jpeg?w=750'
              }}
              ttl={30}
            />
            {/* ) : null} */}
          </View>
        </SafeAreaView>
      </LinearGradient>
    )
  }
}
// localUri: loaded[props.source.uri],
const mapStateToProps = state => {
  // console.log('[DEBUG] mapStateToProps: state: ')
  // console.log(state.cacheImageReducer)
  return {
    imageLoading: state.cacheImageReducer.imageLoading,
    imageCache: state.cacheImageReducer.imageCache,
    loading: state.cacheImageReducer.imageLoading.includes(
      'https://images.pexels.com/photos/671557/pexels-photo-671557.jpeg?w=750'
    ),
    localUri:
      state.cacheImageReducer.imageCache[
        'https://images.pexels.com/photos/671557/pexels-photo-671557.jpeg?w=750'
      ]
  }
}

const mapDispatchToProps = dispatch => {
  return {
    cacheImageFetch: (uri, ttl) => {
      dispatch(cacheImageFetch({ uri, ttl }))
    },
    cacheImageClear: () => {
      dispatch(cacheImageClear())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GiveTabScreen)
