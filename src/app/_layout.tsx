import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useRef, useState } from 'react';
import 'react-native-reanimated';
import QueryProvider from '../providers/QueryProvider';
import { StripeProvider } from '@stripe/stripe-react-native';
import * as Notifications from 'expo-notifications';
import { registerForPushNotificationsAsync } from "../lib/notifications";
import { supabase } from "../lib/supabase";
import { useRouter } from 'expo-router';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import { useAppSelector } from '../redux/hooks';
import { selectAuth } from '../features/auth/authSlice';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export {
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  initialRouteName: '/',
};

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  return (
    <StripeProvider publishableKey={process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY || ""}>
        <QueryProvider>
          <Provider store={store}>
            <NotificationHandler />
            <Stack>
              <Stack.Screen name='index' options={{headerShown: true}} />
              <Stack.Screen name="(admin)" options={{ headerShown: false }} />
              <Stack.Screen name="(user)" options={{ headerShown: false }} />
              <Stack.Screen name="(auth)" options={{ headerShown: false }} />
              <Stack.Screen name="cart" options={{ presentation: 'modal' }} />
            </Stack>
        </Provider>
      </QueryProvider>
    </StripeProvider>
  );
}
// <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
//   <StripeProvider publishableKey={process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY || ""}>
//     <AuthProvider>
//       <QueryProvider>
//         <CartProvider>
//           <NotificationHandler /> {/* New Notification Handling Component */}
//           <Stack>
//             <Stack.Screen name='index' options={{headerShown: true}} />
//             <Stack.Screen name="(admin)" options={{ headerShown: false }} />
//             <Stack.Screen name="(user)" options={{ headerShown: false }} />
//             <Stack.Screen name="(auth)" options={{ headerShown: false }} />
//             <Stack.Screen name="cart" options={{ presentation: 'modal' }} />
//           </Stack>
//         </CartProvider>
//       </QueryProvider>
//     </AuthProvider>
//   </StripeProvider>
// </ThemeProvider>

function NotificationHandler() {
  // const { profile } = useAuth();
  const { profile } = useAppSelector(selectAuth);
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState<Notifications.Notification | undefined>(undefined);
  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();
  const router = useRouter();

  const savePushToken = async (newToken: string | undefined) => {
    if (!newToken || !profile) {
      return;
    }
    setExpoPushToken(newToken);

    await supabase.from('profiles').update({ expo_push_token: newToken }).eq('id', profile.id);
  };

  useEffect(() => {
    if (profile) {
      registerForPushNotificationsAsync()
        .then(token => savePushToken(token))
        .catch((error: any) => setExpoPushToken(`${error}`));
    } else {
      setExpoPushToken(''); // Clear the token if there's no profile
    }

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log("RESPONSE", response);
      const url = response.notification.request.content.data.url;
      if (url) {
        router.push(url);
      }
    });

    return () => {
      notificationListener.current && Notifications.removeNotificationSubscription(notificationListener.current);
      responseListener.current && Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, [profile]);

  return null; // This component doesn't render anything visually
}
