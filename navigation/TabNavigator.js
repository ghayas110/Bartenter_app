import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import { AdminStackNavigator, CalenderStackNavigator, ContactStackNavigator, MainStackNavigator} from "./StackNavigator";
import ProfileScreen from "../screens/ProfileScreen";
import ShopingCart from "../screens/ShopingCart";
import PendingEvents from "../screens/PendingEvents";
import BookedEvents from "../screens/BookedEvents";
import Chats from "../screens/Chats";
import Foundation from 'react-native-vector-icons/Foundation'
import UserHomeScreen from "../screens/UserHomeScreen";
import Job from "../screens/Job";
import MyCalender from "../screens/MyCalender";

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
      <Tab.Screen name="Job" component={Job}   options={{
        tabBarIcon: ({ color, size }) => (    
          <Icon name="hourglass" color={color} size={size}  />
        ),
      }}/>
    
      
      <Tab.Screen name="Calender" component={CalenderStackNavigator} options={{
        tabBarIcon: ({ color, size }) => (
       
          <Icon name="calendar-outline" color={color} size={size}/>
        ),
      }}/>
      <Tab.Screen name="PendingEvents" component={PendingEvents} options={{
        tabBarIcon: ({ color, size }) => (
       
          <Icon name="scale" color={color} size={size}/>
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
      <Tab.Screen name="Admins" component={AdminStackNavigator} options={{
        tabBarIcon: ({ color, size }) => (
       
          <Icon name="people-outline" color={color} size={size}/>
        ),
      }}/>
      

    </Tab.Navigator>
  );
};

export default BottomTabNavigator;