import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react';
import { OrderItem, Tables } from '../types';
import { defaultImage } from './ProductList';
import Colors from '../constants/Colors';



type OrderItemListItemProps = {
  orderItem: {
    created_at: string;
    id: number;
    order_id: number;
    product_id: number;
    quantity: number;
    size: string;
    products: {
      created_at: string;
      id: number;
      image: string | null;
      name: string;
      price: number;
    } | null;
  };
};


const OrderItemListItem: React.FC<OrderItemListItemProps> = ({ orderItem }) => {
  return (
    <View style={styles.container}>
      <Image 
        source={{uri: orderItem.products!.image || defaultImage}}
        style={styles.orderImage}
      />
      <View>
        <Text style={styles.orderTitle}>{orderItem.products!.name}</Text>
        <View style={{flexDirection: 'row', marginLeft: 10}}>
          <Text style={{color: Colors.light.tint, fontWeight: 'bold'}}>
            ${orderItem.products!.price*orderItem.quantity}
          </Text>
          <Text style={{fontWeight: '400', marginLeft: 5}}>
            Size: {orderItem.size}
          </Text>
        </View>
      </View>
      <Text style={styles.itemQuantity}>
        {orderItem.quantity}
      </Text>
    </View>
  )
}

export default OrderItemListItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginTop: 15,
    padding: 10,
    flexDirection: 'row'
  },
  orderImage: {
    width: '20%',
    aspectRatio: 1,
  },
  orderTitle: {
    fontWeight: 'bold',
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 5
  },
  itemQuantity: {
    fontWeight: 'bold',
    right: 10,
    position: 'absolute',
    marginTop: 30,
    fontSize: 20,
  }
})