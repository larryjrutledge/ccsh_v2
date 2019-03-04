import * as actionTypes from 'src/actions/actionTypes'
import * as Constants from 'src/config/Constants'

export const sermonAudioFetch = () => {
  const _url = Constants.SERMON_AUDIO_URL

  return dispatch => {
    fetch(_url, {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        Pragma: 'no-cache',
        Expires: 0
      }
    })
      .then(response => {
        if (!response.ok) {
          dispatch(sermonAudioFetchErrorMessage(response.statusText))
        }
        return response.text()
      })
      .then(fetchList => dispatch(sermonAudioFetchSuccess(fetchList)))
      .catch(error => {
        dispatch(sermonAudioFetchHasError(true))
        dispatch(sermonAudioFetchErrorMessage(error))
      })
  }
}

export const sermonAudioFetchHasError = hasError => {
  return {
    type: actionTypes.SERMON_AUDIO_FETCH_HAS_ERROR,
    fetchHasError: hasError
  }
}

export const sermonAudioFetchErrorMessage = error => {
  return {
    type: actionTypes.SERMON_AUDIO_FETCH_ERROR_MESSAGE,
    errorMessage: error
  }
}

export const sermonAudioFetchSuccess = sermonList => {
  return {
    type: actionTypes.SERMON_AUDIO_FETCH_SUCCESS,
    sermonList
  }
}
