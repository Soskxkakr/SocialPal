import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import useGlobalData from "../contexts/useGlobalData";
import styles from "../styles/styles";
import useFirebase from "../contexts/useFirebase";

const PostingScreen = () => {
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date());
  const [userName, setUserName] = useState("");
  const { socialAccounts, userData, message, image } = useGlobalData();
  const { addPost } = useFirebase();

  useEffect(() => {
    if (userData.name !== "") {
      setUserName(userData.name);
    } else {
      setUserName(userData.userEmail);
    }
  }, []);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
    addPost(
      userName,
      userData.profilePic,
      socialAccounts,
      message,
      image,
      "Pending",
      selectedDate
    );
  };

  return (
    <SafeAreaView>
      <ScrollView>
        {image ? (
          <Image
            style={{ width: "100%", height: 250, alignSelf: "center" }}
            source={{
              uri: image,
            }}
          />
        ) : (
          <View
            style={{
              width: "100%",
              height: 250,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text>No image to be displayed.</Text>
          </View>
        )}
        <Text
          style={{ marginHorizontal: 12, marginVertical: 24, fontSize: 18 }}
        >
          {message}
        </Text>
        <Text style={{ marginHorizontal: 12, fontSize: 24 }}>
          Content will be posted to:
        </Text>
        {socialAccounts.map((name, i) => (
          <Text style={{ marginHorizontal: 12, fontSize: 18 }} key={i}>
            {name} - {userData.userEmail}
          </Text>
        ))}
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            addPost(
              userName,
              userData.profilePic,
              socialAccounts,
              message,
              image,
              "Posted",
              new Date()
            );
          }}
        >
          <Text style={{ color: "white", textAlign: "center" }}>POST NOW</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => setShow(true)}>
          <Text style={{ color: "white", textAlign: "center" }}>
            SCHEDULE LATER
          </Text>
        </TouchableOpacity>
        {show && (
          <DateTimePicker
            value={date}
            mode="time"
            display="default"
            onChange={onChange}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default PostingScreen;
