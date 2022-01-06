import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { Avatar, Badge } from "react-native-paper";
import useGlobalData from "../contexts/useGlobalData";

const UserChat = (props) => {
  const [name, setName] = useState("");
  const [lastMessage, setLastMessage] = useState("");
  const { userData } = useGlobalData();
  const { user } = props;

  useEffect(() => {
    if (user) {
      if (user.name !== "") {
        setName(user.name);
      } else {
        setName(user.userEmail);
      }
    }
  }, []);

  const CheckImage = () => {
    if (user.profilePic !== "") {
      return (
        <Avatar.Image
          style={{}}
          size={58}
          source={{ uri: user.profilePic }}
        ></Avatar.Image>
      );
    } else {
      return (
        <Avatar.Icon
          style={[
            {
              borderColor: "black",
              backgroundColor: "white",
              borderWidth: 2,
            },
          ]}
          size={58}
          icon="account"
          color="#000"
        ></Avatar.Icon>
      );
    }
  };

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        padding: 12,
      }}
    >
      <CheckImage />
      <Badge
        size={14}
        style={{
          position: "absolute",
          top: 55,
          left: 55,
          backgroundColor: "green",
        }}
      />
      <View
        style={{
          marginHorizontal: 12,
          flexWrap: "nowrap",
        }}
      >
        <Text style={{ fontSize: 18 }}>{name}</Text>
        <Text style={{ flex: 1, marginTop: 4, width: 220 }} numberOfLines={2}>
          {user.userEmail}
        </Text>
      </View>
    </View>
  );
};

export default UserChat;
