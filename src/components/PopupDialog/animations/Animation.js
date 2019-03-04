import { Animated } from 'react-native'

// Base Animation class
export default class Animation {
  useNativeDriver
  animate
  animations

  constructor({ toValue = 0, useNativeDriver = true } = {}) {
    this.useNativeDriver = useNativeDriver
    this.animate = new Animated.Value(toValue)
    this.animations = this.createAnimations()
  }

  toValue() {
    throw Error('not implemented yet')
  }

  createAnimations() {
    throw Error('not implemented yet')
  }
}
