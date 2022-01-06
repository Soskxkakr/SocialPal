import React from "react";
import { View } from "react-native";
import { Drawer } from "react-native-paper";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import Icon from "react-native-vector-icons/FontAwesome5";
import UserAvatar from "../../components/UserAvatar";
import useGlobalData from "../../contexts/useGlobalData";
import useFirebase from "../../contexts/useFirebase";

const DrawerContent = (props) => {
  const { logout } = useFirebase();
  const { setSnackbarMessage, setVisible } = useGlobalData();
  return (
    <View style={{ flex: 1, backgroundColor: "#fef5ed" }}>
      <DrawerContentScrollView {...props}>
        <View
          style={{
            flex: 1,
            paddingTop: 12,
            alignItems: "center",
          }}
        >
          <UserAvatar />
        </View>
        <Drawer.Section style={{ marginTop: 12 }}>
          <DrawerItem
            icon={() => <Icon name="dashcube" size={18} />}
            label="Streams"
            onPress={() => props.navigation.navigate("Streams")}
          />
        </Drawer.Section>
        <Drawer.Section style={{ marginTop: 12 }}>
          <DrawerItem
            icon={() => <Icon name="envelope" size={18} />}
            label="Compose"
            onPress={() => props.navigation.navigate("Compose")}
          />
        </Drawer.Section>
        <Drawer.Section style={{ marginTop: 12 }}>
          <DrawerItem
            icon={() => <Icon name="calendar" size={18} />}
            label="Publisher"
            onPress={() => props.navigation.navigate("PublisherStack")}
          />
        </Drawer.Section>
        <Drawer.Section style={{ marginTop: 12 }}>
          <DrawerItem
            icon={() => <Icon name="chart-bar" size={18} />}
            label="Analytics"
            onPress={() => {
              setSnackbarMessage("Feature is coming soon");
              setVisible(true);
            }}
          />
        </Drawer.Section>
        <Drawer.Section style={{ marginTop: 12 }}>
          <DrawerItem
            icon={() => <Icon name="comment-dots" size={18} />}
            label="Chat"
            onPress={() => props.navigation.navigate("Chat")}
          />
        </Drawer.Section>
        <Drawer.Section style={{ marginTop: 12 }}>
          <DrawerItem
            icon={() => <Icon name="user" size={18} />}
            label="My Profile"
            onPress={() => props.navigation.navigate("Profile")}
          />
        </Drawer.Section>
      </DrawerContentScrollView>
      <Drawer.Section>
        <DrawerItem
          icon={() => <Icon name="power-off" color="#000" size={18} />}
          label="Sign Out"
          onPress={logout}
        />
      </Drawer.Section>
    </View>
  );
};

export default DrawerContent;
