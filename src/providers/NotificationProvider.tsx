import { PropsWithChildren, useEffect, useRef, useState } from "react";
import * as Notifications from 'expo-notifications';
import {registerForPushNotificationsAsync} from "../lib/notifications";
import { sendPushNotification } from "../lib/notifications";

Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });

const NotificationProvider = ({children}: PropsWithChildren) => {
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState<Notifications.Notification | undefined>(
      undefined
    );
    const notificationListener = useRef<Notifications.Subscription>();
    const responseListener = useRef<Notifications.Subscription>();
  
    useEffect(() => {
      registerForPushNotificationsAsync()
        .then(token => setExpoPushToken(token ?? ''))
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