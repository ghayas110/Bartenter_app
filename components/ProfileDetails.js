import React,{useState,useEffect} from 'react';
import { View, Text, StyleSheet, ImageBackground,ActivityIndicator,ScrollView, Switch } from 'react-native';
import Header from './Header';
import StarRating from 'react-native-star-rating-widget';
import RatingCard from './RatingCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation,useIsFocused } from '@react-navigation/native';


export default function ProfileDetails({name,user_type,email,PhoneNumber,speciality,signatureDrink}) {
  const isFocused = useIsFocused();
  const [rating, setRating] = useState(0);
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const[userState,setuserState]=useState(11)
  const [users,setusers]=useState("")
  const [data, setdata] = useState()
  const [imageUri, setImageUri] = useState(`https://bartender.logomish.com/${users?.image}`||'');
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    async function replacementFunction(){        
      const value =  await AsyncStorage.getItem('data');
        AsyncStorage.setItem('data',value)
          setusers(JSON.parse(value));
          setuserState(JSON.parse(value)?.user_data[0]?.user_type);
          handleSubmit(JSON.parse(value));
  }
  replacementFunction()
  }, [userState,isFocused]);

  const handleSubmit = async (userss) => {
    setIsLoading(true)
    try {
     await fetch(`https://bartender.logomish.com/users/GetUserById/${userss.user_data[0].id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key':'BarTenderAPI',
          'accesstoken':`Bearer ${userss.access_token}`
        },
      })
      .then(response => response.json())
      .then(dataa => {
        setIsLoading(false)
        if(dataa?.users){
          setImageUri(`https://bartender.logomish.com/${dataa?.users[0]?.image}`)
          setdata(dataa?.users[0])
       
        }
      });
    } catch (error) {
      Alert.alert('An error occurred while processing your request.');
    }
 
};
  return (
<>
{
  isLoading?
  <View style={[styles.containerSpinner, styles.horizontalSpinner]}>
  <ActivityIndicator size="large" />
</View>
:
<>
<ScrollView style={styles.card}>
  
 
  {
data?.image==""?
<ImageBackground source={require('../assets/cardimg.png')} style={styles.image}>
    
  </ImageBackground>
  :
  <ImageBackground source={{uri: imageUri}} style={styles.image}>
    
  </ImageBackground>
}
  <View style={styles.maintitle}>
  <Text style={styles.titlemain}>Welcome {data?.name}.</Text>
  <Text style={styles.titlemain}>You are a {data?.user_type==1?"Bartender":""}!</Text>
  </View>
<View style={styles.section}>
<Text style={{color:'black',fontWeight:"700"}}>Speciality</Text>
<Text style={{color:'grey',fontWeight:"700"}}>{data?.speciality}</Text>
</View>
<View style={styles.section}>
<Text style={{color:'black',fontWeight:"700"}}>Signature Drink</Text>
<Text style={{color:'grey',fontWeight:"700"}}>{data?.signature_drink}</Text>
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
</>
}

</>

   
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
  },
  containerSpinner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center', 
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
  },
  horizontalSpinner: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20, 
    paddingTop:300,
    borderRadius: 10,
    backgroundColor: '#fff', 
  }
});
