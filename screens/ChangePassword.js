import React, { useState ,useEffect} from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Alert,Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FormInput from '../components/FormInput';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ButtonInput from '../components/ButtonInput';
import { RadioButton } from 'react-native-paper'
import PasswordInput from '../components/PasswordInput';
import { useSelector } from 'react-redux'
const ChangePassword = ({route}) => {
  const [users,setusers]=useState("")
  useEffect(()=>{
    async function replacementFunction(){
    const value = await AsyncStorage.getItem("data");
      setusers(JSON.parse(value))
    }
    replacementFunction()

  },[route])
    const [email, setEmail] = useState(users.email);
  const [password, setPassword] = useState('');
  const [cpassword, setcpassword] = useState('');
  const [user_type, setuser_type] = useState(users.user_type)
  const count = useSelector((state) => state.auth.user)
  const navigation = useNavigation();
  const validateEmail = (email) => {
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };
  const handleSubmit = async () => {
    if ( password != '' ) {
      const bodys= {email:email,password:password,user_type:user_type}
      try {
        fetch('https://bartenderbackend.bazazi.co/users/ChangePassword', {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key':'BarTenderAPI',
            'accesstoken':`Bearer ${users.access_token}`
          },
          body: JSON.stringify({ email:users.email, password:password,user_type:users.user_type,newpassword:cpassword }),
        })
        .then(response => response.json())
        .then(data => {
          if (data.message==="Success") {
            Alert.alert("Login","Password Changed Successfully")
            navigation.navigate('Login')
          } else {
            Alert.alert("Login","Login Faliure")
          }
        });
      } catch (error) {
        console.log('An error occurred while processing your request.',error);
      }
    } else {
      Alert.alert('Please Match Password and Confirm Password')
    }
  };
  

  return (
    <View style={styles.container}>
    <View style={styles.header}>
    <Image source={require('../assets/logomain.png')} style={{ width: 200, height: 100 }} />
      </View>
      <View>

   
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
      <PasswordInput 
      placeholder={"Please Confirm Password"}
      placeholderColor={"black"}
      icon={"lock"}
      setValues={(text) => setcpassword(text)}
      pass={true}
      type={"password"}
      />
   
      </View>
      <View>

      </View>

      <ButtonInput title={"Change Password"} onPress={handleSubmit}/>
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

export default ChangePassword;
