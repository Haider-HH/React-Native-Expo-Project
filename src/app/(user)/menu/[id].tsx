import { View, Text, Image, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { router, Stack, useLocalSearchParams } from 'expo-router'
import { PizzaSize } from '@/src/types'
import { defaultImage } from "@/src/components/ProductList"
import Button from '@/src/components/Button'
import { useCart } from '@/src/providers/cartProvider'
import { useProduct } from '@/src/api/products'
import RemoteImage from '@/src/components/RemoteImage'

const sizes: PizzaSize[] = ['S', 'M', 'L', 'XL']; // specifying the type to PizzaSize[] restricts this variable to accept only one of these 4 strings (see types.ts)

const ProductDetails = () => {

  const { addItem } = useCart(); // access and manage the cart using this function provided by context provider instead of using props
  const [selectedSize, setSelectedSize] = useState<PizzaSize>('S');
  const { id: idString } = useLocalSearchParams(); // it's a hook used to get the id of the product that we pressed

  if (!idString) {
    return <Text>Incorrect ID</Text>
  }

  const id = parseFloat(typeof idString === 'string' ? idString : idString[0]);

  const {data: product, error, isLoading} = useProduct(id);
  
  if (isLoading) {
    return <ActivityIndicator />
  }

  if(error){
    return (
      <>
        <Text>Failed to fetch product</Text>
        <Text>{error.message}</Text>
      </>
    )
  }; //this condition checks if the app found the product or not, if we didn't use this condition then we should use ? with the product when we use it
     // UPDATE: this condition now checks for the existence of error caused by reading a product by its id, so the ? mark is now used with product below

  const addToCart = () => {
    if(!product) return;
    // Alert.alert('Added to Cart Successfully', `Pizza Size: ${selectedSize}\nPrice: $${product.price}`)
    addItem(product, selectedSize);
    router.push('/cart');
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: product?.name }} />
      <RemoteImage 
        path={product?.image}
        fallback={defaultImage}
        style={styles.image}
        resizeMode='contain'
      />
      <Text style={{fontWeight: 'bold', fontSize: 16}}>Select size</Text>
      <View style={styles.sizesList}>
        {sizes.map((size) => {
          return(
          <TouchableOpacity activeOpacity={0.5} key={size} onPress={() => setSelectedSize(size)}>
              <View style={[styles.size, size===selectedSize.toUpperCase() && {backgroundColor: 'gainsboro'}]}>    
                <Text style={[styles.sizeText, size===selectedSize.toUpperCase() && {color: '#161622'}]}>{size}</Text>
              </View>
            </TouchableOpacity>
          )
        })}
      </View>
      <Text style={ styles.price }>Price: ${product?.price}</Text>
      <Button 
        text='Add to cart'
        onPress={addToCart}
      />
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
    marginTop: 'auto'
  },
  sizesList: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 15,
  },
  size: {
    backgroundColor: 'white',
    width: 50,
    aspectRatio: 1,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sizeText: {
    fontSize: 20,
    fontWeight: '500',
    color: 'gray'
  },
})