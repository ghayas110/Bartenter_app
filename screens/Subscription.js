
import React, { useEffect, useState } from 'react';
import { Alert, Platform, SafeAreaView, ScrollView, StyleSheet, Text, View, Image,Linking } from 'react-native';
import {getSubscriptions, initConnection, purchaseUpdatedListener, requestSubscription} from 'react-native-iap'
import ButtonInput from '../components/ButtonInput';
import Header from '../components/Header';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import baseUrl from '../global';

  const items = Platform.select({
    ios: {
      skus: ['bart29', 'bart179']
    },
    android: {
      skus: ['bart29.9', 'bart29.99']
    }
  });
  let purchaseUpdateSubscription = null;
let purchaseErrorSubscription;
const Subscription = () => {
    const [purchased, setPurchased] = React.useState(false);
    const [products, setProducts] = useState([]);
    const [users, setUsers] = useState("");
    const [subscribed, setSubscribed] = useState();
    useEffect(() => {
      async function fetchData() {
        const value = await AsyncStorage.getItem('data');
        setUsers(JSON.parse(value));
        ValidateUserSubscription(JSON.parse(value));
      }
      fetchData();
    }, []);
    const ValidateUserSubscription = async (user) => {
      try {
        const response = await fetch(`${baseUrl}/subscription/CheckSubscription`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': 'BarTenderAPI',
            'accesstoken': `Bearer ${user.access_token}`
          },
        });
        const data = await response.json();
        const subscriptions = data.subscription_status[0];
        setSubscribed(subscriptions);
      } catch (error) {
        Alert.alert('An error occurred while processing your request.');
      }
    };
  
      const handleBuySubscription = async (product) => {
    try {
      if (Platform.OS === 'ios') {
        await requestSubscription({
          sku: product.productId,
        }).then((res)=>{
       console.log(res,"res")
          // var  response = res[res.length - 1].transactionReceipt
       
        //   validate(JSON.parse("Monthly"))
    
        }).catch(err=>console.log(err))
  
      } else {
        await requestSubscription({
          sku: product.productId,
          subscriptionOffers: [{ sku: product.productId, offerToken: product.subscriptionOfferDetails[0].offerToken }]
        }).then((res)=>{
          console.log(res,"res")
          // var  response = res[res.length - 1].transactionReceipt
       
        //   validate(JSON.parse(response).productId,product['title'])
    
        }).then().catch(err=>console.log(err))
  
      }
      console.log("Subscription request sent for product:", product.productId);
    } catch (error) {
      console.log("Subscription request error:", error);
      Alert.alert("Error!", "Failed to initiate the subscription.");
    }
  };
  const validate = async (receipt, name) => {
    try {
      const response = await fetch("https://bartender-backend.digitalmobix.com/subscription/subscribePackage", {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': 'BarTenderAPI',
          'accesstoken': `Bearer ${users?.access_token}`
        },
        method: "POST",
        body: JSON.stringify({ "product_id": receipt }),
      });
      const result = await response.json();
      console.log(result, "validate response");
    } catch (error) {
      Alert.alert("Error!", error.message);
    }
  };
  const handleUnsubscribe = async () => {
    try {
      if (Platform.OS === 'android') {
        const response = await fetch("https://bartender-backend.digitalmobix.com//subscription/Unsubscribe", {
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': 'BarTenderAPI',
            'accesstoken': `Bearer ${users?.access_token}`
          },
          method: "GET",
        });
        const result = await response.json();
        Linking.openURL(`https://play.google.com/store/account/subscriptions?package=${products[0].name}&sku=${products[0].productId}`);
      } else if (Platform.OS === 'ios') {
        Linking.openURL('https://apps.apple.com/account/subscriptions');
        setPurchased(false)
      }
    } catch (error) {
      Alert.alert("Error!", error.message);
    }
  };
    useEffect(() => {
        initConnection()
               .catch(() => {
                 console.log("error connecting to store...");
               }).then(async()=>{
        console.log("connected to store")
        const subscriptions = await getSubscriptions(items)
                setProducts(subscriptions);
                console.log(subscriptions)
    })
    purchaseUpdateSubscription=purchaseUpdatedListener((purchase)=>{
        try {
            const receipt = purchase.transactionReceipt;
            // Alert.alert(purchase,"reciept")
          //         var  response = res[res.length - 1].transactionReceipt
       
          validate("Subscribed")
            setPurchased(true)
        } catch (error) {
            
        }
    })
        return () => {
      if (purchaseUpdateSubscription) purchaseUpdateSubscription.remove();
      if (purchaseErrorSubscription) purchaseErrorSubscription.remove();
  
        IAP.endConnection();
 

    };
    }, [])

  return (
  
    <SafeAreaView style={styles.container}>
{purchased?<>
  <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: "100%" }}>
  <Text style={{ fontSize: 20, color: "orange" }}>Subscribed </Text>
  <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 19 }}>Successfully</Text>
  <ButtonInput title={"Unsubscribe"} onPress={handleUnsubscribe} />
</View>
    </>
:
<>

           <Header title="Subscription" headerShown={false} />
           <ScrollView contentContainerStyle={styles.scrollContent}>
         
    {
        products.length>0 ? products.map((product, index) => (
                    <View key={index} style={styles.productContainer}>
                      <Image source={require('../assets/logo.png')} />
                      <Text style={styles.productTitle}>{product.title}</Text>
                      <Text style={styles.productDescription}>{product.description}</Text>
                      <Text style={styles.productPrice}>${product.price}</Text>
                      <ButtonInput title={"Subscribe"} onPress={() => handleBuySubscription(product)}/>
                    </View>
                  ))
                  :
                  <>
                  <SkeletonPlaceholder borderRadius={4}>
                  <View style={{ width: 125, height: 120, borderRadius: 4 }} />
                </SkeletonPlaceholder>
                  </>
                }
                 
                  </ScrollView>
                  </>
                }
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
      width: '80%',
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
  });