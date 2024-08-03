import { Order } from '../../src/types';
import products from './products';
import dayjs from 'dayjs';

const now = dayjs();

const orders: Order[] = [
  {
    id: 23123,
    created_at: now.subtract(1, 'hour').toISOString(),
    total: products[0].price*2 + products[1].price,
    status: 'Cooking',
    user_id: '1',
    order_items: [
      {
        id: 1,
        order_id: 23123,
        size: 'M',
        quantity: 2,
        product_id: products[0].id,
        products: products[0],
      },
      {
        id: 2,
        order_id: 23123,
        size: 'L',
        quantity: 1,
        product_id: products[1].id,
        products: products[1],
      },
    ],
  },
  {
    id: 32145,
    created_at: now.subtract(3, 'days').toISOString(),
    total: products[3].price*2,
    status: 'Delivered',
    user_id: '1',
    order_items: [
      {
        id: 1,
        order_id: 32145,
        size: 'M',
        quantity: 2,
        product_id: products[3].id,
        products: products[3],
      },
    ],
  },
  {
    id: 23445,
    created_at: now.subtract(3, 'weeks').toISOString(),
    total: products[3].price + products[7].price + products[8].price,
    status: 'Delivered',
    user_id: '1',
    order_items: [
      {
        id: 1,
        order_id: 23445,
        size: 'M',
        quantity: 1,
        product_id: products[3].id,
        products: products[3],
      },
      {
        id: 2,
        order_id: 23445,
        size: 'M',
        quantity: 1,
        product_id: products[7].id,
        products: products[7],
      },
      {
        id: 3,
        order_id: 23445,
        size: 'L',
        quantity: 1,
        product_id: products[8].id,
        products: products[8],
      },
    ],
  },
  {
    id: 12983,
    created_at: now.subtract(10, 'minutes').toISOString(),
    total: products[4].price + products[0].price + products[8].price,
    status: 'New',
    user_id: '1',
    order_items: [
      {
        id: 1,
        order_id: 12983,
        size: 'XL',
        quantity: 1,
        product_id: products[4].id,
        products: products[4],
      },
      {
        id: 2,
        order_id: 12983,
        size: 'S',
        quantity: 1,
        product_id: products[0].id,
        products: products[0],
      },
      {
        id: 3,
        order_id: 12983,
        size: 'L',
        quantity: 1,
        product_id: products[8].id,
        products: products[8],
      },
    ],
  },
  
];

export default orders;
