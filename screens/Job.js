import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from '../components/Header'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const Job = () => {
  return (
    <View>
    <Header title="Jobs" headerShown={true}/>
  
    <View style={styles.container}>
    <Icon name="glass-cocktail" size={80} color="#ccc" />
    <Text style={styles.text}>No Jobs Avalible</Text>

  </View>
    </View>
  )
}

export default Job

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
       }
})