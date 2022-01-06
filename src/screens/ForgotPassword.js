import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-paper";
import Logo from "../assets/images/logo.png";
import useFirebase from "../contexts/useFirebase";
import styles from "../styles/styles";

const ForgotPassword = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const { resetPassword } = useFirebase();
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={Logo} />
      <Text style={styles.title}>Reset Password</Text>
      <Text style={styles.paragraph}>
        Just let us know the email you use to sign in to SocialPal and we’ll
        help you get your password back
      </Text>
      <TextInput
        style={[styles.textInput, { marginVertical: 12 }]}
        mode="outlined"
        label="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => resetPassword(email)}
      >
        <Text style={{ textAlign: "center", color: "#fff" }}>
          SEND PASSWORD RESET EMAIL
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ marginVertical: 12 }}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={{ textAlign: "center", fontWeight: "bold" }}>
          Take me back to login.
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ForgotPassword;
