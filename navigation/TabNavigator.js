import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import { ContactStackNavigator, MainStackNavigator} from "./StackNavigator";
import ProfileScreen from "../screens/ProfileScreen";
import ShopingCart from "../screens/ShopingCart";
import PendingEvents from "../screens/PendingEvents";
import BookedEvents from "../screens/BookedEvents";
import Chats from "../screens/Chats";
import Foundation from 'react-native-vector-icons/Foundation'
import UserHomeScreen from "../screens/UserHomeScreen";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{
      headerShown: false
      }}>
      <Tab.Screen name="Profile" component={MainStackNavigator} options={{
        tabBarIcon: ({ color, size }) => (
   
          <Icon name="person" color={color} size={size}/>
        ),
      }}/>
      <Tab.Screen name="Chat" component={UserHomeScreen}   options={{
        tabBarIcon: ({ color, size }) => (    
          <Icon name="chatbox" color={color} size={size}  />
        ),
      }}/>
    
      <Tab.Screen name="ShopingCart" component={ShopingCart} options={{
        tabBarIcon: ({ color, size }) => (
       
          <Icon name="cart" color={color} size={size}/>
        ),
      }}/>
      <Tab.Screen name="PendingEvents" component={PendingEvents} options={{
        tabBarIcon: ({ color, size }) => (
       
          <Icon name="calendar-outline" color={color} size={size}/>
        ),
      }}/>
      <Tab.Screen name="BookedEvents" component={BookedEvents} options={{
        tabBarIcon: ({ color, size }) => (
       
          <Icon name="calendar-number-outline" color={color} size={size}/>
        ),
      }}/>
      <Tab.Screen name="Chats" component={ContactStackNavigator} options={{
        tabBarIcon: ({ color, size }) => (
       
          <Icon name="chatbubbles" color={color} size={size}/>
        ),
      }}/>
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;