import React, { useState } from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { Text, TextInput } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome";
import Logo from "../assets/images/logo.png";
import useFirebase from "../contexts/useFirebase";
import styles from "../styles/styles";

const SignInScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signInUser } = useFirebase();
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={Logo} />
      <Text style={styles.title}>Sign In</Text>
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
      <TouchableOpacity
        style={styles.button}
        onPress={() => signInUser(email, password)}
      >
        <Text style={{ textAlign: "center", color: "#fff" }}>SIGN IN</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ marginTop: 12, marginHorizontal: 12 }}
        onPress={() => navigation.navigate("ForgotPassword")}
      >
        <Text style={{ textAlign: "right" }}>Forgot Password?</Text>
      </TouchableOpacity>
      <Text style={{ textAlign: "center", marginTop: 12 }}>
        Don't have an account?
      </Text>
      <TouchableOpacity onPress={() => navigation.navigate("Register")}>
        <Text style={{ textAlign: "center", fontWeight: "bold" }}>
          Create a new account
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignInScreen;
