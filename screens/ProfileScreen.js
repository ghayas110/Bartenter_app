import { Button, StyleSheet, Text, View,SafeAreaView, TouchableOpacity,FlatList,Image } from 'react-native'
import React,{useState} from 'react'
import Header from '../components/Header'
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { RadioButton } from 'react-native-paper';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [selectedId, setSelectedId] = useState(null);
  const data = [
    { id: 1, name: 'John Brown', role: 'Host', image: require('../assets/userpic.jpg') },
    { id: 2, name: 'Bartinder', role: 'Bartender', image: require('../assets/userpic.jpg') },
    
  ];
  const Item = ({ id, name, role, image, selectedId, setSelectedId, onPress }) => (
    <TouchableOpacity onPress={onPress} style={{justifyContent:'space-between', flexDirection: 'row', alignItems: 'center',padding: 10, }}>
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
    <RadioButton
    value={id}
    status={ selectedId === id ? 'checked' : 'unchecked' }
    onPress={() => setSelectedId(id)}
    />
    <Image source={image} style={{ width: 50, height: 50 }} />
    <View style={{marginLeft:15}}>
    <Text>{name}</Text>
    <Text>{role}</Text>
    </View>
    </View>
    <View>
    <Icon name="arrow-forward" size={24} color="black" />
    </View>
    </TouchableOpacity>
  );
  const renderItem = ({ item }) => (
    <Item name={item.name} role={item.role} image={item.image} selectedId={selectedId}  setSelectedId={setSelectedId} onPress={() => navigation.navigate('Details', {item})}/>
  );
  return (
    <SafeAreaView>
    <Header title="Profile" headerShown={true}/>
  
    
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />

    </SafeAreaView>
  )
}

export default ProfileScreen

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