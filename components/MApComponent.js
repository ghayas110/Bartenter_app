import React from 'react';
import { Button, StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import Icons from './Icons';
import MapView, { Marker } from 'react-native-maps';

const MapComponent = ({onPress,dataSend}) => {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 35.7796,
          longitude: -78.6382,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {dataSend?.map(item =>(
          <Marker
          coordinate={{
            latitude: item.event_lat,
            longitude: item.event_lng,
          }}
          title={item.post_name}
          description={"Marker Description"}
        />
        ))}
        
      </MapView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={{width:50}}>
          <Image
            style={styles.mapicon}
            source={require('../assets/mapIcon.png')} // replace with your image path
          />
        </TouchableOpacity>
        <TouchableOpacity style={{marginLeft:10,width:50,height:50,backgroundColor:'orange',display:'flex',alignItems:'center',justifyContent:'center',borderRadius:50}} onPress={onPress}>
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
    top: '55%', //Position from top
    right: '5%', //Position from right
  },
});

export default MapComponent;
