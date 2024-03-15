import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Alert,Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ButtonInput from '../components/ButtonInput';
import { RadioButton } from 'react-native-paper'
import PasswordInput from '../components/PasswordInput';
import LoginInput from '../components/LoginInput';


const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user_type, setUser_type] = useState(0);
  const [name, setName] = useState('');
  const [number, setNumber] = useState('')
  
  const navigation = useNavigation();
  const validateEmail = (email) => {
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  const handleLogin = async () => {
    // Your existing login logic
    if (email !== '' && password !== ''&& number!='' && name != '' ) {
      if (!validateEmail(email)) {
        Alert.alert('Invalid Email', 'Please enter a valid email address');
        return;
      }
      try {

          fetch('https://bartenderbackend.bazazi.co/users/CreateUser', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'x-api-key':'BarTenderAPI'
            },
            body: JSON.stringify({name:name, email:email,number:number, password:password,user_type:user_type}),

          })
          .then(response => response.json())
          .then(data => {
            if(data.message=="Success"){
              Alert.alert('SignUp Successfull')
 
               navigation.navigate('Login')
            }
            else{
              Alert.alert('SignUp Failed Please try Again')
            }
          
         

        
         });
       
 
      } catch (error) {
      console.log('An error occurred while processing your request.',error);
      }
   } else {
 Alert.alert("Please fill all fields")
   }
    
  };

  return (
    <View style={styles.container}>
    <View style={styles.header}>
    <Image source={require('../assets/mainlogo.png')} style={{ width: 200, height: 100 }} />
      </View>
      <View>
      <LoginInput 
      placeholder={"Please enter Email address"}
      placeholderColor={"black"}
      icon={"mail"}
      setValues={(text) => setEmail(text)}
      
      />
      </View>
      <View>
      <PasswordInput 
      placeholder={"Please enter Password"}
      placeholderColor={"black"}
      icon={"lock"}
      setValues={(text) => setPassword(text)}
      pass={true}
      
      />

      </View>
      <View>
    
      <LoginInput 
      placeholder={"Enter Full Name"}
      placeholderColor={"black"}
      icon={"user"}
      setValues={(text) => setName(text)}
      
      />
      </View>
      <View>
         <LoginInput 
      placeholder={"Please enter Phone Number"}
      placeholderColor={"black"}
      icon={"phone"}
      setValues={(text) => setNumber(text)}
      
      />
      <RadioButton.Group  onValueChange={value => setUser_type(value)} value={user_type}>
      <RadioButton.Item color='orange' label="Admin" value={0} />
      <RadioButton.Item color='orange' label="Bartender" value={1} />
      <RadioButton.Item color='orange' label="User" value={2} />
      <RadioButton.Item color='orange' label="Buisness" value={3} />
    </RadioButton.Group>
      </View>
      <ButtonInput title={"Get Started!"} onPress={handleLogin}/>

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
  signup: {
    color: 'white',
    marginTop: 20,
  },
});

export default SignUp;
