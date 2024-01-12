import { Button, StyleSheet, Text, View,SafeAreaView, TouchableOpacity,FlatList,Image } from 'react-native'
import React,{useEffect, useState} from 'react'
import Header from '../components/Header'
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const Chats = () => {
const [userId, setuserId] = useState()
// const [data, setdata] = useState()
const navigation = useNavigation();

  
  // const AllChats = async () => {
  //   // Your existing login logic
  //   if (userId) {

  //     try {
        
     
  //         fetch('http://192.168.1.122:3000/alluser/', {
  //           method: 'POST',
  //           headers: {
  //             'Content-Type': 'application/json',
  //           },
  //           body: JSON.stringify({userId}),
  //         })
  //         .then(response => response.json())
  //         .then(chat => {
  //           if (chat.success) {
  //             console.log(chat)
  //           setdata(chat.user)

  //             // navigation.navigate('OtpS')
  //           } else {
  //             Alert.alert("Chat","No Cat Found")
  //           }
  //         });
        
  
  //     } catch (error) {
  //     console.log('An error occurred while processing your request.',error);
  //     }
  //   } else {
  //     console.log('Please fill in all fields');
  //   }
  // };
  const data = [
    { id: 1, name: 'John Brown', role: 'Host', image: require('../assets/userpic.jpg'),email:'csjguy@gmail.com',PhoneNumber:"999-999-999" },
    { id: 1, name: 'John Brown', role: 'Host', image: require('../assets/userpic.jpg'),email:'csjguy@gmail.com',PhoneNumber:"999-999-999" },
    
  ];
  // useEffect(() => {
  //   AllChats()
  //     }, [userId])
  const Item = ({ id, name, role,onPress}) => (
    <TouchableOpacity onPress={onPress} style={{justifyContent:'space-between', flexDirection: 'row', alignItems: 'center',padding: 10, }}>
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
   
    
    <View style={{marginLeft:15}}>
    <Text style={{color:'black'}}>{name}</Text>
    <Text style={{color:'black'}}>{role}</Text>
    </View>
    </View>
    <View>
    <Image source={require('../assets/userpic.jpg')} style={{ width: 50, height: 50 }} />
        </View>
    </TouchableOpacity>
  );
  const renderItem = ({ item }) => (
    <Item name={item.name} role={item.role} image={item.image} onPress={()=>navigation.navigate('Message',item)}/>
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
    <TouchableOpacity style={styles.button}>
    <Icon name="add" size={30} color="#fff" />
    </TouchableOpacity>
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