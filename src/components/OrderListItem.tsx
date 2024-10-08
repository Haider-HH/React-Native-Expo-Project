import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react';
import { Order, Tables } from '../types';
import { Link, useSegments } from 'expo-router';
import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs';

type OrderListItemProps = {
    order: Tables<'orders'>;
};

dayjs.extend(relativeTime)

const OrderListItem: React.FC<OrderListItemProps> = ({ order }) => {
  const segments = useSegments();
  return (
    <Link href={`/${segments[0]}/orders/${order.id}`} asChild>
      <TouchableOpacity activeOpacity={0.7} style={styles.container}>
        <View>
          <Text style={styles.title}>Order #{order.id}</Text>
          <Text style={styles.time}>{dayjs(order.created_at).fromNow()}</Text>
        </View>
        <Text style={styles.status}>{order.status}</Text>
      </TouchableOpacity>
    </Link>
  )
}

export default OrderListItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    marginVertical: 5,
  },
  time: {
    color: 'gray',
  },
  status: {
    fontWeight: '500',
  },
});