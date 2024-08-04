import { View, Text, FlatList, StyleSheet } from 'react-native';
import React from 'react';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import orders from '@/assets/data/orders';
import { Order } from '@/src/types';
import OrderItemListItem from '../../../components/OrderItemListItem';
import OrderListItem from '../../../components/OrderListItem';
import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs';
import Colors from '@/src/constants/Colors';
import Button from '@/src/components/Button';

dayjs.extend(relativeTime);

// this file renders the details of a specific order when selected from the orders menu (that is rendered by the index.tsx in the orders folder)

const OrderDetails = () => {
    const { id } = useLocalSearchParams();
    const order = orders.find((o: Order) => o.id.toString() === id);
    if (!order) {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Stack.Screen />
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>Order Not Found 🙁</Text>
                <Button 
                    text='Back to Orders'
                    onPress={() => router.back()}
                />
            </View>
        );
    } // we need to check if order exists so we can avoid the problem of it being undefined

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ title: `Order #${order.id}` }} />
            <FlatList 
                data={order.order_items}
                renderItem={({ item }) => <OrderItemListItem orderItem={item} />}
                ListFooterComponent={
                    <Text style={styles.totalPrice}>
                        Total Price: {''}
                        <Text style={{color: Colors.light.tint}}>
                            ${order.total}
                        </Text>
                    </Text>
                }
                ListHeaderComponent={() => <OrderListItem order={order} />}
                contentContainerStyle={styles.listContent}
            />
        </View>
    );
};

export default OrderDetails;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    listContent: {
        paddingBottom: 20,
    },
    totalPrice: {
        fontWeight: 'bold',
        fontSize: 20,
        marginTop: 20,
    },
});

