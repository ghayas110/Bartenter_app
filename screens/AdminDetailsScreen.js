import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import HeaderDetails from '../components/HeaderDetails'
import AdminProfileDetails from '../components/AdminProfileDetails'

const AdminDetailsScreen = ({route}) => {
  console.log(route.params.item)

  return (
    <View>
    <HeaderDetails title={"John Brown"}/>
 <AdminProfileDetails name={route.params.item.name} email={route.params.item.email} PhoneNumber={route.params.item.PhoneNumber}/>
    </View>
  )
}

export default AdminDetailsScreen

const styles = StyleSheet.create({})