import React from "react";
import { View, Text } from "react-native";
import { Snackbar } from "react-native-paper";

const Snack = ({ snackbarMessage, visible, setVisible }) => {
  return (
    <Snackbar
      visible={visible}
      onDismiss={() => setVisible(false)}
      action={{
        label: "Ok",
        onPress: () => {
          setVisible(false);
        },
      }}
    >
      {snackbarMessage}
    </Snackbar>
  );
};

export default Snack;
