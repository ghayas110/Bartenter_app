// ./navigation/DrawerNavigator.js

import React,{useState,useEffect} from "react";
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import { View, Text, Image } from 'react-native';
import BartenderHomeScreen from "../screens/BartenderHomeScreen";
import BottomTabNavigator from "./TabNavigator";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import Icons from "../components/Icons";
const Drawer = createDrawerNavigator();

function CustomDrawer(props) {  const count = useSelector((state) => state.auth.user)

  const navigation =useNavigation()
  const [data, setdata] = useState()
  const [imageUri, setImageUri] = useState(`https://bartender.logomish.com/${count.user_data.image}`);

  const handleSubmit = async () => {

    try {
      fetch(`https://bartender.logomish.com/users/GetUserById/${count.user_data[0].id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key':'BarTenderAPI',
          'accesstoken':`Bearer ${count?.access_token}`
        },
      })
      .then(response => response.json())
      .then(dataa => {
        setImageUri(`https://bartender.logomish.com/${dataa?.users[0].image}`)
       setdata(dataa?.users[0])
      });
    } catch (error) {
      console.log('An error occurred while processing your request.',error);
    }
 
};
  useEffect(() => {
   
    handleSubmit()
  }, [props])

  return (
    <DrawerContentScrollView {...props}>
 
      <View style={{marginTop:-10, flex: 1, backgroundColor: 'orange', padding: 25 }}>
      {imageUri? (<Image source={{ uri: imageUri }} style={{width: 50, height: 50,borderRadius:50}} />):(<Icons.AntDesign name="user" size={70} />)}
        <View style={{paddingTop:15}}>
        <Text style={{color:"white",fontSize:20,fontWeight:'700'}}>{data?.name}</Text>
        <Text style={{color:'white'}}>{data?.email}</Text>
        <TouchableOpacity onPress={()=>navigation.navigate('EditProfile')}>
        <Text style={{color:'white',marginTop:10,textDecorationLine:"underline",fontWeight:'bold'}}>Edit Profile</Text>
        </TouchableOpacity>
        </View>
      </View>
      <View style={{ flex: 3, backgroundColor: 'white' }}>
        <DrawerItemList {...props} />
       
      </View>
    </DrawerContentScrollView>
  );
}

function DrawerNavigator({onLogin}) {
  return (
    
      <Drawer.Navigator  screenOptions={{
        headerShown: false
        }} drawerContent={props => <CustomDrawer {...props} />}>
      <Drawer.Screen name="Home" component={BottomTabNavigator} />
        <Drawer.Screen name="About" component={BartenderHomeScreen} />

     
        
      </Drawer.Navigator>
    
  );
}
export default CustomDrawer;