import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useFonts, Poppins_400Regular } from '@expo-google-fonts/poppins';

export default function LandingScreen({ navigation }) {
  const [fontsLoaded] = useFonts({ Poppins_400Regular });

  return (
    <View style={styles.container}>
      <View style={[styles.circle, styles.circleTopRight]} />
      <View style={[styles.rectangle, styles.rectangleBottomLeft]} />

      <View style={styles.centerContent}>
        <Image
          source={require("../assets/images/logo.png")}
          style={styles.logo}
        />
        <Text style={styles.title}>MotherLink</Text>

        {/* Forgot Password Button */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("signup1")} // navigate to LoginScreen
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EDEDED",
    justifyContent: "center",
    alignItems: "center",
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
    alignItems: "center",
  },
  logo: {
    width: 60,
    height: 60,
    marginBottom: 10,
    resizeMode: "contain",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#09111E",
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});
