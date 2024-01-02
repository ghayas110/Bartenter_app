import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import Header from './Header';

export default function ProfileDetails({}) {
  return (

    <View style={styles.card}>
  
      <ImageBackground source={require('../assets/cardimg.png')} style={styles.image}>
        <Text style={styles.title}>New Years Eve</Text>
        <Text style={styles.title}>16 – 30</Text>
      </ImageBackground>
      <View style={styles.title}>
      <Text style={styles.text}>Host Email: cesigary@gmail.com</Text>
      <Text style={styles.text}>Theme: Red and White</Text>
      <Text style={styles.text}>Phone Number: 9193363336</Text>
      <Text style={styles.text}>Date and Time: November 7, 2020 at 9:00 AM</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 6,
    elevation: 3,
    backgroundColor: '#fff',
    shadowOffset: { width: 1, height: 1 },
    shadowColor: '#333',

  },
  image: {
    width: '100%', // specify the width
    height: 200, // specify the height
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
  }
});
