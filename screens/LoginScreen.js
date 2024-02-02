import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Alert,Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FormInput from '../components/FormInput';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ButtonInput from '../components/ButtonInput';
import { RadioButton } from 'react-native-paper'
import PasswordInput from '../components/PasswordInput';
import LoginInput from '../components/LoginInput';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user_type, setUser_type] = React.useState(0);

  const navigation = useNavigation();
  const validateEmail = (email) => {
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  const handleLogin = async () => {
    if (email != '' && password != '') {
      if (!validateEmail(email)) {
        Alert.alert('Invalid Email', 'Please enter a valid email address');
        return;
      }
      const bodys= {email:email,password:password,user_type:user_type}
      try {
     fetch('https://bartender.logomish.com/users/Login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key':'BarTenderAPI'
          },
          body: JSON.stringify({ email:email, password:password,user_type:user_type }),
        })
        .then(response => response.json())
        .then(data => {
          if(data){
            if (data.message==="Success") {
              Alert.alert("Login","Otp have been send to your email")
              navigation.navigate('OtpS',{bodys})
            } else {
              Alert.alert("Login","Login Faliure")
            }
          }else{
            Alert.alert("Login","Login Faliure")
          }
          
        });
     
      } catch (error) {
        console.log('An error occurred while processing your request.',error[0]);
      }
    } else {
      Alert.alert('Please Fill All Fields')
    }
  };


  return (
    <View style={styles.container}>
    <View style={styles.header}>
    <Image source={require('../assets/logomain.png')} style={{ width: 200, height: 100 }} />
      </View>
      <View>
      <LoginInput 
      placeholder={"Please enter Email addres"}
      placeholderColor={"black"}
      icon={"mail"}
      setValues={(text) => setEmail(text)}
      type={"email"}
      />

      </View>
      <View>
    
      <PasswordInput 
      placeholder={"Please enter Password"}
      placeholderColor={"black"}
      icon={"lock"}
      setValues={(text) => setPassword(text)}
      pass={true}
      type={"password"}
      />
      <TouchableOpacity style={{padding:20,color:'white'}} onPress={() => navigation.navigate('ForgotPassScreen')}>
      <Text style={{color:'orange',textDecorationLine:'underline'}}>Forgot Password?</Text>
      </TouchableOpacity>
      <RadioButton.Group  onValueChange={value => setUser_type(value)} value={user_type}>
      <RadioButton.Item color='orange' label="Admin" value={0} />
      <RadioButton.Item color='orange' label="Bartender" value={1} />
      <RadioButton.Item color='orange' label="User" value={2} />
      <RadioButton.Item color='orange' label="Buisness" value={3} />
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
