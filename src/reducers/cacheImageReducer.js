import * as actionTypes from 'src/actions/actionTypes'

const initialState = {
  imageLoading: [],
  imageCache: []
}

const cacheImageReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CACHE_IMAGE_CLEAR:
      return {
        ...initialState
      }
    case actionTypes.CACHE_IMAGE_DOWNLOAD:
      if (state.imageLoading.includes(action.uri)) return state

      return {
        ...state,
        imageLoading: [...state.imageLoading, action.uri]
      }
    case actionTypes.CACHE_IMAGE_SUCCESS:
      return {
        ...state,
        imageLoading: [
          ...state.imageLoading.slice(
            0,
            state.imageLoading.indexOf(action.uri)
          ),
          ...state.imageLoading.slice(
            state.imageLoading.indexOf(action.uri) + 1
          )
        ],
        imageCache: { ...state.imageCache, [action.uri]: action.localFile }
      }
    case actionTypes.CACHE_IMAGE_ERROR:
      return {
        ...state,
        imageLoading: [
          ...state.imageLoading.slice(
            0,
            state.imageLoading.indexOf(action.uri)
          ),
          ...state.imageLoading.slice(
            state.imageLoading.indexOf(action.uri) + 1
          )
        ]
      }
    default:
      return state
  }
}

export default cacheImageReducer
