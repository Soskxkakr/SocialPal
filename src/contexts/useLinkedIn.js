import React, { createContext, useContext, useEffect } from "react";
import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";
import {
  LINKEDIN_CLIENT_ID,
  LINKEDIN_REDIRECT,
  LINKEDIN_SCOPE,
} from "../constants/Constants";

const LinkedInContext = createContext({});

export const LinkedInProvider = ({ children }) => {
  const clientId = LINKEDIN_CLIENT_ID;
  const redirectURL = LINKEDIN_REDIRECT;
  const scope = LINKEDIN_SCOPE;

  useEffect(() => {
    Linking.addEventListener("url", handleDeepLink);
    return () => {
      Linking.removeEventListener("url");
    };
  }, []);

  const handleDeepLink = (event) => {
    let data = Linking.parse(event.url);
    setAuthCode(data.queryParams.code);
    console.log("datadata", data.queryParams.code);
  };

  const authenticateLinkedIn = async () => {
    await WebBrowser.openBrowserAsync(
      `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&redirect_uri=${redirectURL}&scope=${scope}`
    ).then((res) => console.log("resss", res));
  };

  return (
    <LinkedInContext.Provider value={{ authenticateLinkedIn }}>
      {children}
    </LinkedInContext.Provider>
  );
};

export default useLinkedIn = () => {
  return useContext(LinkedInContext);
};
