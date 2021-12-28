import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity } from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as AuthSession from "expo-auth-session";
import Icon from "react-native-vector-icons/FontAwesome";
import styles from "../styles/styles";

const SocialButton = (props) => {
  const [name, setName] = useState("");
  const [bgColor, setBgColor] = useState("#000");

  useEffect(() => {
    if (props.name !== "") {
      setName(props.name);
      if (props.name == "twitter") {
        setBgColor("#00acee");
      }
      if (props.name == "facebook") {
        setBgColor("#3b5988");
      }
      if (props.name == "instagram") {
        setBgColor("#bc2a8d");
      }
      if (props.name == "linkedin") {
        setBgColor("#0077b5");
      }
    }
  }, [name]);

  const linkedInAuth = async () => {
    console.log("Authenticating with LinkedIn...");
    AuthSession.startAsync({
      authUrl:
        "https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=86d6elqi44pzmb&redirect_uri=https%3A%2F%2Fexpo.dev%2Fartifacts%2Fc19dbe78-c028-45ef-a59b-920387eb58c6&scope=r_liteprofile%20r_emailaddress",
    })
      .then((response) => {
        console.log("Response: ", response);
      })
      .catch((error) => {
        console.error(error);
      });
    // const result = await WebBrowser.openAuthSessionAsync(
    //   `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=86d6elqi44pzmb&redirect_uri=https%3A%2F%2Fexpo.dev%2Fartifacts%2Fc19dbe78-c028-45ef-a59b-920387eb58c6&scope=r_liteprofile%20r_emailaddress`
    // );
    // console.log("Result: ", result);
  };

  return (
    <TouchableOpacity
      style={[styles.socialButton, { backgroundColor: bgColor }]}
      onPress={() => {
        if (name === "linkedin") {
          linkedInAuth();
        } else {
          console.log("Clicked ", name);
        }
      }}
    >
      <Icon name={name} color="#fff" size={18}>
        <Text>
          {"  "}Link with{" " + name.charAt(0).toUpperCase() + name.slice(1)}
        </Text>
      </Icon>
    </TouchableOpacity>
  );
};

export default SocialButton;
