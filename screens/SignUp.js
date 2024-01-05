import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Alert,Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FormInput from '../components/FormInput';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ButtonInput from '../components/ButtonInput';


const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [name, setName] = useState('');
  const navigation = useNavigation();
  // const validateEmail = (email) => {
  //   var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  //   return re.test(email);
  // };

  const handleLogin = async () => {
    // Your existing login logic
   
   
      navigation.navigate('Login')
    
  };

  return (
    <View style={styles.container}>
    <View style={styles.header}>
    <Image source={require('../assets/mainlogo.png')} style={{ width: 200, height: 100 }} />
      </View>
      <View>
      <FormInput 
      placeholder={"Please enter Email address"}
      placeholderColor={"black"}
      icon={"mail"}
      setValues={(text) => setEmail(text)}
      
      />
      </View>
      <View>
      <FormInput 
      placeholder={"Please enter Password"}
      placeholderColor={"black"}
      icon={"lock-closed"}
      setValues={(text) => setPassword(text)}
      pass={true}
      
      />
      </View>
      <View>
    
      <FormInput 
      placeholder={"Enter Full Name"}
      placeholderColor={"black"}
      icon={"mail"}
      setValues={(text) => setName(text)}
      
      />
      </View>
      <View>
   
      <FormInput 
      placeholder={"Enter Role"}
      placeholderColor={"black"}
      icon={"mail"}
      setValues={(text) => setRole(text)}
      
      />
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
