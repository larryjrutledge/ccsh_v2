import React from 'react'
import { View, Text, StyleSheet, StatusBar } from 'react-native'
import { FontAwesome, Ionicons } from '@expo/vector-icons'

import HtmlText from 'react-native-html-to-text'

import CollapsingScroller from 'src/components/CollapsingScroller'

class BlogItemScreen extends React.Component {
  render() {
    const { navigation } = this.props
    const _imageUrl = navigation.getParam(
      'imageUrl',
      'https://christchapel.live/wp-content/uploads/2019/01/chris-chow-1133102-unsplash-300x200.jpg'
    )
    const _title = navigation.getParam('title', '')
    const _author = navigation.getParam('author', '')
    const _publishedDate = navigation.getParam('publishedDate', null)
    const _bodyText = navigation.getParam('bodyText', '')

    return (
      <CollapsingScroller
        rightButton={
          <Ionicons name="md-close-circle-outline" size={20} color={'white'} />
        }
        onRightPress={() => this.props.navigation.goBack()}
        collapsedHeaderTitle={_title}
        heroImage={_imageUrl}
        heroTitleText={_title}
        heroTitleColor="white"
        heroTitleTextSize={24}
        scrollContent={
          <View>
            <HtmlText html={_bodyText} />

            <View style={{ borderTopColor: '#121212', borderTopWidth: 2 }}>
              <Text
                style={{
                  color: 'black',
                  fontSize: 12,
                  fontWeight: '100',
                  fontStyle: 'italic'
                }}
              >
                {_author ? 'by ' + _author : null}
              </Text>
              <Text
                style={{
                  color: 'black',
                  fontSize: 8,
                  fontWeight: '100',
                  paddingBottom: 10
                }}
              >
                {_publishedDate ? 'Published on: ' + _publishedDate : null}
              </Text>
            </View>
          </View>
        }
      />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderColor: 'green',
    borderWidth: 2
  }
})

export default BlogItemScreen
