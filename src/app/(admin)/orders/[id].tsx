import { View, Text, FlatList, StyleSheet, Touchable, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import orders from '@/assets/data/orders';
import { Order, OrderStatus } from '@/src/types';
import OrderItemListItem from '../../../components/OrderItemListItem';
import OrderListItem from '../../../components/OrderListItem';
import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs';
import Colors from '@/src/constants/Colors';
import Button from '@/src/components/Button';

dayjs.extend(relativeTime);

const status: OrderStatus[] = ['New', 'Cooking', 'Delivering', 'Delivered']

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
    }

    const [selectedStatus, setSelectedStatus] = useState<OrderStatus>(order.status);
    // later, we will change it from the database
    return (
        <View style={styles.container}>
            <Stack.Screen options={{ title: `Order #${order.id}` }} />
            
            <FlatList 
                data={order.order_items}
                renderItem={({ item }) => <OrderItemListItem orderItem={item} />}
                ListFooterComponent={
                    <View>
                        <Text style={styles.totalPrice}>
                            Total Price: {''}
                            <Text style={{color: Colors.light.tint}}>
                                ${order.total}
                            </Text>
                        </Text>
                        <Text style={{fontWeight: 'bold', fontSize: 16}}>
                            Status
                        </Text>
                        <View style={{flexDirection: 'row', marginTop: 10}}>
                            {status.map((stat) => {
                                return (
                                    <TouchableOpacity key={stat} activeOpacity={0.7} onPress={() => setSelectedStatus(stat)}>
                                        <View style={[styles.statusStyling, selectedStatus === stat && {backgroundColor: Colors.light.tint}]}>
                                            <Text style={[selectedStatus === stat? {color: 'white'} : {color: Colors.light.tint}]}>{stat}</Text>
                                        </View>
                                    </TouchableOpacity>
                                )
                            })}
                        </View>
                    </View>
                }
                ListHeaderComponent={() => <OrderListItem order={order} />}
                contentContainerStyle={styles.listContent}
            />
        </View>
    );
};

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
        marginBottom: 20
    },
    statusStyling: {borderRadius: 5, borderWidth: 1, padding: 10, marginRight: 10, borderColor: Colors.light.tint}
});

export default OrderDetails;
