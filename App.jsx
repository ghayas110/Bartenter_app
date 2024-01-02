import 'react-native-gesture-handler';
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';

import BottomTabNavigator from "./navigation/TabNavigator";
import Otp from './screens/Otp';
const AuthStack = createStackNavigator();
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  return (
    <NavigationContainer>
    {isLoggedIn ? (
      
      <BottomTabNavigator/>
    ) : (
      <AuthStack.Navigator screenOptions={{
        headerShown: false
        }}>
        <AuthStack.Screen name="Login">
        {(props) => <LoginScreen />}
        
        </AuthStack.Screen>
      <AuthStack.Screen name="OtpS">
      {(props) => <Otp {...props} onLogin={() => setIsLoggedIn(true)}/>}
      
      </AuthStack.Screen>
    </AuthStack.Navigator>
    )}
   
    </NavigationContainer>
  );
};
export default App;




