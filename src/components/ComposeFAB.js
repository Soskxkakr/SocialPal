import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { FAB, Modal, Portal, Provider } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome5";
import useGlobalData from "../contexts/useGlobalData";
import styles from "../styles/styles";
import SocialButton from "./SocialButton";

const ComposeFAB = () => {
  const { addSocialAccount, pickImage, launchCamera } = useGlobalData();
  const [visible, setVisible] = useState(false);
  const [state, setState] = useState({ open: false });

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const onStateChange = ({ open }) => setState({ open });
  const { open } = state;

  const { userData } = useGlobalData();
  const containerStyle = { backgroundColor: "white", padding: 20, height: 400 };

  return (
    <Provider>
      <Portal>
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
                      addSocialAccount(socialName);
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
        <FAB.Group
          fabStyle={{ backgroundColor: "pink" }}
          open={open}
          icon={open ? "minus" : "plus"}
          actions={[
            {
              icon: "plus",
              label: "Add Social Account",
              onPress: () => showModal(),
            },
            {
              icon: "camera",
              label: "Open Camera",
              onPress: () => launchCamera(),
            },
            {
              icon: "image",
              label: "Attach Image",
              onPress: () => pickImage(),
            },
          ]}
          onStateChange={onStateChange}
          onPress={() => {
            if (open) {
              // do something if the speed dial is open
            }
          }}
        />
      </Portal>
    </Provider>
  );
};

export default ComposeFAB;
