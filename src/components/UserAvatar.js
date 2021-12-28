import React from "react";
import { Avatar } from "react-native-paper";

const UserAvatar = () => {
  return (
    <Avatar.Icon
      style={{
        borderColor: "black",
        backgroundColor: "white",
        borderWidth: 2,
        alignSelf: "center",
      }}
      size={58}
      icon="account"
      color="#000"
    />
  );
};

export default UserAvatar;
