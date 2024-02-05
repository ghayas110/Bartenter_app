import { FlatList, ImageBackground,ActivityIndicator, StyleSheet, Text, TouchableOpacity, View, ScrollView,Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import Header from '../components/Header'
import Icon from 'react-native-vector-icons/Entypo';
const baseUrl = require('../global')
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation ,useIsFocused} from '@react-navigation/native';


const BookedEvents = ({ route }) => {
  const [userState, setuserState] = useState(11)
  const [users, setusers] = useState("")
  const [data, setdata] = useState()
  const [bookedEvents, setBookedEvents] = useState([])
  const [imageUri, setImageUri] = useState(`${baseUrl}/${users?.image}` || '');
  const [isLoading, setIsLoading] = useState(false);
  const isFocused = useIsFocused();


  useEffect(() => {
    async function replacementFunction() {
      const value = await AsyncStorage.getItem('data');
      AsyncStorage.setItem('data', value)
      setusers(JSON.parse(value));
      setuserState(JSON.parse(value)?.user_data[0]?.user_type);
      handleSubmit(JSON.parse(value));
      getAllPosts()
    }
    replacementFunction()
  }, [userState,route,isFocused]);

  const handleSubmit = async (userss) => {
    try {
      await fetch(`${baseUrl}/users/GetUserById/${userss.user_data[0].id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': 'BarTenderAPI',
          'accesstoken': `Bearer ${userss.access_token}`
        },
      })
        .then(response => response.json())
        .then(dataa => {
          if (dataa?.users.length > 0) {
            setImageUri(`${baseUrl}/${dataa?.users[0]?.image}`)
            setdata(dataa?.users[0])
          }
        });
    } catch (error) {
      Alert.alert('An error occurred while processing your request.');
    }

  };
  const getAllPosts = async () => {
    setIsLoading(true)
    try {
      await fetch(`${baseUrl}/posts/GetAllPost`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': 'BarTenderAPI',
          'accesstoken': `Bearer ${users.access_token}`
        }
      }).then(response => response.json())
        .then(data => {
          setIsLoading(false)

          if (data.posts.length > 0) {
            setBookedEvents([...data.posts])
          }
          else{
            setBookedEvents([])
          }
        })
    } catch (error) {
      // Alert.alert('An error occurred while processing your request.');

    }
  }

  const handleBookEvent = async(postId)=>{
    const JsonBody ={post_id:postId}
   
    try {
      fetch('https://bartender.logomish.com/posts/BookPost', {

        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'accesstoken': `Bearer ${users.access_token}`,
          'x-api-key': 'BarTenderAPI',
        },
        body: JSON.stringify(JsonBody),
      })
        .then(response => 
          response.json()
       )
        .then(data => {
          if (data.message == "Success") {
            console.log("here")
            Alert.alert("You have booked this event")
            getAllPosts()
          } else {
            Alert.alert("Something Went Wrong")
          }
        });

    } catch (error) {
    }
  }
  
  const Item = ({ EventDate,postId, name, contact, EventTime, theme, EventLocation,NoOfPeople, onPress }) => (
    <View style={styles.card}>
      {/* <ImageBackground source={image} style={styles.image}> 
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.title}>16 – 30</Text>
       </ImageBackground> */}

      <TouchableOpacity style={styles.cardtext2}>
        <View style={styles.cardtext}>
        <Text style={styles.text1}>Event Name: </Text>
        <Text style={styles.text}>{name}</Text>

          <Text style={styles.text1}>Event Date :</Text>
          <Text style={styles.text}>{EventDate?.split('T')[0]}</Text>
        </View>
        <View style={{
          width: 40, height: 40, borderRadius: 50, backgroundColor: '#F4E8D6', display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <Icon name="mail" color="#FFA500" size={20} />
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.cardtext}>
        <Text style={styles.text1}>Theme:</Text>
        <Text style={styles.text}>{theme}</Text>

      </TouchableOpacity>
      <TouchableOpacity style={styles.cardtext}>
        <Text style={styles.text1}>Phone Number:  </Text>
        <Text style={styles.text}>{contact}</Text>

      </TouchableOpacity>
      
      <TouchableOpacity style={styles.cardtext}>
        <Text style={styles.text1}>Time:</Text>
        <Text style={styles.text}>{EventTime}</Text>

      </TouchableOpacity>

      <TouchableOpacity style={styles.cardtext}>
        <Text style={styles.text1}>Event Location:</Text>
        <Text style={styles.text}>{EventLocation}</Text>

      </TouchableOpacity>
      <TouchableOpacity style={styles.cardtext}>
        <Text style={styles.text1}>No Of People:</Text>
        <Text style={styles.text}>{NoOfPeople}</Text>

      </TouchableOpacity>

      <TouchableOpacity style={styles.cardtext} onPress={()=>onPress(postId)}>
        <Text style={styles.BookEventButton}>
            Book Event
        </Text>

      </TouchableOpacity>
    
      

    </View>
  );
  const renderItem = ({ item }) => (
    <Item postId={item?.post_id} name={item?.post_title} contact={item?.contact_phone} image={item?.image} theme={item?.theme} EventDate={item?.event_date} EventTime={item?.event_time} EventLocation={item?.event_location} NoOfPeople={item?.no_of_people} onPress={handleBookEvent}/>
  );
  return (
    <>
    {
      isLoading||bookedEvents.length==0?
       <View style={[styles.containerSpinner, styles.horizontalSpinner]}>
      <ActivityIndicator size="large" />
    </View> :
      <View>
      <Header title="Booked Events" headerShown={true} />
      <View  style={styles.flatList}>
      {
        bookedEvents.length>0?
        <FlatList
        data={bookedEvents}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />:<Text style={{color:"black",textAlign:"center",fontSize:20}}>No booked events</Text>
      }
</View>

    </View>
    }
    </>

    
  )
}

export default BookedEvents

const styles = StyleSheet.create({
  cardtext: {
    display: 'flex',
    flexDirection: 'column',
  },
  cardtext2: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  BookEventButton:{
    backgroundColor: '#FFA500',
    height:38,
    color:'#fff',
    width:190,
    marginLeft:65,
    paddingTop:9,
    textAlign:'center',
    fontSize:16,
    borderRadius:10

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
    opacity: 1,
    background: "#000"
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingLeft: 10,
    color: '#fff' // white color for better visibility on image
  },
  text: {
    fontSize: 16,
    color: 'black', // white color for better visibility on image
    marginBottom: 5,
    fontWeight: "600"
  },
  text1: {
    fontSize: 14,
    color: 'black', // white color for better visibility on image

  },
  container: {
    width: 'auto',
    height: "87%",

    backgroundColor: '#fff',
  },

  button: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#F2994A',
    borderRadius: 30,
    width: 60, height: 60,
    justifyContent: 'center', alignItems: 'center'
  },
  flatList:{
    paddingBottom: 320,
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
    borderRadius: 10,
    backgroundColor: '#fff', 
    
  }
})