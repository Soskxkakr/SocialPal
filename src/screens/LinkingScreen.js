import React, { useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import SocialButton from "../components/SocialButton";
import useGlobalData from "../contexts/useGlobalData";
import useFirebase from "../contexts/useFirebase";
import styles from "../styles/styles";

const LinkingScreen = ({ navigation }) => {
  const baseSocialAccounts = [
    "twitter",
    "instagram",
    "facebook",
    "linkedin",
    "pinterest",
  ];
  const { userData } = useGlobalData();
  const { getUserData } = useFirebase();

  useEffect(() => {
    getUserData();
    // if (userData.socialAccounts.length !== 0) navigation.navigate("Streams");
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>You're Almost There</Text>
      <Text style={styles.subTitle}>Link to any of your social accounts.</Text>
      {baseSocialAccounts.map((name, i) => {
        if (userData) {
          if (userData.socialAccounts.includes(name)) {
            return (
              <SocialButton
                key={i}
                socialName={name}
                text={"Linked"}
                disabled={true}
              />
            );
          }
        }
        return (
          <SocialButton
            key={i}
            socialName={name}
            text={`Link with ${name}`}
            disabled={false}
          />
        );
      })}
      <TouchableOpacity
        style={{ marginTop: 12, marginHorizontal: 12 }}
        onPress={() => navigation.navigate("Streams")}
      >
        <Text style={{ textAlign: "center" }}>Proceed to Dashboard</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LinkingScreen;
