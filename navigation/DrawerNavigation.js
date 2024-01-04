// ./navigation/DrawerNavigator.js

import React from "react";
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { View, Text, Image } from 'react-native';
import BartenderHomeScreen from "../screens/BartenderHomeScreen";
import BottomTabNavigator from "./TabNavigator";

const Drawer = createDrawerNavigator();

function CustomDrawer(props) {
  return (
    <DrawerContentScrollView {...props}>
      <View style={{marginTop:-10, flex: 1, backgroundColor: 'orange', padding: 25 }}>
        <Image source={require('../assets/userpic.jpg')} style={{width: 50, height: 50,borderRadius:50}} />
        <View style={{paddingTop:15}}>
        <Text style={{color:"white",fontSize:20,fontWeight:'700'}}>John Brown</Text>
        <Text style={{color:'white'}}>csjguy@gmail.com</Text>
        </View>
      </View>
      <View style={{ flex: 3, backgroundColor: 'white' }}>
        <DrawerItemList {...props} />
      </View>
    </DrawerContentScrollView>
  );
}

function DrawerNavigator() {
  return (
    
      <Drawer.Navigator  screenOptions={{
        headerShown: false
        }} drawerContent={props => <CustomDrawer {...props} />}>
      <Drawer.Screen name="Home" component={BottomTabNavigator} />
        <Drawer.Screen name="About" component={BartenderHomeScreen} />
        
      </Drawer.Navigator>
    
  );
}
export default DrawerNavigator;