import React from 'react'
import { Text, View, SafeAreaView, TouchableOpacity } from 'react-native'

class AdminScreen extends React.Component {
  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <Text>Admin Screen</Text>
          <TouchableOpacity onPress={() => this.props.navigation.openDrawer()}>
            <Text>Open Drawer</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    )
  }
}

export default AdminScreen
