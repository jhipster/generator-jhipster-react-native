import { StyleSheet } from 'react-native'

import { Metrics, ApplicationStyles, Colors } from '../../shared/themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  welcomeText: {
    fontSize: 20,
    color: Colors.snow,
    fontWeight: '600',
  },
  hairline: {
    borderBottomColor: Colors.snow,
    borderBottomWidth: 1,
    marginHorizontal: 20,
    marginTop: 32,
  },
  logo: {
    marginTop: Metrics.section,
    height: Metrics.images.logo,
    width: Metrics.images.logo,
    resizeMode: 'contain',
  },
  centered: {
    alignItems: 'center',
  },
  scrollView: {
    paddingBottom: Metrics.baseMargin,
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.transparent,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.snow,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.snow,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.snow,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
})
