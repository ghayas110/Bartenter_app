import {
  Image,
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import Header from '../components/Header';
import FormInput from '../components/FormInput';
import PasswordInput from '../components/PasswordInput';
import ButtonInput from '../components/ButtonInput';
import DateTimePicker from '@react-native-community/datetimepicker';
import {useSelector} from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import HeaderDetails from '../components/HeaderDetails';
import { launchImageLibrary } from 'react-native-image-picker';
import Icons from '../components/Icons';
const AddJobScreen = () => {
    const navigation =useNavigation()
  const count = useSelector(state => state.auth.user);
  const [post_type, setpost_type] = useState('bartender');
  const [post_title, setpost_title] = useState();
  const [contact_email, setcontact_email] = useState();
  const [post_description, setpost_description] = useState();
  const [contact_phone, setcontact_phone] = useState();
  const [event_date, setevent_date] = useState(new Date());
  const [event_time, setevent_time] = useState(new Date());
  const [event_duration, setevent_duration] = useState();
  const [event_location, setevent_location] = useState();
  const [showPicker, setShowPicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [imageUri, setImageUri] = useState(`https://bartender.logomish.com/${count.user_data[0].image}`);

  const handleSelectImage = () => {
    const options = {
      noData: true,
      mediaType: 'photo',
    };

    launchImageLibrary(options, (response) => {
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
  const handleSubmit = async (e) => {
    const formData = new FormData();
    const file = {
      uri: imageUri,
      type: 'image/jpeg', // or the correct MIME type for your image
      name: `${new Date()}event_image.jpg`, // you can give any name
    };
    formData.append('file', file);
    formData.append("post_type", post_type);
    formData.append("post_title", post_title)
    formData.append("post_description", post_description)
    formData.append("contact_email", contact_email)
    formData.append('contact_phone', contact_phone)
    formData.append("event_date",event_date)
    formData.append("event_time",event_time)
    formData.append("event_duration", event_duration)
    formData.append("event_location", event_location)
    formData.append("event_lat", '31.968599')
    formData.append("event_lng", '-99.901810')
    formData.append("no_of_people","12")
    formData.append("theme","Red and White")
    fetch('https://bartender.logomish.com/posts/CreatePost', {
          method: 'POST',
          headers: {
            'Content-Type': 'multipart/form-data',
            'accesstoken': `Bearer ${count?.access_token}`,
            'x-api-key': 'BarTenderAPI',
          },
          body: formData,
        })
        .then(response => response.json())
        .then(data => {
        if(data?.message == "Success" ){
            Alert.alert("Job Created")
            navigation.goBack()
        }else{
            Alert.alert("Job Not Created")
        }
        });
  };
  const onChangeEnd = (event, selectedDate) => {
    const currentDate = selectedDate || event_date;
    setShowPicker(Platform.OS === 'ios');
    setevent_date(currentDate);
    console.log('End Date:', currentDate);
  };
  const onChangeStart = (event, selectedDate) => {
    const currentDate = selectedDate || event_time;
    setShowTimePicker(Platform.OS === 'ios');
    setevent_time(currentDate);
    console.log('End Date:', currentDate);
  };
  return (
    <View>
    <HeaderDetails title="Add Job"/>

      <View style={styles.container}>
      <TouchableOpacity style={{borderWidth:1,borderRadius:40, display:'flex',alignItems:'center',justifyContent:'center'}} onPress={handleSelectImage}>
      {imageUri? (<Image source={{ uri: imageUri }} style={{ width: 70, height: 70,borderRadius:40 }} />):(<Icons.AntDesign name="user" size={70} />)}
      
      </TouchableOpacity>
        <View>
          <FormInput
            placeholder={'Enter Job title'}
            placeholderColor={'black'}
            setValues={text => setpost_title(text)}
          />

          <FormInput
            placeholder={'Please enter Job description'}
            placeholderColor={'black'}
            setValues={text => setpost_description(text)}
          />

          <FormInput
            placeholder={'Please enter contact email'}
            placeholderColor={'black'}
            setValues={text => setcontact_email(text)}
          />
          <FormInput
            placeholder={'Please enter contact phone'}
            placeholderColor={'black'}
            keyboardType="numeric"
            setValues={text => setcontact_phone(text)}
          />
          <TouchableOpacity
            style={{width: '100%'}}
            onPress={() => setShowPicker(true)}>
            <FormInput
              placeholder={'Please enter contact phone'}
              placeholderColor={'black'}
              currentvalue={event_date.toLocaleDateString()}
              edit={false}
            />
          </TouchableOpacity>
          {showPicker && (
            <DateTimePicker
              testID="startDateTimePicker"
              value={event_date}
              mode="date"
              display="default"
              onChange={onChangeEnd}
            />
          )}
          <TouchableOpacity
            style={{width: '100%'}}
            onPress={() => setShowTimePicker(true)}>
            <FormInput
              placeholder={'Please enter event time'}
              placeholderColor={'black'}
              currentvalue={event_time.toLocaleString()}
              edit={false}
            />
          </TouchableOpacity>
          {showTimePicker && (
            <DateTimePicker
              testID="startDateTimePicker"
              value={event_time}
              mode="time"
              display="default"
              is24Hour={true}
              onChange={onChangeStart}
            />
          )}
          <FormInput
            placeholder={'Please enter event duration'}
            placeholderColor={'black'}
            keyboardType="numeric"
            setValues={text => setevent_duration(text)}
          />
          <FormInput
            placeholder={'Please enter event location'}
            placeholderColor={'black'}
            setValues={text => setevent_location(text)}
          />
        </View>
        <ButtonInput title={'Add Job'} icon={'plus'} onPress={handleSubmit}/>
      </View>
    </View>
  );
};

export default AddJobScreen;

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
