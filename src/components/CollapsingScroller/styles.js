import { Dimensions, StyleSheet } from 'react-native'

const { width: SCREEN_WIDTH } = Dimensions.get('screen')

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eaeaea'
  },
  header: {
    backgroundColor: '#1d1d1d',
    position: 'absolute',
    width: SCREEN_WIDTH,
    top: 0,
    left: 0,
    zIndex: 9999
  },
  title: {
    marginVertical: 16,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 24
  },
  content: {
    paddingBottom: 10
  }
})

export default styles
