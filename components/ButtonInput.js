import React from 'react';
import { TouchableOpacity, Text, Dimensions, StyleSheet } from 'react-native';

const { width, height } = Dimensions.get('window');

const MyButton = ({onPress,title}) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: width * 0.5, // 80% of screen width
    height: height * 0.06, // 10% of screen height
    backgroundColor: 'orange',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40,
    marginTop:15
  },
  text: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});

export default MyButton;
