import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import UserAvatar from "../components/UserAvatar";
import styles from "../styles/styles";
import axios from "axios";
import InstagramPost from "../components/InstagramPost";
import { INSTAGRAM_ACCESS_TOKEN, INSTAGRAM_ID } from "../constants/Constants";

const StreamsScreen = () => {
  const [instagramData, setInstagramData] = useState([]);
  const instagramId = INSTAGRAM_ID;
  const instagramAccessToken = INSTAGRAM_ACCESS_TOKEN;
  const fields = "id,username,caption,media_url,timestamp";

  useEffect(() => {
    axios
      .get(
        `https://graph.instagram.com/${instagramId}/media?fields=${fields}&access_token=${instagramAccessToken}`
      )
      .then((response) => {
        setInstagramData(response.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // IGQVJXSGZAZAaUJ0MFJWQlhKdk1uMkRTdVdQbEI2eE5kajh4eC01QmU0cUR6SmRQOFNrZAXFIOWlxREUzOHBIa2xNYTVKUkI0bGJydFFUaEpHZAUtoUDdpTGpFMGZAiOUV1Q2ZACSVBTbC01OE9NNlVkU3BGNQZDZD
  return (
    <View style={styles.container}>
      <ScrollView>
        <UserAvatar />
        {instagramData.map((data) => {
          return <InstagramPost key={data.id} data={data} />;
        })}
      </ScrollView>
    </View>
  );
};

export default StreamsScreen;
