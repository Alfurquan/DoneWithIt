import React from "react";
import { useNetInfo } from "@react-native-community/netinfo";
import { View, StyleSheet } from "react-native";
import AppText from "./Text";
import colors from "../config/colors";
import Constants from "expo-constants";

function OfflineNotice(props) {
  const netInfo = useNetInfo();

  if (netInfo.type !== "unknown" && netInfo.isInternetReachable === false)
    return (
      <View style={styles.container}>
        <AppText>No Internet Connection</AppText>
      </View>
    );
  return null;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    height: 50,
    position: "absolute",
    top: Constants.statusBarHeight,
    zIndex: 1,
    width: "100%",
  },
});

export default OfflineNotice;
