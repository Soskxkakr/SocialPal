import React, { useState } from "react";
import {
  View,
  Text,
  Platform,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import useGlobalData from "../../contexts/useGlobalData";

const DrawerHeader = (props) => {
  const { socialAccounts, message, setVisible, setSnackbarMessage } =
    useGlobalData();
  const { navigation, name } = props;
  return (
    <View
      style={{
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        width: "100%",
        backgroundColor: "white",
        height: 100,
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <Icon
        style={{ padding: 18 }}
        name="bars"
        size={18}
        onPress={() => navigation.openDrawer()}
      />
      <Text style={{ fontSize: 24 }}>{name}</Text>
      {name == "Compose" ? (
        <TouchableOpacity
          style={{ marginLeft: "auto", paddingEnd: 24 }}
          onPress={() => {
            if (socialAccounts.length === 0 || message === "") {
              setSnackbarMessage("Social Accounts and Message can't be empty!");
              setVisible(true);
            } else {
              navigation.navigate("Posting");
            }
          }}
        >
          <Text style={{ fontSize: 24 }}>Next</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default DrawerHeader;
