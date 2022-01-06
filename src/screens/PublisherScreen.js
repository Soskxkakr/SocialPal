import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  Button,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import PublisherPost from "../components/PublisherPost";
import useFirebase from "../contexts/useFirebase";
import useGlobalData from "../contexts/useGlobalData";
import styles from "../styles/styles";

const PublisherScreen = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);

  const { getPendingPosts, checkPendingPosts } = useFirebase();
  const { pendingPosts } = useGlobalData();

  useEffect(() => {
    getPendingPosts();
  }, []);

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getPendingPosts();
    wait(2000).then(() => setRefreshing(false));
  }, []);

  return (
    <SafeAreaView>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {pendingPosts.length !== 0 ? (
          pendingPosts.map((post, i) => {
            checkPendingPosts(post.id);
            return (
              <TouchableOpacity
                key={i}
                onPress={() =>
                  navigation.navigate("PendingPostDetails", {
                    post: post,
                  })
                }
              >
                <PublisherPost postContent={post} />
              </TouchableOpacity>
            );
          })
        ) : (
          <>
            <Text style={styles.title}>No scheduled posts yet</Text>
            <TouchableOpacity
              style={styles.subTitle}
              onPress={() => navigation.navigate("Compose")}
            >
              <Text style={{ fontSize: 18, marginTop: 12 }}>
                Schedule a post now!
              </Text>
            </TouchableOpacity>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default PublisherScreen;
