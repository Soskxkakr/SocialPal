import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  ImageBackground,
} from "react-native";
import { Chip, IconButton, Snackbar } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import Icon from "react-native-vector-icons/FontAwesome5";
import ComposeFAB from "../components/ComposeFAB";
import SocialButton from "../components/SocialButton";
import SocialChip from "../components/SocialChip";
import useGlobalData from "../contexts/useGlobalData";
import useFirebase from "../contexts/useFirebase";
import styles from "../styles/styles";
import Snack from "../components/Snack";

const ComposeScreen = () => {
  const { socialAccounts, message, image, setMessage, setImage } =
    useGlobalData();

  return (
    <SafeAreaView style={[{ flex: 1 }]}>
      <ScrollView>
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          {socialAccounts.length !== 0 ? (
            socialAccounts.map((socialName, i) => {
              return <SocialChip key={i} name={socialName} />;
            })
          ) : (
            <Text style={{ marginStart: 12, marginTop: 12 }}>
              No social account attached yet.
            </Text>
          )}
        </View>
        <TextInput
          style={{
            textAlignVertical: "top",
            borderWidth: 1,
            margin: 12,
            padding: 12,
          }}
          multiline
          numberOfLines={20}
          placeholder="Enter Something"
          value={message}
          onChangeText={(text) => setMessage(text)}
        />
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            marginHorizontal: 12,
          }}
        >
          {image && (
            <ImageBackground
              style={{
                width: "100%",
                height: 250,
                marginEnd: 12,
                alignSelf: "stretch",
              }}
              source={{ uri: image }}
              resizeMode="cover"
              width={250}
              height={250}
            >
              <IconButton
                style={{
                  position: "absolute",
                  top: 5,
                  right: 10,
                  backgroundColor: "pink",
                }}
                icon={() => <Icon name="times" color="#000000" size={20} />}
                color="#ff0000"
                size={20}
                onPress={() => setImage(null)}
              />
            </ImageBackground>
          )}
        </View>
      </ScrollView>
      <ComposeFAB />
    </SafeAreaView>
  );
};

export default ComposeScreen;
