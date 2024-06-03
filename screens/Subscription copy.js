// import { Alert, Platform, SafeAreaView, ScrollView, StyleSheet, Text, View, Image } from 'react-native';
// import React, { useEffect, useState } from 'react';
// import Header from '../components/Header';
// import ButtonInput from '../components/ButtonInput';
// import IAP, {  getSubscriptions, initConnection, purchaseErrorListener, purchaseUpdatedListener, requestSubscription, useIAP } from 'react-native-iap';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { Linking } from 'react-native';
// import baseUrl from '../global';

// let purchaseUpdateSubscription;
// let purchaseErrorSubscription;

// const Subscription = ({ navigation }) => {
//   const { currentPurchase, subscriptions, purchaseHistory, connected ,finishTransaction,getPurchaseHistory } = useIAP();
//   const items = Platform.select({
//     ios: {
//       skus: ['bart29', 'bart179']
//     },
//     android: {
//       skus: ['bart29.9', 'bart29.99']
//     }
//   });
//   const [ownedSubscriptions, setOwnedSubscriptions] = useState([]);
//   const [products, setProducts] = useState([]);
//   const [purchased, setPurchased] = useState(false);
//   const [subscribed, setSubscribed] = useState();
//   const [users, setUsers] = useState("");

//   useEffect(() => {
//     async function fetchData() {
//       const value = await AsyncStorage.getItem('data');
//       setUsers(JSON.parse(value));
//       ValidateUserSubscription(JSON.parse(value));
//     }
//     fetchData();
//   }, [subscribed]);

//   const validate = async (receipt, name) => {
//     try {
//       const response = await fetch("https://bartender-backend.digitalmobix.com/subscription/subscribePackage", {
//         headers: {
//           'Content-Type': 'application/json',
//           'x-api-key': 'BarTenderAPI',
//           'accesstoken': `Bearer ${users?.access_token}`
//         },
//         method: "POST",
//         body: JSON.stringify({ "product_id": receipt }),
//       });
//       const result = await response.json();
//       console.log(result, "validate response");
//     } catch (error) {
//       Alert.alert("Error!", error.message);
//     }
//   };

//   useEffect(() => {
//     initConnection()
//       .catch(() => {
//         console.log("error connecting to store...");
//       })
//       .then(async () => {
//         const subscriptions = await getSubscriptions(items);
//         setProducts(subscriptions);
//         getPurchaseHistory()
//           .then((res) => {
//             console.log(res,"res")
//             try {
//               const receipt = res[res.length - 1].transactionReceipt;
//               if (receipt) {
//                 console.log("receipt found");
//               }
//             } catch (error) {
//               console.log("error", error);
//             }
//           });
//       });

//     purchaseErrorSubscription = purchaseErrorListener((error) => {
//       if (error["responseCode"] !== "2") {
//         Alert.alert("Error", "There has been an error with your purchase, error code " + error["code"]);
//       }
//     });

//     purchaseUpdateSubscription = purchaseUpdatedListener( (purchase) => {
//         console.log(purchase,"ssss")
//       const receipt = purchase.transactionReceipt;
      
//       if (receipt) {
//         console.log("purchase update received");
//        finishTransaction(purchase, false);
//       }
//     });

//     return () => {
//       if (purchaseUpdateSubscription) purchaseUpdateSubscription.remove();
//       if (purchaseErrorSubscription) purchaseErrorSubscription.remove();
    
//     };
//   }, []);

//   const handleUnsubscribe = async () => {
//     try {
//       if (Platform.OS === 'android') {
//         const response = await fetch("https://bartender-backend.digitalmobix.com//subscription/Unsubscribe", {
//           headers: {
//             'Content-Type': 'application/json',
//             'x-api-key': 'BarTenderAPI',
//             'accesstoken': `Bearer ${users?.access_token}`
//           },
//           method: "GET",
//         });
//         const result = await response.json();
//         Linking.openURL(`https://play.google.com/store/account/subscriptions?package=${products[0].name}&sku=${products[0].productId}`);
//       } else if (Platform.OS === 'ios') {
//         Linking.openURL('https://apps.apple.com/account/subscriptions');
//       }
//     } catch (error) {
//       Alert.alert("Error!", error.message);
//     }
//   };

//   const ValidateUserSubscription = async (user) => {
//     try {
//       const response = await fetch(`${baseUrl}/subscription/CheckSubscription`, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//           'x-api-key': 'BarTenderAPI',
//           'accesstoken': `Bearer ${user.access_token}`
//         },
//       });
//       const data = await response.json();
//       const subscriptions = data.subscription_status[0];
//       setSubscribed(subscriptions);
//     } catch (error) {
//       Alert.alert('An error occurred while processing your request.');
//     }
//   };

//   const handleBuySubscription = async (product) => {
//     try {
//       if (Platform.OS === 'ios') {
//         await requestSubscription({
//           sku: product.productId,
//         }).then((res)=>{
//           console.log(res,"res")
//           // var  response = res[res.length - 1].transactionReceipt
       
//         //   validate(JSON.parse("Monthly"))
    
//         }).catch(err=>console.log(err))
  
//       } else {
//         await requestSubscription({
//           sku: product.productId,
//           subscriptionOffers: [{ sku: product.productId, offerToken: product.subscriptionOfferDetails[0].offerToken }]
//         }).then((res)=>{
//           console.log(res,"res")
//           var  response = res[res.length - 1].transactionReceipt
       
//           validate(JSON.parse(response).productId,product['title'])
    
//         }).then().catch(err=>console.log(err))
  
//       }
//       console.log("Subscription request sent for product:", product.productId);
//     } catch (error) {
//       console.log("Subscription request error:", error);
//       Alert.alert("Error!", "Failed to initiate the subscription.");
//     }
//   };

//   useEffect(() => {

//     if (currentPurchase) {
// console.log(currentPurchase,"purchase")
//       const checkCurrentPurchase = async (purchase) => {
//         const receipt = purchase.transactionReceipt;
//         if (receipt) {
//           console.log("Current purchase receipt:", receipt);
//         }
//       };
//       checkCurrentPurchase(currentPurchase);
//     }
//   }, [currentPurchase]);

//   useEffect(() => {
//     if (purchaseHistory.find((x) => x.productId === items.skus[0] || x.productId === items.skus[1])) {
//       console.log("Purchase history indicates active subscription");
//     }
//   }, [connected, purchaseHistory, subscriptions]);
//   useEffect(() => {
//     const checkCurrentPurchase = async () => {
//       try {
//         if (currentPurchase?.productId) {
//           await finishTransaction({
//             purchase: currentPurchase,
//             isConsumable: true,
//           });

//           setOwnedSubscriptions(prev => [...prev, currentPurchase?.productId]);
//         }
//       } catch (error) {
//         if (error instanceof PurchaseError) {
//           errorLog({message: `[${error.code}]: ${error.message}`, error});
//         } else {
//           errorLog({message: 'handleBuyProduct', error});
//         }
//       }
//     };

//     checkCurrentPurchase();
//   }, [currentPurchase, finishTransaction]);
// //   console.log(ownedSubscriptions,"ggggg")
//   return (
//     <SafeAreaView style={styles.container}>
//       <Header title="Subscription" headerShown={false} />
//       {subscribed?.subscription_status === 1 ?
//         <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: "100%" }}>
//           <Text style={{ fontSize: 20, color: "orange" }}>Subscribed to</Text>
//           <Text style={{ fontWeight: 'bold', color: 'black', fontSize: 19 }}>{subscribed?.product_id}</Text>
//           <ButtonInput title={"Unsubscribe"} onPress={handleUnsubscribe} />
//         </View>
//         :
//         <ScrollView contentContainerStyle={styles.scrollContent}>
//           {products.map((product, index) => (
//             <View key={index} style={styles.productContainer}>
//               <Image source={require('../assets/logo.png')} />
//               <Text style={styles.productTitle}>{product.title}</Text>
//               <Text style={styles.productDescription}>{product.description}</Text>
//               <Text style={styles.productPrice}>{product.price}</Text>
//               <ButtonInput title={"Subscribe"} onPress={() => handleBuySubscription(product)} />
//             </View>
//           ))}
//         </ScrollView>
//       }
//     </SafeAreaView>
//   );
// }

// export default Subscription;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   scrollContent: {
//     alignItems: 'center',
//     paddingVertical: 20,
//   },
//   productContainer: {
//     borderWidth: 1,
//     width: '80%',
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: 30,
//     borderRadius: 20,
//     marginBottom: 20,
//   },
//   productTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginTop: 10,
//   },
//   productDescription: {
//     fontSize: 16,
//     marginBottom: 10,
//   },
//   productPrice: {
//     fontSize: 16,
//   },
// });
import React, { useEffect, useState } from 'react';
import { Alert, Platform, SafeAreaView, ScrollView, StyleSheet, Text, View, Image } from 'react-native';
import IAP from 'react-native-iap'

const items = Platform?.select({
    ios: ['bart29', 'bart179'],
    android: ['bart29.9', 'bart29.99']
  });
const Subscription = () => {
    const [purchased, setPurchased] = useState(false);
    useEffect(() => {
    IAP.initConnection.catch(()=>{

    }).then(()=>{
        console.log("connected to store")
    })
    }, [])
  return (
    <View>
      <Text>Subscription</Text>
    </View>
  )
}

export default Subscription

const styles = StyleSheet?.create({})