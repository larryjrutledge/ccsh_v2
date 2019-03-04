import React from 'react'
import { Image } from 'react-native'
import { connect } from 'react-redux'

import * as Constants from 'src/config/Constants'
import { cacheImageFetch } from 'src/actions/cacheImageActions'

class CachedImage extends React.Component {
  componentWillMount() {
    this.props.cacheImageFetch(this.props.source.uri, this.props.ttl)
  }

  shouldComponentUpdate(nextProps) {
    // console.log('[DEBUG] CachedImage: shouldComponentUpdate')
    // console.log('[DEBUG] props localUri: ', this.props.localUri)
    // console.log('[DEBUG] nextProps localUri: ', nextProps.localUri)
    return this.props.localUri !== nextProps.localUri
  }

  _getSource() {
    const _file = this.props.localUri
      .split('#')
      .shift()
      .split('?')
      .shift()
      .split('/')
      .pop()
      .split('.')
    console.log('getSource: ', _file)
    // if (!this.props.localUri) return require('src/assets/Mdove.png')
    // return { uri: `${Constants.IMAGE_CACHE_LOC + this.props.localUri}` }
    return {
      uri: `${Constants.IMAGE_CACHE_LOC + _file[0] + '-thumb.png'}`
    }
  }

  render() {
    return <Image {...this.props} source={this._getSource()} />
  }
}

const mapStateToProps = (state, props) => {
  // console.log(
  //   '[DEBUG] CachedImage: mapStateToProps: props.source: ',
  //   props.source
  // )
  // console.log(
  //   '[DEBUG] CachedImage: mapStateToProps: cacheImageReducer: ',
  //   state.cacheImageReducer
  // )
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
)(CachedImage)
