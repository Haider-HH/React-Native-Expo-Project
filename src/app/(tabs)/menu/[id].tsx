import { View, Text } from 'react-native'
import React from 'react'
import { Stack, useLocalSearchParams } from 'expo-router'

const Product = () => {
  const { id } = useLocalSearchParams(); // it's a hook used to get the id of the product that we pressed
  return (
    <View>
      <Stack.Screen options={{title: `Details: ${id}`}} />
      <Text style={{fontSize: 20}}>Product: {id}</Text>
    </View>
  )
}

export default Product;