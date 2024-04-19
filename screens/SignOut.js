import { Image, StyleSheet, Text, View } from 'react-native'
import React,{useState,useEffect} from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import AboutHeader from '../components/AboutHeader'
import { useSelector } from "react-redux";
import AsyncStorage from '@react-native-async-storage/async-storage';
import baseUrl from '../global';


const SignOut = ({ onLogin ,onLogout}) => {
  const count = useSelector((state) => state.auth.user)
  const [users,setusers]=useState("")
  const [data, setdata] = useState()
  const handleSubmit = async (userss) => {
    try {
      fetch(`${baseUrl}/co/users/GetUserById/${userss?.user_data[0]?.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key':'BarTenderAPI',
          'accesstoken':`Bearer ${userss.access_token}`
        },
      })
      .then(response => response.json())
      .then(dataa => {
       if(dataa.users){
        setdata(dataa?.users[0])
       }
      });
    } catch (error) {
      console.log('An error occurred while processing your request.',error);
    }
 
};

  useEffect(() => { 
    // async function replacementFunction(){
    // const value = await AsyncStorage.getItem('data');
    // setusers(JSON.parse(value))
    // handleSubmit(JSON.parse(value))
    // }
    // replacementFunction()

    // onLogin()
    // onLogout()

  }, [])
  return (
    <>
    
    </>
  )
}

export default SignOut

const styles = StyleSheet.create({})