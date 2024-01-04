// ./navigation/StackNavigator.js

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import UserHomeScreen from '../screens/UserHomeScreen';
import DetailsScreen from '../screens/DetailsScreen';
import ProfileScreen from "../screens/ProfileScreen";
import Chats from "../screens/Chats";
import MessageScreen from "../screens/MessageScreen";
import qrScreen from "../screens/QrScreen";
import QrScreen from "../screens/QrScreen";
import Job from "../screens/Job";
import BookedDetails from "../screens/BookedDetails";
import MyCalender from "../screens/MyCalender";
import CommentScreen from "../screens/CommentScreen";
import AdminProfileScreen from "../screens/AdminProfileScreen";
import AdminDetailsScreen from "../screens/AdminDetailsScreen";
const Stack = createStackNavigator();

const screenOptionStyle = {
  headerStyle: {
    backgroundColor: "#9AC4F8",
  },
  headerTintColor: "white",
  headerBackTitle: "Back",
};

const MainStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false
      }}>
      <Stack.Screen name="Home" component={ProfileScreen} screenOptions={{
        headerShown: false
        }} />
      <Stack.Screen name="Details" component={DetailsScreen} />
      <Stack.Screen name="QRScreen" component={QrScreen} screenOptions={{
        headerShown: false
        }}/>
    </Stack.Navigator>
  );
};

const ContactStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false
      }}>
      <Stack.Screen name="Chats" component={Chats} screenOptions={{
        headerShown: false
        }}/>
        <Stack.Screen name="Message" component={MessageScreen} screenOptions={{
          headerShown: false
          }}/>
         
    </Stack.Navigator>
  );
};
const CalenderStackNavigator = () => {
  return (
  <Stack.Navigator screenOptions={{
    headerShown: false
    }}>
    <Stack.Screen name="Calender" component={MyCalender} screenOptions={{
      headerShown: false
      }}/>
      <Stack.Screen name="BookedDetails" component={BookedDetails} screenOptions={{
        headerShown: false
        }}/>
        <Stack.Screen name="DetailScreen" component={DetailsScreen} />
        <Stack.Screen name="CommentScreen" component={CommentScreen} />
        
  </Stack.Navigator>
  );

}
const AdminStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false
      }}>
      <Stack.Screen name="Admin" component={AdminProfileScreen} screenOptions={{
        headerShown: false
        }} />
      <Stack.Screen name="AdminDetailsScreen" component={AdminDetailsScreen} />
      <Stack.Screen name="QRScreen" component={QrScreen} screenOptions={{
        headerShown: false
        }}/>
    </Stack.Navigator>
  );
};
export { CalenderStackNavigator,ContactStackNavigator,MainStackNavigator,AdminStackNavigator };