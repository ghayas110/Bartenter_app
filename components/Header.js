import { StyleSheet, Text, View,SafeAreaView,TouchableOpacity } from 'react-native'
import React,{useState} from 'react'
import SearchInput from './SearchInput';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import Icons from './Icons';
const Header = ({title,headerShown,onPress}) => {
    const navigation = useNavigation();
  return (
    <SafeAreaView>
    <View style={styles.headerContainer}>
    <View style={styles.siders}>
    {
      title=="Privacy Policy"?<View></View>:   <TouchableOpacity onPress={()=>navigation.openDrawer("helloo")}>
      <Icon name="menu" size={24} color="#fff" />
      </TouchableOpacity>
    }
 
    {
      title=="Notification"?<Icon name="settings-outline" size={24} color="#fff" />:""
    }
    {title=="Job"?
    <TouchableOpacity style={styles.siders} onPress={onPress}>
    
    <Icon name="add" size={24} color="#fff" />
    <Text style={{color:'white',fontSize:14}}>Add Jobs</Text>
    </TouchableOpacity>:null}
    {title=="Profile"?
    <TouchableOpacity onPress={()=>navigation.navigate("EditProfile")}>
    <Icons.AntDesign name="edit" size={24} color="#fff" />
    </TouchableOpacity>:null}
    </View>
    <Text style={styles.headerText}>{title}</Text>
    {headerShown?
    <SearchInput/>:""}
    </View>
 
    </SafeAreaView>
  )
}

export default Header

const styles = StyleSheet.create({
  siders:{
display:'flex',
alignItems:'center',justifyContent:'space-between',
flexDirection:'row'
  },
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