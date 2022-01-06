import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ChatRoom from "../screens/ChatRoom";
import ChatScreen from "../screens/ChatScreen";
import DrawerHeader from "./contents/DrawerHeader";
import useGlobalData from "../contexts/useGlobalData";

const Stack = createStackNavigator();

const ChatNavigator = () => {
  const { currentChatUser } = useGlobalData();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Chat Screen"
        component={ChatScreen}
        options={{
          header: ({ navigation }) => (
            <DrawerHeader navigation={navigation} name="Chat" />
          ),
        }}
      />
      <Stack.Screen
        name="Chat Room"
        component={ChatRoom}
        options={{ headerTitle: currentChatUser }}
      />
    </Stack.Navigator>
  );
};

export default ChatNavigator;
