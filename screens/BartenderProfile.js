


import React,{useState,useEffect} from 'react';
import { View, Text, StyleSheet, ImageBackground,ActivityIndicator,ScrollView, Switch } from 'react-native';
import Header from '../components/Header';
import StarRating from 'react-native-star-rating-widget';
import RatingCard from '../components/RatingCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation,useIsFocused } from '@react-navigation/native';
import HeaderDetails from '../components/HeaderDetails';


export default function BartenderProfile({route}) {
    console.log(route.params)
  const isFocused = useIsFocused();
  const [rating, setRating] = useState(0);
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const[userState,setuserState]=useState(11)
  const [users,setusers]=useState("")
  const [data, setdata] = useState()
  const [imageUri, setImageUri] = useState(`https://bartenderbackend.bazazi.co/${users?.image}`||'');
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
     await fetch(`https://bartenderbackend.bazazi.co/users/GetUserById/${route?.params?.bartender_id}`, {
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
          setImageUri(`https://bartenderbackend.bazazi.co/${dataa?.users[0]?.image}`)
          setdata(dataa?.users[0])
          console.log(dataa?.users[0])
       
        }
      });
    } catch (error) {
      Alert.alert('An error occurred while processing your request.');
    }
 
};
  return (
<>
<HeaderDetails title={`${data?.name}`}/>
{
  isLoading?
  <View style={[styles.containerSpinner, styles.horizontalSpinner]}>
  <ActivityIndicator size="large" />
</View>
:
<>
<ScrollView style={styles.card}>
  
 <View>


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
<Text style={{color:'black',fontWeight:"700"}}>Payment Link</Text>
<Text style={{color:'grey',fontWeight:"700"}}>{data?.payment_link}</Text>
</View>



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
