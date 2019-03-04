import React, { Component } from 'react'
import Sibling from 'react-native-root-siblings'
import Dialog from './components/Dialog'

export default class PopupDialog extends Component {
  constructor(props) {
    super(props)

    this.state = {
      visible: props.visible
    }
  }

  componentDidMount() {
    const { visible } = this.state
    if (visible) {
      this.createDialog()
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // update visible state and create dialog if visible is true
    if (prevState.visible !== this.props.visible) {
      // will use getDerivedStateFromProps in future, then don't need to setState
      // on componentDidUpdate
      // eslint-disable-next-line
      this.setState({ visible: this.props.visible })
      if (this.props.visible) {
        this.createDialog()
      }
    }
    // always re-render if sibling is not null
    if (this.sibling) {
      this.updateDialog()
    }
  }

  handleDismiss = () => {
    const { onDismiss } = this.props
    if (onDismiss) {
      onDismiss()
    }
    this.destroyDialog()
  }

  sibling = null

  createDialog() {
    // Protect against setState happening asynchronously
    if (!this.sibling) {
      this.sibling = new Sibling(this.renderDialog())
    }
  }

  updateDialog() {
    this.sibling.update(this.renderDialog())
  }

  destroyDialog() {
    this.sibling.destroy()
    this.sibling = null
  }

  renderDialog() {
    return (
      <Dialog
        {...this.props}
        onDismiss={this.handleDismiss}
        visible={this.state.visible}
      />
    )
  }

  render() {
    return null
  }
}
