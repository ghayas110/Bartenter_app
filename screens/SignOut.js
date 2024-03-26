import { Image, StyleSheet, Text, View } from 'react-native'
import React,{useState,useEffect} from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import AboutHeader from '../components/AboutHeader'
import { useSelector } from "react-redux";
import AsyncStorage from '@react-native-async-storage/async-storage';


const SignOut = ({ onLogin }) => {
  const count = useSelector((state) => state.auth.user)
  const [users,setusers]=useState("")
  const [data, setdata] = useState()
  const handleSubmit = async (userss) => {
    try {
      fetch(`https://bartenderbackend.bazazi.co/users/GetUserById/${userss?.user_data[0]?.id}`, {
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
    async function replacementFunction(){
    const value = await AsyncStorage.getItem('data');
    setusers(JSON.parse(value))
    handleSubmit(JSON.parse(value))
    }
    replacementFunction()

  }, [])
  return (
    <>
    {
      users?
      <>
      <AboutHeader name={"Sign Out"} screen={"SignOut"} onLogin={onLogin} />
    <View style={{display:'flex',alignItems:'center',justifyContent:'center',height:"50%"}}>
    <TouchableOpacity
    >
      {
        users.user_data[0].image==""?<Image source={require('../assets/userpic.jpg')} style={{width: 90, height: 90,borderRadius:50}} />
        :
        <Image source={{ uri: `https://bartenderbackend.bazazi.co/${users?.user_data[0]?.image}` }} style={{width: 90, height: 90,borderRadius:50}} />
      }
    </TouchableOpacity>
    <Text style={{fontSize:20,color:"black"}}>{users.user_data[0]?.name}</Text>
    </View>
      </>:""
    }
    
    </>
  )
}

export default SignOut

const styles = StyleSheet.create({})