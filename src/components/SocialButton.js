import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import styles from "../styles/styles";
import useGlobalData from "../contexts/useGlobalData";
import useFacebook from "../contexts/useFacebook";
import useLinkedIn from "../contexts/useLinkedIn";
import useFirebase from "../contexts/useFirebase";

const SocialButton = (props) => {
  const [bgColor, setBgColor] = useState("#000");
  const [authCode, setAuthCode] = useState(null);

  const { socialName, text, disabled } = props;
  const { addSocialAccount } = useFirebase();
  const { authenticateLinkedIn } = useLinkedIn();
  const { loginWithFacebook } = useFacebook();

  useEffect(() => {
    if (socialName !== "") {
      if (socialName == "twitter") setBgColor("#00acee");
      if (socialName == "facebook") setBgColor("#3b5988");
      if (socialName == "instagram") setBgColor("#bc2a8d");
      if (socialName == "linkedin") setBgColor("#0077b5");
      if (socialName == "pinterest") setBgColor("#c8232c");
    }
  }, [socialName]);

  return (
    <TouchableOpacity
      style={[styles.socialButton, { backgroundColor: bgColor }]}
      onPress={() => {
        if (socialName === "facebook") {
          loginWithFacebook();
        } else {
          addSocialAccount(socialName);
        }
      }}
      disabled={disabled}
    >
      <Icon name={socialName} color="#fff" size={18}>
        {"  "}
        {text}
      </Icon>
    </TouchableOpacity>
  );
};

export default SocialButton;
