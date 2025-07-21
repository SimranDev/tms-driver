import React from "react";
import { MaterialIcons, FontAwesome, FontAwesome6 } from "@expo/vector-icons";
import { Link, Tabs } from "expo-router";
import { Pressable } from "react-native";

import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
// function TabBarIcon(props: { name: React.ComponentProps<typeof FontAwesome | typeof MaterialIcons>["name"]; color: string }) {
//   const Icon = FontAwesome;
//   return <Icon size={28} style={{ marginBottom: -3 }} {...props} />;
// }

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Requests",
          tabBarIcon: ({ color }) => <FontAwesome name="inbox" size={28} style={{ marginBottom: -3 }} color={color} />,
          headerRight: () => (
            <Link href="/modal" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="info-circle"
                    size={25}
                    color={Colors[colorScheme ?? "light"].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="my-jobs"
        options={{
          title: "My Jobs",
          tabBarIcon: ({ color }) => <MaterialIcons name="work" size={28} style={{ marginBottom: -3 }} color={color} />,
        }}
      />
      <Tabs.Screen
        name="live-job"
        options={{
          title: "Live Job",
          tabBarIcon: ({ color }) => <FontAwesome6 name="location-arrow" size={28} style={{ marginBottom: -3 }} color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => <MaterialIcons name="settings" size={28} style={{ marginBottom: -3 }} color={color} />,
        }}
      />
    </Tabs>
  );
}
