import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  TextInput,
  Modal,
} from "react-native";
import { useFonts, Poppins_400Regular, Poppins_700Bold } from "@expo-google-fonts/poppins";
import { Ionicons, Feather } from "@expo/vector-icons";
import BottomNav from "@/components/navbar";
import { BlurView } from "expo-blur";
import MotherCard from "@/subpages/Upcoming";

const NotificationsScreen = () => {
  const [activeTab, setActiveTab] = useState("All");

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
  });

   const [visibleForm, setVisibleForm] = useState(null);
    if (!fontsLoaded) return null;
    const closeModal = () => setVisibleForm(null);
 
  const tabs = ["All", "Missed", "Completed", "type", "date"];
  const notifications = [
    { name: "Uwase Claudine", detail: "Due: 12:00, Mbarara Sector", type: "All" },
    { name: "Mugisha Eric", detail: "Due: 10:30, Kigali Sector", type: "Missed" },
    { name: "Irakoze Ange", detail: "Due: 14:15, Gatsibo Sector", type: "Completed" },
    { name: "Iradukunda Alice", detail: "Due: 09:00, Nyamata Sector", type: "All" },
    { name: "Ndayambaje John", detail: "Due: 16:00, Kicukiro Sector", type: "Missed" },
     { name: "Iradukunda Alice", detail: "Due: 09:00, Nyamata Sector", type: "All" },
      { name: "Iradukunda Alice", detail: "Due: 09:00, Nyamata Sector", type: "All" },
      { name: "Mugisha Eric", detail: "Due: 10:30, Kigali Sector", type: "type" },
      { name: "Mugisha Eric", detail: "Due: 10:30, Kigali Sector", type: "date" },
      { name: "Mugisha Eric", detail: "Due: 10:30, Kigali Sector", type: "Missed" },
      { name: "Irakoze Ange", detail: "Due: 14:15, Gatsibo Sector", type: "date" },
      { name: "Irakoze Ange", detail: "Due: 14:15, Gatsibo Sector", type: "type" },
      { name: "Irakoze Ange", detail: "Due: 14:15, Gatsibo Sector", type: "type" },
  ];

  const filtered = activeTab === "All" ? notifications : notifications.filter(n => n.type === activeTab);

  return (
    <View style={styles.container}>
      {/* Title */}
     <View style={styles.searchContainer}>
        <Feather name="search" size={18} color="#777" style={{ marginRight: 6 }} />
        <TextInput
          placeholder="Search for anything"
          placeholderTextColor="#777"
          style={[styles.searchInput, styles.fontRegular]}
        />
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tabBtn,
              activeTab === tab && styles.activeTabBtn,
            ]}
            onPress={() => setActiveTab(tab)}
          >
            <Text
              style={[
                styles.tabText,{fontFamily:"Poppins_700Bold"},
                activeTab === tab && styles.activeTabText,
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Notification list */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {filtered.map((item, i) => (
          <View key={i} style={styles.appointmentCard}>
            <View style={{ flex: 1 }}>
              <Text style={[styles.appointmentName, styles.fontBold]}>
                {item.name}
              </Text>
              <Text style={[styles.appointmentDetail, styles.fontRegular]}>
                {item.detail}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.addBtn}
              onPress={() => setVisibleForm("motherCard")}
                      >
               <Text style={[styles.addBtnText, styles.fontRegular]}>ANC</Text>
               </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      <Modal transparent animationType="fade" visible={!!visibleForm} onRequestClose={closeModal}>
        <TouchableOpacity activeOpacity={1} style={styles.blurContainer} onPress={closeModal}>
          <BlurView intensity={70} tint="light" style={styles.fullBlurView}>
            <TouchableOpacity activeOpacity={1} onPress={() => {}} style={styles.cardContainer}>
              {visibleForm === "motherCard" && <MotherCard />}
            </TouchableOpacity>
          </BlurView>
        </TouchableOpacity>
      </Modal>
      
      

      <View style={styles.fixedBottom}>
            <BottomNav />
          </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FB",
    paddingHorizontal: 16,
    paddingTop: 50,
  },

  fixedBottom: {
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
  backgroundColor: "#fff",
  borderTopWidth: 1,
  borderTopColor: "#ddd",
  elevation: 10,
  boxShadow: {
    color: "#000",
    offset: { width: 0, height: -2 },
    opacity: 0.1,
    radius: 3,
  },
},
  fontBold: {
    fontFamily: "Poppins_700Bold",
  },
  fontRegular: {
    fontFamily: "Poppins_400Regular",
  },
  headerTitle: {
    fontSize: 24,
    color: "#09111E",
    marginBottom: 20,
    textAlign: "left",
  },
   tabs: {
    flexDirection: "row",
    justifyContent: "space-evenly", // distributes tabs evenly but keeps natural size
    alignItems: "center",
    width: "100%",
  },
  tabBtn: {
    paddingHorizontal: 13, // space around text
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
  },
  activeTabBtn: {
    backgroundColor: "#09111E",
  },
  tabText: {
    fontSize: 14,
    color: "#555",
  },
  activeTabText: {
    color: "#fff",
  },
  scrollContainer: {
    paddingBottom: 100,
  },
  appointmentCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#ddd6d6ff",
  },
  appointmentName: {
    fontSize: 16,
    color: "#000",
    marginBottom: 4,
  },
  appointmentDetail: {
    fontSize: 14,
    color: "#555",
  },
  addBtn: {
    backgroundColor: "#09111E",
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  addBtnText: {
    color: "#fff",
    fontSize: 14,
  },
  searchContainer: {
  flexDirection: "row",
  alignItems: "center",
  backgroundColor: "#fff",
  borderRadius: 12,
  paddingHorizontal: 12,
  paddingVertical: 8,
  borderWidth: 1.5,
  borderColor: "#E0E0E0",
  marginBottom: 16,
  boxShadow: {
    color: "#000",
    opacity: 0.05,
    offset: { width: 0, height: 2 },
    radius: 3,
  },
  elevation: 2,
},
searchInput: {
  flex: 1,
  fontSize: 14,
  color: "#000",
},
  blurContainer: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  fullBlurView: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  cardContainer: {
    justifyContent: "center",
    alignItems: "center",
  },

});

export default NotificationsScreen;
