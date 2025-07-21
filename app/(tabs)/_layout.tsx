import React from "react";
import { MaterialIcons, FontAwesome, FontAwesome6 } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#2f95dc",
        headerShown: true,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Requests",
          tabBarIcon: ({ color }) => <FontAwesome name="inbox" size={28} style={{ marginBottom: -3 }} color={color} />,
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
