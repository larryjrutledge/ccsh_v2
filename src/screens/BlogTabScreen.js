import React from 'react'
import { View, Platform, SafeAreaView, StatusBar } from 'react-native'
import { NavigationEvents } from 'react-navigation'

import { LinearGradient } from 'expo'
import { Feather } from '@expo/vector-icons'
import StatusBarHeight from '@expo/status-bar-height'

import { connect } from 'react-redux'

import * as Constants from 'src/config/Constants'

import { blogListFetch } from 'src/actions/blogActions'
import BlogList from 'src/components/BlogList'
import Header from 'src/components/Header'

class BlogTabScreen extends React.Component {
  constructor() {
    super()

    this.state = {
      statusBarHeight: null
    }
  }

  componentDidMount() {
    if (Platform.OS === 'ios') {
      this.syncHeight()
      StatusBarHeight.addEventListener(this.onStatusBarHeightChanged)
    }
  }

  componentWillUnmount() {
    if (Platform.OS === 'ios') {
      StatusBarHeight.removeEventListener(this.onStatusBarHeightChanged)
    }
  }

  onStatusBarHeightChanged = height => {
    this.state.useListener && this.setState({ statusBarHeight: height })
  }

  syncHeight = async () => {
    const height = await StatusBarHeight.getAsync()
    this.setState({ statusBarHeight: height })
  }

  fetchBlogData = () => {
    const today = new Date().getDay()
    if (
      (!Array.isArray(this.props.blogData) ||
        !this.props.blogData.length ||
        today === Constants.DAY_OF_WEEK.WEDNESDAY) &&
      today !== this.props.lastFetchedDay
    ) {
      this.props.blogListFetch(
        Constants.BLOG_INITIAL_PAGE,
        Constants.BLOG_PER_PAGE,
        true,
        false
      )
    }
  }

  render() {
    const { errorMessage, hasError, isLoading, listData } = this.props

    return (
      <LinearGradient colors={['#232526', '#414345']} style={{ flex: 1 }}>
        <StatusBar barStyle="light-content" />
        <NavigationEvents onDidFocus={payload => this.fetchBlogData()} />

        <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent' }}>
          <Header
            {...this.props}
            left={<Feather name="menu" size={20} color={'white'} />}
            leftPress={() => {
              this.props.navigation.openDrawer()
            }}
            title="Read the Blog"
          />
          <View style={{ flex: 1 }}>
            <BlogList
              nav={this.props.navigation}
              statusBarHeight={this.state.statusBarHeight}
            />
          </View>
        </SafeAreaView>
      </LinearGradient>
    )
  }
}

const mapStateToProps = state => {
  return {
    errorMessage: state.blogReducer.errorMessage,
    hasError: state.blogReducer.hasError,
    isInitialLoad: state.blogReducer.isInitialLoad,
    isRefreshLoad: state.blogReducer.isRefreshLoad,
    blogData: state.blogReducer.data,
    lastFetchedPage: state.blogReducer.lastFetchedPage,
    lastFetchedDay: state.blogReducer.lastFetchedDay
  }
}

const mapDispatchToProps = dispatch => {
  return {
    blogListFetch: (
      fetchPage,
      fetchPerPage,
      fetchInitialLoad,
      fetchRefreshLoad
    ) =>
      dispatch(
        blogListFetch(
          fetchPage,
          fetchPerPage,
          fetchInitialLoad,
          fetchRefreshLoad
        )
      )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BlogTabScreen)
