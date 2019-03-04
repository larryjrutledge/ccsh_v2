import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

class Header extends React.Component {
  render() {
    return (
      <View
        style={[
          {
            flexDirection: 'row'
          },
          this.props.headerStyle
        ]}
      >
        <View
          style={{
            flex: 1,
            alignItems: 'flex-start',
            justifyContent: 'center',
            paddingLeft: 10
          }}
        >
          <TouchableOpacity onPress={this.props.leftPress}>
            {this.props.left}
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 5,
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Text
            ellipsizeMode="tail"
            numberOfLines={1}
            style={[
              {
                color: 'white',
                fontSize: 18,
                fontWeight: '200',
                paddingVertical: 10
              },
              this.props.headerTextStyle
            ]}
          >
            {this.props.title}
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            alignItems: 'flex-end',
            justifyContent: 'center',
            paddingRight: 10
          }}
        >
          <TouchableOpacity onPress={this.props.rightPress}>
            {this.props.right}
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

Header.defaultProps = {
  headerStyle: {},
  headerTextStyle: {}
}

export default Header
