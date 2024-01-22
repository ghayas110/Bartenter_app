import { StyleSheet, Text, View,TextInput } from 'react-native'
import React from 'react'

import Icon from 'react-native-vector-icons/Ionicons';
const SearchInput = () => {
  return (
    <View style={styles.searchContainer}>
    <Icon name="search" size={20} color="orange" />
    <TextInput
      style={styles.input}
      placeholder="Search"
      placeholderTextColor={"orange"}
      
    />
  </View>
  )
}

export default SearchInput

const styles = StyleSheet.create({
    searchContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#D98100',
        paddingHorizontal: 10,
        marginTop: 10,
        height:40,
        borderRadius:10
      },
      input: {
        marginLeft: 10,
        flex: 1,
      },
})