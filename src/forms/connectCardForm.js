import React from 'react'
import { ActivityIndicator, View } from 'react-native'

import { Formik } from 'formik'
import * as yup from 'yup'

import * as Constants from 'src/config/Constants'
import {
  CheckboxField,
  DropDownField,
  DropDownItem,
  TextInputField,
  HeaderField
} from 'src/components/FormFields'
import { RoundButton } from 'src/components/Buttons'

const validationSchema = yup.object().shape({
  service_time: yup
    .number()
    .label('Service Time')
    .test('non-zero', 'Must select a service time', value => value > 0),
  fullName: yup
    .string()
    .label('Name')
    .required(),
  address_street: yup
    .string()
    .label('Street Address')
    .required(),
  address_city: yup
    .string()
    .label('City')
    .required(),
  address_state: yup
    .string()
    .label('State')
    .required(),
  address_postal: yup
    .string()
    .label('Postal Code')
    .required(),
  phone: yup
    .string()
    .label('Phone')
    .matches(Constants.REG_EXP_PHONE, 'Phone number is not valid')
    .required(),
  email: yup
    .string()
    .label('Email')
    .email()
    .required(),
  guest_type: yup
    .number()
    .label('Guest Type')
    .test('non-zero', 'Must select a guest type', value => value > 0),
  marketing_type: yup
    .number()
    .label('Marketing Type')
    .test('non-zero', 'Must select a marketing type', value => value > 0)
})

export default props => {
  return (
    <Formik
      initialValues={{
        service_time: props.storedValues.service_time || 0,
        fullName: props.storedValues.fullName || '',
        address_street: props.storedValues.address_street || '',
        address_city: props.storedValues.address_city || '',
        address_state: props.storedValues.address_state || '',
        address_postal: props.storedValues.address_postal || '',
        phone: props.storedValues.phone || '',
        email: props.storedValues.email || '',
        guest_type: props.storedValues.guest_type || 0,
        marketing_type: props.storedValues.marketing_type || 0,
        nextStepFollowChrist: props.storedValues.nextStepFollowChrist || false,
        nextStepRecommitLife: props.storedValues.nextStepRecommitLife || false,
        nextStepWaterBaptism: props.storedValues.nextStepWaterBaptism || false,
        nextStepNextStepInfo: props.storedValues.nextStepNextStepInfo || false,
        nextStepCommunityGroup:
          props.storedValues.nextStepCommunityGroup || false
      }}
      onSubmit={(values, actions) => {
        props.onSubmit && props.onSubmit(values)
      }}
      validationSchema={validationSchema}
    >
      {formikProps => (
        <React.Fragment>
          <DropDownField
            label="Service Time"
            formikProps={formikProps}
            formikKey="service_time"
            value={formikProps.values['service_time']}
          >
            <DropDownItem
              label="Sunday 9 AM"
              value={Constants.SERVICE_TIMES.SUNDAY_AM_FIRST}
              onPress={value => alert('You selected: ' + value)}
              selected={
                formikProps.values['service_time'] ===
                Constants.SERVICE_TIMES.SUNDAY_AM_FIRST
              }
            />
            <DropDownItem
              label="Sunday 10:30 AM"
              value={Constants.SERVICE_TIMES.SUNDAY_AM_SECOND}
              onPress={value => alert('You selected: ' + value)}
              selected={
                formikProps.values['service_time'] ===
                Constants.SERVICE_TIMES.SUNDAY_AM_SECOND
              }
            />
          </DropDownField>
          <TextInputField
            label="First/Last Name"
            autoFocus
            placeholder="Your Name"
            autoCapitalize="words"
            autoCorrect={false}
            formikProps={formikProps}
            formikKey="fullName"
            value={formikProps.values['fullName']}
          />
          <TextInputField
            label="Address"
            placeholder=""
            autoCapitalize="words"
            autoCorrect={false}
            formikProps={formikProps}
            formikKey="address_street"
            value={formikProps.values['address_street']}
          />
          <TextInputField
            label="City"
            placeholder=""
            autoCapitalize="words"
            autoCorrect={false}
            formikProps={formikProps}
            formikKey="address_city"
            value={formikProps.values['address_city']}
          />
          <TextInputField
            label="State"
            placeholder=""
            autoCapitalize="characters"
            autoCorrect={false}
            formikProps={formikProps}
            formikKey="address_state"
            value={formikProps.values['address_state']}
          />
          <TextInputField
            label="Postal Code"
            placeholder=""
            autoCapitalize="words"
            autoCorrect={false}
            keyboardType="numeric"
            formikProps={formikProps}
            formikKey="address_postal"
            value={formikProps.values['address_postal']}
          />
          <TextInputField
            label="Phone"
            placeholder="123 456 7890"
            autoCapitalize="words"
            autoCorrect={false}
            keyboardType="numeric"
            formikProps={formikProps}
            formikKey="phone"
            value={formikProps.values['phone']}
          />
          <TextInputField
            label="E-Mail"
            placeholder="you@example.com"
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            formikProps={formikProps}
            formikKey="email"
            value={formikProps.values['email']}
          />
          <DropDownField
            label=""
            formikProps={formikProps}
            formikKey="guest_type"
            value={formikProps.values['guest_type']}
          >
            <DropDownItem
              label="Choose One..."
              value={Constants.GUEST_TYPE.UNKNOWN}
              onPress={value => alert('You selected: ' + value)}
              selected={
                formikProps.values['guestType'] === Constants.GUEST_TYPE.UNKNOWN
              }
            />
            <DropDownItem
              label="I'm New Here"
              value={Constants.GUEST_TYPE.NEW_VISITOR}
              onPress={value => alert('You selected: ' + value)}
              selected={
                formikProps.values['guest_type'] ===
                Constants.GUEST_TYPE.NEW_VISITOR
              }
            />
            <DropDownItem
              label="Returning Guest"
              value={Constants.GUEST_TYPE.REPEAT_VISITOR}
              onPress={value => alert('You selected: ' + value)}
              selected={
                formikProps.values['guest_type'] ===
                Constants.GUEST_TYPE.REPEAT_VISITOR
              }
            />
            <DropDownItem
              label="I Call Christ Chapel Home"
              value={Constants.GUEST_TYPE.FULL_TIME}
              onPress={value => alert('You selected: ' + value)}
              selected={
                formikProps.values['guest_type'] ===
                Constants.GUEST_TYPE.FULL_TIME
              }
            />
          </DropDownField>
          <DropDownField
            label="How Did You Hear About Us?"
            formikProps={formikProps}
            formikKey="marketing_type"
            value={formikProps.values['marketing_type']}
          >
            <DropDownItem
              label="Choose One..."
              value={Constants.MARKETING_TYPE.UNKNOWN}
              onPress={value => alert('You selected: ' + value)}
              selected={
                formikProps.values['marketing_type'] ===
                Constants.MARKETING_TYPE.UNKNOWN
              }
            />
            <DropDownItem
              label="Friend / Family"
              value={Constants.MARKETING_TYPE.WORD_OF_MOUTH}
              onPress={value => alert('You selected: ' + value)}
              selected={
                formikProps.values['marketing_type'] ===
                Constants.MARKETING_TYPE.WORD_OF_MOUTH
              }
            />
            <DropDownItem
              label="Sign"
              value={Constants.MARKETING_TYPE.SIGN}
              onPress={value => alert('You selected: ' + value)}
              selected={
                formikProps.values['marketing_type'] ===
                Constants.MARKETING_TYPE.SIGN
              }
            />
            <DropDownItem
              label="Online / Social Media"
              value={Constants.MARKETING_TYPE.ONLINE_SOCIAL_MEDIA}
              onPress={value => alert('You selected: ' + value)}
              selected={
                formikProps.values['marketing_type'] ===
                Constants.MARKETING_TYPE.ONLINE_SOCIAL_MEDIA
              }
            />
            <DropDownItem
              label="Other"
              value={Constants.MARKETING_TYPE.OTHER}
              onPress={value => alert('You selected: ' + value)}
              selected={
                formikProps.values['marketing_type'] ===
                Constants.MARKETING_TYPE.OTHER
              }
            />
          </DropDownField>
          <HeaderField title="Could Your Next Step Be:" />
          <CheckboxField
            label="Decide to follow Christ for the first time"
            formikProps={formikProps}
            formikKey="nextStepFollowChrist"
          />
          <CheckboxField
            label="Recommit my life to Christ"
            formikProps={formikProps}
            formikKey="nextStepRecommitLife"
          />
          <CheckboxField
            label="Get Water Baptized"
            formikProps={formikProps}
            formikKey="nextStepWaterBaptism"
          />
          <CheckboxField
            label="Learn more about membership by attending NEXT STEPS"
            formikProps={formikProps}
            formikKey="nextStepNextStepInfo"
          />
          <CheckboxField
            label="Engage in relationship with others by joining a Community Group"
            formikProps={formikProps}
            formikKey="nextStepCommunityGroup"
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
}
