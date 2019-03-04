import Moment from 'moment'

import * as actionTypes from 'src/actions/actionTypes'
import { decodeBlogTitle, getBlogImage } from 'src/config/Utils'

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

buildBlogList = sourceBlogList => {
  console.log('[DEBUG] in buildBlogList')
  let newBlogList = []

  sourceBlogList.map((item, index) => {
    console.log('[DEBUG] index: ' + index + ' title: ' + item.title.rendered)
    newBlogList.push({
      imageUrl: getBlogImage(item),
      title: decodeBlogTitle(item.title.rendered),
      author: item.custom_usp_author ? item.custom_usp_author : '',
      publishedDate: Moment(item.date).format('LL'),
      bodyText: item.content.rendered
        .replace(/(\r\n\t|\n|\r\t)/gm, '')
        .replace(/<p>&nbsp;<\/p>/g, ' ')
        .replace(/\s+/g, ' ')
        .trim()
    })
  })

  return newBlogList
}

const blogReducer = (state = initialState, action) => {
  const {
    BLOG_FETCH_INITIAL_LOAD,
    BLOG_FETCH_REFRESH_LOAD,
    BLOG_FETCH_HAS_ERROR,
    BLOG_FETCH_ERROR_MESSAGE,
    BLOG_FETCH_SUCCESS
  } = actionTypes

  switch (action.type) {
    case BLOG_FETCH_HAS_ERROR:
      return { ...state, hasError: action.blogHasError }
    case BLOG_FETCH_ERROR_MESSAGE:
      return { ...state, errorMessage: action.errorMessage }
    case BLOG_FETCH_INITIAL_LOAD:
      return { ...state, isInitialLoad: action.fetchIsInitialLoad }
    case BLOG_FETCH_REFRESH_LOAD:
      return {
        ...state,
        isRefreshingLoad: action.fetchIsRefreshLoad
      }
    case BLOG_FETCH_SUCCESS:
      if (action.fetchInitialLoad || action.fetchRefreshLoad) {
        return {
          ...state,
          data: buildBlogList(action.fetchList),
          lastFetchedPage: action.fetchPage,
          lastFetchedDay: today
        }
      } else {
        return {
          ...state,
          data: state.data.concat(buildBlogList(action.fetchList)),
          lastFetchedPage: action.fetchPage,
          lastFetchedDay: today
        }
      }
    default:
      return state
  }
}

export default blogReducer
