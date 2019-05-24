import * as actionTypes from 'src/actions/actionTypes'

import { getMediaList } from 'src/config/Utils'

export const mediaPlayerFetch = mediaType => {
  return dispatch => {
    getMediaList(mediaType)
      .then(mediaList => {
        dispatch(mediaPlayerFetchSuccess(mediaList))
      })
      .catch(error => {
        dispatch(mediaPlayerFetchHasError(true))
        dispatch(mediaPlayerFetchErrorMessage(error))
      })
  }
}

export const mediaPlayerFetchHasError = hasError => {
  return {
    type: actionTypes.MEDIA_PLAYER_FETCH_HAS_ERROR,
    fetchHasError: hasError
  }
}

export const mediaPlayerFetchErrorMessage = error => {
  return {
    type: actionTypes.MEDIA_PLAYER_FETCH_ERROR_MESSAGE,
    errorMessage: error
  }
}

export const mediaPlayerFetchSuccess = mediaPlayerList => {
  return {
    type: actionTypes.MEDIA_PLAYER_FETCH_SUCCESS,
    mediaPlayerList
  }
}
