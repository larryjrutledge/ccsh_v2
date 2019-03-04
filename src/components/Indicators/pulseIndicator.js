import React from 'react'
import { View, Animated, Easing } from 'react-native'
import PropTypes from 'prop-types'

import Indicator from './indicator'
import styles from './styles'

class PulseIndicator extends React.PureComponent {
  static defaultProps = {
    animationEasing: Easing.out(Easing.ease),

    color: 'rgb(0, 0, 0)',
    size: 40
  }

  static propTypes = {
    ...Indicator.propTypes,

    color: PropTypes.string,
    size: PropTypes.number
  }

  constructor(props) {
    super(props)

    this.renderComponent = this.renderComponent.bind(this)
  }

  renderComponent({ index, count, progress }) {
    let { size, color } = this.props

    let pulseStyle = {
      height: size,
      width: size,
      borderRadius: size / 2,
      backgroundColor: color,
      transform: [
        {
          scale: progress.interpolate({
            inputRange: [0, 0.67, 1],
            outputRange: index ? [0.4, 0.6, 0.4] : [0.4, 0.6, 1.0]
          })
        }
      ],
      opacity: progress.interpolate({
        inputRange: [0, 0.67, 1],
        outputRange: index ? [1.0, 1.0, 1.0] : [0.5, 0.5, 0.0]
      })
    }

    return (
      <Animated.View style={styles.pulseLayer} {...{ key: index }}>
        <Animated.View style={pulseStyle} />
      </Animated.View>
    )
  }

  render() {
    let { style, size: width, size: height, ...props } = this.props

    return (
      <View style={[styles.pulseContainer, style]}>
        <Indicator
          style={{ width, height }}
          renderComponent={this.renderComponent}
          {...props}
          count={2}
        />
      </View>
    )
  }
}

export default PulseIndicator
