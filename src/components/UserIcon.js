import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { Avatar } from "react-native-paper";

const UserIcon = (props) => {
  const [name, setName] = useState("");
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
        padding: 12,
        alignSelf: "flex-start",
      }}
    >
      <CheckImage />
    </View>
  );
};

export default UserIcon;
