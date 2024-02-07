import React, { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import io from "socket.io-client";
import HeaderDetails from "../components/HeaderDetails";
import Icons from "../components/Icons";
import ChatInput from "../components/ChatInput";
import { launchImageLibrary } from "react-native-image-picker";
import { configureLayoutAnimations } from "react-native-reanimated/lib/typescript/reanimated2/core";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function Messagescreen({ route }) {
  const [userId, setUserId] = useState(0);
  const [currentChatMessage, setCurrentChatMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const flatListRef = useRef(null);

  const [imageUri, setImageUri] = useState();
  const [imageUriimage, setImageUriimage] = useState();
  const [files,setFiles]= useState();

  const handleSelectImage = async(setUriFunction,seturi) => {
    const options = {
      noData: true,
      mediaType: 'photo',
    };

    launchImageLibrary(options, async response => {
      if (response.didCancel) {
        console.log('cancel')
      } else if (response.error) {
        console.log('error',response)
      } else {
        const uri = response.assets[0].uri;
        const uri2 = response.assets[0];
        
        setUriFunction(uri);
        seturi(uri2)
        const file = {
          uri: uri,
          type: uri2?.type,
          name: `${new Date()}uri_image.jpg`,
        };
         console.log(file,"Resume","Certification")
   
         try {
          console.log("sds")
          const formData = new FormData();
          formData.append('file', file) ;
          console.log(file)
      await fetch('http://192.168.1.190:3000/sendImage', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'multipart/form-data',
           
            },
            body: formData,
          })
            .then(response => response.text()) // <-- log the response text
            .then(text => {
              console.log(JSON.parse(text));
              return JSON.parse(text);
    
            })
            .then(data => {
              console.log(data);
              if (data.success === 'success') {
              console.log(data);
              
              } else {
                Alert.alert(data.data);
              }
            });
    
        } catch (error) {
          console.log('An error occurred while processing your request.', error.message);
        }
      }
    });
  
  
    
  };
  useEffect(() => {
    async function fetchData() {
      const value = await AsyncStorage.getItem("data");
      AsyncStorage.setItem("data", value);
      setUserId(JSON.parse(value).user_data[0].id);
    }
    fetchData();
  }, []);

  // const socket = useRef(io("https://bartendersocket.logomish.com"));
  const socket = useRef(io("http://192.168.1.190:3000"));
  

  useEffect(() => {
    
    socket.current.on("chat message", (msgs) => {
      setMessages(msgs);
      setTimeout(scrollToBottom,100);
    });

   
  }, []);

  const scrollToBottom = () => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  };

  // const sendMessage = () => {
  //   if (currentChatMessage !== "") {
  //     const msgs = {
  //       sender: userId,
  //       receiver: route.params.id,
  //       message: currentChatMessage,
  //     };
  //     socket.current.emit("chat message", msgs);
  //     setCurrentChatMessage("");
  //   }
  // };


  const sendMessage = async () => {

    
    // const file = {
    //   uri: imageUri,
    //   type: imageUriimage?.type,
    //   name: `${new Date()}profile_image.jpg`,
    // };
  
    // // console.log(file,Resume,Certification)
    // const formData = new FormData();

    // formData.append('file', file) ;
    

    // console.log(file,"FFFFFFFFDDDDDDDDDDDDDD")

    // try {
    //   await fetch('http://192.168.1.190:3000/sendImage', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'multipart/form-data',
    //     },
    //     body: formData,
    //   })
    //     .then(response => response.text()) // <-- log the response text
    //     .then(text => {
    //       return JSON.parse(text);

    //     })
    //     .then(data => {
    //       console.log(data,"datattatatat")

    //       return
    //       if (data.success === 'success') {

    //         setCertificationUriflag(false)
    //         setResumeUriflag(false)
    //         Alert.alert(data.message);
    //       } else {
    //         Alert.alert(data.data);
    //       }
    //     });

    // } catch (error) {
    //   console.log('An error occurred while processing your request.', error.message);
    // }
  
    if (currentChatMessage !== "") {

      // const files = {
      //   uri: imageUri,
      //   type: imageUriimage?.type,
      //   name: `${new Date()}chat_attachment.jpg`,
      // };
      const msgData = {
        sender: userId,
        receiver: route.params.id,
        message: currentChatMessage
      };
      
      socket.current.emit("chat message", msgData);
      setCurrentChatMessage("");
      setImageUri(null); // Reset imageUri after sending
    }
  };

  return (
    <>
      <HeaderDetails />
      <View style={styles.container}>
        <FlatList
          ref={flatListRef}
          data={messages.filter(
            (data) =>
              (data.receiver == route.params.id && data.sender == userId) ||
              (data.receiver == userId && data.sender == route.params.id)
          )}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View
              style={
                item.sender === parseInt(userId)
                  ? styles.rightMsg
                  : styles.leftMsg
              }
            >
              <Text style={{ color: item.sender === parseInt(userId) ? "white" : "black" }}>
                {item.message}
              </Text>
            </View>
          )}
        />
      <View style={{display:'flex',alignItems:'center',flexDirection:"row"}}>
<View style={styles.messageInputContainer}>

<TextInput
style={{color:'black',borderBottomWidth:0}}
value={currentChatMessage}
onChangeText={(value) => setCurrentChatMessage(value)}
placeholder="Enter your message"
placeholderTextColor={"black"}
/>
</View>
{
  currentChatMessage!=""?<ChatInput title={"Send"} onPress={sendMessage}/>:""
}
  <TouchableOpacity style={{alignItems:'center',justifyContent:'center', marginLeft:20}}
    onPress={() => handleSelectImage(setImageUri, setImageUriimage)}>

  <Icons.Entypo name="attachment" size={24} color="black" />
  </TouchableOpacity>
</View>
      </View>
    </>
  );
}

{/* 
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
 */}
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