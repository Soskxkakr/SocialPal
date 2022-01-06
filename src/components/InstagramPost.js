import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity } from "react-native";
import { Avatar, Card } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome5";
import useGlobalData from "../contexts/useGlobalData";
import DateConverter from "../helpers/DateConverter";
import UserAvatar from "./UserAvatar";

const InstagramPost = (props) => {
  const [name, setName] = useState("");
  const {
    username,
    caption,
    media_url,
    timestamp,
    user_image_url,
    posted_by,
    social_accounts,
  } = props.data;
  const { userData } = useGlobalData();
  const dateContent = DateConverter(timestamp.seconds * 1000);

  const LeftContent = () => (
    <Avatar.Image style={{}} size={58} source={{ uri: user_image_url }} />
  );
  const RightContent = () => <Text>{dateContent}</Text>;

  useEffect(() => {
    if (posted_by !== "") {
      setName(posted_by);
    }
  }, [name]);

  return (
    <Card style={{ marginVertical: 8, paddingVertical: 8 }}>
      <Card.Title
        title={name}
        left={LeftContent}
        right={RightContent}
        titleStyle={{ marginStart: 12 }}
        rightStyle={{ marginRight: 12 }}
      />
      {caption ? (
        <Card.Content style={{ padding: 8 }}>
          <Text style={{ fontSize: 16 }}>{caption}</Text>
        </Card.Content>
      ) : null}
      <Card.Content style={{ padding: 8, flexDirection: "row" }}>
        {social_accounts.map((name, i) => {
          return <Icon key={i} style={{ paddingHorizontal: 8 }} name={name} />;
        })}
      </Card.Content>
      <Card.Cover style={{ height: 500 }} source={{ uri: media_url }} />
      <Card.Actions style={{ marginTop: 8 }}>
        <TouchableOpacity style={{ marginRight: 12 }}>
          <Icon name="heart" color="#000" size={14}>
            <Text> Like</Text>
          </Icon>
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name="comment" color="#000" size={14}>
            <Text> Comment</Text>
          </Icon>
        </TouchableOpacity>
      </Card.Actions>
    </Card>
  );
};

export default InstagramPost;
