import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Alert,Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FormInput from '../components/FormInput';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ButtonInput from '../components/ButtonInput';
import { RadioButton } from 'react-native-paper'
import PasswordInput from '../components/PasswordInput';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { Icon } from 'react-native-paper/lib/typescript/components/Avatar/Avatar';
import Icons from '../components/Icons';
import { useSelector } from 'react-redux';

const EditProfileScreen = () => {
    const count = useSelector((state) => state.auth.user)
    console.log(count)
  const [email, setEmail] = useState(count.user_data[0].email);
  const [signature_drink, setsignature_drink] = useState('');
  const [speciality, setspeciality] = useState(0);
  const [name, setName] = useState(count.user_data[0].name);
  const [number, setNumber] = useState(count.user_data[0].number)
  const [imageUri, setImageUri] = useState(`https://bartender.logomish.com/${count.user_data[0].image}`);
  const navigation = useNavigation();
  const formData = new FormData();
console.log(count.user_data[0].email)
  // const validateEmail = (email) => {
  //   var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  //   return re.test(email);
  // };

  const handleSelectImage = () => {
    const options = {
      noData: true,
      mediaType: 'photo',
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const uri = response.assets[0].uri;
        setImageUri(uri);
      }
    });
  };

  //   // Your existing login logic
  //   console.log(imageUri)
  //   formData.append("name", name);
  //   formData.append("email",email);
  //   formData.append("number",number);
  //   formData.append("signature_drink",signature_drink);
  //   formData.append("speciality",speciality);
  //   formData.append("file",imageUri)
  //   formData.append("payment_link","fhdskfj")
  //     try {

  //       fetch('https://bartender.logomish.com/userProfile/profileInsert', {
  //           method: 'PATCH',
  //           headers: {
  //             "Accept": "form-data",
  //             'accesstoken':`Bearer ${count?.access_token}`,
  //             'x-api-key':'BarTenderAPI'
  //           },
  //           body: formData
  //         })
  //         .then(response => response.text())  // <-- log the response text
  //         .then(text => {
  //           console.log(text);
  //           return JSON.parse(text);
  //         })
  //         .then(data => {
  //           if(data.message=="Success"){
  //             Alert.alert('EditProfileScreen Successful')
  //           }
  //           else{
  //             Alert.alert(data.data)
  //           }
  //         })
  //         .catch(error => {
  //           console.log('An error occurred while processing your request.',error);
  //         });
          
       
          
         

        
 
  //     } catch (error) {
  //     console.log('An error occurred while processing your request.',error);
  //     }
   
      


    
  // };
  const handleSubmit = async () => {
    // ... (previous code)
   
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("number", number);
    formData.append("signature_drink", signature_drink);
    formData.append("speciality", speciality);
  
    // Append the image as a file
    const file = {
      uri: imageUri,
      type: 'image/jpeg', // or the correct MIME type for your image
      name: `${new Date()}profile_image.jpg`, // you can give any name
    };
    formData.append('file', file);
  
    formData.append("payment_link", "fhdskfj");
  
    try {
      if(count.user_data[0].image==""){
        console.log("insetredd")
        fetch('https://bartender.logomish.com/userProfile/profileInsert', {
          method: 'PATCH',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data',
            'accesstoken': `Bearer ${count?.access_token}`,
            'x-api-key': 'BarTenderAPI',
          },
          body: formData,
        })
        .then(response => response.text())  // <-- log the response text
                 .then(text => {
                   console.log(text);
                   return JSON.parse(text);
                 })
                 .then(data => {
  
        if (data.message === "Success") {
          console.log("data",data)
          Alert.alert(data.message)
        } else {
          Alert.alert(data.data);
        }
      })
      }else{
        console.log("updatedd")
        fetch('https://bartender.logomish.com/userProfile/updateProfiles', {
          method: 'PATCH',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data',
            'accesstoken': `Bearer ${count?.access_token}`,
            'x-api-key': 'BarTenderAPI',
          },
          body: formData,
        })
        .then(response => response.text())  // <-- log the response text
                 .then(text => {
                   console.log(text);
                   return JSON.parse(text);
                 })
                 .then(data => {
  
        if (data.message === "Success") {
          console.log("data",data)
          Alert.alert(data.message)
        } else {
          Alert.alert(data.data);
        }
      })
      }
     
    } catch (error) {
      console.log('An error occurred while processing your request.', error);
    };
  };
  
  return (
    <View style={styles.container}>
    <View style={styles.header}>
    <TouchableOpacity style={{borderWidth:1,borderRadius:40, display:'flex',alignItems:'center',justifyContent:'center'}} onPress={handleSelectImage}>
    {imageUri? (<Image source={{ uri: imageUri }} style={{ width: 200, height: 200,borderRadius:40 }} />):(<Icons.AntDesign name="user" size={70} />)}
    
    </TouchableOpacity>

      </View>
      <View>
    
      <FormInput 
      placeholder={"Enter Full Name"}
      placeholderColor={"black"}
      icon={"user"}
      setValues={(text) => setName(text)}
      currentvalue={name}
      />
      </View>
      <View>
      <FormInput 
      placeholder={"Please enter Email address"}
      placeholderColor={"black"}
      icon={"mail"}
      currentvalue={email}
      edit={false}
      
      />
      </View>
   
  
      <View>
         <FormInput 
      placeholder={"Please enter Phone Number"}
      placeholderColor={"black"}
      icon={"phone"}
      setValues={(text) => setNumber(text)}
      currentvalue={number}
      
      />
   
      </View>
      <View>
      <FormInput 
   placeholder={"Please Enter Speciality"}
   placeholderColor={"black"}
   icon={"profile"}
   setValues={(text) => setspeciality(text)}
   
   />

   </View>
   <View>
   <FormInput 
placeholder={"Please enter Signature Drink"}
placeholderColor={"black"}
icon={"profile"}
setValues={(text) => setsignature_drink(text)}

/>

</View>

      <ButtonInput title={"Edit Profile"} onPress={handleSubmit}/>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    width:"100%"
  },
  header: {
    marginBottom: 50,
  },
  title: {
    fontSize: 24,
    color: 'white',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    color: 'white',
    marginBottom: 10,
  },
  input: {
    height: 40,
    width: 300,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    color: 'white',
  },
  forgotPassword: {
    color: 'white',
    marginBottom: 20,
  },
  or: {
    color: 'white',
    marginBottom: 20,
  },
  EditProfileScreen: {
    color: 'white',
    marginTop: 20,
  },
});

export default EditProfileScreen;
