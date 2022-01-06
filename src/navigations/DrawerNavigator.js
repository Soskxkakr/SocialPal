import React, { useEffect, useState } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Icon from "react-native-vector-icons/FontAwesome5";
import StreamsScreen from "../screens/StreamsScreen";
import ComposeScreen from "../screens/ComposeScreen";
import AnalyticsScreen from "../screens/AnalyticsScreen";
import LinkingScreen from "../screens/LinkingScreen";
import DrawerContent from "./contents/DrawerContent";
import DrawerHeader from "./contents/DrawerHeader";
import useFirebase from "../contexts/useFirebase";
import useGlobalData from "../contexts/useGlobalData";
import PostingScreen from "../screens/PostingScreen";
import PublishStackNavigator from "./PublishStackNavigator";
import ProfileScreen from "../screens/ProfileScreen";
import ChatNavigator from "./ChatNavigator";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  const [initialRoute, setInitialRoute] = useState("Link");

  return (
    <Drawer.Navigator
      initialRouteName={initialRoute}
      drawerContent={(props) => <DrawerContent {...props} />}
    >
      <Drawer.Screen
        name="Link"
        component={LinkingScreen}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="Streams"
        component={StreamsScreen}
        options={{
          header: ({ navigation }) => {
            return <DrawerHeader navigation={navigation} name="Streams" />;
          },
        }}
      />
      <Drawer.Screen
        name="Compose"
        component={ComposeScreen}
        options={{
          header: ({ navigation }) => {
            return <DrawerHeader navigation={navigation} name="Compose" />;
          },
        }}
      />
      <Drawer.Screen
        name="PublisherStack"
        component={PublishStackNavigator}
        options={{
          header: ({ navigation }) => {
            return <DrawerHeader navigation={navigation} name="Publisher" />;
          },
        }}
      />
      <Drawer.Screen
        name="Analytics"
        component={AnalyticsScreen}
        options={{
          header: ({ navigation }) => {
            return <DrawerHeader navigation={navigation} name="Analytics" />;
          },
        }}
      />
      <Drawer.Screen
        name="Chat"
        component={ChatNavigator}
        options={{
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="Posting"
        component={PostingScreen}
        options={{
          header: ({ navigation }) => {
            return <DrawerHeader navigation={navigation} name="Posting" />;
          },
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          header: ({ navigation }) => {
            return <DrawerHeader navigation={navigation} name="Profile" />;
          },
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
