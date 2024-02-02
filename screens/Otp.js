import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useRef } from 'react';
import { View, TextInput, Button, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import ButtonInput from '../components/ButtonInput';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../redux/reducers/authReducer';
import { useNavigation } from '@react-navigation/native';



const Otp = ({ onLogin,route }) => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const dispatch=useDispatch()
  const navigation = useNavigation();
  const [email, setEmail] = useState(route?.params?.bodys?.email);
  const [user_type, setuser_type] = useState(route?.params?.bodys?.user_type)
  const inputRefs = useRef(Array(4).fill(0).map((_, i) => i));
  const handleInputChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;

    // Move to the next input if a digit is entered
    if (value !== '') {
      const nextIndex = index + 1;
      if (nextIndex < 4) {
        inputRefs.current[nextIndex].focus();
      }
    }

    setOtp(newOtp);
  };

  const handleBackspace = (index) => {
    const newOtp = [...otp];

    // Move to the previous input on backspace
    if (index > 0) {
      const prevIndex = index - 1;
      inputRefs.current[prevIndex].focus();
    }

    newOtp[index] = '';

    setOtp(newOtp);
  };

  const handleSubmit = async({route}) => {

    const enteredOtp = otp.join('');
    console.log('Entered OTP:',parseInt(enteredOtp) );
   
    try {
      if (otp) {

         try {

            fetch('https://bartender.logomish.com/users/VerifyOtp', {
               method: 'POST',
               headers: {
                 'Content-Type': 'application/json',
                 'x-api-key':'BarTenderAPI'
               },
               body: JSON.stringify({ otp:enteredOtp,email:email,user_type:user_type }),
             })
             .then(
              
              response => response.json()
              
             )
             .then(async data => {
               if (data.message == "Success") {
                dispatch(loginSuccess(data))
                AsyncStorage.setItem('data', JSON.stringify(data));
                 onLogin()
               } else {
                 Alert.alert("Login","Login Faliure")
               }
             });
         
   
        } catch (error) {
         console.log('An error occurred while processing your request.',error);
         }
      } else {
      Alert.alert('An error occurred while processing your request.')
      }

    }catch (error) {
        console.log('An error occurred while processing your request.');
      }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>OTP Verification</Text>
      <Text style={styles.subtitle}>Please enter OTP from your Email</Text>
      <View style={styles.inputContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={(ref) => (inputRefs.current[index] = ref)}
            style={styles.input}
            keyboardType='numeric'
            maxLength={1}
            value={digit}
            placeholderTextColor='white'
            onChangeText={(value) => handleInputChange(index, value)}
            onKeyPress={({ nativeEvent }) => {
              if (nativeEvent.key === 'Backspace') {
                handleBackspace(index);
              }
            }}
          />
        ))}
      </View>
      <ButtonInput title={"Continue"} onPress={handleSubmit}/>
   
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingTop: 40,
    padding:20
  },
  title: {
    fontSize: 24,
    color: 'orange',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    color: 'orange',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    
    marginVertical: 60,
    alignItems:'center',
    justifyContent:"center",
    display:'flex',
    width:'100%'
  },
  input: {
    height: 40,
    width: 40,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 5,
    textAlign: 'center',
    color: 'orange',
  },
  button: {
    backgroundColor: '#FFC500',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default Otp;




// import AsyncStorage from '@react-native-async-storage/async-storage';
// import React, { useState, useRef } from 'react';
// import { View, TextInput, Button, StyleSheet } from 'react-native';

// const Otp = ({ onLogin }) => {
//   const [otp, setOtp] = useState(['', '', '', '']);
//   const inputRefs = useRef(Array(4).fill(0).map((_, i) => i));

//   const handleInputChange = (index, value) => {
//     const newOtp = [...otp];
//     newOtp[index] = value;

//     // Move to the next input if a digit is entered
//     if (value !== '') {
//       const nextIndex = index + 1;
//       if (nextIndex < 4) {
//         inputRefs.current[nextIndex].focus();
//       }
//     }

//     setOtp(newOtp);
//   };

//   const handleBackspace = (index) => {
//     const newOtp = [...otp];

//     // Move to the previous input on backspace
//     if (index > 0) {
//       const prevIndex = index - 1;
//       inputRefs.current[prevIndex].focus();
//     }

//     newOtp[index] = '';

//     setOtp(newOtp);
//   };

//   const handleSubmit = async() => {
//     const enteredOtp = otp.join('');
//     console.log('Entered OTP:', enteredOtp);
//     // Add your logic here to handle the entered OTP (e.g., send to server)
//     try {
//     const response = await fetch('https://payments-api.logomish.com/LoginOtpVerify', {
//         method: 'POST',
//         headers: { 'content-type': 'application/json' },
//         body: JSON.stringify({
//           otp: enteredOtp,
//         }),
//       });

//       const data = await response.json();
//       if(data.message=='successfully login.'){
//         AsyncStorage.setItem('token',data.access_token)
//         onLogin()
//     }
//       console.log(data)
//     }catch (error) {
//         console.log('An error occurred while processing your request.');
//       }
//     // onLogin();
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.inputContainer}>
//         {otp.map((digit, index) => (
//           <TextInput
//             key={index}
//             ref={(ref) => (inputRefs.current[index] = ref)}
//             style={styles.input}
//             maxLength={1}
//             value={digit}
//             onChangeText={(value) => handleInputChange(index, value)}
//             onKeyPress={({ nativeEvent }) => {
//               if (nativeEvent.key === 'Backspace') {
//                 handleBackspace(index);
//               }
//             }}
//           />
//         ))}
//       </View>
//       <Button title="Submit" onPress={handleSubmit} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     marginBottom: 20,
//   },
//   input: {
//     height: 40,
//     width: 40,
//     borderWidth: 1,
//     margin: 5,
//     textAlign: 'center',
//   },
// });

// export default Otp;
