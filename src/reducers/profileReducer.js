import * as actionTypes from '../actions/actionTypes'

const initialState = {
  profileImageData: '',
  profileUserName: '',
  profileIsAdmin: false,
  profileHasOnboarded: false
}

const profileReducer = (state = initialState, action) => {
  const {
    ASSIGN_PROFILE_IMAGE_DATA,
    CLEAR_PROFILE_IMAGE_DATA,
    ASSIGN_PROFILE_USER_NAME,
    ASSIGN_PROFILE_ADMIN,
    SET_PROFILE_HAS_ONBOARDED
  } = actionTypes

  switch (action.type) {
    case ASSIGN_PROFILE_IMAGE_DATA:
      return { ...state, profileImageData: action.data }
    case CLEAR_PROFILE_IMAGE_DATA:
      return { ...state, profileImageData: '' }
    case ASSIGN_PROFILE_USER_NAME:
      return { ...state, profileUserName: action.data }
    case ASSIGN_PROFILE_ADMIN:
      return { ...state, profileIsAdmin: action.data }
    case SET_PROFILE_HAS_ONBOARDED:
      return { ...state, profileHasOnboarded: action.hasOnboarded }
    default:
      return state
  }
}

export default profileReducer
