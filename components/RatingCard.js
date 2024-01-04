import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import StarRating from 'react-native-star-rating-widget'

const RatingCard = ({rating,text}) => {
  
  return (
    <View style={styles.ratingcard}>
    <StarRating
    rating={rating}
    
    starSize={20}
   />
    <Text style={{color:'black'}}>{text}</Text>
    </View>
  )
}

export default RatingCard

const styles = StyleSheet.create({
    ratingcard: {
        borderRadius: 6,
        elevation: 3,
        padding:10,
        margin:10,
        backgroundColor: '#fff',
        shadowOffset: { width: 1, height: 1 },
        shadowColor: '#333',
    
      },
})