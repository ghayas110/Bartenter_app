import { useContext, useEffect, useLayoutEffect, useState } from "react";
import {
  FlatList,
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  Button
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import io from 'socket.io-client';
import { ScrollView } from "react-native-gesture-handler";
import HeaderDetails from "../components/HeaderDetails";
export default function Messagescreen( item ) {
//   const { currentGroupName, currentGroupID } = route.params;
const [userId, setuserId] = useState()
const [currentChatMesage, setCurrentChatMessage] = useState()
const [messages, setMessages] = useState([]);
AsyncStorage.getItem("user").then((value) => {
    setuserId(value)});
  
    const socket = io('http://192.168.1.122:3000');
    useEffect(() => {
        socket.on('chat message', (msgs) => {
            console.log("socket working",msgs)
          setMessages(msgs);
        });
      }, []);
const sendMessage = () => {
    const msgs = { sender: userId, receiver: item.route.params.userId, message:currentChatMesage };
    socket.emit('chat message', msgs);
    setCurrentChatMessage('');
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
//           ? `0${new Date().getHours()}`
//           : new Date().getHours(),
//       mins:
//         new Date().getMinutes() < 10
//           ? `0${new Date().getMinutes()}`
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
<HeaderDetails title={item.route.params.name} />
<View style={styles.container}>

<ScrollView>
{messages.map((msg, index) => (
    <View key={index} style={msg.sender === parseInt(userId) ? styles.rightMsg : styles.leftMsg}>
    <Text style={{color:'black'}}>{msg.message}</Text>
    </View>
    ))}
    </ScrollView>
    <TextInput
    
    value={currentChatMesage}
    onChangeText={(value) => setCurrentChatMessage(value)}
    placeholder="Enter your message"
    />
    <Button title="Send" onPress={sendMessage} />
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
},
rightMsg: {
  alignSelf: 'flex-end',
  backgroundColor:'#FFA500',
  borderRadius: 10,
  marginBottom: 10,
  padding: 10,
},
  messageInputContainer: {
    width: "100%",
    backgroundColor: "#fff",
    paddingVertical: 30,
    paddingHorizontal: 15,
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
// <View
// style={[styles.wrapper, { paddingVertical: 15, paddingHorizontal: 10 }]}
// >
// {allChatMessages && allChatMessages[0] ? (
//   <FlatList
//     data={allChatMessages}
//     renderItem={({ item }) => (
//       <Messagecomponent item={item} currentUser={currentUser} />
//     )}
//     keyExtractor={(item) => item.id}
//   />
// ) : (
//   ""
// )}
// </View>