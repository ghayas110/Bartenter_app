import { FlatList, ImageBackground, StyleSheet, Text, TouchableOpacity, View ,ScrollView} from 'react-native'
import React from 'react'
import Header from '../components/Header'
import Icon from 'react-native-vector-icons/Entypo';
import Card from '../components/Card';
const BookedEvents = () => {

  const data = [
    {  name: 'John Brown',email:"csjguy@gmail.com",theme:"Red and White",PhoneNumber:'999-999-999',DateTime: "November 7 2024", image: require('../assets/userpic.jpg') },
    {  name: 'John Brown',email:"csjguy@gmail.com",theme:"Red and White",PhoneNumber:'999-999-999',DateTime: "November 7 2024", image: require('../assets/userpic.jpg') },
    {  name: 'John Brown',email:"csjguy@gmail.com",theme:"Red and White",PhoneNumber:'999-999-999',DateTime: "November 7 2024", image: require('../assets/userpic.jpg') },
    {  name: 'John Brown',email:"csjguy@gmail.com",theme:"Red and White",PhoneNumber:'999-999-999',DateTime: "November 7 2024", image: require('../assets/userpic.jpg') },
    {  name: 'John Brown',email:"csjguy@gmail.com",theme:"Red and White",PhoneNumber:'999-999-999',DateTime: "November 7 2024", image: require('../assets/userpic.jpg') },

    
  ];
  const Item = ({ PhoneNumber, name,email, DateTime,theme, image, onPress }) => (
    <View style={styles.card}>
    <ImageBackground source={image} style={styles.image}>
      <Text style={styles.title}>{name}</Text>
      <Text style={styles.title}>16 – 30</Text>
    </ImageBackground>
    
    <TouchableOpacity style={styles.cardtext2}>
    <View  style={styles.cardtext}>
    <Text style={styles.text1}>Host Email: </Text>
    <Text style={styles.text}>{email}</Text>
    </View>
    <View style={{width:40,height:40,borderRadius:50,backgroundColor:'#F4E8D6',display:'flex',alignItems:'center',justifyContent:'center'
  }}>
    <Icon name="mail" color="#FFA500" size={20}/>
    </View>
    </TouchableOpacity>
 
    <TouchableOpacity style={styles.cardtext}>
    <Text style={styles.text1}>Theme:</Text>
    <Text style={styles.text}>{theme}</Text>

    </TouchableOpacity>
    <TouchableOpacity style={styles.cardtext}>
    <Text style={styles.text1}>Phone Number:</Text>
    <Text style={styles.text}>{PhoneNumber}</Text>

    </TouchableOpacity>
    <TouchableOpacity style={styles.cardtext}>
    <Text style={styles.text1}>Date and Time:</Text>
    <Text style={styles.text}>{DateTime}</Text>

    </TouchableOpacity>
   
 
  </View>
  );
  const renderItem = ({ item }) => (
    <Item name={item.name} email={item.email} image={item.image} theme={item.theme} PhoneNumber={item.PhoneNumber} DateTime={item.DateTime}/>
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

export default BookedEvents

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
        fontWeight:"600"
      },
      text1: {
        fontSize: 14,
        color: 'black', // white color for better visibility on image
   
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