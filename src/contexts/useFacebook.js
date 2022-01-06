import React, { createContext, useContext } from "react";
import * as Facebook from "expo-facebook";
import useFirebase from "./useFirebase";

const FacebookContext = createContext({});

export const FacebookProvider = ({ children }) => {
  const { addSocialAccount } = useFirebase();

  const loginWithFacebook = async () => {
    await Facebook.initializeAsync({
      appId: "956239238602736",
    });
    const { type, token, expirationDate, permissions, declinedPermissions } =
      await Facebook.logInWithReadPermissionsAsync({
        permissions: ["public_profile"],
      });
    if (type === "success") {
      // Link to facebook
      addSocialAccount("facebook");
    }
  };
  return (
    <FacebookContext.Provider value={{ loginWithFacebook }}>
      {children}
    </FacebookContext.Provider>
  );
};

export default useFacebook = () => {
  return useContext(FacebookContext);
};
