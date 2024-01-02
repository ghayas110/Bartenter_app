import { StyleSheet, Text, View,SafeAreaView,TouchableOpacity } from 'react-native'
import React,{useState} from 'react'
import SearchInput from './SearchInput';
import Icon from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
const HeaderDetails = ({title,headerShown}) => {
    const navigation = useNavigation();
  return (
    <SafeAreaView>
    <View style={styles.headerContainer}>
    <TouchableOpacity onPress={()=>navigation.goBack()} style={{display:'flex',alignItems:'center',flexDirection:'row'}}>
    <Icon name="left" size={24} color="#fff" />
    <Text style={{color:"#fff",fontSize:17}}>Back</Text>
    </TouchableOpacity>
    <View>
    <Text style={styles.headerText}>Brown</Text>
    </View>
  <View></View>
    </View>
 
    </SafeAreaView>
  )
}

export default HeaderDetails

const styles = StyleSheet.create({
    headerContainer: {
      display:"flex",
      alignItems:'center',
      justifyContent:'space-between',
      flexDirection:'row',

        backgroundColor: '#FFA500',
        paddingTop: 20,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
      },
      headerText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
      },
})