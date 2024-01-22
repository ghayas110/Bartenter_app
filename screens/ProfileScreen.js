import { Button, StyleSheet, Text, View,SafeAreaView, TouchableOpacity,FlatList,Image } from 'react-native'
import React,{useState,useEffect} from 'react'
import Header from '../components/Header'
import Icon from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { RadioButton } from 'react-native-paper';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { Checkbox } from 'react-native-paper';
import { useSelector } from 'react-redux'
import { decrement, increment } from './counterSlice'
import AdminProfileDetails from '../components/AdminProfileDetails';
import ProfileDetails from '../components/ProfileDetails';
import UserDetails from '../components/UserDetails';
const ProfileScreen = (props) => {
  const navigation = useNavigation();
  const [selectedId, setSelectedId] = useState(null);
  const count = useSelector((state) => state.auth.user)
  const userState = count.user_data[0].user_type
  console.log(userState,"userkadata")
  const [checked, setChecked] = useState(false);
  const [imageUri, setImageUri] = useState(`https://bartender.logomish.com/${count.user_data.image}`);
  const [data, setdata] = useState()

  const handleSubmit = async () => {

    try {
      fetch(`https://bartender.logomish.com/users/GetUserById/${count.user_data[0].id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key':'BarTenderAPI',
          'accesstoken':`Bearer ${count?.access_token}`
        },
      })
      .then(response => response.json())
      .then(dataa => {
        setImageUri(`https://bartender.logomish.com/${dataa?.users[0].image}`)
       setdata(dataa?.users[0])
       console.log(dataa?.users[0]?.speciality ,"mera")
      });
    } catch (error) {
      Alert.alert('An error occurred while processing your request.');
    }
 
};
  useEffect(() => {
   
    handleSubmit()
  }, [])

  // const data = [
  //   { id: 1, name: 'John Brown', role: 'Host', image: require('../assets/userpic.jpg'),email:'csjguy@gmail.com',PhoneNumber:"999-999-999" },
  //   { id: 1, name: 'John Brown', role: 'Host', image: require('../assets/userpic.jpg'),email:'csjguy@gmail.com',PhoneNumber:"999-999-999" },
    
  // ];

  const Item = ({ id, name, role, image, onPress }) => (
    <TouchableOpacity onPress={onPress} style={{justifyContent:'space-between', flexDirection: 'row', alignItems: 'center',padding: 10, }}>
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
    <BouncyCheckbox  fillColor="black"
    unfillColor="#FFFFFF" onPress={(isChecked) => {}} innerIconStyle={{
      borderRadius: 0,
       // to make it a little round increase the value accordingly
    }} />

    <Image source={image} style={{ width: 50, height: 50,borderRadius:50 }} />
    <View style={{marginLeft:15}}>
    <Text style={{color:'black'}}>{name}</Text>
    <Text style={{color:'black'}}>{role}</Text>
    </View>
    </View>
    <View>
    <Icon name="right" size={24} color="black" />
    </View>
    </TouchableOpacity>
  );
  const renderItem = ({ item }) => (
    <Item name={item.name} role={item.role} image={item.image}  onPress={() => navigation.navigate('Details', {item})}/>
  );
  return (
    <SafeAreaView style={{backgroundColor:"white",height:'100%'}}>
    <Header title="Profile"/>
  {userState == 1 ? 
    <View>
    {console.log(imageUri)}
  <ProfileDetails speciality={data?.speciality} signatureDrink={data?.signature_drink} />
    </View>
    :userState == 2 ? 
<View>
<UserDetails/>
</View>
  :
  <>
  <FlatList
  data={data}
  renderItem={renderItem}
  keyExtractor={(item) => item.id}
  />
  </>
  }
    

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