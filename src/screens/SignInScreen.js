import React from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { Text, TextInput } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome";
import Logo from "../assets/images/logo.png";
import styles from "../styles/styles";

const SignInScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={Logo} />
      <Text style={styles.title}>Sign In</Text>
      <TextInput
        style={styles.textInput}
        mode="outlined"
        label="Email"
        value={""}
        onChangeText={() => {}}
      />
      <TextInput
        style={styles.textInput}
        mode="outlined"
        label="Password"
        value={""}
        secureTextEntry
        onChangeText={() => {}}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Link")}
      >
        <Text style={{ textAlign: "center", color: "#fff" }}>Sign In</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => {}}>
        <Text style={{ textAlign: "center", color: "#fff" }}>
          <Icon name="google" size={18} color="#fff" />
          {"    "}Sign In With Google
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ marginTop: 12, marginHorizontal: 12 }}
        onPress={() => {}}
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
