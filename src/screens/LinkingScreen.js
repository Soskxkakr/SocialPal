import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import SocialButton from "../components/SocialButton";
import styles from "../styles/styles";

const LinkingScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>You're Almost There</Text>
      <Text style={styles.subTitle}>Link to any of your social accounts.</Text>
      <SocialButton name="twitter" />
      <SocialButton name="facebook" />
      <SocialButton name="instagram" />
      <SocialButton name="linkedin" />
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
