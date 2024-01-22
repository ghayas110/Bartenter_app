import React, {useState} from 'react';
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
import {useNavigation} from '@react-navigation/native';
import FormInput from '../components/FormInput';
import YesNoSelector from '../components/Selectors';
import DateTimePicker from '@react-native-community/datetimepicker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Icons from '../components/Icons';
import {useSelector} from 'react-redux';
import SpecialtySelector from '../components/Selector';
import FormTextInput from '../components/FormTextInput';
import AboutHeader from '../components/AboutHeader';
const EditProfileScreen = () => {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  const count = useSelector(state => state.auth.user);
  const specialitys = ['None', 'Shots', 'Cocktail'];
  const training = ['Yes', 'No'];
  const userState = count.user_data[0].user_type;
  const [email, setEmail] = useState(count.user_data[0].email);

  const [signature_drink, setsignature_drink] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [selectedTraing, setSelectedTraining] = useState('');
  const [speciality, setspeciality] = useState(0);
  const [name, setName] = useState(count.user_data[0].name);
  const [number, setNumber] = useState(count.user_data[0].number);
  const [showPicker, setShowPicker] = useState(false);
  const [dob_date, setdob_date] = useState(new Date());
  const [imageUri, setImageUri] = useState(
    `https://bartender.logomish.com/${count.user_data[0].image}`,
  );
  const [docUri, setDocUri] = useState(null );
  const navigation = useNavigation();
  const formData = new FormData();
  const handleSpecialtySelected = specialty => {
    console.log(`Selected specialty: ${specialty}`);
    // You can add more code here to handle the selected specialty
    setSelectedSpecialty(specialty);
  };
  const handleTrainingSelected = training => {
    console.log(`Selected specialty: ${training}`);
    // You can add more code here to handle the selected specialty
    setSelectedTraining(training);
  };
  const onChangeEnd = (event, selectedDate) => {
    const currentDate = selectedDate || event;
    setShowPicker(Platform.OS === 'ios');
    setdob_date(currentDate);
  };
  // const validateEmail = (email) => {
  //   var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  //   return re.test(email);
  // };

  const handleSelectImage = () => {
    const options = {
      noData: true,
      mediaType: 'photo',
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const uri = response.assets[0].uri;
        setImageUri(uri);
      }
    });
  };

  const handleSubmit = async () => {
    // ... (previous code)

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('number', number);
    formData.append('signature_drink', signature_drink);
    formData.append('speciality', speciality);

    // Append the image as a file
    const file = {
      uri: imageUri,
      type: 'image/jpeg', // or the correct MIME type for your image
      name: `${new Date()}profile_image.jpg`, // you can give any name
    };
    formData.append('file', file);

    formData.append('payment_link', 'fhdskfj');

    try {
      if (count.user_data[0].image == '') {
        console.log('insetredd');
        fetch('https://bartender.logomish.com/userProfile/profileInsert', {
          method: 'PATCH',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
            accesstoken: `Bearer ${count?.access_token}`,
            'x-api-key': 'BarTenderAPI',
          },
          body: formData,
        })
          .then(response => response.text()) // <-- log the response text
          .then(text => {
            console.log(text);
            return JSON.parse(text);
          })
          .then(data => {
            if (data.message === 'Success') {
              console.log('data', data);
              Alert.alert(data.message);
            } else {
              Alert.alert(data.data);
            }
          });
      } else {
        console.log('updatedd');
        fetch('https://bartender.logomish.com/userProfile/updateProfiles', {
          method: 'PATCH',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
            accesstoken: `Bearer ${count?.access_token}`,
            'x-api-key': 'BarTenderAPI',
          },
          body: formData,
        })
          .then(response => response.text()) // <-- log the response text
          .then(text => {
            console.log(text);
            return JSON.parse(text);
          })
          .then(data => {
            if (data.message === 'Success') {
              console.log('data', data);
              Alert.alert(data.message);
            } else {
              Alert.alert(data.data);
            }
          });
      }
    } catch (error) {
      console.log('An error occurred while processing your request.', error);
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
            onPress={handleSelectImage}>
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
          />

          <Text style={{fontWeight: 'bold', color: 'black'}}>
            Please Select your speciality
          </Text>
          <SpecialtySelector
            specialties={specialitys}
            onSpecialtySelected={handleTrainingSelected}
          />

          <FormInput
            titleName={'Please select your Signature Drink'}
            placeholder={'Moscow Mule'}
            iconss={'menuunfold'}
            placeholderColor={'grey'}
            keyboardType="numeric"
          />

          <Text style={{fontWeight: 'bold', color: 'black', marginTop: 20}}>
            Do you have alchohol seller and server training?
          </Text>
          <YesNoSelector
            specialties={training}
            onSpecialtySelected={handleSpecialtySelected}
          />

          <Text style={{color: 'grey', marginTop: 20}}>
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
            onPress={handleSelectImage}>
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
            onPress={handleSelectImage}>
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
          />
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
});
// <TouchableOpacity style={{borderWidth:1,borderRadius:40, display:'flex',alignItems:'center',justifyContent:'center'}} onPress={handleSelectImage}>
// {imageUri? (<Image source={{ uri: imageUri }} style={{ width: 200, height: 200,borderRadius:40 }} />):(<Icons.AntDesign name="user" size={70} />)}

// </TouchableOpacity>
export default EditProfileScreen;
