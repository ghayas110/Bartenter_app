import { StyleSheet, Text, View,Image,TouchableOpacity,FlatList } from 'react-native'
import React from 'react'
import Header from '../components/Header'
import Icon from 'react-native-vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';
const PendingEvents = () => {
  const data = [
    { id: 1, name: '15 or Less', role: '12/12/2024 2:30 PM', image: require('../assets/userpic.jpg'),email:'csjguy@gmail.com',PhoneNumber:"999-999-999",message:"New User" },
    
  ];
const navigation =useNavigation()
  const Item = ({ id, name,message, role,onPress}) => (
    <TouchableOpacity onPress={onPress} style={{justifyContent:'space-between', flexDirection: 'row', alignItems: 'center',padding: 10, }}>
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
   
    <View style={{marginLeft:15}}>
    <Text style={{color:'black'}}>{message}</Text>
    <Text style={{color:'grey'}}>{name}</Text>
    <Text style={{color:'grey',fontSize:12}}>{role}</Text>
    </View>
    </View>
    <View>
    <Image source={require('../assets/userpic.jpg')} style={{ width: 50, height: 50 }} />
        </View>
    </TouchableOpacity>
  );
  const renderItem = ({ item }) => (
    <Item name={item.name} message={item.message} role={item.role} image={item.image} onPress={()=>navigation.navigate('JobDetail')}/>
  );
  return (
    <View>
    <Header title="Pending Events" headerShown={false}/>
    <FlatList
    data={data}
    renderItem={renderItem}
    keyExtractor={(item) => item.id}
    />
    </View>
  )
}

export default PendingEvents

const styles = StyleSheet.create({
    container: {
        width:'auto',
        height:"87%",
         justifyContent: 'center',
         alignItems: 'center',
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