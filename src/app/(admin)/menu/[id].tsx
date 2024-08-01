import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { router, Stack, useLocalSearchParams } from 'expo-router'
import products from "@/assets/data/products"
import { Product, PizzaSize } from '@/src/types'
import { SafeAreaView } from 'react-native-safe-area-context'
import { defaultImage } from "@/src/components/ProductList"
import Button from '@/src/components/Button'
import { useCart } from '@/src/providers/cartProvider'

const sizes: PizzaSize[] = ['S', 'M', 'L', 'XL'];

const ProductDetails = () => {
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState<PizzaSize>('S');
  const { id } = useLocalSearchParams(); // it's a hook used to get the id of the product that we pressed
  const product = products.find((p: Product) => p.id.toString() === id)

  if(!product){
    return (
      <Text>Product Not Found 🙁</Text>
    )
  }; //this condition checks if the app found the product or not, if we didn't use this condition then we should use ? with the product when we use it

  const addToCart = () => {
    if(!product) return;
    // Alert.alert('Added to Cart Successfully', `Pizza Size: ${selectedSize}\nPrice: $${product.price}`)
    addItem(product, selectedSize);
    router.push('/cart');
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: product.name }} />
      <Image 
        source={{ uri: product.image || defaultImage}}
        style={styles.image}
        resizeMode='contain'
      />
      <Text style={ styles.title }>{product.name}</Text>
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
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  }
})