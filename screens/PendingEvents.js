import { StyleSheet, Text, View,Image,TouchableOpacity,FlatList ,ActivityIndicator } from 'react-native'
import React, { useState,useEffect } from 'react'
import Header from '../components/Header'
import { useNavigation ,useIsFocused} from '@react-navigation/native';
const baseUrl = require('../global')
import AsyncStorage from '@react-native-async-storage/async-storage';

const PendingEvents = ({ route }) => {
  const [userState, setuserState] = useState(11)
  const [users, setusers] = useState("")
  const [data, setdata] = useState()
  const [myEvents, setMyEvents] = useState([])
  const [imageUri, setImageUri] = useState(`${baseUrl}/${users?.image}` || '');
  const isFocused = useIsFocused();
  const [isLoading, setIsLoading] = useState(false);


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
    try {
      setIsLoading(true)
      await fetch(`${baseUrl}/posts/GetAllPostCreatedByUser`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': 'BarTenderAPI',
          'accesstoken': `Bearer ${users.access_token}`
        }
      }).then(response => response.json())
        .then(data => {
          if (data.data.length > 0) {
            setMyEvents([...data.posts])
            setIsLoading(false)
          }
          else {
            setMyEvents([])
          }
        })
    } catch (error) {
      Alert.alert('An error occurred while processing your request.');

    }
  }

const navigation =useNavigation()
  const Item = ({ id, name,eventdate, role,onPress}) => (
    <TouchableOpacity  onPress={onPress} style={{justifyContent:'space-between', flexDirection: 'row', alignItems: 'center',padding: 10, }}>
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
   
    <View style={{marginLeft:15}}>
    <Text style={{color:'black'}}>{name}</Text>
    <Text style={{color:'grey'}}>{eventdate?.split('T')[0]}</Text>
    {/* <Text style={{color:'grey',fontSize:12}}>{role}</Text> */}
    </View>
    </View>
    <View>
      {/* <TouchableOpacity onPress={onPress} style={{ width: 100, height: 50 ,backgroundColor:'yellow'}} >
        <Text style={styles.DetailButton}>View Details</Text>
      </TouchableOpacity> */}
    {/* <Image source={require('../assets/userpic.jpg')} style={{ width: 50, height: 50 }} /> */}
        </View>
    </TouchableOpacity>
  );
  const renderItem = ({ item }) => (
    <Item name={item.post_title} eventdate={item.event_date} role={userState} image={item.image} onPress={()=>navigation.navigate('JobDetail',item)}/>
  );
  return (
    <>
    {isLoading?
     <View style={[styles.containerSpinner, styles.horizontalSpinner]}>
     <ActivityIndicator size="large" />
   </View> :
     <View style={styles.FlatList}>
     <Header title="Pending Events" headerShown={false}/>
    {
     myEvents.length>0?
     <FlatList
     data={myEvents}
     renderItem={renderItem}
     keyExtractor={(item) => item.id}
     />
     :<Text style={{color:"black",textAlign:"center",fontSize:20}}>No Pending events</Text>
    }
     </View>
    }
    </>
   
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
       },
       FlatList:{
        paddingBottom:40
       },
       DetailButton:{color:'black',
       justifyContent:'center',
       textAlign:'center',
       paddingTop:15
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