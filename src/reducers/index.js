import { combineReducers } from 'redux'
import profileReducer from './profileReducer'
import blogReducer from './blogReducer'
import sermonAudioReducer from './sermonAudioReducer'
import cacheImageReducer from './cacheImageReducer'
import eventReducer from './eventReducer'
import connectCardReducer from './connectCardReducer'

export default combineReducers({
  profileReducer,
  blogReducer,
  sermonAudioReducer,
  cacheImageReducer,
  eventReducer,
  connectCardReducer
})
