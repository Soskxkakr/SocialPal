import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import AnimatedNumber from "react-native-animate-number";
import { Button, Surface } from "react-native-paper";

const AnalyticsScreen = () => {
  const [follows, setFollows] = useState(0);

  const increase = () => {
    setFollows(follows + 124);
  };

  useEffect(() => {
    setFollows(100);
  });

  return (
    <View>
      <Surface
        style={{
          width: 80,
          height: 80,
          margin: 12,
          padding: 12,
          elevation: 4,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text>Likes</Text>
        <Text style={{ fontSize: 28 }}>
          <AnimatedNumber countBy={1} value={1200} timing="linear" />
        </Text>
      </Surface>
    </View>
  );
};

export default AnalyticsScreen;
