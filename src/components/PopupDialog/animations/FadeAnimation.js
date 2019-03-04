import { Animated } from 'react-native'
import Animation from './Animation'

export default class FadeAnimation extends Animation {
  animate
  animationDuration

  constructor({
    toValue = 0,
    animationDuration = 200,
    useNativeDriver = true
  } = {}) {
    super({ toValue, useNativeDriver })
    this.animationDuration = animationDuration
  }

  toValue(toValue, onFinished = () => {}) {
    Animated.timing(this.animate, {
      toValue,
      duration: this.animationDuration,
      useNativeDriver: this.useNativeDriver
    }).start(onFinished)
  }

  createAnimations() {
    return { opacity: this.animate }
  }
}
