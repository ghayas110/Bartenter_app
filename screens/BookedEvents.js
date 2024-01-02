import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from '../components/Header'
import Icon from 'react-native-vector-icons/Entypo';
import Card from '../components/Card';
const BookedEvents = () => {
  return (
    <View>
    <Header title="Booked Event" headerShown={true}/>
  
    <View style={styles.container}>
<Card/>

  </View>
    </View>
  )
}

export default BookedEvents

const styles = StyleSheet.create({
    container: {
        width:'auto',
        height:"87%",
    
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