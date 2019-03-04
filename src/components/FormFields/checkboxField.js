import React from 'react'
import { View, Text, TouchableWithoutFeedback } from 'react-native'

import { Feather } from '@expo/vector-icons'
// use Feather - check-square && square for checkbox states

import styles from './styles'

export default props => {
  const { label, formikProps, formikKey } = props

  return (
    <View
      style={[
        styles.container,
        { justifyContent: 'center', paddingVertical: 8 }
      ]}
    >
      <TouchableWithoutFeedback
        onPress={() => {
          formikProps.setFieldValue(formikKey, !formikProps.values[formikKey])
        }}
      >
        <View style={[styles.labelContainer, { alignItems: 'center' }]}>
          <View style={{ flex: 9 }}>
            <Text style={styles.checkboxLabel}>{label}</Text>
          </View>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              marginRight: 10
            }}
          >
            {formikProps.values[formikKey] ? (
              <Feather name="check-square" size={20} color="black" />
            ) : (
              <Feather name="square" size={20} color="black" />
            )}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  )
}
