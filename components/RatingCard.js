import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React,{useState} from 'react'
import StarRating from 'react-native-star-rating-widget'

const RatingCard = ({ratingx,text}) => {
  const [rating, setRating] = useState(0);
  return (
    <View style={styles.ratingcard}>
    <StarRating
    rating={rating}
    onChange={setRating}
    starSize={23}
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