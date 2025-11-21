import React, { useState, useCallback, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFonts, Poppins_400Regular, Poppins_700Bold } from "@expo-google-fonts/poppins";
import { appointmentAPI } from "../services/api";

export default function AppointmentsContent() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
  });

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadAppointments = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await appointmentAPI.getUpcomingAppointments();
      setAppointments(res.data?.data || []);
    } catch (err) {
      const message = err.response?.data?.message || "Failed to load appointments";
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAppointments();
  }, [loadAppointments]);

  if (!fontsLoaded) return null;

  return (
    <View style={styles.contentWrapper}>
      {/* Schedule Appointment Button */}
      <TouchableOpacity style={styles.scheduleButton}>
        <Text style={[styles.scheduleButtonText, styles.fontBold]}>Schedule appointment</Text>
      </TouchableOpacity>

      {/* Loading / Error / Empty UI */}
      {loading && (
        <View style={styles.messageContainer}>
          <ActivityIndicator size="small" color="#09111E" />
          <Text style={[styles.loadingText, styles.fontRegular]}>Loading appointments...</Text>
        </View>
      )}
      {error && (
        <View style={styles.messageContainer}>
          <Text style={[styles.errorText, styles.fontRegular]}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={loadAppointments}>
            <Text style={[styles.retryButtonText, styles.fontBold]}>Retry</Text>
          </TouchableOpacity>
        </View>
      )}
      {!loading && !error && appointments.length === 0 && (
        <View style={styles.messageContainer}>
          <Text style={[styles.emptyText, styles.fontRegular]}>No appointments scheduled</Text>
        </View>
      )}

      {/* Appointments List */}
      {appointments.map((appointment, index) => (
        <View key={appointment.id || index} style={styles.appointmentCard}>
          <View style={styles.appointmentLeft}>
            <View style={styles.dateContainer}>
              <Ionicons name="calendar-outline" size={20} color="#09111E" />
              <Text style={[styles.appointmentDate, styles.fontRegular]}>
                {new Date(appointment.scheduledAt).toLocaleDateString()}
              </Text>
            </View>
            <Text style={[styles.appointmentType, styles.fontBold]}>
              {appointment.type || "Appointment"}
            </Text>
            <View style={styles.timeLocationRow}>
              <Ionicons name="time-outline" size={14} color="#6B7280" />
              <Text style={[styles.appointmentTime, styles.fontRegular]}>
                {new Date(appointment.scheduledAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </Text>
              <Text style={[styles.separator, styles.fontRegular]}>•</Text>
              <Ionicons name="location-outline" size={14} color="#6B7280" />
              <Text style={[styles.appointmentLocation, styles.fontRegular]}>
                {appointment.location || "No location"}
              </Text>
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
  messageContainer: {
    alignItems: "center",
    paddingVertical: 20,
  },
  loadingText: {
    color: "#777",
    fontSize: 14,
    marginTop: 8,
  },
  errorText: {
    color: "#D32F2F",
    fontSize: 14,
    marginBottom: 8,
  },
  retryButton: {
    backgroundColor: "#09111E",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  retryButtonText: {
    color: "#fff",
    fontSize: 13,
  },
  emptyText: {
    color: "#777",
    fontSize: 14,
  },
});

