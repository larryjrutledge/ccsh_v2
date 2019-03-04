import React from 'react'
import {
  ActivityIndicator,
  Image,
  FlatList,
  Text,
  TouchableWithoutFeedback,
  View
} from 'react-native'

import { connect } from 'react-redux'
import { NavigationEvents } from 'react-navigation'
import _ from 'lodash'

import { blogListFetch } from 'src/actions/blogActions'

import * as Constants from 'src/config/Constants'
import styles from './styles'

renderFooter = isLoading => {
  if (!isLoading) return null

  return (
    <View
      style={{
        paddingVertical: 20,
        borderTopWidth: 1,
        borderColor: '#CED0CE'
      }}
    >
      <ActivityIndicator animating size="large" />
    </View>
  )
}

class BlogList extends React.Component {
  constructor() {
    super()
  }

  renderIsLoading = () => {
    return <ActivityIndicator animating size="large" />
  }

  handleRefresh = () => {
    this.props.blogListFetch(
      Constants.BLOG_INITIAL_PAGE,
      Constants.BLOG_PER_PAGE,
      false,
      true
    )
  }

  handleLoadMore = () => {
    console.log(
      '[DEBUG] handleLoadMore: lastFetchedPage: ',
      this.props.lastFetchedPage
    )
    this.props.blogListFetch(
      this.props.lastFetchedPage + 1,
      Constants.BLOG_PER_PAGE,
      false,
      false
    )
  }

  openBlogPost = (index, item) => {
    this.props.nav.navigate('BlogItem', {
      imageUrl: item.imageUrl,
      title: item.title,
      author: item.author,
      publishedDate: item.publishedDate,
      bodyText: item.bodyText
    })
  }

  renderItem = ({ item, index }) => {
    return (
      <TouchableWithoutFeedback
        key={item.id}
        onPress={() => this.openBlogPost(index, item)}
      >
        <View
          style={{
            backgroundColor: 'white',
            borderRadius: 5,
            height: 150,
            marginHorizontal: 10,
            marginVertical: 5,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.4,
            shadowRadius: 1,
            elevation: 5,
            flexDirection: 'row'
          }}
        >
          <View
            style={{
              flex: 1,
              borderRadius: 5
            }}
          >
            <Image
              style={{
                height: 150,
                borderRadius: 5
              }}
              resizeMode="cover"
              source={{
                uri: item.imageUrl
              }}
            />
          </View>
          <View
            style={{
              backgroundColor: 'rgba(0, 0, 0, .6)',
              position: 'absolute',
              left: 0,
              top: 0,
              right: 0,
              bottom: 0,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 5
            }}
          >
            <Text
              style={{
                color: 'white',
                fontSize: 16,
                fontWeight: '200'
              }}
            >
              {item.title}
            </Text>
            {item.custom_usp_author ? (
              <Text
                style={{
                  color: 'white',
                  fontSize: 12,
                  fontWeight: '100'
                }}
              >
                Author: {item.author}
              </Text>
            ) : null}
            <Text
              style={{
                margin: 10,
                color: 'white',
                fontSize: 12,
                fontWeight: '100'
              }}
            >
              Published on: {item.publishedDate}
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    )
  }

  renderBlogList = () => {
    const { blogData } = this.props

    return (
      <View
        style={{
          backgroundColor: 'transparent',
          alignSelf: 'stretch'
        }}
      >
        <NavigationEvents
          onDidBlur={payload => {
            if (payload.action && !payload.action.toChildKey) {
              this.refs.blogListRef.scrollToOffset({
                x: 0,
                y: 0,
                animated: false
              })
            }
          }}
        />
        <FlatList
          ref="blogListRef"
          data={blogData}
          keyExtractor={(blogData, index) => index.toString()}
          renderItem={this.renderItem}
          ListFooterComponent={renderFooter(this.props.isRefreshLoad)}
          refreshing={this.props.isRefreshLoad}
          onRefresh={() => this.handleRefresh()}
          onEndReached={_.debounce(() => this.handleLoadMore(), 1000)}
          onEndReachedThreshold={1}
        />
      </View>
    )
  }

  render() {
    const { isLoading } = this.props

    return (
      <View style={[styles.container, { backgroundColor: 'transparent' }]}>
        {isLoading ? this.renderIsLoading() : this.renderBlogList()}
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    isInitialLoad: state.blogReducer.isInitialLoad || false,
    isRefreshLoad: state.blogReducer.isRefreshLoad || false,
    blogData: state.blogReducer.data,
    lastFetchedPage: state.blogReducer.lastFetchedPage
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
)(BlogList)
