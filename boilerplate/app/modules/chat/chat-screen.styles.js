import { StyleSheet } from 'react-native'

import { ApplicationStyles, Metrics, Colors } from '../../shared/themes'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    backgroundColor: Colors.background,
    flexDirection: 'column',
    flex: 1
  },
  row: {
    backgroundColor: Colors.fire,
    marginVertical: 1,
    justifyContent: 'center'
  },
  scrollView: {
    left: 0,
    right: 0,
    bottom: 0,
    top: 0
  },
  boldLabel: {
    fontWeight: 'bold',
    alignSelf: 'center',
    color: Colors.snow,
    textAlign: 'center',
    marginBottom: Metrics.smallMargin
  },
  label: {
    textAlign: 'center',
    color: Colors.snow
  },
  list: {
    flex: 1
    // todo replace with flex styling
    // height: Metrics.screenHeight - ((Platform.OS === 'ios') ? 110 : 130)
  },
  listContent: {
    left: 0,
    right: 0
  },
  messageInput: {
    flex: 1,
    padding: 10,
    color: 'white',
    alignItems: 'flex-end',
    bottom: 0,
    left: 0,
    right: 0
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  }
})
