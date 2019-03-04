import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'flex-start',
    alignSelf: 'stretch'
  },
  listContainer: {
    backgroundColor: 'transparent',
    alignSelf: 'stretch'
  },
  listItemContainer: {
    paddingHorizontal: 5,
    paddingVertical: 2
  },
  listRowContainer: {
    backgroundColor: 'white',
    borderRadius: 5,
    height: 60,
    flexDirection: 'row'
  },
  imageContainer: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    padding: 5,
    width: 60
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderColor: 'black',
    borderWidth: 1
  },
  titleText: {
    fontSize: 14,
    fontWeight: 'bold'
  },
  dateText: {
    fontSize: 10,
    fontWeight: '100'
  },
  timeText: {
    fontSize: 10,
    fontWeight: 'bold'
  },
  detailContainer: {
    borderRadius: 5
  },
  detailRowContainer: {
    backgroundColor: 'white',
    alignSelf: 'stretch',
    marginTop: 1,
    borderRadius: 5
  },
  descriptionContainer: {
    alignSelf: 'stretch',
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 5
  },
  actionBarContainer: {
    flexDirection: 'row',
    padding: 5,
    backgroundColor: 'gray',
    alignSelf: 'stretch',
    justifyContent: 'space-around'
  },
  actionButtonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  actionButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
    paddingVertical: 2
  }
})

export default styles
