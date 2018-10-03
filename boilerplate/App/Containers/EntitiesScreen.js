import React from 'react'
import { ScrollView, Text } from 'react-native'
import { connect } from 'react-redux'
// Styles
import styles from './Styles/EntitiesScreenStyle'
import RoundedButton from '../Components/RoundedButton' // eslint-disable-line
import {
  // ignite-jhipster-entity-screen-import-needle
} from '../Navigation/Layouts' // eslint-disable-line

class EntitiesScreen extends React.Component {
  render () {
    return (
      <ScrollView style={styles.container}>
        <Text style={{ textAlign: 'center' }}>JHipster Entities will appear below</Text>
        {/* ignite-jhipster-entity-screen-needle */}
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    // for developer convenience
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // for developer convenience
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EntitiesScreen)
