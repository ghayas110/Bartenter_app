import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import HeaderDetails from './HeaderDetails'
import MapView, { Marker } from 'react-native-maps'
import ButtonInput from './ButtonInput'

const JobDetails = ({post_title,hourlyRate,location,noofpeople,uniqueId,contact_phone,theme,event_date,event_duration}) => {
  return (
  <View style={styles.container}>
    <HeaderDetails title="New User"/>
    <ScrollView>
    <View
    style={styles.section}>
  
      <Text style={{fontWeight: 'bold',fontSize:18,color:'black'}}> New User</Text>
    </View>
    <View
    style={styles.section}>
      <Text style={{fontWeight: 'bold'}}># of People</Text>
      <Text style={{fontWeight: 'bold',color:'black'}}> {noofpeople} or Less</Text>
    </View>
    <View
    style={styles.section}>
      <Text style={{fontWeight: 'bold'}}>Theme</Text>
      <Text style={{fontWeight: 'bold',color:'black'}}> {theme} </Text>
    </View>
    <View
    style={styles.section}>
      <Text style={{fontWeight: 'bold'}}>Phone Number</Text>
      <Text style={{fontWeight: 'bold',color:'black'}}> {contact_phone}</Text>
    </View>
    <View
    style={styles.section}>
      <Text style={{fontWeight: 'bold'}}>Date and Time</Text>
      <Text style={{color:'black',fontWeight: 'bold'}}>{event_date} </Text>
    </View>
    <View
    style={styles.section}>
      <Text style={{fontWeight: 'bold'}}>Event Duration</Text>
      <Text style={{color:'black',fontWeight: 'bold'}}>{event_duration} hours </Text>
    </View>
    <View
    style={styles.section}>
      <Text style={{fontWeight: 'bold'}}>Hourly Rate</Text>
      <Text style={{color:'black',fontWeight: 'bold'}}> $ {hourlyRate}</Text>
    </View>
    <View
    style={styles.section}>
      <Text style={{fontWeight: 'bold'}}>Timestamp</Text>
      <Text style={{color:'black',fontWeight: 'bold'}}> 12/12/2023 2:30 PM</Text>
    </View>
    <View
    style={styles.section}>
      <Text style={{marginBottom: 1}}>Location</Text>
      <Text style={{color:'black',fontWeight: 'bold'}}>{location}  </Text>
    </View>
    <View
    style={styles.section}>
      <Text style={{marginBottom: 1}}>Unique Id</Text>
      <Text style={{color:'black',fontWeight: 'bold'}}>{uniqueId}  </Text>
    </View>
  
    <MapView
    style={styles.map}
    initialRegion={{
      latitude: 35.7796,
      longitude: -78.6382,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }}
    >
    <Marker
    coordinate={{
      latitude: 35.7796,
      longitude: -78.6382,
    }}
    title={"Marker Title"}
    description={"Marker Description"}
    />
    </MapView>
    <View style={{display:'flex',alignItems:"center",justifyContent:'center'}}>
    <ButtonInput title={"Take Job"}/>
    <ButtonInput title={"Start Chat"}/>
    </View>
    </ScrollView>
  </View>
  )
}

export default JobDetails


const styles = StyleSheet.create({

  map: {
    width: "100%",
    height: 200,
  },
    container:{
        backgroundColor:'white',
        height:'100%'
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
});