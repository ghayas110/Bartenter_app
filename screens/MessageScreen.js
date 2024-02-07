import { useContext, useEffect, useLayoutEffect, useState } from "react";
import {
  FlatList,
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  TouchableOpacity,
  Dimensions,
  Alert
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import io from 'socket.io-client';
import { ScrollView } from "react-native-gesture-handler";
import HeaderDetails from "../components/HeaderDetails";
import { useNavigation,useIsFocused } from '@react-navigation/native';
import ButtonInput from "../components/ButtonInput";
import ChatInput from "../components/ChatInput";
import Icons from "../components/Icons";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default function Messagescreen( {route} ) {
//   const { currentGroupName, currentGroupID } = route.params;
console.log(route.params.id,"uteettetettetettetetet")
const [userId, setuserId] = useState(0)
const [currentChatMesage, setCurrentChatMessage] = useState()
const [messages, setMessages] = useState([]);
const isFocused = useIsFocused();

useEffect(() => {
  async function replacementFunction() {
    const value = await AsyncStorage.getItem('data');
    AsyncStorage.setItem('data', value)
    setuserId(JSON.parse(value).user_data[0].id);
  }
  replacementFunction()
}, [isFocused]);

    const socket = io('https://bartendersocket.logomish.com');
    useEffect(() => {
        socket.on('chat message', (msgs) => {
            console.log("socket working",msgs)
          setMessages(msgs);
        });
      }, []);
const sendMessage = () => {
  console.log("sendMessage")
      if(currentChatMesage!=""){
        const msgs = { sender: userId, receiver: route.params.id, message:currentChatMesage };
    console.log('chat message', msgs);
    socket.emit('chat message', msgs);
    setCurrentChatMessage('');
      }
  };
//   console.log(messages,item.route.params.userId)
//   const {
//     allChatMessages,
//     setAllChatMessages,
//     currentUser,
//     currentChatMesage,
//     setCurrentChatMessage,
//   } = useContext(GlobalContext);

//   function handleAddNewMessage() {
//     const timeData = {
//       hr:
//         new Date().getHours() < 10
//           ? 0${new Date().getHours()}
//           : new Date().getHours(),
//       mins:
//         new Date().getMinutes() < 10
//           ? 0${new Date().getMinutes()}
//           : new Date().getMinutes(),
//     };

//     if (currentUser) {
//       socket.emit("newChatMessage", {
//         currentChatMesage,
//         groupIdentifier: currentGroupID,
//         currentUser,
//         timeData,
//       });

//       setCurrentChatMessage("");
//       Keyboard.dismiss();
//     }
//   }


//   useEffect(()=>{
//     socket.emit('findGroup', currentGroupID)
//     socket.on('foundGroup', (allChats)=> setAllChatMessages(allChats))
//   },[socket])


  return (
<>
<HeaderDetails/>
<View style={styles.container}>

<ScrollView>
{messages.filter(data=>(data.receiver==route.params.id&&data.sender==userId)||(data.receiver==userId&&data.sender==route.params.id)).map((msg, index) => (
    <View key={index} style={msg.sender === parseInt(userId) ? styles.rightMsg : styles.leftMsg}>
    <Text style={{color:msg.sender === parseInt(userId)?"white":"black"}}>{msg.message}</Text>
    </View>
    ))}
    </ScrollView>
    
    <View style={{display:'flex',alignItems:'center',flexDirection:"row"}}>
    <View style={styles.messageInputContainer}>
  
    <TextInput
style={{color:'black',borderBottomWidth:0}}
value={currentChatMesage}
onChangeText={(value) => setCurrentChatMessage(value)}
placeholder="Enter your message"
placeholderTextColor={"black"}
/>
</View>
    {
      currentChatMesage!=""?<ChatInput title={"Send"} onPress={sendMessage}/>:""
    }
      <TouchableOpacity style={{alignItems:'center',justifyContent:'center', marginLeft:20}}>
      <Icons.Entypo name="attachment" size={24} color="black" />
      </TouchableOpacity>
    </View>
    </View>
    </>
    );
}

const styles = StyleSheet.create({

  container: {
  flex: 1,
  height:"100%",
  justifyContent: 'center',
  padding: 10,
},
leftMsg: {
  alignSelf: 'flex-start',
  backgroundColor: '#e5e5e5',
  borderRadius: 10,
  marginBottom: 10,
  padding: 10,
  color:"black"
},
rightMsg: {
  alignSelf: 'flex-end',
  backgroundColor: '#007aff',
  color:"black",
  borderRadius: 10,
  marginBottom: 10,
  padding: 10,
},
  messageInputContainer: {
    width: "70%",
    backgroundColor: "#fff",
    borderBottomColor:'black',
    // borderBottomWidth:1,
    borderRadius:30,
 
    justifyContent: "center",
    flexDirection: "row",
  },
  messageInput: {
    borderWidth: 1,
    padding: 15,

    borderRadius: 50,
    marginRight: 10,
  },
  button: {
    width: "30%",
    backgroundColor: "#703efe",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
  },
});