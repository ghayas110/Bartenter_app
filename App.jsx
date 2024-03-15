import 'react-native-gesture-handler';
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import BottomTabNavigator from "./navigation/TabNavigator";
import Otp from './screens/Otp';
import DrawerNavigator from './navigation/DrawerNavigation';
import SignUp from './screens/SignUp';
import SplashScreen from './screens/SplashScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomDrawer from './navigation/DrawerNavigation';
import BartenderHomeScreen from './screens/BartenderHomeScreen';
import SignOut from './screens/SignOut';
import { Provider } from 'react-redux';
import store from './redux/store';
import ForgotPassScreen from './screens/ForgotPassScreen';
import OtpForget from './screens/OtpForget';
import NewPassword from './screens/NewPassword';
import ChangePassword from './screens/ChangePassword';
import EditProfileScreen from './screens/EditProfileScreen';
import {useNavigation} from '@react-navigation/native';
const AuthStack = createStackNavigator();
const App = () => {

  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  const Drawer = createDrawerNavigator();
  const [users,setusers]=useState("")
  useEffect(() => {
    async function checkLoginStatus() {
   
      const value = await AsyncStorage.getItem("data");
      console.log(value,"hello value")
      if (value !== null) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    }

    checkLoginStatus();
  }, []);

  return (
    <Provider store={store}>
 
    <NavigationContainer>
    {isLoggedIn ? (
      <Drawer.Navigator  screenOptions={{
        headerShown: false
        }} drawerContent={props => <CustomDrawer {...props} />}>
      <Drawer.Screen name="Home" component={BottomTabNavigator} />
        <Drawer.Screen name="About" component={BartenderHomeScreen} />
        <Drawer.Screen name="SignOut" >
        {(props) => <SignOut {...props}  onLogin={
          setIsLoggedIn(false)
        }/>}
        </Drawer.Screen>
        <Drawer.Screen name='ChangePassword' component={ChangePassword} initialParams={true}/>
        <Drawer.Screen name='EditProfile' initialParams={true} component={EditProfileScreen}/>
      </Drawer.Navigator>
    ) 
    :(
      <AuthStack.Navigator screenOptions={{
        headerShown: false
        }}>
        <AuthStack.Screen name="Splash">
        {(props) => <SplashScreen />}
        
        </AuthStack.Screen>

        
        <AuthStack.Screen name="ForgotPassScreen" component={ForgotPassScreen}/>
     
        <AuthStack.Screen name="OtpForget" component={OtpForget}/>
      
        <AuthStack.Screen name="NewPassword" component={NewPassword}/>
        <AuthStack.Screen name="Login">
        {(props) => <LoginScreen />}
        
        </AuthStack.Screen>
     
  
      <AuthStack.Screen name="OtpS">
      {(props) => <Otp {...props} onLogin={() => setIsLoggedIn(true)}/>}
      
      </AuthStack.Screen>
      <AuthStack.Screen name="SignUp">
      {(props) => <SignUp />}
      
      </AuthStack.Screen>
    </AuthStack.Navigator>
    )}
   
    </NavigationContainer>
    </Provider>
  );
};
export default App;