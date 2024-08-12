import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { Stack, useLocalSearchParams } from 'expo-router';
import { OrderStatus } from '@/src/types';
import OrderItemListItem from '../../../components/OrderItemListItem';
import OrderListItem from '../../../components/OrderListItem';
import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs';
import Colors from '@/src/constants/Colors';
import { ActivityIndicator } from 'react-native';
import { useOrderDetails, useUpdateOrder } from '@/src/api/orders';
import { notifyUserOrderUpdates } from '@/src/lib/notifications';

dayjs.extend(relativeTime);

const status: OrderStatus[] = ['New', 'Cooking', 'Delivering', 'Delivered']

const OrderDetails = () => {
    const { id: idString } = useLocalSearchParams(); // it's a hook used to get the id of the product that we pressed
    const id = idString ? parseFloat(Array.isArray(idString) ? idString[0] : idString) : undefined;
    const {data: order, error, isLoading} = useOrderDetails(id as number);
    const {mutate: updateOrder} = useUpdateOrder();

    if (isLoading) {
        return <ActivityIndicator />;
    }

    if (error) {
        return (
            <>
                <Text>Failed to fetch product</Text>
                <Text>{error.message}</Text>
            </>
        );
    }

    const updateStatus = async (status: string) => {
        updateOrder({id: id!, updatedFields: { status } })
        if (order){
            await notifyUserOrderUpdates({...order, status: status})
        }
    }
    return (
        <View style={styles.container}>
            <Stack.Screen options={{ title: `Order #${order?.id}` }} />
            
            <FlatList 
                data={order?.order_items}
                renderItem={({ item }) => <OrderItemListItem orderItem={item} />}
                ListFooterComponent={
                    <View>
                        <Text style={styles.totalPrice}>
                            Total Price: {''}
                            <Text style={{color: Colors.light.tint}}>
                                ${order?.total}
                            </Text>
                        </Text>
                        <Text style={{fontWeight: 'bold', fontSize: 16}}>
                            Status
                        </Text>
                        <View style={{flexDirection: 'row', marginTop: 10}}>
                            {status.map((stat) => {
                                return (
                                    <TouchableOpacity key={stat} activeOpacity={0.7} onPress={() => updateStatus(stat)}>
                                        <View style={[styles.statusStyling, order?.status === stat && {backgroundColor: Colors.light.tint}]}>
                                            <Text style={[order?.status === stat? {color: 'white'} : {color: Colors.light.tint}]}>{stat.toLowerCase()}</Text>
                                        </View>
                                    </TouchableOpacity>
                                )
                            })}
                        </View>
                    </View>
                }
                ListHeaderComponent={() => <OrderListItem order={order!} />}
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
    statusStyling: {borderRadius: 5, 
        borderWidth: 1, 
        padding: 10,
        marginRight: 10, 
        borderColor: Colors.light.tint
    }
});

export default OrderDetails;
