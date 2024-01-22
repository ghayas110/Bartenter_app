import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ProfileDetails from '../components/ProfileDetails'
import Header from '../components/Header'
import HeaderDetails from '../components/HeaderDetails'

const DetailsScreen = ({route}) => {

  return (
    <View>
    <HeaderDetails title={"John Brown"}/>
 <ProfileDetails name={route.params.item.name} email={route.params.item.email} PhoneNumber={route.params.item.PhoneNumber}/>
    </View>
  )
}

export default DetailsScreen

const styles = StyleSheet.create({})