import React from 'react'
import { View, ScrollView, Text, TouchableOpacity } from 'react-native'

import { SimpleLineIcons } from '@expo/vector-icons'
import Dialog, {
  DialogTitle,
  DialogContent,
  ScaleAnimation
} from 'src/components/PopupDialog'

import styles from './styles'

class DropDownField extends React.Component {
  constructor() {
    super()

    this.state = {
      showDropDownItems: false,
      selectedValue: 0,
      selectedLabel: ''
    }
  }

  _defaultDisplayText = children => {
    if (this.props.value) {
      const selectedChild = children.find(child => {
        if (child.props.value === this.props.value) {
          return child
        }
      })

      return selectedChild.props.label
    } else {
      if (children[0].props.value === 0) {
        return children[0].props.label
      } else {
        return 'Choose one...'
      }
    }
  }

  handleOnSelect = ({ label, value }) => {
    if (value > 0) {
      this.setState(
        {
          selectedLabel: label,
          showDropDownItems: false
        },
        this.props.formikProps.setFieldValue(this.props.formikKey, value)
      )
    }
  }

  render() {
    const { label, title, formikProps, formikKey, children } = this.props

    const childrenWithOnSelect = React.Children.map(children, child =>
      React.cloneElement(child, {
        onSelect: this.handleOnSelect
      })
    )

    // defaultSelectedValue = this._defaultDisplayText(children)

    return (
      <View style={styles.container}>
        <Dialog
          width={0.75}
          height={this.props.height}
          dialogAnimation={new ScaleAnimation()}
          visible={this.state.showDropDownItems}
          dialogTitle={<DialogTitle title={title} />}
        >
          <DialogContent>
            <ScrollView
              style={this.props.listStyle}
              keyboardShouldPersistTaps="always"
            >
              {childrenWithOnSelect}
            </ScrollView>
          </DialogContent>
        </Dialog>
        <View style={styles.labelContainer}>
          <Text style={styles.label}>{label}</Text>
          <Text style={styles.error}>
            {formikProps.touched[formikKey] && formikProps.errors[formikKey]}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => this.setState({ showDropDownItems: true })}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}
          >
            <View
              style={{
                flex: 9,
                alignItems: 'flex-start',
                justifyContent: 'center'
              }}
            >
              <Text style={styles.selectedText}>
                {this.state.selectedLabel !== ''
                  ? this.state.selectedLabel
                  : // : defaultSelectedValue}
                    this._defaultDisplayText(children)}
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                borderColor: 'transparent',
                borderLeftColor: 'darkgray',
                borderWidth: 1
              }}
            >
              <SimpleLineIcons
                style={{}}
                name="arrow-down"
                size={20}
                color="black"
              />
            </View>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

export default DropDownField
