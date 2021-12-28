import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from "./src/navigations/StackNavigator";
import { FirebaseProvider } from "./src/contexts/useFirebase";

const App = () => {
  return (
    <NavigationContainer>
      <FirebaseProvider>
        <StackNavigator />
      </FirebaseProvider>
    </NavigationContainer>
  );
};

export default App;
