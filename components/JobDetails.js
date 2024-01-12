import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import HeaderDetails from './HeaderDetails'

const JobDetails = ({post_title,post_description,contact_email,contact_phone,event_date,event_duration}) => {
  return (
    <View style={styles.container}>
    <HeaderDetails title="Job Details"/>
    <View >
    <View
    style={styles.section}>
      <Text style={{marginBottom: 10}}>Job title</Text>
      <Text style={{fontWeight: 'bold'}}> {post_title}</Text>
    </View>
    <View
    style={styles.section}>
      <Text style={{marginBottom: 10}}>Job Description</Text>
      <Text style={{fontWeight: 'bold'}}> {post_description}</Text>
    </View>
    <View
    style={styles.section}>
      <Text style={{marginBottom: 10}}>Email</Text>
      <Text style={{fontWeight: 'bold'}}> {contact_email}</Text>
    </View>
    <View
    style={styles.section}>
      <Text style={{marginBottom: 10}}>Phone</Text>
      <Text style={{fontWeight: 'bold'}}> {contact_phone}</Text>
    </View>
    <View
    style={styles.section}>
      <Text style={{marginBottom: 10}}>Date and time</Text>
      <Text>{event_date} </Text>
    </View>
    <View
    style={styles.section}>
      <Text style={{marginBottom: 10}}>Event Duration</Text>
      <Text>{event_duration} hours </Text>
    </View>

    <View
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: '100%',
        padding: 10,
      }}>
      <Text style={{marginBottom: 10}}>Phone Number</Text>
      <Text>999-999-999 </Text>
    </View>
    </View>
  
  
  </View>
  )
}

export default JobDetails


const styles = StyleSheet.create({
    container:{
        backgroundColor:'white',
        height:'100%'
    },
  section: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '100%',
    paddingTop: 10,
    paddingHorizontal: 10,
    margin: 5,
    borderBottomColor: 'black',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});