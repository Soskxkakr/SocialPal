import React from "react";
import { View, Text } from "react-native";
import { Chip } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome5";
import useGlobalData from "../contexts/useGlobalData";

const SocialChip = (props) => {
  const { userData, removeSocialAccount } = useGlobalData();
  return (
    <Chip
      style={{
        maxWidth: 150,
        marginStart: 12,
        marginTop: 12,
        borderWidth: 1,
      }}
      icon={() => <Icon name={props.name} />}
      closeIcon={() => <Icon name="times" />}
      onClose={() => removeSocialAccount(props.name)}
      mode="outlined"
      ellipsizeMode="tail"
    >
      {userData.userEmail}
    </Chip>
  );
};

export default SocialChip;
