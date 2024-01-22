import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    TouchableOpacity,
  } from 'react-native';
  import React, {useState} from 'react';
  import SearchInput from './SearchInput';
  import Icon from 'react-native-vector-icons/AntDesign';
  import {useNavigation} from '@react-navigation/native';
  const AboutHeader = ({screen,name,onPress}) => {
    const navigation = useNavigation();
  
    return (
      <SafeAreaView>
        <View style={styles.headerContainer}>
        {screen=="qr"?
        <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{display: "flex",flexDirection: "row"}}>
            <Icon name="infocirlceo" size={24} color="#fff" />
      </TouchableOpacity>:screen=="about"?
          <TouchableOpacity
            onPress={() => navigation.navigate("QRScreen")}
            style={{display: "flex",flexDirection: "row"}}>
                <Icon name="qrcode" size={24} color="#fff" />
          </TouchableOpacity>
          :screen=="Form"|| name == "Edit Item"?
          <TouchableOpacity
onPress={() => navigation.goBack()}
style={{display: "flex",flexDirection: "row"}}>
<Text style={styles.headerText}>Cancel</Text>
</TouchableOpacity>:
          <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{display: "flex",flexDirection: "row"}}>
              <Icon name="left" size={24} color="#fff" />
        </TouchableOpacity>

        }
  
          <Text style={styles.headerText}>{name}</Text>
          {screen=="comment"?
          <TouchableOpacity
          onPress={onPress}
          style={{display: "flex",flexDirection: "row"}}>
          <Text style={styles.headerText}>Post</Text>
          </TouchableOpacity>
          :null}
          {screen=="SignOut"?
          <TouchableOpacity
          onPress={onPress}
        
          style={{display: "flex",flexDirection: "row"}}>
          <Text style={styles.headerText}>Sign Out</Text>
          </TouchableOpacity>
      :null}
{screen == "qr"?
            <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{display: "flex",flexDirection: "row"}}>
            <Text style={styles.headerText}>Done</Text>
            </TouchableOpacity>
:null}
{name=="Edit Item"?
<TouchableOpacity
onPress={() => navigation.goBack()}
style={{display: "flex",flexDirection: "row"}}>
<Text style={styles.headerText}>Done</Text>
</TouchableOpacity>
:null}
{name=="Form"?
<TouchableOpacity
onPress={() => navigation.goBack()}
style={{display: "flex",flexDirection: "row"}}>
<Text style={styles.headerText}>Submit</Text>
</TouchableOpacity>
:null}
        </View>
      </SafeAreaView>
    );
  };
  
  export default AboutHeader;
  
  const styles = StyleSheet.create({
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
  });
  