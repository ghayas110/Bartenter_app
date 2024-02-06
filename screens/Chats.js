import { Button, StyleSheet, Text, View,SafeAreaView, TouchableOpacity,FlatList,Image } from 'react-native'
import React,{useEffect, useState} from 'react'
import Header from '../components/Header'
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation,useIsFocused } from '@react-navigation/native';

const Chats = () => {
const [userId, setuserId] = useState(0)
 const [data, setdata] = useState()
const navigation = useNavigation();
const isFocused = useIsFocused();

useEffect(() => {
  async function replacementFunction() {
    const value = await AsyncStorage.getItem('data');
    AsyncStorage.setItem('data', value)
    console.log(JSON.parse(value).user_data[0].id,"userreridiidid")
    setuserId(JSON.parse(value).user_data[0].id);
    AllChats(JSON.parse(value).user_data[0].id)
  }
  replacementFunction()
}, [isFocused]);
  const AllChats = async (id) => {
    // Your existing login logic
    if (id) {
console.log("hitiitititiititi")
      try {
        
     
          fetch('https://bartendersocket.logomish.com/alluser', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({"userId":id}),
          })
          .then(response => {
            console.log(response)
            return response.json()
          })
          .then(chat => {
            console.log(chat,"res chat")
            if (chat.success) {
              console.log(chat)
            setdata(chat.user)

              // navigation.navigate('OtpS')
            } else {
              Alert.alert("Chat","No Cat Found")
            }
          }).catch(err=>{
            console.log(err,"dddd")
          })
        
  
      } catch (error) {
      console.log('An error occurred while processing your request.',error);
      }
    } else {
      console.log('Please fill in all fields');
    }
  };
  const dataa = [
    { id: 1, name: 'John Brown', role: 'Host', image: require('../assets/userpic.jpg'),email:'csjguy@gmail.com',PhoneNumber:"999-999-999",message:"Do you have an Idea of what type of Drink..." },
    { id: 1, name: 'John Brown', role: 'Host', image: require('../assets/userpic.jpg'),email:'csjguy@gmail.com',PhoneNumber:"999-999-999",message:"Do you have an Idea of what type of Drink..." },
    
  ];
  // useEffect(() => {
  //   AllChats(userId)
  //     }, [userId])
  const Item = ({ id, name,message, role,image,onPress}) => (
    <TouchableOpacity onPress={onPress} style={{justifyContent:'space-between', flexDirection: 'row', alignItems: 'center',padding: 10,borderBottomWidth: 1, borderBottomColor: 'whitesmoke'   }}>
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
   
    <View style={{marginLeft:15}}>
    <Text style={{color:'black',fontWeight:'bold'}}>{message}</Text>
    <Text style={{color:'grey'}}>{name}</Text>
    <Text style={{color:'grey',fontSize:12}}>{role}</Text>
    </View>
    </View>
    <View>
    <Image source={image!=""?{uri:`https://bartender.logomish.com${image}`}:require('../assets/userpic.jpg')} style={{ width: 50, height: 50,borderRadius:7 }} />
        </View>
    </TouchableOpacity>
  );
  const renderItem = ({ item }) => (
    <Item name={item.name} message={item.message} role={item.role} image={item.image} onPress={()=>navigation.navigate('Message',item)}/>
  );
  return (
    <SafeAreaView>
    <Header title="Chat" headerShown={true}/>
  
    <View style={styles.container}>
    <FlatList
    data={data}
    renderItem={renderItem}
    keyExtractor={(item) => item.id}
    />
  
    </View>

    </SafeAreaView>
  )
}

export default Chats

const styles = StyleSheet.create({
  container: {
   width:'auto',
   height:"78.5%",
    backgroundColor: '#fff',
  },
  text: {
    marginTop: 20,
    fontSize: 18,
    color: '#ccc',
  },
  button: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor:'#F2994A',
    borderRadius:30,
    width :60,height :60, 
    justifyContent:'center',alignItems:'center'
  }
})