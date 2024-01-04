import { StyleSheet, Text, TextInput, View } from 'react-native'
import React,{useState} from 'react'
import HeaderDetails from '../components/HeaderDetails'
import FormInput from '../components/FormInput'
import AboutHeader from '../components/AboutHeader'
import { useNavigation } from '@react-navigation/native'
const CommentScreen = () => {
    const navigation = useNavigation()
    const [comment, setComment] = useState()
    const handleSubmit=()=>{
        navigation.goBack()
    }
  return (
    <View>
    <AboutHeader screen={"comment"} name={"Comment"} onPress={handleSubmit}/>
    <TextInput
    style={styles.input}
    placeholder="Enter comment"
    placeholderTextColor='black'
    onChangeText={(text) => setComment(text)}
    />
    </View>
  )
}

export default CommentScreen

const styles = StyleSheet.create({
    input: {
        height: 40,
        width: 300,
        borderBottomColor:"black",
        borderBottomWidth:StyleSheet.hairlineWidth,
        color: 'black',
      },
})