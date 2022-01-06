import React, { createContext, useContext, useEffect } from "react";
import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";

const PinterestContext = createContext({});

export const PinterestProvider = ({ children }) => {
  const client_id = "1475086";
  const redirect_uri = "";
  const response_type = "code";

  useEffect(() => {}, []);

  return <PinterestContext.Provider>{children}</PinterestContext.Provider>;
};

export default usePinterest = () => {
  return useContext(PinterestContext);
};
