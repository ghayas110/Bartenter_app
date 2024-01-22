import { StyleSheet, Text, View,TextInput, TouchableOpacity } from 'react-native'
import React,{useState} from 'react'

import Icon from 'react-native-vector-icons/AntDesign';
import Icons from './Icons';

const LoginInput = ({placeholder,placeholderColor,setValues,icon,pass}) => {

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  return (

    <View style={styles.searchContainer}>
  
    <Icon name={icon} size={20} color="orange" />

    <TextInput
    style={styles.input}
    placeholder={placeholder}
    placeholderTextColor={placeholderColor}
    onChangeText={setValues}
 
    
  />
 
  </View>
  )
}

export default LoginInput

const styles = StyleSheet.create({
    searchContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
       
        paddingHorizontal: 5,
        width:"80%",
        marginTop: 10,
        borderRadius:10,
        borderColor:'black',
        borderWidth:StyleSheet.hairlineWidth
      },
      input: {
        marginLeft: 10,
        flex: 1,
        color:'black'
      },
})