import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

import styles from './styles'

class Button extends React.Component {
  render({ onPress } = this.props) {
    return (
      <TouchableOpacity onPress={onPress}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>{this.props.text.toUpperCase()}</Text>
        </View>
      </TouchableOpacity>
    )
  }
}

export default Button
