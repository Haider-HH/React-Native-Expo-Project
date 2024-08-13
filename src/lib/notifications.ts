import { Platform } from "react-native";
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import Constants from "expo-constants";
import { supabase } from "./supabase";
import { Tables } from "../types";


function handleRegistrationError(errorMessage: string) {
    alert(errorMessage);
    throw new Error(errorMessage);
}

export async function registerForPushNotificationsAsync() {
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  
    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        handleRegistrationError('Permission not granted to get push token for push notification!');
        return;
      }
      const projectId =
        Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
      if (!projectId) {
        handleRegistrationError('Project ID not found');
      }
      try {
        const pushTokenString = (
          await Notifications.getExpoPushTokenAsync({
            projectId,
          })
        ).data;
        return pushTokenString;
      } catch (e: unknown) {
        handleRegistrationError(`${e}`);
      }
    } else {
      handleRegistrationError('Must use physical device for push notifications');
    }
};

export async function sendPushNotification(expoPushToken: string, body: string, orderNumber?: number) {
    const message = {
      to: expoPushToken,
      sound: 'default',
      title: `Pizza Of Suffer 🍕. Order #${orderNumber}`,
      body: `Your Order Status is: ${body}`,
      data: { someData: 'goes here' },
    };
  
    await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });
}

const getUserToken = async (userId: string) => {
    const {data, error} = await supabase.from('profiles').select('*').eq('id', userId).single();
    if (error) {
        console.log(error);
    }
    return data?.expo_push_token;
};


export const notifyUserOrderUpdates = async (order: Tables<'orders'>) => {
    const token = await getUserToken(order.user_id);
    console.log('Notifying: ', token);
    sendPushNotification(token!, order.status, order.id);
};
