import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SignInScreen from "../screens/SignInScreen";
import SignUpScreen from "../screens/SignUpScreen";
import LinkingScreen from "../screens/LinkingScreen";
import StreamsScreen from "../screens/StreamsScreen";

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={SignInScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={SignUpScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Link"
        component={LinkingScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Streams"
        component={StreamsScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
