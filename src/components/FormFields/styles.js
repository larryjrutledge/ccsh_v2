import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    borderRadius: 3,
    borderTopColor: 'darkgray',
    borderBottomColor: 'darkgray',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderWidth: 1,
    backgroundColor: 'white'
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  label: {
    fontSize: 10,
    fontWeight: '100',
    color: 'black',
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 2
  },
  checkboxLabel: {
    paddingHorizontal: 10,
    fontSize: 14,
    fontWeight: '300',
    color: 'black'
  },
  headerText: {
    paddingHorizontal: 10,
    fontSize: 16,
    fontWeight: '400',
    color: 'black'
  },
  error: {
    color: 'red',
    fontSize: 10,
    fontWeight: '400',
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 2
  },
  input: {
    paddingTop: 2,
    paddingBottom: 10,
    paddingHorizontal: 10,
    fontSize: 14,
    fontWeight: '300',
    color: 'black'
  },
  itemContainer: {
    borderRadius: 3,
    paddingVertical: 10,
    // borderTopColor: 'darkgray',
    // borderBottomColor: 'darkgray',
    // borderLeftColor: 'transparent',
    // borderRightColor: 'transparent',
    // borderWidth: 1,
    backgroundColor: 'white',
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  selectedText: {
    paddingTop: 2,
    paddingBottom: 10,
    paddingHorizontal: 10,
    fontSize: 14,
    fontWeight: '300',
    color: 'black'
  }
})

export default styles
