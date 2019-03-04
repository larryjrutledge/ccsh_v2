import React from 'react'
import { View } from 'react-native'

import styles from './styles'

class SpacerField extends React.Component {
  render() {
    return <View style={[styles.container, { height: this.props.height }]} />
  }
}

SpacerField.defaultProps = {
  height: 30
}
export default SpacerField
