// https://dribbble.com/shots/2113180-Mobile-Forms
import React from 'react'
import { View, Text, TextInput } from 'react-native'

import styles from './styles'

class TextInputField extends React.Component {
  render() {
    const { label, formikProps, formikKey, ...rest } = this.props

    return (
      <View style={styles.container}>
        <View style={styles.labelContainer}>
          <Text style={styles.label}>{label}</Text>
          <Text style={styles.error}>
            {formikProps.touched[formikKey] && formikProps.errors[formikKey]}
          </Text>
        </View>
        <TextInput
          style={[styles.input, this.props.inputStyle]}
          onChangeText={formikProps.handleChange(formikKey)}
          onBlur={formikProps.handleBlur(formikKey)}
          value={formikProps.values[formikKey]}
          {...rest}
        />
      </View>
    )
  }
}

export default TextInputField
