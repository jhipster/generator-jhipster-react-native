import { StyleSheet } from 'react-native'

import { Metrics, Colors } from '../../shared/themes'

const navButton = {
  backgroundColor: Colors.transparent,
  justifyContent: 'center'
}

export default StyleSheet.create({
  backButton: {
    ...navButton,
    marginTop: Metrics.baseMargin,
    marginLeft: Metrics.baseMargin
  },
  searchButton: {
    ...navButton,
    marginTop: Metrics.section,
    marginRight: Metrics.baseMargin,
    alignItems: 'center'
  }
})
