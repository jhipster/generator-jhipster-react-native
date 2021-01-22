import React from 'react';
import { View, Text, KeyboardAvoidingView, TextInput, ScrollView, Platform } from 'react-native';
import { connect } from 'react-redux';

import WebsocketService from '../../shared/websockets/websocket.service';
import { getLogin } from '../../shared/reducers/account.reducer';
import ChatActions from './chat.reducer';
import styles from './chat-screen.styles';
import RoundedButton from '../../shared/components/rounded-button/rounded-button';

function ChatScreen(props) {
  const [message, setMessage] = React.useState('');
  const { username, chat } = props;

  React.useEffect(() => {
    WebsocketService.connect();
    return function cleanup() {
      WebsocketService.disconnect();
    };
  }, []);

  React.useEffect(() => {
    if (username !== 'anonymoususer') {
      WebsocketService.subscribeToChat();
    }
  }, [username]);

  const renderRow = (item, index) => {
    return (
      <View style={styles.row} key={index} testID={`message-${index}`}>
        <Text style={styles.boldLabel}>{item.user}</Text>
        <Text>{item.message}</Text>
      </View>
    );
  };

  const updateMessage = (newMessage) => setMessage(newMessage);

  // How many items should be kept im memory as we scroll?
  const oneScreensWorth = 21;

  const memoizedChat = React.useMemo(() => <View style={styles.flex}>{chat.map((c, i) => renderRow(c, i))}</View>, [chat]);
  const memoizedForm = React.useMemo(() => {
    const sendMessage = () => {
      if (message.length > 0) {
        WebsocketService.sendChat({ user: username, message });
        setMessage('');
      }
    };

    return (
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Type a message..."
          style={styles.messageInput}
          value={message}
          onChangeText={updateMessage}
          autoCapitalize="none"
          onSubmitEditing={sendMessage}
          returnKeyType={message.length > 0 ? 'send' : 'done'}
          autoCorrect={false}
          testID="chatScreenInput"
        />
        <RoundedButton style={styles.button} onPress={sendMessage} text={'Send'} testID="chatScreenSendButton" />
      </View>
    );
  }, [message, username]);

  const scrollViewRef = React.useRef();

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView keyboardVerticalOffset={75} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.flex}>
        <ScrollView
          ref={scrollViewRef}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          testID="chatScreen"
          renderItem={renderRow}
          onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
          initialNumToRender={oneScreensWorth}>
          {memoizedChat}
        </ScrollView>
        {memoizedForm}
      </KeyboardAvoidingView>
    </View>
  );
}

const mapStateToProps = (state) => {
  return {
    chat: state.chat.chat,
    username: getLogin(state.account),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    resetChat: dispatch(ChatActions.chatReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatScreen);
