import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { INSTAGRAM_ACCESS_TOKEN, INSTAGRAM_ID } from "../constants/Constants";

const InstagramContext = createContext({});

export const InstagramProvider = ({ children }) => {
  const [instagramData, setInstagramData] = useState([]);
  const instagramId = INSTAGRAM_ID;
  const instagramAccessToken = INSTAGRAM_ACCESS_TOKEN;
  const fields = "id,username,caption,media_url,timestamp";

  // useEffect(() => {
  //   axios
  //     .get(
  //       `https://graph.instagram.com/${instagramId}/media?fields=${fields}&access_token=${instagramAccessToken}`
  //     )
  //     .then((response) => {
  //       setInstagramData(response.data.data);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }, []);

  return (
    <InstagramContext.Provider value={{ instagramData, setInstagramData }}>
      {children}
    </InstagramContext.Provider>
  );
};

export default useInstagram = () => {
  return useContext(InstagramContext);
};
