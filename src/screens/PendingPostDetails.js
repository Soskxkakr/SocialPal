import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import useFirebase from "../contexts/useFirebase";
import useGlobalData from "../contexts/useGlobalData";
import styles from "../styles/styles";

const PendingPostDetails = ({ route, navigation }) => {
  const { userData } = useGlobalData();
  const { updatePendingPost } = useFirebase();
  const { post } = route.params;
  return (
    <SafeAreaView>
      <ScrollView>
        {post.media_url ? (
          <Image
            style={{ width: "100%", height: 250, alignSelf: "center" }}
            source={{
              uri: post.media_url,
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
          {post.caption}
        </Text>
        <Text style={{ marginHorizontal: 12, fontSize: 24 }}>
          Content will be posted to:
        </Text>
        {post.social_accounts.map((name, i) => (
          <Text style={{ marginHorizontal: 12, fontSize: 18 }} key={i}>
            {name} - {userData.userEmail}
          </Text>
        ))}
        <TouchableOpacity
          style={styles.button}
          onPress={() => updatePendingPost(post.id)}
        >
          <Text style={{ color: "white", textAlign: "center" }}>POST NOW</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PendingPostDetails;
