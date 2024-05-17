import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Alert,Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FormInput from '../components/FormInput';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ButtonInput from '../components/ButtonInput';
import { RadioButton } from 'react-native-paper'
import PasswordInput from '../components/PasswordInput';
import LoginInput from '../components/LoginInput';
import Toast from 'react-native-toast-message';
import baseUrl from '../global';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user_type, setUser_type] = React.useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const validateEmail = (email) => {
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };
  const handleLogin = async () => {
    if (isLoading) {
      return; // If login process is already ongoing, prevent further clicks
    }
  
    setIsLoading(true); // Set loading state to true to disable the button
  
    if (email != '' && password != '') {
      if (!validateEmail(email)) {
        Toast.show({
          type: 'error',
          text1: `Invalid Email`,
          text2:"Please enter a valid email address"
        });
      
        setIsLoading(false); // Enable the button
        return;
      }
      const body = { email: email, password: password, user_type: user_type };
      try {
        fetch(`${baseUrl}/users/Login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': 'BarTenderAPI'
          },
          body: JSON.stringify(body),
        })
          .then(response => response.json())
          .then(data => {
            if (data) {
              if (data.message === "Success") {
                Toast.show({
                  type: 'success',
                  text1: 'Otp sent to your email👋',
                });
                console.log(body)
                navigation.navigate('OtpS', { body });
              } else {
                Toast.show({
                  type: 'error',
                  text1: `${data?.data}`,
                });
              }
            } else {
              Alert.alert("Login", "Login Failure");
            }
          })
          .catch(error => {
            console.log('An error occurred while processing your request.', error);
            Alert.alert('Error', 'An error occurred while processing your request.');
          })
          .finally(() => {
            setIsLoading(false); // Enable the button regardless of success or failure
          });
      } catch (error) {
        console.log('An error occurred while processing your request.', error);
        Alert.alert('Error', 'An error occurred while processing your request.');
        setIsLoading(false); // Enable the button
      }
    } else {
      Toast.show({
        type: 'error',
        text1: "Please fill all fields"
      });
      setIsLoading(false); // Enable the button
    }
  };


  return (
    <View style={styles.container}>
    <View style={styles.header}>
    <Image source={require('../assets/logomain.png')} style={{ width: 200, height: 100 }} />
      </View>
      <View>
      <LoginInput 
      placeholder={"Please Enter Email address"}
      placeholderColor={"black"}
      icon={"mail"}
      setValues={(text) => setEmail(text)}
      type={"email"}
      />

      </View>
      <View>
    
      <PasswordInput 
      placeholder={"Please Enter Password"}
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
      <RadioButton.Item color='orange' label="Business" value={3} />
    </RadioButton.Group>
      </View>
      <View>
      <TouchableOpacity style={{padding:20,color:'white'}} onPress={() => navigation.navigate('SignUp')}>
      <Text style={{color:'orange',textDecorationLine:'underline'}}>Dont have an Account SignUp</Text>
      </TouchableOpacity>
      </View>

      <ButtonInput title={"Login"} onPress={handleLogin} disabled={isLoading}/>
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
