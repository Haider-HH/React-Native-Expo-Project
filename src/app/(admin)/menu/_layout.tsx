import { FontAwesome } from "@expo/vector-icons";
import { Link, Stack } from "expo-router";
import { Pressable } from "react-native";
import Colors from "@/src/constants/Colors";

export default function MenuStack (){
    return (
        <Stack>
            <Stack.Screen 
              name="index" 
              options={
                {
                  title: "Menu", 
                  headerShown: true, 
                  headerRight: () => (
                    <>
                      <Link href="/(admin)/menu/create" asChild>
                        <Pressable>
                          {({ pressed }) => (
                            <FontAwesome
                              name="plus-square-o"
                              size={25}
                              color={Colors.light.tint}
                              style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                            />
                          )}
                        </Pressable>
                      </Link>
                      <Link href="/" asChild>
                        <Pressable>
                          {({ pressed }) => (
                            <FontAwesome
                              name="home"
                              size={25}
                              color={Colors.light.tint}
                              style={{ marginRight: 0, opacity: pressed ? 0.5 : 1 }}
                            />
                          )}
                        </Pressable>
                      </Link>
                    </>
                  ),
                }
              } 
            />
          <Stack.Screen 
                name="[id]" 
                options={
                  {
                    title: "Menu", 
                    headerShown: true, 
                    headerRight: () => (
                      <Link href="/" asChild>
                        <Pressable>
                          {({ pressed }) => (
                            <FontAwesome
                              name="pencil"
                              size={25}
                              color={Colors.light.tint}
                              style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                            />
                          )}
                        </Pressable>
                      </Link>
                    ),
                  }
                } 
              />
        </Stack>
    )
}