import { Button, StyleSheet, Text, View,SafeAreaView, TouchableOpacity, Image, Alert, Platform,ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import ButtonInput from '../components/ButtonInput'
import IAP,{finishTransaction, getPurchaseHistory, getSubscriptions, initConnection, purchaseErrorListener, purchaseUpdatedListener, requestSubscription}from 'react-native-iap'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Linking } from 'react-native'
import baseUrl from '../global'

const items = Platform.select({
  ios: {
    sku: 'bart_699_1m',
    andDangerouslyFinishTransactionAutomaticallyIOS: false
  },
  android: {
    skus: ['bart29.9','bart29.99']
  }
})

let purchaseUpdateSubscription;
let purchaseErrorSubscription;
const Subscription = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [purchased, setPurchased] = useState(false);
  const [subscribed, setSubscribed] = useState();

  const [users,setusers]=useState("")
  useEffect(() => {
    async function replacementFunction(){
      const value =  await AsyncStorage.getItem('data');
          setusers(JSON.parse(value));
      
          ValidateUserSubscription(JSON.parse(value))
    }
    replacementFunction()
  }, [subscribed]);
  
  const validate = async (receipt,name) => {

    try {
     
       await fetch("https://bartender-backend.digitalmobix.com/subscription/subscribePackage", {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key':'BarTenderAPI',
          'accesstoken':`Bearer ${users?.access_token}`
        },
        method: "POST",
        body:JSON.stringify({ "product_id":receipt}),
      }).then(res=>{
        return res.json()
      }).then(ress=>{
        console.log(ress,"heelo res")
      })
    } catch (error) {
      Alert.alert("Error!", error.message);
    }
  };
  useEffect(() => {
  
    initConnection()
      .catch(() => {
        console.log("error connecting to store...");
      })
      .then(() => {
        getSubscriptions(items)
          .catch(() => {
            console.log("error finding items");
          })
          .then((res) => {
            setProducts(res);
          });

        getPurchaseHistory()
          .catch(() => {})
          .then((res) => {
            try {
              const receipt = res[res.length - 1].transactionReceipt;
              if (receipt) {
                // validate(receipt);
            
              }
            } catch (error) {}
          });
      });

     purchaseErrorSubscription = purchaseErrorListener((error) => {
      if (!(error["responseCode"] === "2")) {
        Alert.alert(
          "Error",
          "There has been an error with your purchase, error code" +
            error["code"]
        );
      }
    });
   purchaseUpdateSubscription = purchaseUpdatedListener((purchase) => {
      const receipt = purchase.transactionReceipt;
      if (receipt) {
    
      finishTransaction(purchase, false);
      }
    });

    return () => {
      try {
        purchaseUpdateSubscription.remove();
      } catch (error) {}
      try {
        purchaseErrorSubscription.remove();
      } catch (error) {}
      try {
        IAP.endConnection();
      } catch (error) {}
    };
  }, []);
  const handleUnsubscribe = async () => {
    
    try {
      if (Platform.OS === 'android') {
        // For Android
        try {
          // send receipt to backend
      
     
          const deliveryReceipt = await fetch("https://bartender-backend.digitalmobix.com//subscription/Unsubscribe", {
            headers: {
              'Content-Type': 'application/json',
              'x-api-key':'BarTenderAPI',
              'accesstoken':`Bearer ${users?.access_token}`
            },
            method: "GET",
    
          }).then((res) => {
            res.json().then((r) => {
              // do different things based on response
              Linking.openURL('https://play.google.com/store/account/subscriptions?package=${products[0].name}&sku=${products[0].prodouctId}')
        
            });
          });
        } catch (error) {
          Alert.alert("Error!", error.message);
        }
     
        // Unsubscribe logic
      } else if (Platform.OS === 'ios') {
        // For iOS
        // Unsubscribe logic
      }
      // Update subscription status after successful unsubscribe
    } catch (error) {
      console.error('Failed to unsubscribe:', error);
    }
  };
const ValidateUserSubscription=async(userss)=>{


    try {
      fetch(`${baseUrl}/subscription/CheckSubscription`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key':'BarTenderAPI',
          'accesstoken':`Bearer ${userss.access_token}`
        },
      })
      .then(response => response.json())
      .then(dataa => {
     const subscriptions=dataa.subscription_status[0]
  
        setSubscribed(subscriptions)
  
      });
    } catch (error) {
      Alert.alert('An error occurred while processing your request.');
    }


}
  return (
    <SafeAreaView style={styles.container}>
    <Header title="Subscription" headerShown={false} />
    {subscribed?.subscription_status==1?
      <View style={{display:'flex',alignItems:'center',justifyContent:'center',height:"100%"}}>
      <Text style={{fontSize:20,color:"orange"}}>Subscribed to</Text>
      <Text style={{fontWeight:'bold',color:'black',fontSize:19}}>{subscribed?.product_id}</Text>
      <ButtonInput title={"Unsubscribe"} onPress={handleUnsubscribe}/>
      </View>
      :
      <ScrollView contentContainerStyle={styles.scrollContent}>
    
      {products?.map((product, index) => {
        const token=product?.subscriptionOfferDetails[0]?.offerToken
   
        return(
        <View key={index} style={styles.productContainer}>
          <Image source={require('../assets/logo.png')} />
          <Text style={styles.productTitle}>{product[`title`]}</Text>
          <Text style={styles.productDescription}>{product[`description`]}</Text>
          <Text style={styles.productPrice}>{product.price}</Text>
        
            <ButtonInput title={"Subscribe"} onPress={() => requestSubscription({
                    sku: product.productId,
                    subscriptionOffers: [{ sku: product.productId, offerToken:product.subscriptionOfferDetails[0]?.offerToken }]
                }).then((res)=>{
                  var  response = res[res.length - 1].transactionReceipt
               
                  validate(JSON.parse(response).productId,product['title'])
           
                }).then().catch(err=>console.log(err))} />
              
              
        </View>

      )
})
    }
    </ScrollView>
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
