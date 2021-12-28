import { StyleSheet, Platform, StatusBar } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  logo: {
    width: 100,
    height: 100,
    marginTop: 36,
    alignSelf: "center",
  },
  title: {
    fontSize: 42,
    paddingTop: 48,
    marginHorizontal: 12,
    marginBottom: 8,
  },
  subTitle: {
    fontSize: 28,
    marginHorizontal: 12,
  },
  textInput: {
    marginHorizontal: 12,
    marginBottom: 8,
  },
  button: {
    backgroundColor: "#000",
    marginTop: 8,
    padding: 12,
    marginHorizontal: 12,
  },
  socialButton: {
    marginTop: 12,
    padding: 18,
    marginHorizontal: 12,
    borderRadius: 5,
  },
});

export default styles;
