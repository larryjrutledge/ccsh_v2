import Moment from 'moment'

import * as actionTypes from 'src/actions/actionTypes'
import { decodeBlogTitle } from 'src/config/Utils'

const initialState = {
  errorMessage: '',
  hasError: false,
  isInitialLoad: false,
  isRefreshLoad: false,
  data: [],
  lastFetchedPage: 0,
  lastFetchedDay: -1
}

const today = new Date().getDay()

buildEventList = sourceEventList => {
  let newEventList = []

  // newEventList = [
  //   {
  //     title: 'test title',
  //     date: 'Sunday, February 3, 2019',
  //     time: '06:47 a',
  //     eventDate: '2019-02-03 06:47:00',
  //     eventUTC: '2019-02-03 12:47:00',
  //     description: 'test description',
  //     linkUrl: 'https://solarsystem.nasa.gov/solar-system/sun/overview/',
  //     imageUrl:
  //       'https://solarsystem.nasa.gov/system/basic_html_elements/11561_Sun.png',
  //     venue: {
  //       name: '',
  //       address: '',
  //       city: '',
  //       province: '',
  //       zip: ''
  //     }
  //   }
  // ]
  sourceEventList.events.map((item, index) => {
    newEventList.push({
      title: decodeBlogTitle(item.title),
      // date: Moment(item.start_date).format('LLLL'),
      date: Moment(item.start_date).format('dddd, MMMM Do, YYYY'),
      time: Moment(item.start_date).format('h:mm a'),
      eventDate: item.start_date,
      eventUTC: item.utc_start_date,
      description: decodeBlogTitle(
        item.description.replace(/(<([^>]+)>)/gi, '')
      ),
      linkUrl: item.url,
      imageUrl: item.image.sizes.thumbnail.url,
      venue: {
        name: item.venue.venue ? decodeBlogTitle(item.venue.venue) : '',
        address: item.venue.address ? item.venue.address : '',
        city: item.venue.city ? item.venue.city : '',
        province: item.venue.province ? item.venue.province : '',
        zip: item.venue.zip ? item.venue.zip : ''
      }
    })
  })

  return newEventList
}

const eventReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.EVENT_FETCH_HAS_ERROR:
      return { ...state, hasError: action.fetchHasError }
    case actionTypes.EVENT_FETCH_ERROR_MESSAGE:
      return { ...state, errorMessage: action.errorMessage }
    case actionTypes.EVENT_FETCH_INITIAL_LOAD:
      return { ...state, isInitialLoad: action.fetchIsInitialLoad }
    case actionTypes.EVENT_FETCH_REFRESH_LOAD:
      return { ...state, isRefreshLoad: action.fetchIsRefreshLoad }
    case actionTypes.EVENT_FETCH_SUCCESS:
      if (action.fetchInitialLoad || action.fetchRefreshLoad) {
        return {
          ...state,
          data: buildEventList(action.fetchList),
          lastFetchedPage: action.fetchPage,
          lastFetchedDate: today
        }
      } else {
        return {
          ...state,
          data: state.data.concat(buildEventList(action.fetchList)),
          lastFetchedPage: action.fetchPage,
          lastFetchedDate: today
        }
      }
    default:
      return state
  }
}

export default eventReducer
