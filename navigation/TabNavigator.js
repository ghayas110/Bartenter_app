import React, { useEffect, useState } from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import { AdminStackNavigator, BartenderStackNavigator, CalenderStackNavigator, ContactStackNavigator, JobStackNavigator, MainStackNavigator, PendingStackNavigator} from "./StackNavigator";
import ProfileScreen from "../screens/ProfileScreen";
import ShopingCart from "../screens/ShopingCart";
import PendingEvents from "../screens/PendingEvents";
import BookedEvents from "../screens/BookedEvents";
import PendingIcons from '../assets/svg/1-04.svg'
import BookedIcons from '../assets/svg/1-05.svg'
import Job from "../screens/Job";
import ProfileIcon from '../assets/svg/profileicon.svg';
import ChatIcon from '../assets/svg/1-02.svg'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Image } from "react-native";
import { SvgXml } from "react-native-svg";
import { useSelector } from "react-redux";
import Subscription from "../screens/Subscription";
import Icons from "../components/Icons";
import Notification from "../screens/Notification";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const [state, setstate] = useState()
  const [userState,setuserState]=useState()
  const [users,setusers]=useState("")
  useEffect(()=>{
    async function replacementFunction(){
    const value = await AsyncStorage.getItem("data");
      setusers(JSON.parse(value))
      setuserState(JSON.parse(value)?.user_data[0]?.user_type)
    }
    replacementFunction()

  },[])

  AsyncStorage.getItem("type").then((value) => {
    setstate(value)
    })
    .then(res => {
    //do something else
    });
    const count = useSelector((state) => state.auth.user)
    
  return (
    <Tab.Navigator
  
    screenOptions={
  
      {
        
          "tabBarActiveTintColor": "tomato",
          "tabBarInactiveTintColor": "gray",
          "tabBarStyle": [
            {
              "display": "flex"
            },
            null
          ],
        
      headerShown: false,
      showIcon: true
      }}>
      
      <Tab.Screen name="Profile" component={MainStackNavigator} options={{
        tabBarIcon: ({ color, size }) => (
          // <SvgXml xml={PendingIcons} color={color} />
           <Image source={require('../assets/png/1-01.png')} style={{ width: 25, height: 20 ,objectFit:'contain' }} />
        ),
      }}/>
    {userState == 1?
      <>
      <Tab.Screen name="Job" component={JobStackNavigator}  initialParams={true} options={{
        tabBarIcon: ({ color, size }) => (    
          <Icon name="hourglass" color={color} size={size}  />
          
          ),
        }}/>
        <Tab.Screen name="Calender" component={CalenderStackNavigator} options={{
          tabBarIcon: ({ color, size }) => (
            
            <Icon name="calendar-outline" color={color} size={size}/>
            ),
          }}/>
          <Tab.Screen name="Chats" component={ContactStackNavigator} options={{
            tabBarIcon: ({ color, size }) => (
           
              <Icons.AntDesign name="wechat" color={color} size={size}/>
            ),
          }}/>
          {/* <Tab.Screen name="Subscription" component={Subscription} options={{
            tabBarIcon: ({ color, size }) => (
           
              <Icon name="play" color={color} size={size}/>
            ),
          }}/> */}
       {/* <Tab.Screen
  name="BookedEvents"
  component={BookedEvents}
  initialParams={{ prop: true }} // Pass your prop as initialParams
  options={{
    tabBarIcon: ({ color, size }) => (
      <Image source={require('../assets/png/1-05.png')} style={{ width: 25, height: 20, objectFit: 'contain' }} />
    ),
  }}
/> */}
          </>
      :
      <>
      <Tab.Screen  initialParams={{ prop: true }} name="PendingEvents"  component={PendingStackNavigator} options={{
        tabBarIcon: ({ color, size }) => (
          <Image source={require('../assets/png/1-04.png')} style={{ width: 25, height: 20 ,objectFit:'contain' }} />
          
          ),
        }}/>
 <Tab.Screen name="Subscription" component={Subscription} options={{
            tabBarIcon: ({ color, size }) => (
           
              <Icon name="play" color={color} size={size}/>
            ),
          }}/> 
      
        {/* <Tab.Screen name="BookedEvents" component={BookedEvents} options={{
          tabBarIcon: ({ color, size }) => (
            <Image source={require('../assets/png/1-05.png')} style={{ width: 25, height: 20 ,objectFit:'contain' }} />
            
            ),
          }}/> */}
           <Tab.Screen name="Bartinders" component={BartenderStackNavigator} options={{
            tabBarIcon: ({ color, size }) => (
           
              <Icons.AntDesign name="user" color={color} size={size}/>            ),
          }}/>
          <Tab.Screen name="Chats" component={ContactStackNavigator} options={{
            tabBarIcon: ({ color, size }) => (
           
              <Icons.AntDesign name="wechat" color={color} size={size}/>            ),
          }}/>
          
    
      </>
    }

        
   
   
    
  
     
  
     
      

      {userState ==0?
      <Tab.Screen name="Admins" component={AdminStackNavigator} options={{
        tabBarIcon: ({ color, size }) => (
       
          <Icon name="people-outline" color={color} size={size}/>
        ),
      }}/>
      :null}
     
      <Tab.Screen name="Notification" component={Notification} options={{
        tabBarIcon: ({ color, size }) => (
       
          <Icon name="notifications" color={color} size={size}/>
        ),
      }}/>
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;