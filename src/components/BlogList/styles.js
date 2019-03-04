import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch'
  },
  profileBorderDark: {
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: '#232323',
    alignItems: 'center',
    justifyContent: 'center'
  },
  profileBorderLight: {
    width: 125,
    height: 125,
    borderRadius: 62,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center'
  },
  profileImage: {
    height: 120,
    width: 120,
    borderRadius: 60
  },
  authContainer: {
    flexDirection: 'row'
  },
  bottomInfoBlockContainer: {
    alignItems: 'center',
    justifyContent: 'flex-end'
  }
})

export default styles
