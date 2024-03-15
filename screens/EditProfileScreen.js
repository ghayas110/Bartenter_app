import React, { useState, useEffect } from 'react';
import {
  View,
  SafeAreaView,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
  Dimensions,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import FormInput from '../components/FormInput';
import YesNoSelector from '../components/Selectors';
import DateTimePicker from '@react-native-community/datetimepicker';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Icons from '../components/Icons';
import ButtonInput from '../components/ButtonInput';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import DocumentPicker from 'react-native-document-picker';
import { useSelector } from 'react-redux';
import SpecialtySelector from '../components/Selector';
import FormTextInput from '../components/FormTextInput';
import AboutHeader from '../components/AboutHeader';
import AsyncStorage from '@react-native-async-storage/async-storage';
const EditProfileScreen = ({ route }) => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [newval, setnewVal] = useState(false)
  const [users, setusers] = useState({})
  useEffect(() => {
    async function replacementFunction() {
      const value = await AsyncStorage.getItem("data");
      setuserTypes(JSON.parse(value).user_data[0].user_type)
      setusers(JSON.parse(value))
      setName(JSON.parse(value).user_data[0].name)
      getDefaultData(JSON.parse(value))
      setnewVal(true)

    }
    replacementFunction()
  }, [isFocused])
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const count = useSelector(state => state.auth.user);
  const specialitys = ['None', 'Shots', 'Cocktail'];
  const training = ['Yes', 'No'];
  const [paymentLink, setPaymentLink] = useState("")
  const [signature_drink, setsignature_drink] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('None');
  const [selectedTraing, setSelectedTraining] = useState('Yes');
  const [name, setName] = useState("");
  const [number, setNumber] = useState('');
  const [showPicker, setShowPicker] = useState(false);
  const [dob_date, setdob_date] = useState(new Date());
  const [imageUri, setImageUri] = useState();
  const [certificationUri, setCertificationUri] = useState();
  const [resumeUri, setResumeUri] = useState();
  const [imageUriflag, setImageUriflag] = useState(false);
  const [certificationUriflag, setCertificationUriflag] = useState(false);
  const [resumeUriflag, setResumeUriflag] = useState(false);
  const [imageUriimage, setImageUriimage] = useState();
  const [certificationUriimage, setCertificationUriimage] = useState();
  const [resumeUriimage, setResumeUriimage] = useState();
  const [isLoading, setIsLoading] = useState(false);

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
  const handleSelectImage = (setUriFunction, seturi, setflag) => {
    const options = {
      noData: true,
      mediaType: 'photo',
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
      } else if (response.error) {
      } else {
        const uri = response.assets[0].uri;
        const uri2 = response.assets[0];
        setUriFunction(uri);
        seturi(uri2)
        setflag(true)
      }
    });
  };
  const selectDoc = async (setUriFunction, seturi, setflag) => {
    try {
      const doc = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf],
        allowMultiSelection: true
      });
      // const doc = await DocumentPicker.pickSingle()
      console.log("object",doc)
      const uri = doc[0].uri;
      const uri2 = doc[0];
      setUriFunction(uri);
      seturi(uri2)
      setflag(true)
      
    //   const doc = await DocumentPicker.pickMultiple({
    //     type: [DocumentPicker.types.pdf, DocumentPicker.types.images]
    //   })
    //   console.log(doc)
    } catch(err) {
      if(DocumentPicker.isCancel(err)) 
        console.log("User cancelled the upload", err);
      else 
        console.log(err)
    }
  }
  const[userTypes,setuserTypes]=useState(0)

  const getDefaultData = async (users) => {
    setIsLoading(true)
    setusers(users)
    try {
      await fetch(`https://bartenderbackend.bazazi.co/users/GetUserById/${users?.user_data[0]?.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'accesstoken': `Bearer ${users?.access_token}`,
          'x-api-key': 'BarTenderAPI',
        }
      }).then(
        response => response.json())
        .then(data => {
          if (data.message === 'Success') {
            setName(data?.users[0]?.name)
            setuserTypes(data?.users[0]?.user_type)
            var tra = data?.users[0]?.alcohol_serving
            setSelectedTraining(training.filter(data => data == `${tra == "1" ? "Yes" : "No"}`)[0])
            setNumber(data?.users[0]?.number)
            setdob_date(new Date(data?.users[0]?.dob))
            setImageUri(`https://bartenderbackend.bazazi.co` + data?.users[0]?.image)
            setCertificationUri(`https://bartenderbackend.bazazi.co` + data?.users[0]?.certificate)
            setResumeUri(`https://bartenderbackend.bazazi.co` + data?.users[0]?.resume)
            setsignature_drink(data?.users[0]?.signature_drink)
            setPaymentLink(data?.users[0].payment_link)
            var spe = data?.users[0]?.speciality
            setSelectedSpecialty(specialitys.filter(data => data == `${spe}`)[0])
            setIsLoading(false)
          } else {
            Alert.alert(data.data);
          }
        });
    } catch (error) {

    }
  }
  const handleSubmit = async () => {
    setIsLoading(true);
    const file = {
      uri: imageUri,
      type: imageUriimage?.type,
      name: `${new Date()}profile_image.jpg`,
    };
    const Certification = {
      uri: certificationUri,
      type: certificationUriimage?.type,
      name: `${new Date()}certificate_image.pdf`,
    };
    const Resume = {
      uri: resumeUri,
      type: resumeUriimage?.type,
      name: `${new Date()}resume_image.pdf`,
    };
    // console.log(file,Resume,Certification)
    const formData = new FormData();
    imageUriflag ? formData.append('file', file) : "";
    formData.append('name', name);
    formData.append('user_id', users?.user_data[0]?.id)
    formData.append('number', number);
    formData.append('speciality', selectedSpecialty);
    formData.append('signature_drink', signature_drink);
    formData.append('payment_link', paymentLink);
    resumeUriflag ? formData.append('resume', Resume) : "";
    certificationUriflag ? formData.append('certificate', Certification) : "";
    formData.append('alcohol_serving', selectedTraing == 'Yes' ? 1 : 0)
    formData.append('dob', dob_date.toString())

    try {
      await fetch('https://bartenderbackend.bazazi.co/userProfile/updateProfiles', {
        method: 'PATCH',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data',
          'accesstoken': `Bearer ${users?.access_token}`,
          'x-api-key': 'BarTenderAPI',
        },
        body: formData,
      })
        .then(response => response.text()) // <-- log the response text
        .then(text => {
          return JSON.parse(text);

        })
        .then(data => {
          if (data.success === 'success') {
            setIsLoading(false);

            setImageUriflag(false)
            setCertificationUriflag(false)
            setResumeUriflag(false)
            Alert.alert(
            'Profile Updated',
            data.message,
            [
              {
                text: 'OK',
                onPress: () => navigation.goBack(),
                style: 'cancel',
              }
            ]
            )
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

      {isLoading||users=={} ?
        <View style={[styles.containerSpinner, styles.horizontalSpinner]}>
          <ActivityIndicator size="large" />
        </View> :
         <>
          <SafeAreaView>
            <View style={styles.headerContainer}>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{ display: "flex", flexDirection: "row" }}>
                <Text style={styles.headerText}>Cancel</Text>
              </TouchableOpacity>
              <Text style={styles.headerText}>Edit Profile</Text>
              <TouchableOpacity
                onPress={handleSubmit}
                style={{ display: "flex", flexDirection: "row" }}>
                <Text style={styles.headerText}>Done</Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
          <ScrollView style={{ marginBottom: 50, height: '100%' }}>
            <View style={{ padding: 15, width: windowWidth }}>
              <FormTextInput
                title={'Name'}
                placeholder={'Enter Full Name'}
                placeholderColor={'grey'}
                setValues={text => setName(text)}
                currentvalue={name}
                style={{ backgroundColor: 'blue' }}
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
              <Text style={{ color: 'grey' }}>Profile Picture</Text>
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
                onPress={() => handleSelectImage(setImageUri, setImageUriimage, setImageUriflag)}>
                {imageUri ? (
                  <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', width: "100%" }}>
                    <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', }}>
                      <Image
                        source={{ uri: imageUri }}
                        style={{
                          width: 30,
                          height: 30,
                          borderRadius: 10,
                          marginRight: 10,
                        }}
                      />
                      <Text style={{ color: 'black' }}>Profileimg.png</Text>
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
              {
                userTypes==2?"":
               <>
                <Text style={{ fontWeight: 'bold', color: 'black' }}>
                Please Select your speciality
              </Text>
              <SpecialtySelector
                specialties={specialitys}
                onSpecialtySelected={handleSpecialitySelected}
                defaultValue={selectedSpecialty}
              />
              </>
              }
            
            {
                userTypes==1?"":
              <FormInput
                titleName={'Please select your Signature Drink'}
                placeholder={'Moscow Mule'}
                iconss={'menuunfold'}
                placeholderColor={'grey'}
                setValues={text => setsignature_drink(text)}
                currentvalue={signature_drink}
              />
            }
            {
                userTypes==2?"":
             <>
              <Text style={{ fontWeight: 'bold', color: 'black', marginTop: 20 }}>
                Do you have alchohol seller and server training?
              </Text>
              <YesNoSelector
                specialties={training}
                onSpecialtySelected={handleTrainingSelected}
                defaultValue={selectedTraing}
              />
              <Text style={{ color: 'grey', marginTop: 20 }}>
                Upload Certification
              </Text>
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
                onPress={()=>selectDoc(setCertificationUri,setCertificationUriimage,setCertificationUriflag)}>
                {certificationUri ? (
                  <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', width: "100%" }}>
                    <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', }}>
                    <Icons.AntDesign name="file1"  size={20} />
                      <Text style={{ color: 'black' }}>{certificationUriimage?.name}</Text>
                    </View>
                    <Icons.AntDesign name={"closecircle"} />
                  </View>
                ) : (
                  <Icons.AntDesign name="user" size={70} />
                )}
              </TouchableOpacity>
              <Text style={{ color: 'grey', marginTop: 20 }}>Please Add Your Bartending Resume</Text>

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
                onPress={() => selectDoc(setResumeUri, setResumeUriimage, setResumeUriflag)}>
                {resumeUri ? (
                  <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', width: "100%" }}>
                    <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', }}>
                    <Icons.AntDesign name="file1"  size={20} />
                      <Text style={{ color: 'black' }}>{resumeUriimage?.name}</Text>
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
             </>
            }
              
            </View>
          </ScrollView></>
      }


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
  SubmitButtonView: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontWeight: "bold",
    color: 'black',
    fontSize: 15,
    textAlign: "center"
  },
  headerContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: '#FFA500',
    padding: 10,
    paddingBottom: 10,
  },
  headerText: {
    color: 'whitesmoke',
    fontSize: 17,
    fontWeight: 'bold',

  },
  containerSpinner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center', 
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
  },
  horizontalSpinner: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20, 
    borderRadius: 10,
    backgroundColor: '#fff', 
  },
});
export default EditProfileScreen;