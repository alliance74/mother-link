import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import { useFonts, Poppins_400Regular, Poppins_600SemiBold, Poppins_700Bold } from "@expo-google-fonts/poppins";
import { useNavigation } from "expo-router";

export default function MotherCard() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });
const navigation = useNavigation();
  if (!fontsLoaded) return null;

  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.name}>Uwimana Claudine</Text>
          <Text style={styles.ml}>ML- 002345</Text>
        </View>
        <View style={styles.statusContainer}>
          <Text style={styles.status}>Upcoming</Text>
        </View>
      </View>

      {/* Details */}
      <View style={styles.detailRow}>
        <FontAwesome5 name="stethoscope" size={16} color="#000" />
        <Text style={styles.detailText}>Antenatal Visit 3</Text>
      </View>

      <View style={styles.detailRow}>
        <Ionicons name="time-outline" size={16} color="#000" />
        <Text style={styles.detailText}>20 Oct 2025, 09:00 AM</Text>
      </View>

      <View style={styles.detailRow}>
        <Ionicons name="location-outline" size={16} color="#000" />
        <Text style={styles.detailText}>Mukamira Health Center</Text>
      </View>

      <View style={styles.detailRow}>
        <MaterialIcons name="pregnant-woman" size={16} color="#000" />
        <Text style={styles.detailText}>6 months pregnant</Text>
      </View>

      <View style={styles.detailRow}>
        <Ionicons name="call-outline" size={16} color="#000" />
        <Text style={styles.detailText}>+250 79XXXXXXXX</Text>
      </View>

      {/* Button */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText} onPress={()=>navigation.navigate("profile")}>Contact mother</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 16, // more padding for spacing
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    width: 300, // slightly wider
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12, // more space under header
  },
  name: {
    fontFamily: "Poppins_700Bold",
    fontSize: 16,
    marginBottom: 2,
  },
  ml: {
    fontFamily: "Poppins_400Regular",
    fontSize: 12,
    color: "#555",
  },
  statusContainer: {
    backgroundColor: "#09111E",
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
    alignItems:"center",
    justifyContent:"center",
  },
  status: {
    color: "#fff",
    fontFamily: "Poppins_600SemiBold",
    fontSize: 12,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5, // more spacing between rows
    gap: 8,
  },
  detailText: {
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    color: "#000",
  },
  button: {
    backgroundColor: "#09111E",
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 16, // more space before button
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontFamily: "Poppins_600SemiBold",
    fontSize: 14,
  },
});
