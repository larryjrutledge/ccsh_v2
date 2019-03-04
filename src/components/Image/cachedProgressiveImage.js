import React from 'react'
import { Animated, View } from 'react-native'
import { connect } from 'react-redux'

import styles from './styles'

import * as Constants from 'src/config/Constants'
import { cacheImageFetch } from 'src/actions/cacheImageActions'

class CachedProgressiveImage extends React.Component {
  thumbnailAnimated = new Animated.Value(0)
  imageAnimated = new Animated.Value(0)

  handleThumbnailLoad = () => {
    Animated.timing(this.thumbnailAnimated, {
      toValue: 1
    }).start()
  }

  handleImageLoad = () => {
    Animated.timing(this.imageAnimated, {
      toValue: 1
    }).start()
  }

  componentWillMount() {
    this.props.cacheImageFetch(this.props.source.uri, this.props.ttl)
  }

  shouldComponentUpdate(nextProps) {
    return this.props.localUri !== nextProps.localUri
  }

  _getThumbnailSource() {
    if (this.props.localUri === null) {
      return {
        uri: null
      }
    }

    if (this.props && this.props.localUri) {
      const _file = this.props.localUri
        .split('#')
        .shift()
        .split('?')
        .shift()
        .split('/')
        .pop()
        .split('.')

      return {
        uri: `${Constants.IMAGE_CACHE_LOC + _file[0] + '-thumb.png'}`
      }
    }
  }

  _getSource() {
    return {
      uri: `${Constants.IMAGE_CACHE_LOC + this.props.localUri}`
    }
  }

  render() {
    const { thumbnailSource, source, style, ...props } = this.props

    // return <Image {...this.props} source={this._getSource()} />

    return (
      <View style={styles.container}>
        <Animated.Image
          {...props}
          source={this._getThumbnailSource()}
          style={[
            style,
            styles.imageOverlay,
            {
              opacity: this.thumbnailAnimated
              // borderColor: 'yellow',
              // borderWidth: 2
            }
          ]}
          blurRadius={10}
          onLoad={this.handleThumbnailLoad}
        />
        <Animated.Image
          {...props}
          source={this._getSource()}
          style={[styles.imageOverlay, { opacity: this.imageAnimated }, style]}
          onLoad={this.handleImageLoad}
        />
      </View>
    )
  }
}

const mapStateToProps = (state, props) => {
  return {
    imageLoading: state.cacheImageReducer.imageLoading,
    imageCache: state.cacheImageReducer.imageCache,
    loading: state.cacheImageReducer.imageLoading.includes(props.source.uri),
    localUri: state.cacheImageReducer.imageCache[props.source.uri]
  }
}

const mapDispatchToProps = dispatch => {
  return {
    cacheImageFetch: (uri, ttl) => {
      dispatch(cacheImageFetch({ uri, ttl }))
    },
    cacheImageClear: () => {
      dispatch(cacheImageClear)
    }
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CachedProgressiveImage)
