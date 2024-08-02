import { FontAwesome } from "@expo/vector-icons";
import { Link, Stack } from "expo-router";
import { Pressable } from "react-native";
import Colors from "@/src/constants/Colors";

export default function MenuStack (){
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
                      style={{ marginRight: 15, opacity: pressed ? 0.5 : 1}}
                    />
                  )}
                </Pressable>
              </Link>
              <Link href='/' asChild>
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