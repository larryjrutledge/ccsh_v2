import * as actionTypes from 'src/actions/actionTypes'
import * as Constants from 'src/config/Constants'

export const blogFetchIsInitialLoad = initialLoad => {
  return {
    type: actionTypes.BLOG_FETCH_INITIAL_LOAD,
    fetchIsInitialLoad: initialLoad
  }
}

export const blogFetchIsRefreshLoad = refreshLoad => {
  return {
    type: actionTypes.BLOG_FETCH_REFRESH_LOAD,
    fetchIsRefreshLoad: refreshLoad
  }
}

export const blogFetchHasError = hasError => {
  return {
    type: actionTypes.BLOG_FETCH_HAS_ERROR,
    fetchHasError: hasError
  }
}

export const blogFetchErrorMessage = error => {
  return {
    type: actionTypes.BLOG_FETCH_ERROR_MESSAGE,
    errorMessage: error
  }
}

export const blogFetchSuccess = (
  fetchList,
  fetchPage,
  fetchInitialLoad,
  fetchRefreshLoad
) => {
  return {
    type: actionTypes.BLOG_FETCH_SUCCESS,
    fetchList,
    fetchPage,
    fetchInitialLoad,
    fetchRefreshLoad
  }
}

export const blogListFetch = (
  fetchPage,
  fetchPerPage,
  fetchInitialLoad = false,
  fetchRefreshLoad = false
) => {
  const _url =
    Constants.BLOG_BASE_URL + '&page=' + fetchPage + '&per_page=' + fetchPerPage

  return dispatch => {
    dispatch(blogFetchIsInitialLoad(fetchInitialLoad))
    dispatch(blogFetchIsRefreshLoad(fetchRefreshLoad))
    fetch(_url, {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        Pragma: 'no-cache',
        Expires: 0
      }
    })
      .then(response => {
        if (!response.ok) {
          dispatch(blogFetchErrorMessage(response.statusText))
        }
        dispatch(blogFetchIsInitialLoad(false))
        dispatch(blogFetchIsRefreshLoad(false))
        return response
      })
      .then(response => response.json())
      .then(fetchList =>
        dispatch(
          blogFetchSuccess(
            fetchList,
            fetchPage,
            fetchInitialLoad,
            fetchRefreshLoad
          )
        )
      )
      .catch(error => {
        dispatch(blogFetchHasError(true))
        dispatch(blogFetchErrorMessage(error))
      })
  }
}
