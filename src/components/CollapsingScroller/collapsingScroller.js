import React from 'react'
import {
  Animated,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  View
} from 'react-native'
import { Constants } from 'expo'

import styles from './styles'

const HEADER_EXPANDED_HEIGHT = 300
const HEADER_COLLAPSED_HEIGHT = 70

const { width: SCREEN_WIDTH } = Dimensions.get('screen')

class CollapsingScroller extends React.Component {
  constructor() {
    super()

    this.state = {
      statusBarHeight: null,
      scrollY: new Animated.Value(0),
      bodyText:
        '<p><em>“I have asked one thing from the Lord; it is what I desire: to *dwell* in the house of the Lord all the days of my life, gazing on the beauty of the Lord and seeking Him in His temple.” Psalm 27:4 (CSB)</em></p><p><em>“The one who eats my flesh and drinks my blood *remains* in me, and I in him.” John 6:56 (CSB)</em></p><p>The word dwell originates from an Old German word <em>twellen</em>, which meant ‘to prevent’. From there it eventually evolved into the Old English word <em>dwellan</em> which meant ‘to hinder or delay’. And eventually to our word dwell which means ‘to reside, or inhabit.’ Similar words are <em>remain</em>, <em>tarry</em>, and <em>abide</em>.</p><p>Obviously there is a long chain of evolution in the word to get to the word we know now as dwell, but what is of more significance is what was taking place leading to such a change.</p><p>It begins around the time the Vikings wandered and roamed from place to place, pillaging and plundering. But when we see the word change to inhabit, remain, or dwell was when people became less nomadic and began to settle in lands and homes.</p><p>The idea we see through the language is one of people being ‘hindered’ (<em>dwellan</em>) from their wandering by a place where they ‘remain’ (<em>dwell</em>).</p><p>A home or a land would now hinder their wandering, what hindered them also becomes where they remain, where they inhabit.</p><p>So when the Psalmist declares a desire to dwell in the house of the Lord, he is describing a transition from wandering, or being lost, to a place of abiding.</p><p>Same in the Gospels when Jesus talks about remaining, or abiding, in Him. When we partake of Him we are no longer lost and wandering, but we are now inhabiting, or dwelling, in Him.</p><p>We transition from wandering, or loss, to a place of abiding, a place of home, a place to belong.</p><p><em>I ask one thing of the Lord, and choose to seek that one thing. I ask to <strong>belong</strong> in His house all the days of my life.</em></p>'
    }
  }

  componentDidMount() {
    this.setState({
      statusBarHeight: Constants.statusBarHeight
    })
  }

  handleLeftPress = () => {
    this.props.onLeftPress && this.props.onLeftPress()
  }

  handleRightPress = () => {
    this.props.onRightPress && this.props.onRightPress()
  }

  render() {
    const headerHeight = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_EXPANDED_HEIGHT - HEADER_COLLAPSED_HEIGHT],
      outputRange: [HEADER_EXPANDED_HEIGHT, HEADER_COLLAPSED_HEIGHT],
      extrapolate: 'clamp'
    })

    const headerTitleOpacity = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_EXPANDED_HEIGHT - HEADER_COLLAPSED_HEIGHT],
      outputRange: [0, 1],
      extrapolate: 'clamp'
    })

    const heroTitleOpacity = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_EXPANDED_HEIGHT - HEADER_COLLAPSED_HEIGHT],
      outputRange: [1, 0],
      extrapolate: 'clamp'
    })

    console.log('[DEBUG] status bar height: ', this.state.statusBarHeight)
    return (
      <View>
        <View
          style={{
            alignSelf: 'stretch',
            alignItems: 'flex-start',
            flexDirection: 'row',
            height: HEADER_COLLAPSED_HEIGHT - this.state.statusBarHeight,
            justifyContent: 'space-between',
            marginTop: this.state.statusBarHeight,
            zIndex: 50000
          }}
        >
          <TouchableOpacity
            style={{
              paddingHorizontal: 10
            }}
            onPress={() => this.handleLeftPress()}
          >
            {this.props.leftButton ? this.props.leftButton : null}
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              paddingHorizontal: 10
            }}
            onPress={() => this.handleRightPress()}
          >
            {this.props.rightButton ? this.props.rightButton : null}
          </TouchableOpacity>
        </View>
        <Animated.View
          style={[
            styles.header,
            {
              alignItems: 'center',
              height: headerHeight
            }
          ]}
        >
          <Animated.Text
            ellipsizeMode="tail"
            numberOfLines={1}
            style={{
              textAlign: 'center',
              fontSize: 18,
              color: 'white',
              marginTop: this.state.statusBarHeight,
              opacity: headerTitleOpacity,
              width: SCREEN_WIDTH - 75
            }}
          >
            {this.props.collapsedHeaderTitle}
          </Animated.Text>
          <Animated.Image
            style={{
              opacity: heroTitleOpacity,
              height: headerHeight,
              width: SCREEN_WIDTH,
              position: 'absolute',
              left: 0,
              top: 0
            }}
            resizeMode="cover"
            source={this.props.heroImage ? { uri: this.props.heroImage } : null}
          />
          <Animated.View
            style={{
              opacity: heroTitleOpacity,
              alignSelf: 'stretch',
              width: SCREEN_WIDTH,
              backgroundColor: 'rgba(0, 0, 0, .5)',
              position: 'absolute',
              bottom: 0,
              left: 0,
              padding: 10
            }}
          >
            <Animated.Text
              ellipsizeMode="tail"
              numberOfLines={2}
              style={{
                textAlign: 'left',
                fontSize: this.props.heroTitleTextSize
                  ? this.props.heroTitleTextSize
                  : 32,
                color: this.props.heroTitleColor
                  ? this.props.heroTitleColor
                  : 'white',
                opacity: heroTitleOpacity
              }}
            >
              {this.props.heroTitleText ? this.props.heroTitleText : null}
            </Animated.Text>
          </Animated.View>
        </Animated.View>
        <ScrollView
          contentContainerStyle={{
            padding: 16,
            paddingTop: HEADER_EXPANDED_HEIGHT - Constants.statusBarHeight - 16,
            paddingBottom: 100
          }}
          onScroll={Animated.event([
            {
              nativeEvent: {
                contentOffset: {
                  y: this.state.scrollY
                }
              }
            }
          ])}
          scrollEventThrottle={16}
        >
          {this.props.scrollContent ? this.props.scrollContent : null}
        </ScrollView>
      </View>
    )
  }
}

export default CollapsingScroller
