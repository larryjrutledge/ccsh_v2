import * as actionTypes from 'src/actions/actionTypes'
import * as Constants from 'src/config/Constants'

export const eventFetchIsInitialLoad = initialLoad => {
  return {
    type: actionTypes.EVENT_FETCH_INITIAL_LOAD,
    fetchIsInitialLoad: initialLoad
  }
}

export const eventFetchIsRefreshLoad = refreshLoad => {
  return {
    type: actionTypes.EVENT_FETCH_REFRESH_LOAD,
    fetchIsRefreshLoad: refreshLoad
  }
}

export const eventFetchHasError = hasError => {
  return {
    type: actionTypes.EVENT_FETCH_HAS_ERROR,
    fetchHasError: hasError
  }
}

export const eventFetchErrorMessage = error => {
  return {
    type: actionTypes.EVENT_FETCH_ERROR_MESSAGE,
    errorMessage: error
  }
}

export const eventFetchSuccess = (
  fetchList,
  fetchPage,
  fetchInitialLoad,
  fetchRefreshLoad
) => {
  return {
    type: actionTypes.EVENT_FETCH_SUCCESS,
    fetchList,
    fetchPage,
    fetchInitialLoad,
    fetchRefreshLoad
  }
}

export const eventListFetch = (
  fetchPage,
  fetchPerPage,
  fetchInitialLoad = false,
  fetchRefreshLoad = false
) => {
  const _url =
    Constants.EVENT_URL + '&page=' + fetchPage + '&per_page=' + fetchPerPage

  return dispatch => {
    dispatch(eventFetchIsInitialLoad(fetchInitialLoad))
    dispatch(eventFetchIsRefreshLoad(fetchRefreshLoad))
    fetch(_url, {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        Pragma: 'no-cache',
        Expires: 0
      }
    })
      .then(response => {
        if (!response.ok) {
          dispatch(eventFetchErrorMessage(response.statusText))
        }
        dispatch(eventFetchIsInitialLoad(false))
        dispatch(eventFetchIsRefreshLoad(false))
        return response
      })
      .then(response => response.json())
      .then(fetchList =>
        dispatch(
          eventFetchSuccess(
            fetchList,
            fetchPage,
            fetchInitialLoad,
            fetchRefreshLoad
          )
        )
      )
      .catch(error => {
        dispatch(eventFetchHasError(true))
        dispatch(eventFetchErrorMessage(error))
      })
  }
}
