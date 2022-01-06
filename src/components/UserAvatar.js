import React, { useEffect, useState } from "react";
import { Avatar, Badge } from "react-native-paper";
import useGlobalData from "../contexts/useGlobalData";

const UserAvatar = () => {
  const [profilePic, setProfilePic] = useState("");
  const { userData } = useGlobalData();

  useEffect(() => {
    if (userData) {
      if (userData.profilePic !== "") setProfilePic(userData.profilePic);
    }
  }, [userData]);

  const CheckImage = () => {
    if (profilePic !== "") {
      return (
        <Avatar.Image
          style={{}}
          size={58}
          source={{ uri: profilePic }}
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

  return <CheckImage />;
};

export default UserAvatar;
