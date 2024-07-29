import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import Colors from '../constants/Colors'
import { Product } from '../types'

export const defaultImage = 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png'; // we use this just in case we have a missing image from the database

type ProductListProps = {
  product: Product;
}; //this type is defined in the types.ts file, we use types because it helps us to avoid errors from typos and wrong types passed

const ProductList: React.FC<ProductListProps> = ({ product }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={0.7}>
        <Image 
          source={{uri: product.image || defaultImage}}
          style={styles.prodImage}
          resizeMode='contain'
        />
        <Text style={styles.prodName}>
          {product.name}
        </Text>
        <Text style={styles.priceName}>${product.price}</Text>
      </TouchableOpacity>
    </View>
  )
}

export default ProductList

const styles = StyleSheet.create({
  container: {
    borderRadius: 25, 
    backgroundColor: 'white',
    overflow: 'hidden',
    padding: 10,
    flex: 1, //this flex helped us to view the contents in multiple columns from flatlist component
    maxWidth: '50%',
  },
  prodImage: {
    width: '100%',
    aspectRatio: 1, // we use this to specify the height of the object depending on its width, we can give it floating point number too
  },
  prodName: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 10,
  },
  priceName: {
    color: Colors.light.tint,
    fontWeight: 'bold'
  },
});
