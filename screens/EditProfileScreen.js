import React, {useState,useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native';
import FormInput from '../components/FormInput';
import YesNoSelector from '../components/Selectors';
import DateTimePicker from '@react-native-community/datetimepicker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Icons from '../components/Icons';
import ButtonInput from '../components/ButtonInput';
import { useNavigation } from '@react-navigation/native';

import {useSelector} from 'react-redux';
import SpecialtySelector from '../components/Selector';
import FormTextInput from '../components/FormTextInput';
import AboutHeader from '../components/AboutHeader';
import AsyncStorage from '@react-native-async-storage/async-storage';
const EditProfileScreen = ({route}) => {
  const navigation = useNavigation();
  const [newval,setnewVal] = useState(false)
  const [users,setusers]=useState("")
  useEffect(()=>{
    async function replacementFunction(){
      const value = await AsyncStorage.getItem("data");
      setusers(JSON.parse(value))
      setName(JSON.parse(value).user_data[0].name)
      setnewVal(true)

    }
    replacementFunction()

  },[route])
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  const count = useSelector(state => state.auth.user);
  const specialitys = ['None', 'Shots', 'Cocktail'];
  const training = ['Yes', 'No'];
  const [paymentLink,setPaymentLink] = useState()
  // const userState = users.user_type;
  const [email, setEmail] = useState("");

  const [signature_drink, setsignature_drink] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [selectedTraing, setSelectedTraining] = useState('');
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [showPicker, setShowPicker] = useState(false);
  const [dob_date, setdob_date] = useState(new Date());
  const [imageUri, setImageUri] = useState();
  const [certificationUri, setCertificationUri] = useState();
  const [resumeUri,setResumeUri]= useState();
  const [imageUriimage, setImageUriimage] = useState(``);
  const [certificationUriimage, setCertificationUriimage] = useState(``);
  const [resumeUriimage,setResumeUriimage]= useState(``);
  



  const handleTrainingSelected = training => {
    setSelectedTraining(training);
  };
  const handleSpecialitySelected = speciality => {
    setSelectedSpecialty(speciality);
  };
  const onChangeEnd = (event, selectedDate) => {
    const currentDate = selectedDate || event;
    setShowPicker(Platform.OS === 'ios');
    setdob_date(currentDate);
  };
  const handleSelectImage = (setUriFunction,seturi) => {
    const options = {
      noData: true,
      mediaType: 'photo',
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
      } else if (response.error) {
      } else {
        console.log(response)
        const uri = response.assets[0].uri;
        const uri2 = response.assets[0];
        setUriFunction(uri);
        seturi(uri2)
      }
    });
  };
  const handleSubmit = async () => {
    // const file = {
    //   uri: imageUriimage,
    //   type: 'image/jpeg', 
    //   name: `${new Date()}profile_image.jpg`, 
    // };
    // const Certification = {
    //   uri: certificationUri,
    //   type: 'image/jpeg', 
    //   name: `${new Date()}certificate_image.jpg`, 
    // };
    // const Resume = {
    //   uri: resumeUri,
    //   type: 'image/jpeg', 
    //   name: `${new Date()}resume_image.jpg`, 
    // };

     const file = {
      uri: imageUri,
      type: imageUriimage.type, 
      name: `${new Date()}profile_image.jpg`, 
    };
    const Certification = {
      uri: certificationUri,
      type: certificationUriimage.type,
      name: `${new Date()}certificate_image.jpg`, 
    };
    const Resume = {
      uri: resumeUri,
      type: resumeUriimage.type,
      name: `${new Date()}resume_image.jpg`, 
    };
    // console.log(file,Resume,Certification)
   
    const formData = new FormData();
    formData.append('file', file);
    formData.append('name', name);
    formData.append('user_id',users?.user_data[0]?.id)
    formData.append('number', number);
    formData.append('speciality', selectedSpecialty);
    formData.append('signature_drink', signature_drink);
    formData.append('payment_link', paymentLink);
    formData.append('resume',Resume);
    formData.append('certificate',Certification);
    formData.append('alcohol_serving',selectedTraing=='Yes'?1:0)
    
    try {
       await fetch('https://bartender.logomish.com/userProfile/updateProfiles', {
          method: 'PATCH',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data',
            'accesstoken': `Bearer ${users?.user_data[0]?.access_token}`,
            'x-api-key': 'BarTenderAPI',
          },
          body: formData,
        })
          .then(response => response.text()) // <-- log the response text
          .then(text => {
            return JSON.parse(text);
            
          })
          .then(data => {
            console.log(data,"data image profile")
            if (data.success === 'success') {
              Alert.alert(data.message);
            } else {
              Alert.alert(data.data);
            }
          });
      
    } catch (error) {
      console.log('An error occurred while processing your request.', error.message);
    }
  };

  return (
    <>
      <AboutHeader name="Edit Item" />

      <ScrollView style={{marginBottom: 50,height:'100%'}}>
        <View style={{padding: 15, width: windowWidth}}>
          <FormTextInput
            title={'Name'}
            placeholder={'Enter Full Name'}
            placeholderColor={'grey'}
            setValues={text => setName(text)}
            currentvalue={name}
            style={{backgroundColor: 'blue'}}
          />

          <TouchableOpacity onPress={() => setShowPicker(true)}>
            <FormTextInput
              placeholderColor={'grey'}
              currentvalue={dob_date.toLocaleDateString()}
              edit={false}
              icon={'calendar'}
              title={'Date of Birth'}
            />
          </TouchableOpacity>
          {showPicker && (
            <DateTimePicker
              testID="startDateTimePicker"
              value={dob_date}
              mode="date"
              display="default"
              onChange={onChangeEnd}
            />
          )}

          <Text style={{color: 'grey'}}>Profile Picture</Text>

          <TouchableOpacity
            style={{
             
              backgroundColor: '#ECECEC',
              padding: 12,
              borderRadius: 10,
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 10,
              marginBottom: 15,
            }}
            onPress={()=>handleSelectImage(setImageUri,setImageUriimage)}>
            {imageUri ? (
              <View style={{display:'flex',alignItems:'center',justifyContent:'space-between',flexDirection:'row',width:"100%"}}>
              <View style={{display:'flex',alignItems:'center',flexDirection:'row',}}>
              <Image
              source={{uri: imageUri}}
              style={{
                width: 30,
                height: 30,
                borderRadius: 10,
                marginRight: 10,
              }}
              />
              <Text style={{color: 'black'}}>Profileimg.png</Text>
              </View>
                <Icons.AntDesign name={"closecircle"} />
              </View>
            ) : (
              <Icons.AntDesign name="user" size={70} />
            )}
          </TouchableOpacity>

          <FormTextInput
            placeholder={'Please enter Phone Number'}
            placeholderColor={'grey'}
            icon={'phone'}
            setValues={text => setNumber(text)}
            currentvalue={number}
            title={'Phone'}
            keyboardType="numeric"
          />
         

          <Text style={{fontWeight: 'bold', color: 'black'}}>
            Please Select your speciality
          </Text>
          <SpecialtySelector
            specialties={specialitys}
            onSpecialtySelected={handleSpecialitySelected}
          />

          <FormInput
            titleName={'Please select your Signature Drink'}
            placeholder={'Moscow Mule'}
            iconss={'menuunfold'}
            placeholderColor={'grey'}
            setValues={text => setsignature_drink(text)}
            currentvalue={signature_drink}
            // keyboardType="numeric"
          />

          <Text style={{fontWeight: 'bold', color: 'black', marginTop: 20}}>
            Do you have alchohol seller and server training?
          </Text>
          <YesNoSelector
            specialties={training}
            onSpecialtySelected={handleTrainingSelected}
          />

          <Text style={{color: 'grey', marginTop: 20}}>
            Upload Certification
          </Text>
              {/* Certification */}
          <TouchableOpacity
            style={{
              backgroundColor: '#ECECEC',
              padding: 12,
              borderRadius: 10,
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 10,
              marginBottom: 15,
            }}
            onPress={()=>handleSelectImage(setCertificationUri,setCertificationUriimage)}>
            {certificationUri ? (
              <View style={{display:'flex',alignItems:'center',justifyContent:'space-between',flexDirection:'row',width:"100%"}}>
              <View style={{display:'flex',alignItems:'center',flexDirection:'row',}}>
              <Image
              source={{uri: certificationUri}}
              style={{
                width: 30,
                height: 30,
                borderRadius: 10,
                marginRight: 10,
              }}
              />
              <Text style={{color: 'black'}}>Browse</Text>
              </View>
                <Icons.AntDesign name={"closecircle"} />
              </View>
            ) : (
              <Icons.AntDesign name="user" size={70} />
            )}
         
          </TouchableOpacity>
          <Text style={{color: 'grey', marginTop: 20}}>Please Add Your Bartending Resume</Text>

          <TouchableOpacity
            style={{
              backgroundColor: '#ECECEC',
              padding: 12,
              borderRadius: 10,
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 10,
              marginBottom: 15,
            }}
            onPress={()=>handleSelectImage(setResumeUri,setResumeUriimage)}>
            {resumeUri ? (
              <View style={{display:'flex',alignItems:'center',justifyContent:'space-between',flexDirection:'row',width:"100%"}}>
              <View style={{display:'flex',alignItems:'center',flexDirection:'row',}}>
              <Image
              source={{uri: resumeUri}}
              style={{
                width: 30,
                height: 30,
                borderRadius: 10,
                marginRight: 10,
              }}
              />
              <Text style={{color: 'black'}}>Browse</Text>
              </View>
                <Icons.AntDesign name={"closecircle"} />
              </View>
            ) : (
              <Icons.AntDesign name="user" size={70} />
            )}
          </TouchableOpacity>

          <FormTextInput
            Input
            placeholder={'Cash.app/$Account'}
            placeholderColor={'grey'}
            title={'Personal Payment Link'}
            setValues={text => setPaymentLink(text)}
            currentvalue={paymentLink}
          />
        </View>
              <View style={styles.SubmitButtonView}>
        <ButtonInput title={"Submit"} onPress={handleSubmit}/>

              </View>

      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    width: '100%',
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
  SubmitButtonView:{
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'center'
  }
});
// <TouchableOpacity style={{borderWidth:1,borderRadius:40, display:'flex',alignItems:'center',justifyContent:'center'}} onPress={handleSelectImage}>
// {imageUri? (<Image source={{ uri: imageUri }} style={{ width: 200, height: 200,borderRadius:40 }} />):(<Icons.AntDesign name="user" size={70} />)}

// </TouchableOpacity>
export default EditProfileScreen;