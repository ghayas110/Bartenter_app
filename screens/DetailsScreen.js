import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ProfileDetails from '../components/ProfileDetails'
import Header from '../components/Header'
import HeaderDetails from '../components/HeaderDetails'

const DetailsScreen = () => {
  return (
    <View>
    <HeaderDetails/>
 <ProfileDetails/>
    </View>
  )
}

export default DetailsScreen

const styles = StyleSheet.create({})