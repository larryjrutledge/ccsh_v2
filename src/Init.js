import React from 'react'
import { connect } from 'react-redux'

import { assignProfileAdmin } from 'src/actions/profileActions'

import { isAdmin } from 'src/config/Utils'
import MainSwitchNavigator from 'src/navigators/MainSwitchNavigator'

class Init extends React.Component {
  render() {
    isAdmin(this.props.profileUserName, isAdminResult => {
      this.props.setProfileAdmin(isAdminResult)
    })

    return <MainSwitchNavigator />
  }
}

const mapStateToProps = state => {
  return {
    profileHasOnboarded: state.profileReducer.profileHasOnboarded,
    profileImageData: state.profileReducer.profileImageData,
    profileUserName: state.profileReducer.profileUserName
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setProfileAdmin: isAdmin => dispatch(assignProfileAdmin(isAdmin)),
    setProfileHasOnboarded: bool => dispatch(setProfileHasOnboarded(bool))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Init)
