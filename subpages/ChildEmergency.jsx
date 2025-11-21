import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useFonts, Poppins_400Regular, Poppins_700Bold } from "@expo-google-fonts/poppins";

const emergencies = [
  { date: "2025-10-14", description: "Polio", status: "Completed" ,hospital:"Mukamira Health Post"},
  { date: "2025-10-14", description: "BCG", status: "Completed" ,hospital:"Mukamira Health Post"},
  { date: "2025-10-14", description: "Measles", status: "Completed",hospital:"Mukamira Health Post" },
  { date: "2025-10-14", description: "BCG", status: "Completed" ,hospital:"Mukamira Health Post"},
];

export default function ChildEmergency() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
  });

  if (!fontsLoaded) return null;

  return (
    <View style={styles.contentWrapper}>
      {/* Record Emergency Button */}
      <TouchableOpacity style={styles.recordButton}>
        <Text style={[styles.recordButtonText, styles.fontBold]}>Record emergency</Text>
      </TouchableOpacity>

      {/* Emergency List */}
      {emergencies.map((emergency, index) => (
        <View key={index} style={styles.emergencyCard}>
          <View style={styles.emergencyLeft}>
            <Text style={[styles.emergencyDate, styles.fontRegular]}>{emergency.date}</Text>
            <Text style={[styles.emergencyDescription, styles.fontBold]}>{emergency.description}</Text>
            <Text style={[styles.emergencyDate, styles.fontRegular]}>{emergency.hospital}</Text>
          </View>
          <View style={styles.statusTag}>
            <Text style={[styles.statusText, styles.fontRegular]}>{emergency.status}</Text>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  contentWrapper: {
    paddingHorizontal: 20,
    paddingTop: 20,
    gap: 16,
  },
  recordButton: {
    backgroundColor: "#09111E",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 8,
  },
  recordButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  emergencyCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  emergencyLeft: {
    flex: 1,
  },
  emergencyDate: {
    fontSize: 13,
    color: "#373838ff",
    marginBottom: 6,
  },
  emergencyDescription: {
    fontSize: 15,
    color: "#09111E",
  },
  statusTag: {
    backgroundColor: "#09111E",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignSelf: "flex-start",
  },
  statusText: {
    color: "#fff",
    fontSize: 12,
  },
  fontRegular: {
    fontFamily: "Poppins_400Regular",
  },
  fontBold: {
    fontFamily: "Poppins_700Bold",
  },
});

