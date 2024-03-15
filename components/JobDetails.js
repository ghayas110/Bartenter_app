import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState,useEffect } from 'react'
import HeaderDetails from './HeaderDetails'
import MapView, { Marker } from 'react-native-maps'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
const baseUrl = require('../global')

const JobDetailsScreen = ({route}) => {
  const [users, setusers] = useState("")
  const [usertype,setusertype]=useState(0)
  const [data, setdata] = useState()
  const navigation = useNavigation()
  useEffect(() => {
    async function replacementFunction() {
      const value = await AsyncStorage.getItem("data");
       setusers(JSON.parse(value))
      setusertype(JSON.parse(value).user_data[0].user_type)
      handleSubmit(JSON.parse(value))
    }
    replacementFunction()
  }, [])


  const handleSubmit = async (users) => {
    try {
     await  fetch(`${baseUrl}/posts/GetAllBookedBartenderByPostId/${route?.params?.post_id}`, {
       method: 'GET',
       headers: {
         'Content-Type': 'application/json',
         'x-api-key': 'BarTenderAPI',
         'accesstoken': `Bearer ${users.access_token}`
       },
     })
       .then(response => response.json())
       .then(dataa => {
        console.log(dataa)
        setdata(dataa.posts)
       });
   } catch (error) {
     Alert.alert('An error occurred while processing your request.');
   }
  };


   var latitude=parseFloat(route.params?.event_lat)
   var longitude=parseFloat(route.params?.event_lng)
   const Item = ({ name,image,number,onPress}) => (

    <TouchableOpacity onPress={onPress}  style={{justifyContent:'space-between', flexDirection: 'row', alignItems: 'center',padding: 10,borderBottomWidth: 1, borderBottomColor: 'whitesmoke'   }}>
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
   
    <View style={{marginLeft:15}}>
    <Text style={{color:'grey'}}>{name}</Text>
    <Text style={{color:'grey'}}>{number}</Text>
    </View>
    </View>
    <View>
    <Image source={image!=""?{uri:`https://bartenderbackend.bazazi.co${image}`}:require('../assets/userpic.jpg')} style={{ width: 50, height: 50,borderRadius:7 }} />
        </View>
    </TouchableOpacity>
  
  );
  const renderItem = ({ item }) => (
    <>

    <Item name={item.name} image={item.resume} number={item.number} onPress={()=>navigation.navigate('BartenderProfile',item)} />
    </>
  );









  return (
  
    <View style={styles.container}>
      <HeaderDetails title="Event Details" />
     {
      route.params?
      <ScrollView>
      <View
        style={styles.section}>
          {usertype==1?
           <Text style={{ fontWeight: 'bold', fontSize: 18, color: 'black' }}> Posted by : {route.params.posted_by}</Text>:
           <Text style={{ fontWeight: 'bold', fontSize: 18, color: 'black' }}> Event Name : {route.params.post_title}</Text>

          }
       
      </View>
      <View
        style={styles.section}>
        <Text style={ styles.labels}># of People</Text>
        <Text style={{ fontWeight: 'bold', color: 'black' }}> {route.params.no_of_people} or Less</Text>
      </View>
      <View
        style={styles.section}>
        <Text style={styles.labels}>Theme</Text>
        <Text style={{ fontWeight: 'bold', color: 'black' }}> {route.params.theme} </Text>
      </View>
      <View
        style={styles.section}>
        <Text style={styles.labels}>Phone Number</Text>
        <Text style={{ fontWeight: 'bold', color: 'black' }}> {route.params.contact_phone}</Text>
      </View>
      <View
        style={styles.section}>
        <Text style={styles.labels}>Date and Time</Text>
        <Text style={{ color: 'black', fontWeight: 'bold' }}>{route.params.event_date} </Text>
      </View>
      <View
        style={styles.section}>
        <Text style={styles.labels}>Event Duration</Text>
        <Text style={{ color: 'black', fontWeight: 'bold' }}>{route.params.event_duration} hours </Text>
      </View>
      <View
        style={styles.section}>
        <Text style={styles.labels}>Hourly Rate</Text>
        <Text style={{ color: 'black', fontWeight: 'bold' }}> $ {route.params.bartender_hourly_rate}</Text>
      </View>
      <View
        style={styles.section}>
        <Text style={styles.labels}>Timestamp</Text>
        <Text style={{ color: 'black', fontWeight: 'bold' }}> {route.params.event_time}</Text>
      </View>
      <View
        style={styles.section}>
        <Text style={styles.labels}>Location</Text>
        <Text style={{ color: 'black', fontWeight: 'bold' }}>{route.params.event_location}  </Text>
      </View>
      <View
    style={styles.section}>
    
      {
       data?.length>0?
       <Text style={{color:"black",fontWeight:"bold"}}>Booked Bartender</Text>:""
      }
      
        <FlatList
     data={data}
    renderItem={renderItem}
    keyExtractor={(item) => item.id}
    />
   </View>
    
      <View
        style={styles.section}>
        <Text style={styles.labels}>Unique Id</Text>
        <Text style={{ color: 'black', fontWeight: 'bold' }}>{route.params.post_uuid}</Text>
      </View>
    
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={{
            latitude: latitude,
          longitude: longitude,
          }}
          title={"Marker Title"}
          description={"Marker Description"}
        />
      </MapView>
      {/* {userType ==1 ? 
      <View style={{ display: 'flex', alignItems: "center", justifyContent: 'center' }}>
        <ButtonInput title={"Take Job"} />
        <ButtonInput title={"Start Chat"} />
      </View>:
      ""  } */}
      
    </ScrollView>
    :""
     }
    </View>
  )
}

export default JobDetailsScreen


const styles = StyleSheet.create({

  map: {
    width: "100%",
    height: 200,
  },
  container: {
    backgroundColor: 'white',
    height: '100%',
    paddingBottom:30
  },
  section: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    width: '100%',
    paddingTop: 10,
    paddingHorizontal: 10,
    margin: 5,

  },
  sections: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '100%',
    paddingTop: 10,
    paddingHorizontal: 10,
    margin: 5,

  },
  labels: { 
    fontWeight: 'bold',
    color: 'grey' }
});