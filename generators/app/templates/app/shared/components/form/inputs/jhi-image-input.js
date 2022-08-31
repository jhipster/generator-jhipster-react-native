import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
/* eslint-disable react-native/no-inline-styles */

export default React.forwardRef((props, ref) => {
  const { label, labelStyle, error, inputType, contentType, value, testID, ...otherProps } = props;
  return (
    <View style={styles.container}>
      {/* if there's a label, render it */}
      {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}
      {/* render the base64 image or plain image input */}
      {inputType === 'image-base64' ?
        <Image ref={ref} style={[styles.imageBlob, { borderColor: error ? '#fc6d47' : '#c0cbd3' }]}
               source={{ uri: `data:${contentType};base64,${value}` }}
        />
        :
        <Image ref={ref} style={[styles.imageSize, { borderColor: error ? '#fc6d47' : '#c0cbd3' }]}
               source={{ uri: `${value}` }} />
      }
      {/* if there's an error, render it */}
      {!!error && !!error.message && <Text style={styles.textError}>{error && error.message}</Text>}
    </View>
  );
});

const styles = StyleSheet.create({
  imageBlob : {
    width: 100,
    height: 100,
  },
  imageSize : {
    width: 100,
    height: 100,
  },
  container: {
    marginVertical: 8,
  },
  label: {
    paddingVertical: 5,
    fontSize: 16,
    fontWeight: 'bold',
  },
  textError: {
    color: '#fc6d47',
    fontSize: 14,
  },
});
