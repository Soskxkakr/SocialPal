import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from "./src/navigations/StackNavigator";
import { GlobalDataProvider } from "./src/contexts/useGlobalData";
import { FirebaseProvider } from "./src/contexts/useFirebase";
import { InstagramProvider } from "./src/contexts/useInstagram";
import { FacebookProvider } from "./src/contexts/useFacebook";
import { LinkedInProvider } from "./src/contexts/useLinkedIn";

const App = () => {
  return (
    <NavigationContainer>
      <GlobalDataProvider>
        <InstagramProvider>
          <FirebaseProvider>
            <FacebookProvider>
              <LinkedInProvider>
                <StackNavigator />
              </LinkedInProvider>
            </FacebookProvider>
          </FirebaseProvider>
        </InstagramProvider>
      </GlobalDataProvider>
    </NavigationContainer>
  );
};

export default App;
