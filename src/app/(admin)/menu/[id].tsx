import { View, Text, Image, StyleSheet, Pressable, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { Link, router, Stack, useLocalSearchParams } from 'expo-router'
import { PizzaSize } from '@/src/types'
import { defaultImage } from "@/src/components/ProductList"
import { useCart } from '@/src/providers/cartProvider'
import { FontAwesome } from '@expo/vector-icons'
import Colors from "@/src/constants/Colors"
import { useProduct } from '@/src/api/products'
import RemoteImage from '@/src/components/RemoteImage'
import { useAppDispatch } from '@/src/redux/hooks'

const sizes: PizzaSize[] = ['S', 'M', 'L', 'XL'];

const ProductDetails = () => {
  // const { addItem } = useCart();
  // const dispatch = useAppDispatch();
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

  return (
    <View style={styles.container}>
        <Stack.Screen 
        options={
          {
            title: "Menu", 
            headerShown: true, 
            headerRight: () => (
              <Link href={`/(admin)/menu/create?id=${id}`} asChild>
                <Pressable>
                  {({ pressed }) => (
                    <FontAwesome
                      name="pencil"
                      size={25}
                      color={Colors.light.tint}
                      style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                    />
                  )}
                </Pressable>
              </Link>
            ),
          }
        } 
      />
      <Stack.Screen options={{ title: product?.name }} />
      <RemoteImage 
        path={product?.image}
        fallback={defaultImage}
        style={styles.image}
        resizeMode='contain'
      />
      <Text style={ styles.title }>{product?.name}</Text>
      <Text style={ styles.price }>Price: ${product?.price}</Text>
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