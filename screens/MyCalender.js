import { FlatList, StyleSheet, Text, TouchableOpacity,ActivityIndicator, View ,ScrollView, TurboModuleRegistry, Alert, Button} from 'react-native'
import React ,{useState,useEffect} from 'react'
import Header from '../components/Header'
import { useNavigation ,useIsFocused} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';
import messaging from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';
const baseUrl = require('../global')
const MyCalender = ({route}) => {
  const [userState, setuserState] = useState(11)
  const [users, setusers] = useState("")
  const [data, setdata] = useState()
  const [bookedEvents, setBookedEvents] = useState([])
  const [imageUri, setImageUri] = useState(`${baseUrl}/${users?.image}` || '');
  const isFocused = useIsFocused();
  const [isLoading, setIsLoading] = useState(false);
  const adUnitId = __DEV__ ? TestIds.ADAPTIVE_BANNER : 'ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy';

  useEffect(() => {
    async function replacementFunction() {
      const value = await AsyncStorage.getItem('data');
      AsyncStorage.setItem('data', value)
      setusers(JSON.parse(value));
      setuserState(JSON.parse(value)?.user_data[0]?.user_type);
      handleSubmit(JSON.parse(value));
      getAllPosts()
     
    }
    replacementFunction()
    getDeviceToken()
  }, [userState,route,isFocused]);

const getDeviceToken =async()=>{
 
  let token = await messaging().getToken();

  }
  useEffect(() => {
    const unsubscribeBackground = messaging().onMessage(async remoteMessage => {
      const notifeeData = remoteMessage;
     
      const permission = await notifee.requestPermission();
      const channelId = await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
      });
  
      await notifee.displayNotification({
        title: notifeeData.notification.title,
        body: notifeeData.notification.body,
        android: {
          channelId,
          // pressAction is needed if you want the notification to open the app when pressed
          pressAction: {
            id: 'default',
          },
        },
      });
      
    });


    return unsubscribeBackground;
  }, []);
  async function onDisplayNotification() {
    // Request permissions (required for iOS)
    await notifee.requestPermission()

    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

    // Display a notification
    await notifee.displayNotification({
      title: 'Notification Title',
      body: 'Main body content of the notification',
      android: {
        channelId,
        // pressAction is needed if you want the notification to open the app when pressed
        pressAction: {
          id: 'default',
        },
      },
    });
  }
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
          if (dataa?.users.length > 0) {
            setImageUri(`${baseUrl}/${dataa?.users[0]?.image}`)
            setdata(dataa?.users[0])
          }
        });
    } catch (error) {
      // Alert.alert('An error occurred while processing your request.');
    }

  };
  const getAllPosts = async () => {
    try {
      setIsLoading(true)
      await fetch(`${baseUrl}/posts/GetAllBookedPosts`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': 'BarTenderAPI',
          'accesstoken': `Bearer ${users.access_token}`
        }
      }).then(response => response.json())
        .then(data => {
       
          setIsLoading(false)
          if (data.data.length > 0) {
            setBookedEvents([...data.data])
          }
          else{
            setBookedEvents([])
          }
        })
    } catch (error) {
      // Alert.alert('An error occurred while processing your request.');

    }
  }
const navigation =useNavigation()
 
  const Item = ({ PhoneNumber, name,email, DateTime,theme, image, onPress }) => {
   
    return(
    <TouchableOpacity onPress={onPress} style={styles.card}>


    <Text style={styles.text1}>{name}</Text>


 
    <Text style={styles.text}>{theme}</Text>



    <Text style={{ fontSize: 16,
      color: 'grey', // white color for better visibility on image
      marginBottom: 5,
      fontSize:14,
      fontWeight:'bold'}}>{DateTime}</Text>

   
 
  </TouchableOpacity>
  )}
  const renderItem = ({ item }) => (
    <Item name={item.post_title} email={item.email} image={item.image} theme={item.theme} PhoneNumber={item.contact_phone} DateTime={item.event_date} onPress={() => navigation.navigate('BookedDetails', {item})}/>
  );
  return (
    <>
      {
        isLoading  ?
        <>
          <View style={[styles.containerSpinner, styles.horizontalSpinner]}>
            <ActivityIndicator size="large" />
          </View> 
        </>:
         <>
         {

         
         bookedEvents.length > 0?
         <>
          <Header title="My Calender" headerShown={true}/>
          <BannerAd
      unitId={adUnitId}
      size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
    />
        <FlatList
        data={bookedEvents}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        />
       
         </>
        
        :
        <>
        <Header title="My Calender" headerShown={true}/>
        <Text style={{color:"black",textAlign:"center",fontSize:20}}>No booked events</Text>
        </>
         }
        </>      
      }
     
    </>
  )
}

export default MyCalender

const styles = StyleSheet.create({
  cardtext:{
    display:'flex',
    flexDirection:'column',
      },
      cardtext2:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between'
          },
      card: {
        borderRadius: 10,
        elevation: 3,
        backgroundColor: '#fff',
        shadowOffset: { width: 1, height: 1 },
        shadowColor: '#333',
        shadowOpacity: 0.3,
        shadowRadius: 2,
        marginHorizontal: 10,
        marginVertical: 6,
        padding: 20
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
        marginBottom: 5,
        fontWeight:'bold'

      },
      text1: {
        fontSize: 14,
        color: 'orange', // white color for better visibility on image
   
      },
    container: {
        width:'auto',
        height:"87%",
    
         backgroundColor: '#fff',
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
       containerSpinner: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center', 
        backgroundColor: 'rgba(0, 0, 0, 0.5)', 
      },
      horizontalSpinner: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 20, 
        borderRadius: 10,
        backgroundColor: '#fff', 
        
      }
})