import { Button, StyleSheet, Text, View,SafeAreaView, TouchableOpacity, Image, Alert, Platform,ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import ButtonInput from '../components/ButtonInput'
import IAP,{getSubscriptions, initConnection, requestSubscription}from 'react-native-iap'



const items = Platform.select({
  ios: {
    sku: 'bart_699_1m',
    andDangerouslyFinishTransactionAutomaticallyIOS: false
  },
  android: {
    skus: ['bart_699_1m','bart29.99']
  }
})

const Subscription = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [purchased, setPurchased] = useState(false);

  useEffect(() => {
    initConnection()
      .then(() => {
        getSubscriptions(items)
          .then(res => {
            console.log(res, "response");
            setProducts(res); // Assuming `res` contains the subscription products
          })
          .catch(err => {
            console.log("Error fetching subscriptions:", err);
          });
      })
      .catch(err => {
        console.log("Error initializing connection:", err.message);
      });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
    <Header title="Subscription" headerShown={false} />
    <ScrollView contentContainerStyle={styles.scrollContent}>
      {products.map((product, index) => {
        return(
        <View key={index} style={styles.productContainer}>
          <Image source={require('../assets/logo.png')} />
          <Text style={styles.productTitle}>{product.title}</Text>
          <Text style={styles.productDescription}>{product.description}</Text>
          <Text style={styles.productPrice}>{product.price}</Text>
       
            <ButtonInput title={"Subscribe"} onPress={() => console.log("")} />
      
        </View>
      )
})
    }
    </ScrollView>
  </SafeAreaView>
  )
}

export default Subscription

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  productContainer: {
    borderWidth: 1,
    width:'80%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
    borderRadius: 20,
    marginBottom: 20,
  },
  productTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  productDescription: {
    fontSize: 16,
    marginBottom: 10,
  },
  productPrice: {
    fontSize: 16,
  },
})
