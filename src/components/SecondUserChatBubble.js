import React from "react";
import { View, Text } from "react-native";
import UserIcon from "./UserIcon";

const SecondUserChatBubble = (props) => {
  const { secondUser, message } = props;
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <UserIcon user={secondUser} />
      <View
        style={{
          backgroundColor: "#ddd",
          marginTop: 0,
          padding: 8,
          borderRadius: 20,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ width: 200 }}>{message}</Text>
      </View>
    </View>
  );
};

export default SecondUserChatBubble;
