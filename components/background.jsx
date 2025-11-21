import React from "react";
import { View, StyleSheet } from "react-native";

export default function BackgroundLayout({ children }) {
  return (
    <View style={styles.container}>
      <View style={[styles.circle, styles.circleTopRight]} />
      <View style={[styles.rectangle, styles.rectangleBottomLeft]} />

      {/* Children will be the login form */}
      <View style={styles.centerContent}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EDEDED",
  },
  circle: {
    position: "absolute",
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#09111E",
    opacity: 1,
  },
  circleTopRight: {
    top: 60,
    right: -40,
  },
  rectangle: {
    position: "absolute",
    width: 100,
    height: 100,
    backgroundColor: "#09111E",
    opacity: 1,
    transform: [{ rotate: "-25deg" }],
  },
  rectangleBottomLeft: {
    bottom: 60,
    left: -40,
  },
  centerContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
