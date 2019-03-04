import * as actionTypes from 'src/actions/actionTypes'

const initialState = {
  serviceTime: 0,
  fullName: '',
  email: '',
  address_street: '',
  address_city: '',
  address_state: '',
  address_postal: '',
  phone: '',
  email: '',
  guestType: 0,
  marketingType: 0,
  nextStepFollowChrist: false,
  nextStepRecommitLife: false,
  nextStepWaterBaptism: false,
  nextStepNextStepsInfo: false,
  nextStepJoinCommunityGroup: false
}

const connectCardReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CONNECT_CARD_SET_FORM_ATTRIBUTE:
      return { ...state, [action.fieldName]: action.fieldValue }
    default:
      return state
  }
}

export default connectCardReducer
