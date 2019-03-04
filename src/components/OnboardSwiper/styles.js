import { Dimensions, StyleSheet } from 'react-native'

// Detect screen width and height
const { width, height } = Dimensions.get('window')

const styles = StyleSheet.create({
  button: {
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    paddingHorizontal: 50,
    paddingVertical: 10
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontFamily: 'Avenir'
  },
  fullScreen: {
    width: width,
    height: height
  },
  container: {
    backgroundColor: 'transparent',
    position: 'relative'
  },
  slide: {
    backgroundColor: 'transparent'
  },
  pagination: {
    position: 'absolute',
    bottom: 110,
    left: 0,
    right: 0,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    backgroundColor: 'transparent'
  },
  dot: {
    backgroundColor: 'rgba(0,0,0,.25)',
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3
  },
  activeDot: {
    backgroundColor: '#FFFFFF'
  },
  buttonWrapper: {
    backgroundColor: 'transparent',
    flexDirection: 'column',
    position: 'absolute',
    bottom: 0,
    left: 0,
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 40,
    justifyContent: 'flex-end',
    alignItems: 'center'
  }
})

export default styles
