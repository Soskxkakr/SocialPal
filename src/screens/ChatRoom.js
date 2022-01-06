import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import uuid from "react-native-uuid";
import FirstUserChatBubble from "../components/FirstUserChatBubble";
import SecondUserChatBubble from "../components/SecondUserChatBubble";
import UserIcon from "../components/UserIcon";
import useFirebase from "../contexts/useFirebase";

const ChatRoom = ({ route, navigations }) => {
  const [message, setMessage] = useState("");
  const {
    sendChatMessage,
    userChatMessages,
    getChatMessages,
    setUserChatMessages,
  } = useFirebase();
  const { firstUser, secondUser } = route.params;
  const scrollViewRef = useRef();

  useEffect(() => {
    getChatMessages(firstUser, secondUser);
  }, []);

  const sendMessage = () => {
    if (message !== "") {
      let uuidv4 = uuid.v4();
      const chatObject = {
        firstUser: firstUser.userEmail,
        secondUser: secondUser.userEmail,
        messageObject: {
          id: uuidv4,
          message: message,
          sentBy: firstUser.userEmail,
        },
      };
      setUserChatMessages((prevState) => [
        ...prevState,
        chatObject.messageObject,
      ]);
      sendChatMessage(chatObject);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        style={{ backgroundColor: "pink", marginBottom: 100 }}
        ref={scrollViewRef}
        onContentSizeChange={() =>
          scrollViewRef.current.scrollToEnd({ animated: true })
        }
      >
        {typeof userChatMessages !== "undefined"
          ? userChatMessages.map((chatObj, i) => {
              if (chatObj.sentBy === firstUser.userEmail) {
                return (
                  <FirstUserChatBubble
                    key={i}
                    firstUser={firstUser}
                    message={chatObj.message}
                  />
                );
              } else {
                return (
                  <SecondUserChatBubble
                    key={i}
                    secondUser={secondUser}
                    message={chatObj.message}
                  />
                );
              }
            })
          : null}
      </ScrollView>
      <TextInput
        style={{
          position: "absolute",
          bottom: 20,
          width: "80%",
          borderTopLeftRadius: 20,
          borderBottomLeftRadius: 20,
          borderWidth: 2,
          borderColor: "#000",
          backgroundColor: "#fff",
          height: 50,
          padding: 8,
        }}
        multiline
        value={message}
        onChangeText={setMessage}
      />
      <TouchableOpacity
        style={{
          position: "absolute",
          width: "20%",
          height: 50,
          bottom: 20,
          right: 0,
          borderTopRightRadius: 20,
          borderBottomRightRadius: 20,
          borderTopWidth: 2,
          borderBottomWidth: 2,
          borderRightWidth: 2,
          backgroundColor: "#fff",
          borderColor: "#000",
          alignItems: "center",
          justifyContent: "center",
        }}
        onPress={() => {
          sendMessage();
          setMessage("");
        }}
      >
        <Text>Send</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ChatRoom;
