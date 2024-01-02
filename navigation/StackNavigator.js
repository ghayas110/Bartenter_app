// ./navigation/StackNavigator.js

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import UserHomeScreen from '../screens/UserHomeScreen';
import DetailsScreen from '../screens/DetailsScreen';
import ProfileScreen from "../screens/ProfileScreen";
import Chats from "../screens/Chats";
import MessageScreen from "../screens/MessageScreen";
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

export { ContactStackNavigator,MainStackNavigator };