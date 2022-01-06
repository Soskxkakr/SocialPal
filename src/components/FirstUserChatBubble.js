import React from "react";
import { View, Text } from "react-native";
import UserIcon from "./UserIcon";

const FirstUserChatBubble = (props) => {
  const { firstUser, message } = props;
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <View
        style={{
          backgroundColor: "#ddd",
          marginLeft: "20%",
          marginTop: 0,
          padding: 8,
          borderRadius: 20,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ width: 200 }}>{message}</Text>
      </View>
      <UserIcon user={firstUser} />
    </View>
  );
};

export default FirstUserChatBubble;
