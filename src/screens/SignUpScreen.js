import React, { useState } from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { Text, TextInput } from "react-native-paper";
import useFirebase from "../contexts/useFirebase";
import styles from "../styles/styles";

const SignUpScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signUpUser } = useFirebase();
  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require("../assets/images/logo.png")}
      />
      <Text style={styles.title}>Sign Up</Text>
      <TextInput
        style={styles.textInput}
        mode="outlined"
        label="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.textInput}
        mode="outlined"
        label="Password"
        value={password}
        secureTextEntry
        onChangeText={setPassword}
      />
      <Text
        style={{ textAlign: "center", marginVertical: 8, marginHorizontal: 12 }}
      >
        By signing up, I accept and agree to the Terms of Service and Privacy
        Policy.
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          if (email !== "" && password !== "" && password.length >= 6) {
            signUpUser(email, password);
          }
        }}
      >
        <Text style={{ textAlign: "center", color: "#fff" }}>Sign Up</Text>
      </TouchableOpacity>
      <Text style={{ textAlign: "center", marginTop: 12 }}>
        Already have an account?
      </Text>
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={{ textAlign: "center", fontWeight: "bold" }}>
          Sign in to your account
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUpScreen;
