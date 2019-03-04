import * as actionTypes from 'src/actions/actionTypes'

import { parseString } from 'react-native-xml2js'

const initialState = {
  errorMessage: '',
  hasError: false,
  data: []
}

parseAudioList = audioList => {
  let fullList = []

  parseString(audioList, function(err, result) {
    result.rss.channel[0].item.map(item => {
      fullList.push({
        title: (item.title && item.title[0]) || 'UNKNOWN TITLE',
        summary:
          (item['itunes:summary'] && item['itunes:summary'][0]) ||
          'UNKNOWN SUMMARY',
        speaker:
          (item['itunes:author'] && item['itunes:author'][0]) ||
          'UNKNOWN SPEAKER',
        published:
          (item.pubDate && item.pubDate[0]) || 'UNKNOWN PUBLISHED DATE',
        audio_url:
          (item.enclosure && item.enclosure[0]['$'].url) || 'UNKNOWN AUDIO URL',
        image_url:
          (item['itunes:image'] && item['itunes:image'][0]['$'].href) ||
          'UNKNOWN IMAGE URL'
      })
    })
  })

  return fullList
}

const sermonAudioReducer = (state = initialState, action) => {
  const {
    SERMON_AUDIO_FETCH_HAS_ERROR,
    SERMON_AUDIO_FETCH_ERROR_MESSAGE,
    SERMON_AUDIO_FETCH_SUCCESS
  } = actionTypes

  switch (action.type) {
    case SERMON_AUDIO_FETCH_HAS_ERROR:
      return { ...state, hasError: action.fetchHasError }
    case SERMON_AUDIO_FETCH_ERROR_MESSAGE:
      return { ...state, errorMessage: action.errorMessage }
    case SERMON_AUDIO_FETCH_SUCCESS:
      return {
        ...state,
        data: parseAudioList(action.sermonList)
      }
    default:
      return state
  }
}

export default sermonAudioReducer
