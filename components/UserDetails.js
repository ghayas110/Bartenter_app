import React,{useState} from 'react';
import { View, Text, StyleSheet, ImageBackground,TouchableOpacity,ScrollView } from 'react-native';
import ButtonInput from './ButtonInput';
import { useNavigation } from '@react-navigation/native';

export default function UserDetails({name,email,PhoneNumber,speciality,signatureDrink}) {
const navigation= useNavigation()

  return (

    <ScrollView style={styles.card}>
  
      <ImageBackground source={require('../assets/cardimg.png')} style={styles.image}>
        
      </ImageBackground>
      <View style={styles.maintitle}>
      <Text style={styles.titlemain}>Welcome New User,</Text>
      <Text style={styles.titlemain}>you are a Host!</Text>
      </View>


 <View style={styles.rating}>

 <ButtonInput title={"Create Event"} onPress={()=>navigation.navigate('AddJob')}/>



 </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  maintitle: {
    display:'flex',
    alignItems:'center',
    justifyContent:'center'
  },
  titlemain:{
    fontSize:22,
    fontWeight:'bold',
    fontFamily:'Lato, BlinkMacSystemFont, Roboto, sans-serif',
    color:'black',

  },
  card: {
    borderRadius: 6,


  },
  ratingcard: {
    borderRadius: 6,
    elevation: 3,
    padding:10,
    margin:10,
    backgroundColor: '#fff',
    shadowOffset: { width: 1, height: 1 },
    shadowColor: '#333',

  },
  section:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    padding:5,
    paddingVertical:15
  },
  rating:{
display:'flex',
alignItems:'center',
justifyContent:'center'
  },
  image: {
    width: '100%', // specify the width
    height: 350, // specify the height
    justifyContent: "flex-end",
    alignItems: 'flex-start', // center the text horizontally
    marginBottom: 10,
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
    marginBottom: 5
  }
});
