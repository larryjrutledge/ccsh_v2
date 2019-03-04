import * as actionTypes from 'src/actions/actionTypes'
export const CONNECT_CARD_SET_FORM_ATTRIBUTE = 'CONNECT_CARD_SET_FORM_ATTRIBUTE'

export const connectCardSetFormAttribute = (fieldName, fieldValue) => {
  return {
    type: actionTypes.CONNECT_CARD_SET_FORM_ATTRIBUTE,
    fieldName,
    fieldValue
  }
}
