import { useAuth } from '@/src/providers/AuthProvider';
import { Redirect, Stack } from 'expo-router';

export default function AuthLayout() {
  const { session } = useAuth();

  if (session) {
    return <Redirect href={'/'} />
  } // if the user is already signed in, then we shouldn't allow him to access the auth screens (sign in/up)

  return <Stack />;
};