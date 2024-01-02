import { StyleSheet, Text, View,TextInput } from 'react-native'
import React from 'react'

import Icon from 'react-native-vector-icons/Ionicons';

const FormInput = ({placeholder,placeholderColor,setValues,icon,pass,textcolor}) => {
  return (
    <View style={styles.searchContainer}>
    <Icon name={icon} size={20} color="#fff" />

    <TextInput
    style={styles.input}
    placeholder={placeholder}
    placeholderTextColor={placeholderColor}
    onChangeText={setValues}
    secureTextEntry={pass}
  />
  </View>
  )
}

export default FormInput

const styles = StyleSheet.create({
    searchContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#D98100',
        paddingHorizontal: 5,
        width:"80%",
        marginTop: 10,
        borderRadius:20
      },
      input: {
        marginLeft: 10,
        flex: 1,
        color:'white'
      },
})