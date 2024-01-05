import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Alert,Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FormInput from '../components/FormInput';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ButtonInput from '../components/ButtonInput';
import { RadioButton } from 'react-native-paper'

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checked, setChecked] = React.useState('user');

  const navigation = useNavigation();
  const validateEmail = (email) => {
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  const handleLogin = async () => {
    // Your existing login logic
    if (email !== '' && password !== '') {
  
       try {
     AsyncStorage.setItem("type",`${checked}`)
      //     fetch('http://192.168.1.122:3000/login/', {
      //       method: 'POST',
      //       headers: {
      //         'Content-Type': 'application/json',
      //       },
      //       body: JSON.stringify({ email, password }),
      //     })
      //     .then(response => response.json())
      //     .then(data => {
      //       if (data.success) {
      //         console.log(data.user.userId)
      //         AsyncStorage.setItem("user",`${data.user.userId}`)
               navigation.navigate('OtpS')
      //       } else {
      //         Alert.alert("Login","Login Faliure")
      //       }
      //     });
        
  
       } catch (error) {
       console.log('An error occurred while processing your request.',error);
       }
    } else {
      AsyncStorage.setItem("type",checked)
      navigation.navigate('OtpS')
    }
  };

  return (
    <View style={styles.container}>
    <View style={styles.header}>
    <Image source={require('../assets/logomain.png')} style={{ width: 200, height: 100 }} />
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
      <RadioButton.Group  onValueChange={value => setChecked(value)} value={checked}>
      <RadioButton.Item color='orange' label="User" value="user" />
      <RadioButton.Item color='orange' label="Bartender" value="bartender" />
      <RadioButton.Item color='orange' label="Admin" value="admin" />

    </RadioButton.Group>
      </View>
      <View>
      <TouchableOpacity style={{padding:20,color:'white'}} onPress={() => navigation.navigate('SignUp')}>
      <Text style={{color:'orange',textDecorationLine:'underline'}}>Dont have an Account SignUp</Text>
      </TouchableOpacity>
      </View>

      <ButtonInput title={"Login"} onPress={handleLogin}/>
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

export default LoginScreen;
