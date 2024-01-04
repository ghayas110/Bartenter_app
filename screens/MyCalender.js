import { FlatList, ImageBackground, StyleSheet, Text, TouchableOpacity, View ,ScrollView} from 'react-native'
import React from 'react'
import Header from '../components/Header'
import { useNavigation } from '@react-navigation/native';

const MyCalender = () => {
const navigation =useNavigation()
  const data = [
    {  name: 'John Brown',email:"csjguy@gmail.com",theme:"15 or Less",PhoneNumber:'03002661456',DateTime: "November 7 2024", image: require('../assets/map.png') },
    {  name: 'John Brown',email:"csjguy@gmail.com",theme:"Red and White",PhoneNumber:'03002661456',DateTime: "November 7 2024", image: require('../assets/map.png') },
    {  name: 'John Brown',email:"csjguy@gmail.com",theme:"Red and White",PhoneNumber:'03002661456',DateTime: "November 7 2024", image: require('../assets/map.png') },
    {  name: 'John Brown',email:"csjguy@gmail.com",theme:"Red and White",PhoneNumber:'03002661456',DateTime: "November 7 2024", image: require('../assets/map.png') },
    {  name: 'John Brown',email:"csjguy@gmail.com",theme:"Red and White",PhoneNumber:'03002661456',DateTime: "November 7 2024", image: require('../assets/map.png') },

    
  ];
  const Item = ({ PhoneNumber, name,email, DateTime,theme, image, onPress }) => (
    <TouchableOpacity onPress={onPress} style={styles.card}>
    <ImageBackground source={image} style={styles.image}>
      
    </ImageBackground>

    <Text style={styles.text1}>{name}</Text>


 
    <Text style={styles.text}>{theme}</Text>



    <Text style={styles.text}>{DateTime}</Text>

   
 
  </TouchableOpacity>
  );
  const renderItem = ({ item }) => (
    <Item name={item.name} email={item.email} image={item.image} theme={item.theme} PhoneNumber={item.PhoneNumber} DateTime={item.DateTime} onPress={() => navigation.navigate('BookedDetails', {item})}/>
  );
  return (
    <View>
    <Header title="Booked Events" headerShown={true}/>

 <FlatList
 data={data}
 renderItem={renderItem}
 keyExtractor={(item) => item.id}
 />

    

    </View>
  )
}

export default MyCalender

const styles = StyleSheet.create({
  cardtext:{
    display:'flex',
    flexDirection:'column',
      },
      cardtext2:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between'
          },
      card: {
        borderRadius: 6,
        elevation: 3,
        backgroundColor: '#fff',
        shadowOffset: { width: 1, height: 1 },
        shadowColor: '#333',
        shadowOpacity: 0.3,
        shadowRadius: 2,
        marginHorizontal: 4,
        marginVertical: 6,
        padding: 20
      },
      image: {
        width: '100%', // specify the width
        height: 200, // specify the height
        justifyContent: "flex-end",
        alignItems: 'flex-start', // center the text horizontally
        marginBottom: 20,
        opacity:1,
        background: "#000"
      },
      title: {
        fontSize: 18,
        fontWeight: 'bold',
        paddingLeft:10,
        color: '#fff' // white color for better visibility on image
      },
      text: {
        fontSize: 16,
        color: 'black', // white color for better visibility on image
        marginBottom: 5,

      },
      text1: {
        fontSize: 14,
        color: 'orange', // white color for better visibility on image
   
      },
    container: {
        width:'auto',
        height:"87%",
    
         backgroundColor: '#fff',
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