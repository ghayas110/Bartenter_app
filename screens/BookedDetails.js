import {StyleSheet, Text, View,TouchableOpacity,FlatList,Image} from 'react-native';
import React ,{useState,useEffect}from 'react';
import HeaderDetails from '../components/HeaderDetails';
import Icon from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const baseUrl = require('../global')
const BookedDetails = ({route}) => {
  const [userState, setuserState] = useState(11)
  const [users, setusers] = useState("")
  const [data2, setdata] = useState()

  const [imageUri, setImageUri] = useState('');

  useEffect(() => {
    async function replacementFunction() {
      const value = await AsyncStorage.getItem('data');
      AsyncStorage.setItem('data', value)
      setusers(JSON.parse(value));
      setuserState(JSON.parse(value)?.user_data[0]?.user_type);
      handleSubmit(JSON.parse(value));
    }
    replacementFunction()
  }, [userState,route]);

  const handleSubmit = async (userss) => {
    try {
      await fetch(`${baseUrl}/users/GetUserById/${userss.user_data[0].id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': 'BarTenderAPI',
          'accesstoken': `Bearer ${userss.access_token}`
        },
      })
        .then(response => response.json())
        .then(dataa => {
          console.log("USERRRRRRRRRRRRRRR",dataa,"USERRRRRRRRRRRRRRR")
          if (dataa?.users.length > 0) {
            setImageUri(`https://bartender.logomish.com${dataa?.users[0]?.image}`)
            setdata(dataa?.users)
          }
        });
    } catch (error) {
      Alert.alert('An error occurred while processing your request.');
    }

  };
    const navigation = useNavigation()
    console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhhhh",route.params)
    const data = route.params.item
    const datas = [
        { id: 1, name: 'John Brown', role: 'Bartender', image: require('../assets/userpic.jpg'),email:'csjguy@gmail.com',PhoneNumber:"999-999-999" },
        
      ];
      const commentData = [
        { id: 1, name: 'John Brown', comment: 'i am Bartender', image: require('../assets/userpic.jpg'),date:'7 November 2024 12:12:12' },
        
      ];
      const Item = ({ id, name, role, image,onPress }) => (
        <TouchableOpacity onPress={onPress} style={{justifyContent:'space-between', flexDirection: 'row', alignItems: 'center',padding: 10, }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
     
        {console.log(imageUri,"uriiiiiiii")}
        <Image source={imageUri==''?{uri:imageUri}:require('../assets/userpic.jpg')} style={{ width: 50, height: 50,borderRadius:50 }} />
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
      const CommentItem = ({ id, name, comment, image,date }) => (
        <TouchableOpacity  style={{justifyContent:'space-between', flexDirection: 'row', alignItems: 'center',padding: 10, }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
     
    
        <Image source={image} style={{ width: 50, height: 50,borderRadius:50 }} />
        <View style={{marginLeft:15}}>
        <View style={{display:'flex',flexDirection:'row'}}>
        <Text style={{color:'black'}}>{name}  </Text>
        <Text style={{color:'black',fontSize:11}}>{date}</Text>
        </View>
        <View style={{width:"70%",backgroundColor:'#f6f6f6',borderRadius:20,padding:20}}>
        <Text style={{color:'black'}}>{comment}</Text>
        </View>
        </View>
        </View>
   
        </TouchableOpacity>
      );
      const renderComment = ({ item }) => (
        <CommentItem name={item.name} comment={item.comment} image={item.image} date={item.date}
        // onPress={() => navigation.navigate('DetailScreen', {item})}
        />
      );
      const renderItem = ({ item }) => (
        <Item name={item.name} role='Bartender' image={imageUri} onPress={() => navigation.navigate('DetailScreen', {item})}/>
      );
  return (
    <View style={styles.container}>
      <HeaderDetails title="Booked"/>
      <View >
      <View
      style={styles.section}>
        <Text style={{marginBottom: 10,color:"black"}}># of people</Text>
        <Text style={{fontWeight: 'bold',color:"black"}}> {data.no_of_people} or Less</Text>
      </View>

      <View
      style={styles.section}>
        <Text style={{marginBottom: 10,color:"black"}}>Date and time</Text>
        <Text style={{color:"black"}}>{data.event_date} </Text>
      </View>
      <View
      style={styles.section}>
        <Text style={{marginBottom: 10,color:"black"}}>Event Duration</Text>
        <Text style={{color:"black"}}>{data.event_duration} </Text>
      </View>

      <View
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'row',
          width: '100%',
          padding: 10,
        }}>
        <Text style={{marginBottom: 10,color:"black"}}>Phone Number</Text>
        <Text style={{color:"black"}}>{data.contact_phone} </Text>
      </View>
      </View>
      <View style={{padding:10}}>
      <Text style={{fontWeight:'bold',color:'black'}}>Confirmed Bartender</Text>
      <FlatList
      data={data2}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
      </View>
      <View style={{padding:10}}>
      <Text style={{fontWeight:'bold',color:'black'}}>comments</Text>
      <FlatList
      data={commentData}
      renderItem={renderComment}
      keyExtractor={(item) => item.id}
    />
      </View>
      <View>
      <View  style={{justifyContent:'space-between', flexDirection: 'row', alignItems: 'center',paddingHorizontal: 20, }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
   
  
      <Image source={require('../assets/userpic.jpg')} style={{ width: 50, height: 50,borderRadius:50 }} />
      <View style={{marginLeft:15}}>
      <TouchableOpacity style={{display:'flex',flexDirection:'row'}} onPress={()=>navigation.navigate('CommentScreen')}>
      <Text style={{color:'orange'}}>Add comment...  </Text>
   
      </TouchableOpacity>
    
      </View>
      </View>
  
      </View>
      </View>
    </View>
  );
};

export default BookedDetails;

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
