import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'

const Product = () => {
  const { id } = useLocalSearchParams(); // it's a hook used to get the id of the product that we pressed
  return (
    <View>
      <Text style={{fontSize: 20}}>{id}</Text>
    </View>
  )
}

export default Product;