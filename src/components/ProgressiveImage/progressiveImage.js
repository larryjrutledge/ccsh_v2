import React from 'react'
import { Animated, ActivityIndicator, Image, View } from 'react-native'
import * as Indicators from 'src/components/Indicators'
import styles from './styles'

class ProgressiveImage extends React.Component {
  thumbnailAnimated = new Animated.Value(0)
  imageAnimated = new Animated.Value(0)

  handleThumbnailLoad = () => {
    Animated.timing(this.thumbnailAnimated, {
      toValue: 1
    }).start()
  }

  onImageLoad = () => {
    Animated.timing(this.imageAnimated, {
      toValue: 1
    }).start()
  }

  render() {
    const {
      thumbnailSource,
      showInitialIndicator,
      showIntermediateIndicator,
      source,
      style,
      ...props
    } = this.props

    return (
      <View style={styles.container}>
        {showInitialIndicator ? (
          <View
            style={[
              style,
              {
                alignItems: 'center',
                justifyContent: 'center'
              }
            ]}
          >
            {/* <BarIndicator color="blue" count={5} size={50} /> */}
            <Indicators.MaterialIndicator color="black" size={30} />
          </View>
        ) : (
          <View
            style={[style, { alignItems: 'center', justifyContent: 'center' }]}
          />
        )}
        <Animated.Image
          {...props}
          source={thumbnailSource}
          style={[
            styles.imageOverlay,
            style,
            { opacity: this.thumbnailAnimated }
          ]}
          onLoad={this.handleThumbnailLoad}
          blurRadius={10}
        />
        {showIntermediateIndicator ? (
          <View
            style={[
              styles.imageOverlay,
              style,
              {
                alignItems: 'center',
                justifyContent: 'center'
              }
            ]}
          >
            {/* <BarIndicator color="blue" count={5} size={50} /> */}
            <MaterialIndicator color="black" size={50} />
          </View>
        ) : null}

        <Animated.Image
          {...props}
          source={source}
          style={[styles.imageOverlay, { opacity: this.imageAnimated }, style]}
          onLoad={this.onImageLoad}
        />
      </View>
    )
  }
}

export default ProgressiveImage
