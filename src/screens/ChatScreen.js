import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import useFirebase from "../contexts/useFirebase";
import UserAvatar from "../components/UserAvatar";
import { Badge } from "react-native-paper";
import UserChat from "../components/UserChat";
import useGlobalData from "../contexts/useGlobalData";

const ChatScreen = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const { allUsers, getAllUsers } = useFirebase();
  const { userData, updateCurrentChatUser } = useGlobalData();

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getAllUsers();
    wait(2000).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <SafeAreaView>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {allUsers.length !== 0
          ? allUsers.map((user, i) => {
              if (userData.userEmail === user.userEmail) return;
              return (
                <TouchableOpacity
                  key={i}
                  onPress={() => {
                    if (user.name !== "") {
                      updateCurrentChatUser(user.name);
                    } else {
                      updateCurrentChatUser(user.userEmail);
                    }
                    navigation.navigate("Chat Room", {
                      firstUser: userData,
                      secondUser: user,
                    });
                  }}
                >
                  <UserChat user={user} />
                </TouchableOpacity>
              );
            })
          : null}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ChatScreen;
