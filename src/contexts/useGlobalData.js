import React, { createContext, useContext, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import Spinner from "react-native-loading-spinner-overlay";
import Snack from "../components/Snack";

const GlobalContext = createContext({});

export const GlobalDataProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [currentStream, setCurrentStream] = useState("");
  const [message, setMessage] = useState("");
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [socialAccounts, setSocialAccounts] = useState([]);
  const [pendingPosts, setPendingPosts] = useState([]);
  const [image, setImage] = useState(null);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("Loading...");
  const [currentChatUser, setCurrentChatUser] = useState("");

  const addSocialAccount = (socialAccount) => {
    if (socialAccounts.includes(socialAccount)) {
      setSnackbarMessage("You can't have the same social account.");
      setVisible(true);
      return;
    }
    setSocialAccounts((prevState) => [...prevState, socialAccount]);
  };

  const removeSocialAccount = (socialAccount) => {
    let filteredArray = socialAccounts.filter((filteredName) => {
      return filteredName !== socialAccount;
    });
    setSocialAccounts(filteredArray);
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    })
      .then((result) => {
        setImage(result.uri);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const launchCamera = async () => {
    await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    })
      .then((result) => {
        setImage(result.uri);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const updateCurrentChatUser = (name) => {
    setCurrentChatUser(name);
  };

  return (
    <GlobalContext.Provider
      value={{
        userData,
        currentStream,
        socialAccounts,
        pendingPosts,
        message,
        snackbarMessage,
        image,
        visible,
        loading,
        loadingMessage,
        currentChatUser,
        setUserData,
        setCurrentStream,
        setSocialAccounts,
        setPendingPosts,
        setMessage,
        setSnackbarMessage,
        setImage,
        setVisible,
        setLoading,
        setLoadingMessage,
        addSocialAccount,
        removeSocialAccount,
        pickImage,
        launchCamera,
        setCurrentChatUser,
        updateCurrentChatUser,
      }}
    >
      <Spinner visible={loading} textContent={loadingMessage} />
      {!loading && children}
      <Snack
        snackbarMessage={snackbarMessage}
        visible={visible}
        setVisible={setVisible}
      />
    </GlobalContext.Provider>
  );
};

export default useGlobalData = () => {
  return useContext(GlobalContext);
};
