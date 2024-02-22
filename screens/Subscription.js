import { Button, StyleSheet, Text, View,SafeAreaView, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import Header from '../components/Header'
import ButtonInput from '../components/ButtonInput'

const Subscription = ({navigation}) => {
  
  return (
    <SafeAreaView>
    <Header title="Subscription" headerShown={false}/>
  
    <View style={styles.container}>
    <View style={{borderWidth:1,display:'flex',alignItems:'center',justifyContent:'center',padding:30,borderRadius:20}}>
      <Image source={require('../assets/logo.png')}/>
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
        Bartinder Annual Subscription
      </Text>
      <Text style={{ fontSize: 16, marginBottom: 10 }}>
        $400.00
      </Text>
      <ButtonInput title={"Subscribe"} />
    </View>

  </View>
    </SafeAreaView>
  )
}

export default Subscription

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