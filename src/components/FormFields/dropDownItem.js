import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

import { Feather } from '@expo/vector-icons'

import styles from './styles'

class DropDownItem extends React.Component {
  _handleOnPress = () => {
    this.props && this.props.onSelect && this.props.onSelect(this.props)
  }

  // {this.state.checked ? (
  render() {
    if (this.props.value > 0) {
      return (
        <TouchableOpacity onPress={this._handleOnPress}>
          <View style={[styles.itemContainer]}>
            <Text style={{ color: 'black' }}>{this.props.label}</Text>
            {this.props.selected && this.props.value > 0 ? (
              <Feather name="check-circle" size={20} color="black" />
            ) : null}
          </View>
        </TouchableOpacity>
      )
    } else {
      return (
        <View style={[styles.itemContainer]}>
          <Text style={{ color: 'black' }}>{this.props.label}</Text>
          {this.props.selected && this.props.value > 0 ? (
            <Feather name="check-circle" size={20} color="black" />
          ) : null}
        </View>
      )
    }
  }
}

export default DropDownItem
