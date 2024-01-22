import React,{useState} from 'react';
import { View, Text, StyleSheet, ImageBackground,TouchableOpacity,ScrollView, Switch } from 'react-native';
import Header from './Header';
import StarRating from 'react-native-star-rating-widget';
import RatingCard from './RatingCard';

export default function ProfileDetails({name,email,PhoneNumber,speciality,signatureDrink}) {
  const [rating, setRating] = useState(0);
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (

    <ScrollView style={styles.card}>
  
      <ImageBackground source={require('../assets/cardimg.png')} style={styles.image}>
        
      </ImageBackground>
      <View style={styles.maintitle}>
      <Text style={styles.titlemain}>Welcome Bartender.</Text>
      <Text style={styles.titlemain}>You are a Bartender!</Text>
      </View>
 <View style={styles.section}>
 <Text style={{color:'black',fontWeight:"700"}}>Speciality</Text>
 <Text style={{color:'grey',fontWeight:"700"}}>Shots</Text>
 </View>
 <View style={styles.section}>
 <Text style={{color:'black',fontWeight:"700"}}>Signature Drink</Text>
 <Text style={{color:'grey',fontWeight:"700"}}>Cocktail Drink</Text>
 </View>
 <View style={styles.section}>
 <Text style={{color:'black',fontWeight:"700"}}>Available</Text>
 <Switch
        trackColor={{false: '#767577', true: 'orange'}}
        thumbColor={"white"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
 </View>

 <View style={styles.rating}>
 <Text style={{color:'black',fontSize:16,fontWeight:'bold'}}>Rating and Reviews</Text>

<RatingCard rating={2} text="Great work"/>
<RatingCard rating={5} text="Great work"/>




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
    elevation: 3,
    backgroundColor: '#fff',
    shadowOffset: { width: 1, height: 1 },
    shadowColor: '#333',

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
    paddingVertical:15,
    borderBottomWidth: 1, // This adds a border at the bottom
    borderBottomColor: 'whitesmoke' // This sets the color of the border
  },
  
  rating:{
    padding:10,
    paddingVertical:15
  },
  image: {
    width: '100%', // specify the width
    height: 400, // specify the height
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
    marginBottom: 5
  }
});
