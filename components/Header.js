import { StyleSheet, Text, View,SafeAreaView,TouchableOpacity } from 'react-native'
import React,{useState} from 'react'
import SearchInput from './SearchInput';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
const Header = ({title,headerShown}) => {
    const navigation = useNavigation();
  return (
    <SafeAreaView>
    <View style={styles.headerContainer}>
    <TouchableOpacity onPress={()=>navigation.openDrawer()}>
    <Icon name="menu" size={24} color="#fff" />
    </TouchableOpacity>
    <Text style={styles.headerText}>{title}</Text>
    {headerShown?
    <SearchInput/>:""}
    </View>
 
    </SafeAreaView>
  )
}

export default Header

const styles = StyleSheet.create({
    headerContainer: {
        backgroundColor: '#FFA500',
        paddingTop: 40,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
      },
      headerText: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
      },
})