import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Stack, useLocalSearchParams } from 'expo-router'
import products from "@/assets/data/products"
import { Product, PizzaSize } from '@/src/types'
import { SafeAreaView } from 'react-native-safe-area-context'
import { defaultImage } from "@/src/components/ProductList"

const sizes = ['S', 'M', 'L', 'XL'];

const ProductDetails = () => {
  const { id } = useLocalSearchParams(); // it's a hook used to get the id of the product that we pressed
  const product = products.find((p: Product) => p.id.toString() === id)

  if(!product){
    return (
      <Text>Product Not Found 🙁</Text>
    )
  }; //this condition checks if the app found the product or not, if we didn't use this condition then we should use ? with the product when we use it

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: product.name }} />
      <Image 
        source={{ uri: product.image || defaultImage}}
        style={styles.image}
        resizeMode='contain'
      />
      <Text style={{fontWeight: 'bold', fontSize: 16}}>Select size</Text>
      <View style={styles.sizesList}>
        {sizes.map((size) => {
          return(
          <TouchableOpacity activeOpacity={0.7} key={size}>
              <View style={styles.size}>    
                <Text style={styles.sizeText}>{size}</Text>
              </View>
            </TouchableOpacity>
          )
        })}
      </View>
      <Text style={ styles.price }>Price: ${product.price}</Text>
    </View>
  )
}

export default ProductDetails;

const styles = StyleSheet.create({
  container: { 
    backgroundColor: 'white', 
    width: '100%', 
    flex: 1,
    padding: 10,
  },
  image: {
    width: '100%',
    aspectRatio: 1,
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  sizesList: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 15,
  },
  size: {
    backgroundColor: 'gainsboro',
    width: 50,
    aspectRatio: 1,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sizeText: {
    fontSize: 20,
    fontWeight: '500'
  },
})