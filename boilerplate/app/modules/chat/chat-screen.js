import React from 'react'
import { View, Text, FlatList, TextInput } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { connect } from 'react-redux'

import { Colors } from '../../shared/themes'
import WebsocketService from '../../shared/websockets/websocket.service'
import { getLogin } from '../login/account.reducer'
import ChatActions from '../chat/chat.reducer'
import styles from './chat-screen.styles'

class ChatScreen extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      message: '',
      dataObjects: props.chat
    }
  }

  renderRow ({item}) {
    return (
      <View style={styles.row}>
        <Text style={styles.boldLabel}>{item.user}</Text>
        <Text style={styles.label}>{item.message}</Text>
      </View>
    )
  }

  componentWillMount () {
    WebsocketService.connect()
    WebsocketService.subscribeToChat()
  }

  componentWillUnmount () {
    WebsocketService.disconnect()
  }

  componentWillReceiveProps (newProps) {
    if (newProps.chat) {
      this.setState({
        dataObjects: newProps.chat
      }, () => {
        this.refs['chatList'].scrollToEnd()
      })
    }
  }

  updateMessage = (message) => {
    this.setState({ message })
  }

  sendMessage = () => {
    if (this.state.message.length > 0) {
      WebsocketService.sendChat({ user: this.props.username, message: this.state.message })
      this.setState({ message: '' })
    }
  }

  // The default function if no Key is provided is index
  // an identifiable key is important if you plan on
  // item reordering.  Otherwise index is fine
  keyExtractor = (item, index) => index

  // How many items should be kept im memory as we scroll?
  oneScreensWorth = 20

  render () {
    return (
      <View style={styles.container}>
        <KeyboardAwareScrollView style={styles.scrollView} scrollEnabled={false}>
          <FlatList
            ref='chatList'
            style={styles.list}
            contentContainerStyle={styles.listContent}
            data={this.state.dataObjects}
            renderItem={this.renderRow}
            keyExtractor={this.keyExtractor}
            initialNumToRender={this.oneScreensWorth}
          />
          <TextInput
            ref='messageText'
            placeholder='Type a message...'
            placeholderTextColor={Colors.snow}
            underlineColorAndroid='transparent'
            style={styles.messageInput}
            value={this.state.message}
            onChangeText={this.updateMessage}
            autoCapitalize='none'
            onSubmitEditing={this.sendMessage}
            returnKeyType={'send'}
            autoCorrect={false}
            selectionColor={Colors.snow}
          />
        </KeyboardAwareScrollView>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    chat: state.chat.chat,
    username: getLogin(state.account)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    resetChat: dispatch(ChatActions.chatReset())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatScreen)
