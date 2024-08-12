import { PropsWithChildren, useEffect, useRef, useState } from "react";
import * as Notifications from 'expo-notifications';
import {registerForPushNotificationsAsync} from "../lib/notifications";
import { sendPushNotification } from "../lib/notifications";
import { supabase } from "../lib/supabase";
import { useAuth } from "./AuthProvider";
import profile from "../app/(user)/profile";

Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });

const NotificationProvider = ({children}: PropsWithChildren) => {
    const { profile } = useAuth();
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState<Notifications.Notification | undefined>(
      undefined
    );
    const notificationListener = useRef<Notifications.Subscription>();
    const responseListener = useRef<Notifications.Subscription>();

    const savePushToken = async (newToken: string | undefined) => {
        if (!newToken || !profile) {
            return;
        }
        setExpoPushToken(newToken);

        await supabase.from('profiles').update({expo_push_token: newToken}).eq('id', profile.id)
    }
  
    useEffect(() => {
      registerForPushNotificationsAsync()
        .then(token => savePushToken(token))
        .catch((error: any) => setExpoPushToken(`${error}`));
  
      notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
        setNotification(notification);
      });
  
      responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
        console.log(response);
      });
  
      return () => {
        notificationListener.current &&
          Notifications.removeNotificationSubscription(notificationListener.current);
        responseListener.current &&
          Notifications.removeNotificationSubscription(responseListener.current);
      };
    }, []);

    console.log('Notification: ', notification)
    return (
        <>
            {children}
        </>
    )
};

export default NotificationProvider;