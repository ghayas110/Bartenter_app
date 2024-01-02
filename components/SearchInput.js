import { StyleSheet, Text, View,TextInput } from 'react-native'
import React from 'react'

import Icon from 'react-native-vector-icons/Ionicons';
const SearchInput = () => {
  return (
    <View style={styles.searchContainer}>
    <Icon name="search" size={20} color="#fff" />
    <TextInput
      style={styles.input}
      placeholder="Search"
      placeholderTextColor={"#fff"}
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
        paddingHorizontal: 5,
        
        marginTop: 10,
        borderRadius:20
      },
      input: {
        marginLeft: 10,
        flex: 1,
      },
})