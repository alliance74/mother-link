import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFonts, Poppins_400Regular, Poppins_700Bold } from "@expo-google-fonts/poppins";

const appointments = [
  { date: "2025-10-20", time: "09:00 AM", type: "Antenatal Visit 3", location: "Mukamira Health Center" },
  { date: "2025-11-15", time: "10:30 AM", type: "Antenatal Visit 4", location: "Mukamira Health Center" },
  { date: "2025-12-10", time: "11:00 AM", type: "Follow-up", location: "Mukamira Health Center" },
];

export default function ChildAppointments() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
  });

  if (!fontsLoaded) return null;

  return (
    <View style={styles.contentWrapper}>
      {/* Schedule Appointment Button */}
      <TouchableOpacity style={styles.scheduleButton}>
        <Text style={[styles.scheduleButtonText, styles.fontBold]}>Schedule appointment</Text>
      </TouchableOpacity>

      {/* Appointments List */}
      {appointments.map((appointment, index) => (
        <View key={index} style={styles.appointmentCard}>
          <View style={styles.appointmentLeft}>
            <View style={styles.dateContainer}>
              <Ionicons name="calendar-outline" size={20} color="#09111E" />
              <Text style={[styles.appointmentDate, styles.fontRegular]}>{appointment.date}</Text>
            </View>
            <Text style={[styles.appointmentType, styles.fontBold]}>{appointment.type}</Text>
            <View style={styles.timeLocationRow}>
              <Ionicons name="time-outline" size={14} color="#6B7280" />
              <Text style={[styles.appointmentTime, styles.fontRegular]}>{appointment.time}</Text>
              <Text style={[styles.separator, styles.fontRegular]}>•</Text>
              <Ionicons name="location-outline" size={14} color="#6B7280" />
              <Text style={[styles.appointmentLocation, styles.fontRegular]}>{appointment.location}</Text>
            </View>
          </View>
          <View style={styles.statusBadge}>
            <Text style={[styles.statusText, styles.fontRegular]}>Upcoming</Text>
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
  scheduleButton: {
    backgroundColor: "#09111E",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 8,
  },
  scheduleButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  appointmentCard: {
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
  appointmentLeft: {
    flex: 1,
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 8,
  },
  appointmentDate: {
    fontSize: 13,
    color: "#6B7280",
  },
  appointmentType: {
    fontSize: 15,
    color: "#09111E",
    marginBottom: 6,
  },
  timeLocationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  appointmentTime: {
    fontSize: 12,
    color: "#6B7280",
  },
  separator: {
    fontSize: 12,
    color: "#6B7280",
    marginHorizontal: 4,
  },
  appointmentLocation: {
    fontSize: 12,
    color: "#6B7280",
  },
  statusBadge: {
    backgroundColor: "#E5E7EB",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignSelf: "flex-start",
  },
  statusText: {
    color: "#09111E",
    fontSize: 12,
  },
  fontRegular: {
    fontFamily: "Poppins_400Regular",
  },
  fontBold: {
    fontFamily: "Poppins_700Bold",
  },
});

