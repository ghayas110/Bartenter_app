import React,{useState,useEffect} from 'react';
import { View, Text, StyleSheet, ImageBackground,TouchableOpacity,ScrollView } from 'react-native';
import ButtonInput from './ButtonInput';
import { useNavigation,useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function UserDetails({route}) {
  console.log(route,"prookeokeokreknk")
const navigation= useNavigation()
const isFocused = useIsFocused();

const[userState,setuserState]=useState(11)
const [users,setusers]=useState("")
const [data, setdata] = useState()
const [imageUri, setImageUri] = useState(`https://bartender.logomish.com/${users?.image}`||'');


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
  try {
    fetch(`https://bartender.logomish.com/users/GetUserById/${userss.user_data[0].id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key':'BarTenderAPI',
        'accesstoken':`Bearer ${userss.user_data[0].access_token}`
      },
    })
    .then(response => response.json())
    .then(dataa => {
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
      <Text style={styles.titlemain}>Welcome {data?.name},</Text>
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
