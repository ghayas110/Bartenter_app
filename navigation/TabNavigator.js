import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import { AdminStackNavigator, CalenderStackNavigator, ContactStackNavigator, MainStackNavigator} from "./StackNavigator";
import ProfileScreen from "../screens/ProfileScreen";
import ShopingCart from "../screens/ShopingCart";
import PendingEvents from "../screens/PendingEvents";
import BookedEvents from "../screens/BookedEvents";
import PendingIcons from '../assets/svg/1-04.svg'
import BookedIcons from '../assets/svg/1-05.svg'
import Job from "../screens/Job";
import ProfileIcon from '../assets/svg/profileicon.svg';
import ChatIcon from '../assets/svg/1-02.svg'
import { SvgXml } from "react-native-svg";
const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {

  return (
    <Tab.Navigator screenOptions={{
      headerShown: false
      }}>
      <Tab.Screen name="Profile" component={MainStackNavigator} options={{
        tabBarIcon: ({ color, size }) => (
   <ProfileIcon width={size} height={size} fill={color} />
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
       
          <PendingIcons width={size} height={size} fill={color}/>
        ),
      }}/>
      <Tab.Screen name="BookedEvents" component={BookedEvents} options={{
        tabBarIcon: ({ color, size }) => (
       
          <BookedIcons width={size} height={size} fill={color}/>
        ),
      }}/>
      <Tab.Screen name="Chats" component={ContactStackNavigator} options={{
        tabBarIcon: ({ color, size }) => (
       
          <ChatIcon width={size} height={size} fill={color} />
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