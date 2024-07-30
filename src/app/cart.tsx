import { StatusBar } from 'expo-status-bar';
import { View, Text, Platform } from 'react-native'
import React from 'react'

const CartScreen = () => {
  return (
    <View>
      <Text>CartScreen</Text>
    </View>
  )
}

<StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
export default CartScreen