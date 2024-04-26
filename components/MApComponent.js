import React, { useEffect, useRef, useState } from 'react';
import { Button, StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import Icons from './Icons';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';

const MapComponent = ({onPress,dataSend}) => {
  var navigation=useNavigation()
  const gMap = useRef(null)


  return (
    <View style={styles.container}>
      <MapView
      ref={gMap}
        style={styles.map}
        initialRegion={{
          latitude: 37.0902, // Center of the USA
          longitude: -95.7129, // Center of the USA
          latitudeDelta: 40, // Zoom level for latitude
          longitudeDelta: 40, // Zoom level for longitude
        }}
        focusable
   
      >
        {dataSend?.map((item,index) =>(
          <View key={index}>
       

         
          <Marker
          key={index}
          coordinate={{
            latitude: item.event_lat,
            longitude: item.event_lng,
          }}
          // identifier={index}
          title={item.post_title}
          focusable
       
        />
         </View>
        ))}
        
      </MapView>
      <View style={styles.buttonContainer}>
   
        <TouchableOpacity style={{marginLeft:10,width:50,height:50,backgroundColor:'orange',display:'flex',alignItems:'center',justifyContent:'center',borderRadius:50}} onPress={()=>navigation.navigate('BookedEvents')}>
          <Icons.AntDesign name="menuunfold" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  mapicon: {
    width: 50,
    height: 50,
    margin:10
  },
  buttonContainer: {
    position: 'absolute', //Here is the trick
    top: '65%', //Position from top
    right: '5%', //Position from right
  },
});

export default MapComponent;
