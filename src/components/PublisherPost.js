import React, { useEffect } from "react";
import { View, Text, Image } from "react-native";

const PublisherPost = (props) => {
  const { media_url, caption, status, timestamp } = props.postContent;

  return (
    <View style={{ flexDirection: "row", flexWrap: "nowrap", padding: 4 }}>
      <Image
        style={{ width: 150, height: 150 }}
        source={{
          uri: media_url,
        }}
      />
      <View
        style={{
          flex: 1,
          padding: 8,
          backgroundColor: "#dddddd",
          justifyContent: "space-between",
        }}
      >
        <Text style={{}}>{caption}</Text>
        <Text>
          <Text>
            Posting at {new Date(timestamp.seconds * 1000).toLocaleString()}
            {"\n"}
          </Text>
          Status: <Text style={{ color: "red" }}>{status}</Text>
        </Text>
      </View>
    </View>
  );
};

export default PublisherPost;
