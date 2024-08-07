import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import React from 'react';
import { Stack, useLocalSearchParams } from 'expo-router';
import OrderItemListItem from '../../../components/OrderItemListItem';
import OrderListItem from '../../../components/OrderListItem';
import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs';
import Colors from '@/src/constants/Colors';
import { useOrderDetails } from '@/src/api/orders';

dayjs.extend(relativeTime);

// this file renders the details of a specific order when selected from the orders menu (that is rendered by the index.tsx in the orders folder)

const OrderDetails = () => {
    const { id: idString } = useLocalSearchParams(); // it's a hook used to get the id of the product that we pressed
    const id = idString ? parseFloat(Array.isArray(idString) ? idString[0] : idString) : undefined;
    const {data: order, error, isLoading} = useOrderDetails(id as number);

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

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ title: `Order #${order?.id}` }} />
            <FlatList 
                data={order?.order_items}
                renderItem={({ item }) => <OrderItemListItem orderItem={item} />}
                ListFooterComponent={
                    <Text style={styles.totalPrice}>
                        Total Price: {''}
                        <Text style={{color: Colors.light.tint}}>
                            ${order?.total}
                        </Text>
                    </Text>
                }
                ListHeaderComponent={() => <OrderListItem order={order!} />}
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

