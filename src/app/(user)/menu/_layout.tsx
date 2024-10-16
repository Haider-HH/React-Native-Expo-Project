import { Entypo, FontAwesome } from "@expo/vector-icons";
import { Link, Stack } from "expo-router";
import { Pressable } from "react-native";
import Colors from "@/src/constants/Colors";
import { useAuth } from "@/src/providers/AuthProvider";
import { supabase } from "@/src/lib/supabase";
import { useAppSelector } from "@/src/redux/hooks";
import { selectAuth } from "@/src/features/auth/authSlice";

//this layout file renders the stack screen and the icons of the Menu (index.tsx) and the product details ([id].tsx file)

export default function MenuStack (){
  // const { session, loading, isAdmin } = useAuth();
  const { isAdmin } = useAppSelector(selectAuth);

    return (
      <Stack>
        <Stack.Screen 
          name="index"
          options={{
            title: 'Menu',
            headerShown: true,
            headerRight: () => (
            <>
              <Link href='/cart' asChild>
                <Pressable>
                  {({ pressed }) => (
                    <FontAwesome 
                      name="shopping-cart"
                      size={25}
                      color={Colors.light.tint}
                      style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                    />
                  )}
                </Pressable>
              </Link>
              {isAdmin && <Link href='/' asChild>
                <Pressable>
                  {({ pressed }) => (
                    <FontAwesome 
                      name="home"
                      size={25}
                      color={Colors.light.tint}
                      style={{ opacity: pressed ? 0.5 : 1 }}
                    />
                  )}
                </Pressable>
              </Link>
              }
            </>
          )}}
        />
        <Stack.Screen 
          name="[id]"
          options={{
            headerShown: true,
            headerRight: () => (
              <Link href='/cart' asChild>
                <Pressable>
                  {({ pressed }) => (
                    <FontAwesome 
                      name="shopping-cart"
                      size={25}
                      color={Colors.light.tint}
                      style={{ marginRight: 15, opacity: pressed ? 0.5 : 1}}
                    />
                  )}
                </Pressable>
              </Link>
            )
          }}
        />
      </Stack>
    )
}