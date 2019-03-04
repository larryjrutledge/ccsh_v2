import React from 'react'
import { View, Text } from 'react-native'

import styles from './styles'

class HeaderField extends React.Component {
  render() {
    return (
      <View
        style={[
          styles.container,
          { backgroundColor: 'lightgrey', justifyContent: 'center' }
        ]}
      >
        <Text style={styles.headerText}>{this.props.title}</Text>
      </View>
    )
  }
}

export default HeaderField
