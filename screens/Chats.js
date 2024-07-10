import {
  Button,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Image,
  TextInput,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../components/Header';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import baseUrl from '../global';
import {BannerAd, BannerAdSize, TestIds} from 'react-native-google-mobile-ads';
const Chats = () => {
  const [userId, setuserId] = useState(0);
  const [data, setdata] = useState();
  const [datas, setdatas] = useState();
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [subscribed, setSubscribed] = useState();
  const [users, setusers] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const socketUrl = 'http://192.168.200.163:3000';

  const handleSearch = text => {
    setSearchQuery(text);
    if (text === '') {
      setdata(datas);
    } else {
      const filteredData = datas?.filter(item =>
        item.name?.toLowerCase().includes(text?.toLowerCase()),
      );
      setdata(filteredData);
    }
  };

  useEffect(() => {
    async function replacementFunction() {
      const value = await AsyncStorage.getItem('data');
      AsyncStorage.setItem('data', value);
      setusers(JSON.parse(value));
      ValidateUserSubscription(JSON.parse(value));
      setuserId(JSON.parse(value).user_data[0].id);
      AllChats(JSON.parse(value).user_data[0].id);
    }
    replacementFunction();
  }, [isFocused]);
  const adUnitId =
    Platform.OS == 'android'
      ? 'ca-app-pub-9019633061186947/4712552739'
      : 'ca-app-pub-9019633061186947/7568233636';
  const ValidateUserSubscription = async userss => {
    try {
      fetch(`${baseUrl}/subscription/CheckSubscription`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': 'BarTenderAPI',
          accesstoken: `Bearer ${userss.access_token}`,
        },
      })
        .then(response => response.json())
        .then(dataa => {
          const subscriptions = dataa.subscription_status[0];

          setSubscribed(subscriptions);
        });
    } catch (error) {
      Alert.alert('An error occurred while processing your request.');
    }
  };
  const AllChats = async id => {
    setRefreshing(true);
    try {
      fetch(`${socketUrl}/getMyChats`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: id,
        }),
      })
        .then(response => response.json())
        .then(chat => {
          if (chat.success) {
            setdata(chat.users);
            setdatas(chat.users);
            setRefreshing(false);
          } else {
            setRefreshing(false);
          }
        })
        .catch(err => {
          setRefreshing(false);
          console.log('An error occurred while processing your request.', err);
        });
    } catch (error) {
      setRefreshing(false);
      console.log('An error occurred while processing your request.', error);
    }
  };
  const seenMessage = async sender => {
    if (sender !== null)
      try {
        fetch(`${socketUrl}/messages/ReadMessages`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            accesstoken: `Bearer ${users?.access_token}`,
            'x-api-key': 'BarTenderAPI',
          },
          body: JSON.stringify({sender: sender}),
        })
          .then(response => {
            return response.json();
          })
          .then(chat => {})
          .catch(err => {});
      } catch (error) {
        console.log('An error occurred while processing your request.', error);
      }
  };

  const Item = ({name, image, onPress}) => {
    const imageuri = image?.split('uploads');
    return (
      <TouchableOpacity
        onPress={onPress}
        style={{
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'center',
          padding: 10,
          borderBottomWidth: 1,
          borderBottomColor: 'whitesmoke',
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={
              image != '' && image != undefined && image != null
                ? {uri: `${baseUrl}${imageuri[1]}`}
                : require('../assets/userpic.jpg')
            }
            style={{width: 40, height: 40, borderRadius: 7}}
          />
          <View style={{marginLeft: 15}}>
            <Text style={{color: 'black'}}>{name}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  const renderItem = items => {
    return (
      <Item
        name={items?.item.name}
        image={items?.item.image}
        onPress={() => {
          seenMessage(items?.item.id);
          navigation.navigate('Message', items?.item);
        }}
      />
    );
  };

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    setRefreshing(true);
    AllChats();
  };
  return (
    <SafeAreaView>
      {/* <Header title="Chat" headerShown={true}/> */}
      <SafeAreaView>
        <View style={styles.headerContainer}>
          <View style={styles.siders}>
            <TouchableOpacity onPress={() => navigation.openDrawer('helloo')}>
              <Icon name="menu" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
          <Text style={styles.headerText}>Chat</Text>
          <View style={styles.searchContainer}>
            <Icon name="search" size={20} color="orange" />
            <TextInput
              style={styles.input}
              placeholder="Search"
              placeholderTextColor={'orange'}
              value={searchQuery}
              onChangeText={handleSearch}
            />
          </View>
        </View>
        {subscribed?.subscription_status != 1 ? (
          <></>
        ) : //   <BannerAd
        //   unitId={adUnitId}
        //   size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        // />
        null}
      </SafeAreaView>
      <View style={styles.container}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          onRefresh={() => onRefresh()}
          refreshing={refreshing}
        />
      </View>
    </SafeAreaView>
  );
};

export default Chats;

const styles = StyleSheet.create({
  container: {
    width: 'auto',
    height: '78.5%',
    backgroundColor: '#fff',
  },
  text: {
    marginTop: 20,
    fontSize: 18,
    color: '#ccc',
  },
  button: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#F2994A',
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  siders: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  headerContainer: {
    backgroundColor: '#FFA500',
    paddingTop: 40,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
  headerText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#D98100',
    paddingHorizontal: 10,
    marginTop: 10,
    height: 40,
    borderRadius: 10,
  },
  input: {
    marginLeft: 10,
    flex: 1,
  },
});
