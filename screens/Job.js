import { StyleSheet, Text, View,FlatList,TouchableOpacity,SafeAreaView } from 'react-native'
import React, { useState,useEffect } from 'react'
import Header from '../components/Header'
import Icon from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import Icons from '../components/Icons';

const Job = () => {
  const navigation =useNavigation()
  const [data, setData] = useState();
  const count = useSelector((state) => state.auth.user)
  // const data = [
  //   { id: 1, name: 'John Brown', role: 'Host', image: require('../assets/userpic.jpg'),email:'csjguy@gmail.com',PhoneNumber:"999-999-999" },
  //   { id: 1, name: 'John Brown', role: 'Host', image: require('../assets/userpic.jpg'),email:'csjguy@gmail.com',PhoneNumber:"999-999-999" },
    
  // ];

  const handleSubmit = async () => {

    try {
      fetch('https://bartender.logomish.com/posts/GetAllPost', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key':'BarTenderAPI',
          'accesstoken':`Bearer ${count?.access_token}`
        },
      })
      .then(response => response.json())
      .then(data => {

     setData(data.posts)
      });
    } catch (error) {
      console.log('An error occurred while processing your request.',error);
    }
 
};
  useEffect(() => {
    handleSubmit()
  }, [data])

  const Item = ({ id, post_title,post_type,image, onPress }) => (
    <TouchableOpacity onPress={onPress} style={{justifyContent:'space-between', flexDirection: 'row', alignItems: 'center',padding: 10, }}>
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
   

   
    <View style={{marginLeft:15}}>
    <Text style={{color:'black'}}>{post_title}</Text>

    <Text style={{color:'black'}}>{post_type}</Text>
    </View>
    </View>
    <View>
    <Icon name="right" size={24} color="black" />
    </View>
    </TouchableOpacity>
  );
  const renderItem = ({ item }) => (
    <Item post_title={item.post_title} post_type={item.post_type}   
     onPress={() => navigation.navigate('JobDetail', {item})}
    />
  );
  return (
    <SafeAreaView style={{backgroundColor:"white",height:'100%'}}>
    <Header title="Job" headerShown={true} onPress={()=>navigation.navigate('AddJob')}/>
  {data?
    <FlatList
  data={data}
  renderItem={renderItem}
  keyExtractor={(item) => item.id}
/>:
    <View style={styles.container}>
    <Icons.MaterialCommunityIcons name="glass-cocktail" size={80} color="#ccc" />
    <Text style={styles.text}>No Jobs Avalible</Text>
 
  </View>
  }
 
    </SafeAreaView>
  )
}

export default Job

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