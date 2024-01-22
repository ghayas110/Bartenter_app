import { Button, StyleSheet, Text, View, SafeAreaView, TouchableOpacity, FlatList, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const Notification = () => {
  const [userId, setuserId] = useState()
  // const [data, setdata] = useState()
  const navigation = useNavigation();


  // const AllChats = async () => {
  //   // Your existing login logic
  //   if (userId) {

  //     try {


  //         fetch('http://192.168.1.122:3000/alluser/', {
  //           method: 'POST',
  //           headers: {
  //             'Content-Type': 'application/json',
  //           },
  //           body: JSON.stringify({userId}),
  //         })
  //         .then(response => response.json())
  //         .then(chat => {
  //           if (chat.success) {
  //             console.log(chat)
  //           setdata(chat.user)

  //             // navigation.navigate('OtpS')
  //           } else {
  //             Alert.alert("Chat","No Cat Found")
  //           }
  //         });


  //     } catch (error) {
  //     console.log('An error occurred while processing your request.',error);
  //     }
  //   } else {
  //     console.log('Please fill in all fields');
  //   }
  // };
  const data = [
    { id: 12, name: 'lhafuhdsklgjgh sdagkjlhgjsd gksdh ghksd gkhsdgljksdlgkdsf gjds fgjsd jgds kg dsjg kjds gkds gksd gkjds gkds', role: 'Host', image: require('../assets/userpic.jpg'), email: 'csjguy@gmail.com', PhoneNumber: "999-999-999", message: "Do you have an Idea of what type of Drink..." },
    { id: 12, name: 'lhafuhdsklgjgh sdagkjlhgjsd gksdh ghksd gkhsdgljksdlgkdsf gjds fgjsd jgds kg dsjg kjds gkds gksd gkjds gkds', role: 'Host', image: require('../assets/userpic.jpg'), email: 'csjguy@gmail.com', PhoneNumber: "999-999-999", message: "Do you have an Idea of what type of Drink..." },
    { id: 12, name: 'lhafuhdsklgjgh sdagkjlhgjsd gksdh ghksd gkhsdgljksdlgkdsf gjds fgjsd jgds kg dsjg kjds gkds gksd gkjds gkds', role: 'Host', image: require('../assets/userpic.jpg'), email: 'csjguy@gmail.com', PhoneNumber: "999-999-999", message: "Do you have an Idea of what type of Drink..." },
    { id: 1, name: 'lhafuhdsklgjgh sdagkjlhgjsd gksdh ghksd gkhsdgljksdlgkdsf gjds fgjsd jgds kg dsjg kjds gkds gksd gkjds gkds', role: 'Host', image: require('../assets/userpic.jpg'), email: 'csjguy@gmail.com', PhoneNumber: "999-999-999", message: "Do you have an Idea of what type of Drink..." },
    { id: 1, name: 'lhafuhdsklgjgh sdagkjlhgjsd gksdh ghksd gkhsdgljksdlgkdsf gjds fgjsd jgds kg dsjg kjds gkds gksd gkjds gkds', role: 'Host', image: require('../assets/userpic.jpg'), email: 'csjguy@gmail.com', PhoneNumber: "999-999-999", message: "Do you have an Idea of what type of Drink..." },
    { id: 1, name: 'lhafuhdsklgjgh sdagkjlhgjsd gksdh ghksd gkhsdgljksdlgkdsf gjds fgjsd jgds kg dsjg kjds gkds gksd gkjds gkds', role: 'Host', image: require('../assets/userpic.jpg'), email: 'csjguy@gmail.com', PhoneNumber: "999-999-999", message: "Do you have an Idea of what type of Drink..." },
    { id: 1, name: 'lhafuhdsklgjgh sdagkjlhgjsd gksdh ghksd gkhsdgljksdlgkdsf gjds fgjsd jgds kg dsjg kjds gkds gksd gkjds gkds', role: 'Host', image: require('../assets/userpic.jpg'), email: 'csjguy@gmail.com', PhoneNumber: "999-999-999", message: "Do you have an Idea of what type of Drink..." },
    { id: 1, name: 'lhafuhdsklgjgh sdagkjlhgjsd gksdh ghksd gkhsdgljksdlgkdsf gjds fgjsd jgds kg dsjg kjds gkds gksd gkjds gkds', role: 'Host', image: require('../assets/userpic.jpg'), email: 'csjguy@gmail.com', PhoneNumber: "999-999-999", message: "Do you have an Idea of what type of Drink..." },
    { id: 1, name: 'lhafuhdsklgjgh sdagkjlhgjsd gksdh ghksd gkhsdgljksdlgkdsf gjds fgjsd jgds kg dsjg kjds gkds gksd gkjds gkds', role: 'Host', image: require('../assets/userpic.jpg'), email: 'csjguy@gmail.com', PhoneNumber: "999-999-999", message: "Do you have an Idea of what type of Drink..." },
    { id: 1, name: 'lhafuhdsklgjgh sdagkjlhgjsd gksdh ghksd gkhsdgljksdlgkdsf gjds fgjsd jgds kg dsjg kjds gkds gksd gkjds gkds', role: 'Host', image: require('../assets/userpic.jpg'), email: 'csjguy@gmail.com', PhoneNumber: "999-999-999", message: "Do you have an Idea of what type of Drink..." },
    { id: 1, name: 'lhafuhdsklgjgh sdagkjlhgjsd gksdh ghksd gkhsdgljksdlgkdsf gjds fgjsd jgds kg dsjg kjds gkds gksd gkjds gkds', role: 'Host', image: require('../assets/userpic.jpg'), email: 'csjguy@gmail.com', PhoneNumber: "999-999-999", message: "Do you have an Idea of what type of Drink..." },

  ];
  // useEffect(() => {
  //   AllChats()
  //     }, [userId])
  const Item = ({ id, name, message, role, onPress }) => (
    <TouchableOpacity onPress={onPress} style={{ justifyContent: 'space-between', padding: 10,flexDirection: 'row',alignItems: 'center', borderBottomWidth: 0, borderBottomColor: 'whitesmoke', backgroundColor: `${id == 12 ? "#D0D0D0" : ""}`, marginBottom: 5 }}>
        <Image source={require('../assets/userpic.jpg')} style={{ width: 50, height: 50, borderRadius: 50,marginRight: 15 }} />
        <Text style={{ color: 'grey',paddingRight: 80 }}>{name}</Text>
    </TouchableOpacity>
  );
  const renderItem = ({ item }) => (
    <Item id={item.id} name={item.name} message={item.message} role={item.role} image={item.image} onPress={() => navigation.navigate('Message', item)} />
  );
  return (
    <SafeAreaView>
      <Header title="Notification" headerShown={false} />

      <View style={styles.container}>
        <FlatList
          style={styles.flatlistBorder}
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />

      </View>

    </SafeAreaView>
  )
}

export default Notification

const styles = StyleSheet.create({
  container: {
    width: 'auto',
    height: '100%',
    paddingTop: 35,
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
    backgroundColor: '#F2994A',
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flatlistBorder: {
    borderBottomWidth: 0,
  },
});
