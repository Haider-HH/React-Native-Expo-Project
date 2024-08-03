import { View, Text } from 'react-native'
import React from 'react'
import { Stack, useLocalSearchParams } from 'expo-router';
import orders from '@/assets/data/orders';
import { Order } from '@/src/types';
// import OrderItemListItem from '../../../components/OrderItemListItem';
import OrderListItem from '../../../components/OrderListItem';


const OrderDetails = () => {
    const { id } = useLocalSearchParams();
    const order = orders.find((o: Order) => o.id.toString() === id);
    if (!order) {
        return (
            <Text>Order Not Found 🙁</Text>
        )
    }
    return (
        <View>
            <Text>{order.id}</Text>
        </View>
    )
}

export default OrderDetails;