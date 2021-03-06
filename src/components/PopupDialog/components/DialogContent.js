import React from 'react'
import { View, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  content: {
    paddingLeft: 18,
    paddingRight: 18,
    paddingBottom: 24
  }
})

function DialogContent({ style, children }) {
  return <View style={[styles.content, style]}>{children}</View>
}

DialogContent.defaultProps = {
  style: null
}

export default DialogContent
