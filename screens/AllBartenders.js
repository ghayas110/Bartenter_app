import { Button, StyleSheet, Text, View,SafeAreaView, TouchableOpacity,FlatList,Image, TextInput, Alert } from 'react-native'
import React,{useEffect, useState} from 'react'
import Header from '../components/Header'
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation,useIsFocused } from '@react-navigation/native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import SelectDropdown from 'react-native-select-dropdown'
import FormTextInput from '../components/FormTextInput';
const AllBartenders = () => {
const [userId, setuserId] = useState(0)
 const [data, setdata] = useState()
 const [datas, setdatas] = useState()
 const [speciality, setspeciality] = useState("")
 const [availabilties, setavailabilties] = useState("1")
 const [ratings, setratings] = useState("null")
const navigation = useNavigation();
const isFocused = useIsFocused();
const [users, setusers] = useState("")
const rating = ["1", "2", "3", "4","5"]
const availabilty = ["No","Yes"]
const [searchQuery, setSearchQuery] = useState("");
const handleSearch = (text) => {
  setspeciality(text);

};


useEffect(() => {
  async function replacementFunction() {
    const value = await AsyncStorage.getItem('data');
    AsyncStorage.setItem('data', value)
    setusers(JSON.parse(value))
    setuserId(JSON.parse(value).user_data[0].id);
    AllChats(JSON.parse(value).user_data[0].access_token)
  }
  replacementFunction()
}, [isFocused,availabilties,ratings,speciality]);
  const AllChats = async (access_token) => {
    // Your existing login logic
    // &minRating=0
      try {
        console.log(availabilties,"sss")
        console.log(speciality,"jjj")
        console.log(ratings,"kkkkk")
          fetch(`https://bartender.logomish.com/users/GetAllBartenders?availability=${availabilties}&skills=${speciality}&minRating=${ratings}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'x-api-key':'BarTenderAPI',
              'accesstoken':`Bearer ${access_token}`
            },
            
          })
          .then(response => {
            return response.json()
          })
          .then(chat => {
            console.log(chat)
            if (chat.message) {
            setdata(chat.users)
            setdatas(chat.users)
              // navigation.navigate('OtpS')
            } else {
              Alert.alert("Chat","No Cat Found")
            }
          }).catch(err=>{
            console.log(err,"dddd")
          })
      } catch (error) {
      console.log('An error occurred while processing your request.',error);
      }
   
  };

  
  // useEffect(() => {
  //   AllChats(userId)
  //     }, [userId])
  const Item = ({ id, name,message, role,image,onPress,sender,seen_status}) => (
    <TouchableOpacity onPress={onPress} style={{justifyContent:'space-between', flexDirection: 'row', alignItems: 'center',padding: 10,borderBottomWidth: 1, borderBottomColor: 'whitesmoke'   }}>
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
    <View style={{marginLeft:15}}>
    <Text style={{color:'grey'}}>{name}</Text>
  
  
    <Text style={{color:'grey',fontSize:12}}>{role}</Text>

    </View>
    </View>
    <View>
    <Image source={image!=""?{uri:`https://bartender.logomish.com${image}`}:require('../assets/userpic.jpg')} style={{ width: 50, height: 50,borderRadius:7 }} />
        </View>

    </TouchableOpacity>
  );
  const renderItem = ({ item }) => (
    // item.seen_status==0 && item.sender !==userId ?
    <Item name={item.name} image={item.image}  onPress={()=>{navigation.navigate('Bartender',item)}}/>
  );
  return (
    <SafeAreaView>
    {/* <Header title="Chat" headerShown={true}/> */}
    <SafeAreaView>
    <View style={styles.headerContainer}>
    <View style={styles.siders}>
    <TouchableOpacity onPress={()=>navigation.openDrawer("helloo")}>
    <Icon name="menu" size={24} color="#fff" />
    </TouchableOpacity>
   
    </View>
    <Text style={styles.headerText}>Bartenders</Text>

  <View style={{display:'flex',alignItems:'center',justifyContent:'space-between',flexDirection:'row'}}>

  
  <SelectDropdown
  buttonStyle={{width:'40%',marginTop:10,borderRadius:50,backgroundColor: '#D98100',}}
  buttonTextStyle={{fontSize:12,color:"white",fontWeight:'bold'}}
  defaultButtonText="Avalibilaty"
	data={availabilty}
	onSelect={(selectedItem, index) => {
		console.log(selectedItem, index)
        setavailabilties(index)
	}}
	buttonTextAfterSelection={(selectedItem, index) => {
		// text represented after item is selected
		// if data array is an array of objects then return selectedItem.property to render after item is selected
		return selectedItem
	}}
	rowTextForSelection={(item, index) => {
		// text represented for each item in dropdown
		// if data array is an array of objects then return item.property to represent item in dropdown
		return item
	}}
/>
<SelectDropdown
  buttonStyle={{width:'40%',marginTop:10,borderRadius:50,backgroundColor: '#D98100',}}
  buttonTextStyle={{fontSize:12,color:"white",fontWeight:'bold'}}
  defaultButtonText="Rating"
	data={rating}
  onSelect={(selectedItem, index) => {
		console.log(selectedItem, index)
        setratings(selectedItem)
	}}
	buttonTextAfterSelection={(selectedItem, index) => {
		// text represented after item is selected
		// if data array is an array of objects then return selectedItem.property to render after item is selected
		return selectedItem
	}}
	rowTextForSelection={(item, index) => {
		// text represented for each item in dropdown
		// if data array is an array of objects then return item.property to represent item in dropdown
		return item
	}}
/>

</View>
<View style={styles.searchContainer}>
    <Icon name="search" size={20} color="orange" />
    <TextInput
      style={styles.input}
      placeholder="Speciality"
      placeholderTextColor={"orange"}
      value={speciality}
      onChangeText={handleSearch}
      
    />
  </View>
    </View>
 
    </SafeAreaView>
    <View style={styles.container}>
    <FlatList
    data={data}
    renderItem={renderItem}
    keyExtractor={(item) => item.id}
    />
  
    </View>

    </SafeAreaView>
  )
}

export default AllBartenders

const styles = StyleSheet.create({
  container: {
   width:'auto',
   height:"78.5%",
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
  },
  siders:{
    display:'flex',
    alignItems:'center',justifyContent:'space-between',
    flexDirection:'row'
      },
        headerContainer: {
            backgroundColor: '#FFA500',
            paddingTop: 40,
            paddingBottom: 10,
            paddingLeft: 20,
            paddingRight: 20,
          },
          headerText: {
            color: '#fff',
            fontSize: 24,
            fontWeight: 'bold',
          },
          searchContainer: {
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            backgroundColor: '#D98100',
            paddingHorizontal: 10,
            marginTop: 10,
            height:40,
            borderRadius:10
          },
          input: {
            marginLeft: 10,
            flex: 1,
          },
})