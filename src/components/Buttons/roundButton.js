import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { LinearGradient } from 'expo'

import styles from './styles'

class RoundButton extends React.Component {
  handleSubmit = () => {
    this.props && this.props.onPress && this.props.onPress()
  }

  render() {
    return (
      <TouchableOpacity
        style={[
          styles.roundButtonContainer,
          {
            height: this.props.buttonHeight,
            borderRadius: this.props.buttonHeight / 2,
            width: this.props.buttonWidth
          }
        ]}
        onPress={() => this.handleSubmit()}
      >
        <LinearGradient
          // colors={['#4c669f', '#3b5998', '#192f6a']}
          // colors={['#16222a', '#3a6073']}
          // colors={['#efb340', '#f6d494']}
          colors={this.props.gradientColors}
          style={[
            styles.roundButtonGradient,
            {
              borderColor: this.props.borderColor,
              borderWidth: this.props.borderWidth,
              height: this.props.buttonHeight,
              borderRadius: this.props.buttonHeight / 2
            }
          ]}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
        >
          <Text
            style={[
              styles.roundButtonLabel,
              {
                fontSize: this.props.buttonFontSize,
                fontWeight: this.props.buttonFontWeight,
                color: this.props.buttonTextColor
              }
            ]}
          >
            {this.props.label}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
      // </View>
    )
  }
}

RoundButton.defaultProps = {
  borderColor: 'white',
  borderWidth: 3,
  buttonHeight: 50,
  buttonWidth: 200,
  buttonTextColor: 'black',
  buttonFontSize: 15,
  buttonFontWeight: '400',
  gradientColors: ['#efb340', '#f6d494']
}

export default RoundButton
