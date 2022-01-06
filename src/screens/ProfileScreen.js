import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
import { TextInput } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import useGlobalData from "../contexts/useGlobalData";
import useFirebase from "../contexts/useFirebase";
import styles from "../styles/styles";

const ProfileScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const { userData } = useGlobalData();
  const { updateUserData } = useFirebase();

  useEffect(() => {
    if (userData.name !== "") setName(userData.name);
    if (userData.profilePic !== "") setProfilePic(userData.profilePic);
  }, [userData]);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    })
      .then((result) => {
        if (result.cancelled) {
          return;
        }
        setProfilePic(result.uri);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {profilePic ? (
        <TouchableOpacity style={{ marginTop: 28 }} onPress={pickImage}>
          <Image
            style={{
              width: 150,
              height: 150,
              borderRadius: 100,
              alignSelf: "center",
            }}
            source={{
              uri: profilePic,
            }}
          />
        </TouchableOpacity>
      ) : (
        <View
          style={{
            marginTop: 28,
            backgroundColor: "#cccccc",
            height: 150,
            width: 150,
            borderRadius: 100,
            flexDirection: "row",
            justifyContent: "center",
            alignSelf: "center",
          }}
        >
          <TouchableOpacity style={{ alignSelf: "center" }} onPress={pickImage}>
            <Text>Select Image</Text>
          </TouchableOpacity>
        </View>
      )}
      <Text style={styles.subTitle}>Email</Text>
      <Text style={[styles.paragraph, { marginVertical: 12 }]}>
        {userData.userEmail}
      </Text>
      <Text style={styles.subTitle}>Name</Text>
      <TextInput
        style={styles.textInput}
        mode="outlined"
        label="Name"
        value={name}
        onChangeText={setName}
      />
      <Text style={styles.subTitle}>Social Accounts Linked</Text>
      {userData.socialAccounts.map((name, i) => {
        return (
          <Text style={styles.paragraph} key={i}>
            {name}
          </Text>
        );
      })}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Link")}
      >
        <Text style={{ textAlign: "center", color: "#fff" }}>
          LINK MORE SOCIAL ACCOUNTS
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => updateUserData(name, profilePic)}
      >
        <Text style={{ textAlign: "center", color: "#fff" }}>
          UPDATE PROFILE
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ProfileScreen;
