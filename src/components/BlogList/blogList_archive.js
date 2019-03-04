import React from 'react'
import {
  Animated,
  ActivityIndicator,
  Image,
  FlatList,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  Platform,
  WebView
} from 'react-native'

import { connect } from 'react-redux'
import { NavigationEvents } from 'react-navigation'

import Moment from 'moment'

import { blogListFetch } from 'src/actions/blogActions'

import * as constants from 'src/config/Constants'
import { decodeBlogTitle } from 'src/config/Utils'
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
    this.state = {
      activeImage: null,
      title: '',
      author: '',
      bodyText: '',
      publishDate: null,
      page: constants.BLOG_INITIAL_PAGE,
      perPage: constants.BLOG_PER_PAGE
    }
  }

  renderIsLoading = () => {
    return <ActivityIndicator animating size="large" />
  }

  handleRefresh = (page, perPage) => {
    console.log('handleRefresh(' + page + ', ' + perPage + ')')
    this.setState(
      {
        page,
        perPage
      },
      () => {
        this.props.blogListFetch(
          constants.BLOG_BASE_URL,
          this.state.page,
          this.state.perPage
        )
      }
    )
  }

  handleLoadMore = page => {
    console.log('handleLoadMore(' + page + ')')
    this.setState(
      {
        page
      },
      () => {
        this.props.blogListFetch(
          constants.BLOG_BASE_URL,
          this.state.page,
          this.state.perPage
        )
      }
    )
  }

  getImage = item => {
    const media = item._embedded['wp:featuredmedia'][0]
    let image_url =
      'http://christchapelspringhill.com/wp-content/uploads/2018/08/jeremy-bishop-72608-unsplash-150x150.jpg'
    if ('media_details' in media) {
      image_url = media.media_details.sizes.full.source_url
    }

    return image_url
  }

  componentWillMount() {
    this.allImages = {}
    this.oldPosition = {}
    this.position = new Animated.ValueXY()
    this.dimensions = new Animated.ValueXY()
    this.animation = new Animated.Value(0)
    this.activeImageStyle = null
  }

  openImage = (index, item) => {
    this.allImages[index].measure((x, y, width, height, pageX, pageY) => {
      this.oldPosition.x = pageX
      this.oldPosition.y = pageY
      this.oldPosition.height = height
      this.oldPosition.width = width

      this.position.setValue({
        x: pageX,
        y: pageY - 45 - this.props.statusBarHeight
      })

      this.dimensions.setValue({
        x: width,
        y: height
      })

      this.setState(
        {
          activeImage: this.getImage(item),
          title: decodeBlogTitle(item.title.rendered),
          author: item.custom_usp_author
            ? 'by ' + item.custom_usp_author
            : null,
          bodyText: item.content.rendered,
          publishDate: item.date
        },
        () => {
          this.viewImage.measure((dx, dy, dWidth, dHeight, dPageX, dPageY) => {
            Animated.parallel([
              Animated.timing(this.position.x, {
                toValue: dPageX,
                duration: 500
              }),
              Animated.timing(this.position.y, {
                toValue: dPageY - 45 - this.props.statusBarHeight,
                duration: 500
              }),
              Animated.timing(this.dimensions.x, {
                toValue: dWidth,
                duration: 500
              }),
              Animated.timing(this.dimensions.y, {
                toValue: dHeight + 5,
                duration: 500
              }),
              Animated.timing(this.animation, {
                toValue: 1,
                duration: 500
              })
            ]).start()
          })
        }
      )
    })
  }

  closeImage = () => {
    Animated.parallel([
      Animated.timing(this.position.x, {
        toValue: this.oldPosition.x,
        duration: 400
      }),
      Animated.timing(this.position.y, {
        toValue: this.oldPosition.y - 45 - this.props.statusBarHeight,
        duration: 400
      }),
      Animated.timing(this.dimensions.x, {
        toValue: this.oldPosition.width,
        duration: 400
      }),
      Animated.timing(this.dimensions.y, {
        toValue: this.oldPosition.height,
        duration: 400
      }),
      Animated.timing(this.animation, {
        toValue: 0,
        duration: 400
      })
    ]).start(() => {
      this.setState({
        activeImage: null,
        title: '',
        author: '',
        bodyText: '',
        publishDate: null
      })
    })
  }

  renderItem = ({ item, index }) => {
    return (
      <TouchableWithoutFeedback
        key={item.id}
        onPress={() => this.openImage(index, item)}
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
                uri: this.getImage(item)
              }}
              ref={image => {
                this.allImages[index] = image
              }}
            />
          </View>
          <View
            style={{
              backgroundColor: 'rgba(0,0,0,.6)',
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
              {decodeBlogTitle(item.title.rendered)}
            </Text>
            {item.custom_usp_author ? (
              <Text
                style={{
                  color: 'white',
                  fontSize: 12,
                  fontWeight: '100'
                }}
              >
                Author: {item.custom_usp_author}
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
              Published on: {Moment(item.date).format('MMM d, Y')}
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    )
  }

  renderBlogList = () => {
    const { listData } = this.props

    const activeImageStyle = {
      width: this.dimensions.x,
      height: this.dimensions.y,
      left: this.position.x,
      top: this.position.y
    }

    const animatedContentY = this.animation.interpolate({
      inputRange: [0, 1],
      outputRange: [-150, 0]
    })

    const animatedContentOpacity = this.animation.interpolate({
      inputRange: [0, 0.5, 0.75, 1],
      outputRange: [0, 0.3, 0.5, 1]
    })

    const animatedContentStyle = {
      opacity: animatedContentOpacity,
      transform: [
        {
          translateY: animatedContentY
        }
      ]
    }

    const animatedCloseOpacity = this.animation.interpolate({
      inputRange: [0, 0.3, 0.5, 1],
      outputRange: [0, 0.5, 0.8, 1]
    })

    const animatedCloseStyle = {
      opacity: animatedCloseOpacity
    }

    return (
      <View
        style={{
          backgroundColor: 'transparent',
          alignSelf: 'stretch'
        }}
      >
        <NavigationEvents
          onDidBlur={payload => {
            this.closeImage()
            this.setState({
              activeImage: null,
              title: '',
              author: '',
              bodyText: '',
              publishDate: null,
              page: constants.BLOG_INITIAL_PAGE,
              perPage: constants.BLOG_PER_PAGE
            })
          }}
        />
        <FlatList
          data={listData}
          keyExtractor={(listData, index) => index.toString()}
          renderItem={this.renderItem}
          ListFooterComponent={renderFooter(this.props.isRefreshing)}
          refreshing={this.props.isRefreshing}
          onRefresh={() =>
            this.handleRefresh(
              constants.BLOG_INITIAL_PAGE,
              constants.BLOG_PER_PAGE
            )
          }
          onEndReached={() => this.handleLoadMore(this.state.page + 1)}
          onEndReachedThreshold={0}
        />
        <View
          style={StyleSheet.absoluteFill}
          // style={{ borderColor: 'yellow', borderWidth: 3, position: 'absolute', left: 0, top: 0, right: 0, bottom: 0}}
          pointerEvents={this.state.activeImage ? 'auto' : 'none'}
        >
          <View
            style={{
              flex: 1,
              zIndex: 2000
            }}
            ref={view => {
              this.viewImage = view
            }}
          >
            <Animated.Image
              source={
                this.state.activeImage ? { uri: this.state.activeImage } : null
              }
              style={[
                {
                  resizeMode: 'cover',
                  top: 0,
                  left: 0,
                  height: null,
                  width: null
                },
                activeImageStyle
              ]}
            />
            <TouchableWithoutFeedback onPress={() => this.closeImage()}>
              <Animated.View
                style={[
                  {
                    position: 'absolute',
                    top: 0,
                    right: 10,
                    paddingHorizontal: 10
                  },
                  animatedCloseStyle
                ]}
              >
                <Text
                  style={{ fontSize: 24, fontWeight: 'bold', color: 'white' }}
                >
                  x
                </Text>
              </Animated.View>
            </TouchableWithoutFeedback>
          </View>
          <Animated.View
            style={[
              {
                flex: 2,
                zIndex: 1000,
                backgroundColor: 'white',
                padding: 20
                // paddingTop: 50,
              },
              animatedContentStyle
            ]}
          >
            <Text style={{ fontSize: 24 }}>{this.state.title}</Text>
            <Text style={{ fontSize: 14, paddingBottom: 5, fontWeight: '100' }}>
              {this.state.author}
            </Text>
            <Text style={{ fontSize: 10, paddingBottom: 5, fontWeight: '100' }}>
              Published on: {Moment(this.state.publishDate).format('MMM d, Y')}
            </Text>
            <WebView
              originWhitelist={['*']}
              scalesPageToFit={Platform.OS === 'ios' ? false : true}
              source={{ html: this.state.bodyText }}
            />
          </Animated.View>
        </View>
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
    isLoading: state.blogReducer.isLoading,
    isRefreshing: state.blogReducer.isRefreshing,
    listData: state.blogReducer.listData
  }
}

const mapDispatchToProps = dispatch => {
  return {
    blogListFetch: (baseUrl, initialPage, perPage) =>
      dispatch(blogListFetch(baseUrl, initialPage, perPage, false))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BlogList)
