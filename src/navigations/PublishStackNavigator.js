import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { View, Text } from "react-native";
import PublisherScreen from "../screens/PublisherScreen";
import PendingPostDetails from "../screens/PendingPostDetails";

const Stack = createStackNavigator();

const PublishStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Publisher"
        component={PublisherScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PendingPostDetails"
        component={PendingPostDetails}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default PublishStackNavigator;
