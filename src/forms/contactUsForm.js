import React from 'react'
import { ActivityIndicator, View } from 'react-native'

import { Formik } from 'formik'
import * as yup from 'yup'

import * as Constants from 'src/config/Constants'

import { TextInputField, CheckboxField } from 'src/components/FormFields'
import { RoundButton } from 'src/components/Buttons'

const validationSchema = yup.object().shape({
  name: yup
    .string()
    .label('Name')
    .required(),
  email: yup
    .string()
    .label('E-Mail')
    .email()
    .required(),
  phone: yup
    .string()
    .label('Phone')
    .matches(Constants.REG_EXP_PHONE, 'Phone number is not valid')
    .required()
})

export default props => (
  <Formik
    initialValues={{ test: false, name: '', email: '', phone: '', message: '' }}
    onSubmit={(values, actions) => {
      // handle submit
      console.log('submit: values: ', values)
      props.onSubmit && props.onSubmit(values)
    }}
    validationSchema={validationSchema}
  >
    {formikProps => (
      <React.Fragment>
        <CheckboxField
          label="Testing"
          formikProps={formikProps}
          formikKey="test"
        />

        <TextInputField
          label="Your Name"
          autoFocus
          placeholder="Your Name"
          autoCapitalize="words"
          autoCorrect={false}
          formikProps={formikProps}
          formikKey="name"
        />

        <TextInputField
          label="E-Mail Address"
          placeholder="user.name@domain.com"
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
          formikProps={formikProps}
          formikKey="email"
        />

        <TextInputField
          label="Phone Number"
          placeholder="(111) 222 - 3333"
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="numeric"
          formikProps={formikProps}
          formikKey="phone"
        />

        <TextInputField
          label="Enter Your Message..."
          multiline={true}
          numberOfLines={5}
          textAlignVertical={true}
          autoCapitalize="sentences"
          autoComplete="off"
          inputStyle={{ height: 20.5 * 5 }}
          formikProps={formikProps}
          formikKey="message"
        />
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 20
          }}
        >
          {formikProps.isSubmitting ? (
            <ActivityIndicator />
          ) : (
            <RoundButton label="Submit" onPress={formikProps.handleSubmit} />
          )}
        </View>
      </React.Fragment>
    )}
  </Formik>
)
