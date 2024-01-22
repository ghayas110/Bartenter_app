import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet,Dimensions } from 'react-native';
import { black } from 'react-native-paper/lib/typescript/styles/colors';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const YesNoSelector = ({ specialties, onSpecialtySelected }) => {
  const [selectedSpecialty, setSelectedSpecialty] = useState('');

  const handlePress = (specialty) => {
    setSelectedSpecialty(specialty);
    onSpecialtySelected(specialty);
  };

  return (
    <View style={styles.container}>
    {specialties.map((specialty, index) => (
      <TouchableOpacity
        key={specialty}
        style={[
          styles.button,
          selectedSpecialty === specialty ? styles.selected : styles.unselected,
      
        ]}
        onPress={() => handlePress(specialty)}
      >
        <Text style={[selectedSpecialty === specialty ? styles.selected : styles.unselected]}>{specialty}</Text>
      </TouchableOpacity>
    ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
   backgroundColor:'orange',
   marginRight: 10,
   marginTop: 10,
   display:'flex',
   flexDirection: "row",
   alignItems:'center',
   justifyContent: "space-around",
   borderRadius:10,
   padding: 10
  },
  button: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
    textAlign:'center',
    borderRadius: 5,
    width:'50%'
  },

  selected:{
    backgroundColor:'white',
    color:"orange",
    fontWeight:'800',
    textAlign:'center'
  },
  unselected:{
    backgroundColor:'orange',
    color:'whitesmoke',fontWeight:'800',  textAlign:'center' 
  }
});

export default YesNoSelector;
