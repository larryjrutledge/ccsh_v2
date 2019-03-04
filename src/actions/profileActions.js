import * as actionTypes from './actionTypes'

export const assignProfileImageData = data => ({
  type: actionTypes.ASSIGN_PROFILE_IMAGE_DATA,
  data
})

export const clearProfileImageData = () => ({
  type: actionTypes.CLEAR_PROFILE_IMAGE_DATA
})

export const assignProfileUserName = data => ({
  type: actionTypes.ASSIGN_PROFILE_USER_NAME,
  data
})

export const assignProfileAdmin = data => ({
  type: actionTypes.ASSIGN_PROFILE_ADMIN,
  data
})

export const setProfileHasOnboarded = bool => ({
  type: actionTypes.SET_PROFILE_HAS_ONBOARDED,
  hasOnboarded: bool
})
