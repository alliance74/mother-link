import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFonts, Poppins_400Regular, Poppins_600SemiBold, Poppins_700Bold } from "@expo-google-fonts/poppins";
import BottomNav from "../components/navbar.jsx";
import AppointmentsContent from "../pages/appoint.jsx";
import ChildEmergency from "./ChildEmergency.jsx";

const tabs = ["Overview", "Appointments", "Emergencies"];

const personalInfo = [
  { label: "Names", value: "Carine Sanders" },
  { label: "Age", value: "27 years" },
  { label: "Phone number", value: "+250 7XXXXXXX" },
  { label: "Insurance", value: "RSSB" },
  { label: "Location", value: "Mukamira - Nyabihu" },
];

const pregnancyInfo = [
  { label: "Stage", value: "6 months" },
  { label: "EDD", value: "14-02-2026" },
  { label: "Health center", value: "Mukamira HC" },
  { label: "Last visit", value: "30-10-2025" },
  { label: "Risk level", value: "Medium" },
];

const timeline = [
  { label: "ANC 1", completed: true },
  { label: "ANC 2", completed: true },
  { label: "ANC 3", completed: true },
  { label: "ANC 4", completed: false },
];

const ChildProfileScreen = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });
  const [activeTab, setActiveTab] = useState("Overview");

  if (!fontsLoaded) return null;

  const renderInfoCard = (title, data) => (
    <View style={styles.infoCard}>
      <Text style={[styles.cardHeader, styles.fontBold]}>{title}</Text>
      <View style={styles.divider} />
      {data.map((item, index) => (
        <TouchableOpacity key={`${item.label}-${index}`} style={styles.infoRow} activeOpacity={0.8}>
          <View>
            <Text style={[styles.infoLabel, styles.fontRegular]}>{item.label}</Text>
            <Text style={[styles.infoValue, styles.fontBold]}>{item.value}</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color="#09111E" />
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.headerBackground} />

      {/* Fixed Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => {
            if (navigation && navigation.goBack) {
              navigation.goBack();
            }
          }}
        >
          <Ionicons name="chevron-back" size={24} color="#fff" />
        </TouchableOpacity>

        <View style={styles.profileContainer}>
          <Image source={require("../assets/images/mariza.png")} style={styles.avatar} />
          <View style={styles.profileDetails}>
            <Text style={[styles.profileName, styles.fontBold]}>Jane Doe</Text>
            <Text style={[styles.profileId, styles.fontRegular]}>ML-077</Text>
          </View>
        </View>

        <View style={styles.tabsContainer}>
          {tabs.map((tab) => {
            const active = tab === activeTab;
            return (
              <TouchableOpacity
                key={tab}
                style={[styles.tabButton, active && styles.activeTabButton]}
                onPress={() => setActiveTab(tab)}
              >
                <Text style={[styles.tabText, active ? styles.fontBold : styles.fontRegular, active && styles.activeTabText]}>
                  {tab}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* Scrollable Content */}
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {activeTab === "Overview" && (
          <View style={styles.contentWrapper}>
            {renderInfoCard("Personal information", personalInfo)}
            {renderInfoCard("Pregnancy information", pregnancyInfo)}

            <View style={styles.timelineCard}>
              <Text style={[styles.cardHeader, styles.fontBold]}>Care timeline</Text>
              <View style={styles.divider} />
              <View style={styles.timelineRow}>
                {timeline.map((item, index) => (
                  <View key={item.label} style={styles.timelineItem}>
                    <View
                      style={[
                        styles.timelineIcon,
                        item.completed ? styles.timelineIconCompleted : styles.timelineIconPending,
                      ]}
                    >
                      <Ionicons
                        name={item.completed ? "checkmark" : "ellipsis-horizontal"}
                        size={16}
                        color={item.completed ? "#fff" : "#09111E"}
                      />
                    </View>
                    <Text
                      style={[
                        styles.timelineLabel,
                        styles.fontRegular,
                        item.completed ? styles.timelineLabelCompleted : styles.timelineLabelPending,
                      ]}
                    >
                      {item.label}
                    </Text>
                    {index !== timeline.length - 1 && <View style={styles.timelineConnector} />}
                  </View>
                ))}
              </View>
            </View>
          </View>
        )}

        {activeTab === "Appointments" && <AppointmentsContent />}

        {activeTab === "Emergencies" && <ChildEmergency />}
      </ScrollView>

      <View style={styles.fixedBottom}>
        <BottomNav />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F7F8FA",
  },
  headerBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 200,
    backgroundColor: "#0c182bff",
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  scrollView: {
    flex: 1,
    marginTop: 200, // Adjust based on header height
  },
  scrollContent: {
    paddingBottom: 100,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.4)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginRight: 12,
  },
  profileDetails: {
    gap: 4,
  },
  profileName: {
    fontSize: 18,
    color: "#fff",
  },
  profileId: {
    fontSize: 13,
    color: "rgba(255,255,255,0.8)",
  },
  tabsContainer: {
    flexDirection: "row",
    backgroundColor: "rgba(255,255,255,0.12)",
    padding: 4,
    borderRadius: 999,
    alignSelf: "flex-start",
    gap: 8,
  },
  tabButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 999,
  },
  activeTabButton: {
    backgroundColor: "#fff",
  },
  tabText: {
    fontSize: 13,
    color: "#E5E7EB",
  },
  activeTabText: {
    color: "#09111E",
  },
  contentWrapper: {
    paddingHorizontal: 20,
    gap: 16,
    marginTop: 10,
  },
  infoCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    gap: 12,
    shadowColor: "#0E1A2A",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  cardHeader: {
    fontSize: 16,
    color: "#09111E",
  },
  divider: {
    height: 1,
    backgroundColor: "#EFF1F4",
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
  },
  infoLabel: {
    fontSize: 13,
    color: "#6B7280",
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 15,
    color: "#09111E",
  },
  timelineCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    shadowColor: "#0E1A2A",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  timelineRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
  },
  timelineItem: {
    flex: 1,
    alignItems: "center",
  },
  timelineIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  timelineIconCompleted: {
    backgroundColor: "#09111E",
  },
  timelineIconPending: {
    backgroundColor: "#E5E7EB",
  },
  timelineLabel: {
    fontSize: 12,
    marginTop: 6,
  },
  timelineLabelCompleted: {
    color: "#09111E",
  },
  timelineLabelPending: {
    color: "#9CA3AF",
  },
  timelineConnector: {
    position: "absolute",
    top: 22,
    right: -25,
    width: 50,
    height: 2,
    backgroundColor: "#E5E7EB",
    zIndex: -1,
  },
  fixedBottom: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    elevation: 12,
    shadowColor: "#0E1A2A",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  fontRegular: {
    fontFamily: "Poppins_400Regular",
  },
  fontBold: {
    fontFamily: "Poppins_700Bold",
  },
});

export default ChildProfileScreen;

