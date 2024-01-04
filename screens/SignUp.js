import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Alert,Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FormInput from '../components/FormInput';
import AsyncStorage from '@react-native-async-storage/async-storage';


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
    <Image source={require('../assets/logo.png')} style={{ width: 100, height: 100 }} />
      </View>
      <View>
      <Text style={styles.subtitle}>Email</Text>
      <TextInput
      style={styles.input}
      placeholder="Enter email or phone"
      placeholderTextColor='white'
      onChangeText={(text) => setEmail(text)}
      />
      </View>
      <View>
      <Text style={styles.subtitle}>Password</Text>
      <TextInput
      style={styles.input}
      placeholder="Enter Password"
      secureTextEntry
      placeholderTextColor='white'
      onChangeText={(text) => setPassword(text)}
      />
      </View>
      <View>
      <Text style={styles.subtitle}>FullName</Text>
      <TextInput
      style={styles.input}
      placeholder="Enter Full Name"
      placeholderTextColor='white'
      onChangeText={(text) => setName(text)}
      />
      </View>
      <View>
      <Text style={styles.subtitle}>Role</Text>
      <TextInput
      style={styles.input}
      placeholder="Enter Role"
      placeholderTextColor='white'
      onChangeText={(text) => setRole(text)}
      />
      </View>
      <Button title="Get Started!" color={"#FFC500"} onPress={handleLogin} />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFA500',
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
