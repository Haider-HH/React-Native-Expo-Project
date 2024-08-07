import 'react-native-url-polyfill/auto';
import * as SecureStore from 'expo-secure-store';
import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Database } from '../database.types';

const ExpoSecureStoreAdapter = {
  getItem: (key: string) => {
    return SecureStore.getItemAsync(key);
  },
  setItem: (key: string, value: string) => {
    SecureStore.setItemAsync(key, value);
  },
  removeItem: (key: string) => {
    SecureStore.deleteItemAsync(key);
  },
};

const supabaseUrl = 'https://udcutlbtskdrxkbyowao.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVkY3V0bGJ0c2tkcnhrYnlvd2FvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjI3OTEwNDEsImV4cCI6MjAzODM2NzA0MX0.JlSDmdljylsA_Grif-bfKlcC5Ex-85K-rJw8gM5jAOA';

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

// Using ExpoSecureStoreAdapter in the storage part was resulting in a warning that says: 
/* 
    "WARN  Value being stored in SecureStore 
    is larger than 2048 bytes and it may not be stored successfully. 
    In a future SDK version, this call may throw an error." 
*/