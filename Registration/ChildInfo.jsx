import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { useFonts, Poppins_400Regular, Poppins_700Bold } from "@expo-google-fonts/poppins";

export default function InfoChild({navigation}) {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
  });

  if (!fontsLoaded) return null;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header Section */}
      <View style={styles.headerSection}>
        <Text style={[styles.headerText, { fontFamily: "Poppins_700Bold" }]}>
          Register Child
        </Text>

        <View style={styles.headerContent}>
          {/* Progress bar */}
          <View style={styles.progressContainer}>
            <View style={styles.step} />
            <View style={styles.step} />
            <View style={styles.step} />
            <View style={[styles.step, styles.activeStep]} />
          </View>

          {/* Step text */}
          <Text style={[styles.stepText, { fontFamily: "Poppins_400Regular" }]}>
            Step 4 of 4
          </Text>

          {/* Card */}
          <View style={styles.card}>
            <Text style={[styles.cardText, { fontFamily: "Poppins_700Bold" }]}>
              Pregnancy Information
            </Text>
          </View>
        </View>
      </View>

      {/* Paragraph Box */}
      <View style={styles.paragraphBox}>
        <Text style={[styles.paragraphText, { fontFamily: "Poppins_400Regular" }]}>
          This application helps you register mothers and manage their records easily.
          By providing accurate personal information, you ensure that health workers
          can deliver better services. Please take a moment to confirm all details
          before submitting. The data collected is stored securely and used only
          for authorized purposes.
        </Text>
      </View>

      {/* Terms and Conditions */}
      <View style={styles.termsBox}>
        <Text style={[styles.termsText, { fontFamily: "Poppins_400Regular" }]}>
          By proceeding, you accept the{" "}
          <Text style={[styles.highlight, { fontFamily: "Poppins_700Bold" }]}>
            terms and conditions
          </Text>{" "}
          of this service.
        </Text>
      </View>

      {/* Continue Button */}
      <TouchableOpacity style={styles.button} onPress={() =>navigation.navigate("childProfile")}>
        <Text style={[styles.buttonText, { fontFamily: "Poppins_700Bold" }]}>
          Accept & Continue
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 30,
    paddingHorizontal: 25,
    backgroundColor: "#F8F8F8",
  },

  // ===== HEADER =====
  headerSection: {
    width: "100%",
    backgroundColor: "#0B0F2F",
    paddingTop: 60,
    paddingBottom: 35,
    alignItems: "center",
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    marginBottom: 30,
  },
  headerText: {
    fontSize: 22,
    color: "#FFFFFF",
    marginBottom: 18,
    alignSelf: "flex-start",
    marginLeft: 35,
  },
  headerContent: {
    width: 300,
    alignItems: "center",
  },
  progressContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    marginBottom: 8,
  },
  step: {
    flex: 1,
    height: 3,
    backgroundColor: "#CCCCCC",
    marginHorizontal: 3,
  },
  activeStep: {
    backgroundColor: "#1E40AF",
  },
  stepText: {
    color: "#FFFFFF",
    fontSize: 13,
    marginBottom: 15,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    width: "100%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 4,
  },
  cardText: {
    fontSize: 15,
    color: "#09111E",
  },

  // ===== PARAGRAPHS =====
  paragraphBox: {
    borderWidth: 1.5,
    borderColor: "#878888ff",
    borderRadius: 8, // no radius
    padding: 18,
    backgroundColor: "#FFFFFF",
    marginBottom: 25,
  },
  paragraphText: {
    fontSize: 14,
    color: "#09111E",
    lineHeight: 22,
    textAlign: "justify",
  },

  termsBox: {
    borderWidth: 1.3,
    borderColor: "#bcbcc0ff",
    borderRadius: 4, // no radius
    padding: 14,
    backgroundColor: "#F1F5FF",
    marginBottom: 30,
  },
  termsText: {
    fontSize: 13,
    color: "#020d2cff",
    textAlign: "center",
  },
  highlight: {
    fontWeight: "bold",
    textDecorationLine: "underline",
  },

  // ===== BUTTON =====
  button: {
    backgroundColor: "#09111E",
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: "center",
    width: "90%",
    alignSelf: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
});
