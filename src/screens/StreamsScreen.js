import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  RefreshControl,
} from "react-native";
import { Avatar, Modal } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome5";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "../styles/styles";
import useGlobalData from "../contexts/useGlobalData";
import useInstagram from "../contexts/useInstagram";
import useFirebase from "../contexts/useFirebase";
import UserAvatar from "../components/UserAvatar";
import InstagramPost from "../components/InstagramPost";
import SocialButton from "../components/SocialButton";

const StreamsScreen = ({ navigation }) => {
  const [visible, setVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [socialColor, setSocialColor] = useState("#fff");
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = { backgroundColor: "white", padding: 20, height: 400 };

  const { userData, currentStream, setCurrentStream } = useGlobalData();
  const { instagramData } = useInstagram();
  const { getSocialPosts } = useFirebase();

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getSocialPosts(currentStream);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    if (currentStream == "twitter") setSocialColor("#00acee");
    if (currentStream == "facebook") setSocialColor("#3b5988");
    if (currentStream == "instagram") setSocialColor("#bc2a8d");
    if (currentStream == "linkedin") setSocialColor("#0077b5");
    if (currentStream == "pinterest") setSocialColor("#c8232c");
  }, [currentStream]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        style={{ paddingTop: 16 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <TouchableOpacity onPress={showModal}>
          <Avatar.Icon
            style={{ backgroundColor: socialColor, alignSelf: "center" }}
            size={58}
            icon={currentStream ? currentStream : "cellphone"}
          />
        </TouchableOpacity>
        {currentStream !== "" ? (
          instagramData.map((data, i) => {
            return <InstagramPost key={i} data={data} />;
          })
        ) : (
          <View style={{ margin: 12 }}>
            <Text style={{ textAlign: "center" }}>No streams to be shown.</Text>
            <Text style={{ fontSize: 18, marginTop: 8, textAlign: "center" }}>
              Select the streams you want to show.
            </Text>
            <TouchableOpacity style={styles.button} onPress={showModal}>
              <Text
                style={{
                  fontSize: 18,
                  textAlign: "center",
                  color: "#fff",
                }}
              >
                Select
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
      <Modal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={containerStyle}
      >
        <Text style={{ fontSize: 24, textAlignVertical: "top" }}>
          Select the social accounts you want to add.
        </Text>
        {userData
          ? userData.socialAccounts.map((socialName, i) => {
              let bgColor = "";
              if (socialName === "twitter") bgColor = "#00acee";
              if (socialName === "facebook") bgColor = "#3b5988";
              if (socialName === "instagram") bgColor = "#bc2a8d";
              if (socialName === "linkedin") bgColor = "#0077b5";
              if (socialName === "pinterest") bgColor = "#c8232c";
              return (
                <TouchableOpacity
                  key={i}
                  style={[styles.socialButton, { backgroundColor: bgColor }]}
                  onPress={() => {
                    hideModal();
                    setCurrentStream(socialName);
                    getSocialPosts(socialName);
                  }}
                >
                  <Icon name={socialName} color="#fff" size={18}>
                    <Text> {userData.userEmail}</Text>
                  </Icon>
                </TouchableOpacity>
              );
            })
          : null}
      </Modal>
    </SafeAreaView>
  );
};

export default StreamsScreen;
