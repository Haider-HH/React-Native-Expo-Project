import { selectAuth } from '@/src/features/auth/authSlice';
import { useAuth } from '@/src/providers/AuthProvider';
import { useAppSelector } from '@/src/redux/hooks';
import { Redirect, Stack } from 'expo-router';

export default function AuthLayout() {
  // const { session } = useAuth();
  const { session } = useAppSelector(selectAuth);

  if (session) {
    return <Redirect href={'/'} />
  } // if the user is already signed in, then we shouldn't allow him to access the auth screens (sign in/up)

  return <Stack />;
};