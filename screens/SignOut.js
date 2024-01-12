import { Image, StyleSheet, Text, View } from 'react-native'
import React,{useState,useEffect} from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import AboutHeader from '../components/AboutHeader'
import { useSelector } from "react-redux";

const SignOut = ({ onLogin }) => {
  const count = useSelector((state) => state.auth.user)
  const [data, setdata] = useState()
  const handleSubmit = async () => {

    try {
      fetch(`https://bartender.logomish.com/users/GetUserById/${count.user_data[0].id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key':'BarTenderAPI',
          'accesstoken':`Bearer ${count?.access_token}`
        },
      })
      .then(response => response.json())
      .then(dataa => {
        console.log(dataa?.users)
       setdata(dataa?.users[0])
      });
    } catch (error) {
      console.log('An error occurred while processing your request.',error);
    }
 
};
  useEffect(() => {
    handleSubmit()
  }, [])
  return (
    <>
    <AboutHeader name={"SignOut"} screen={"SignOut"} onPress={() => onLogin()}/>
    <View style={{display:'flex',alignItems:'center',justifyContent:'center',height:"50%"}}>
    <TouchableOpacity
    style={{}}
    onPress={() => onLogin()}
    >
    <Image source={{ uri: `https://bartender.logomish.com/${data?.image}` }} style={{width: 90, height: 90,borderRadius:50}} />
    </TouchableOpacity>
    <Text style={{fontSize:20}}>{data?.name}</Text>
    </View>
    </>
  )
}

export default SignOut

const styles = StyleSheet.create({})