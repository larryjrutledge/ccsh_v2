import * as actionTypes from 'src/actions/actionTypes'

import { getMediaList } from 'src/config/Utils'

const initialState = {
  errorMessage: '',
  hasError: false,
  data: []
}

const mediaPlayerReducer = (state = initialState, action) => {
  const {
    MEDIA_PLAYER_FETCH_HAS_ERROR,
    MEDIA_PLAYER_FETCH_ERROR_MESSAGE,
    MEDIA_PLAYER_FETCH_SUCCESS
  } = actionTypes

  // console.log('[DEBUG] mediaPlayerReducer: action: ', action)
  switch (action.type) {
    case MEDIA_PLAYER_FETCH_HAS_ERROR:
      return { ...state, hasError: action.fetchHasError }
    case MEDIA_PLAYER_FETCH_ERROR_MESSAGE:
      return { ...state, errorMessage: action.errorMessage }
    case MEDIA_PLAYER_FETCH_SUCCESS:
      return { ...state, data: action.mediaPlayerList }
    default:
      return state
  }
}

export default mediaPlayerReducer
