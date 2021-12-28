import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { Card } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome5";
import DateConverter from "../helpers/DateConverter";
import UserAvatar from "./UserAvatar";

const InstagramPost = (props) => {
  const { username, caption, media_url, timestamp } = props.data;
  const dateContent = DateConverter(timestamp);
  const LeftContent = () => <UserAvatar />;
  const RightContent = () => <Text>{dateContent}</Text>;
  return (
    <Card style={{ marginVertical: 8, paddingVertical: 8 }}>
      <Card.Title
        title={username}
        left={LeftContent}
        right={RightContent}
        rightStyle={{ marginRight: 12 }}
      />
      {caption ? (
        <Card.Content style={{ padding: 8 }}>
          <Text>{caption}</Text>
        </Card.Content>
      ) : null}
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
