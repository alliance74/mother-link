import React, { useState } from "react";
import { 
  View, Text, TextInput, StyleSheet, ScrollView, 
  TouchableOpacity, Image, Modal 
} from "react-native";
import { useFonts, Poppins_400Regular, Poppins_700Bold } from "@expo-google-fonts/poppins";
import { Ionicons, Feather } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { SafeAreaView } from "react-native-safe-area-context";

import BottomNav from "../components/navbar.jsx";
import HomeVisitForm from "../subpages/HomeVisitPage.jsx";
import VisitPage2 from "../subpages/VisitPage2.jsx";
import VisitPage3 from "../subpages/visitPage3.jsx";
import AddHouseDetails from "../subpages/addHousedetails.jsx";
import HouseDetailsStep2 from "../subpages/HouseDetails2.jsx";
import MotherCard from "../subpages/Upcoming.jsx";

const HomeScreen = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
  });

  const [visibleForm, setVisibleForm] = useState(null);

  if (!fontsLoaded) return null;

  const closeModal = () => setVisibleForm(null);

  return (
    <SafeAreaView style={styles.screen}>
      {/* Scrollable Content */}
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 90 }}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="menu" size={28} color="#fff" />
            <Text style={[styles.headerText, styles.fontRegular]}>Hi Nziza!</Text>
          </View>

          <View style={styles.notificationContainer}>
            <TouchableOpacity
                     onPress={() => navigation.navigate("notifications")}
                      >
                   <Image
                     source={require("../assets/images/notii.png")}
                     style={styles.notificationImage}
                    />
                                     </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("profile")}>
              <Image
                source={require("../assets/images/white.png")}
                style={styles.notificationImage}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Feather name="search" size={18} color="#777" style={{ marginRight: 6 }} />
          <TextInput
            placeholder="Search for anything"
            placeholderTextColor="#777"
            style={[styles.searchInput, styles.fontRegular]}
          />
        </View>

        {/* Week Calendar */}
        <View style={styles.calendar}>
          <Text style={[styles.calendarHeader, styles.fontBold]}>August 2024</Text>
          <View style={styles.daysRow}>
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri"].map((day, index) => (
              <View
                key={index}
                style={[
                  styles.dayBox,
                  day === "Wed" && styles.activeDayBox, // active day
                ]}
              >
                <Text
                  style={[
                    styles.dayText,
                    styles.fontRegular,
                    day === "Wed" && styles.activeDayText,
                  ]}
                >
                  {day}
                </Text>
                <Text
                  style={[
                    styles.dateText,
                    styles.fontBold,
                    day === "Wed" && styles.activeDateText,
                  ]}
                >
                  {6 + index}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Overview */}
        <Text style={[styles.sectionTitle, styles.fontBold]}>Overview</Text>
        <View style={styles.overviewContainer}>
          <View style={styles.overviewCard}>
            <Image source={require("../assets/images/Group1.png")} />
            <Text style={[styles.cardTitle, styles.fontBold]}>Total Houses</Text>
            <Text style={[styles.cardCount, styles.fontBold]}>120</Text>
          </View>
          <View style={styles.overviewCard}>
            <Image source={require("../assets/images/Group2.png")} />
            <Text style={[styles.cardTitle, styles.fontBold]}>Total Mothers</Text>
            <Text style={[styles.cardCount, styles.fontBold]}>534</Text>
          </View>
          <View style={styles.overviewCard}>
            <Image source={require("../assets/images/Group4.png")} />
            <Text style={[styles.cardTitle, styles.fontBold]}>Total Children</Text>
            <Text style={[styles.cardCount, styles.fontBold]}>620</Text>
          </View>
        </View>

        {/* Appointments */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, styles.fontBold]}>
            Today's Appointment
          </Text>
          <Text style={[styles.seeAll, styles.fontBold]}>See all</Text>
        </View>

        {[1, 2, 3].map((_, i) => (
          <View key={i} style={styles.appointmentCard}>
            <View>
              <Text style={[styles.appointmentName, styles.fontBold]}>
                Uwase Claudine
              </Text>
              <Text style={[styles.appointmentDetail, styles.fontRegular]}>
                Due: 12:00, Mbarara Sector
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

        {/* Quick Actions */}
        <Text style={[styles.sectionTitle, styles.fontBold]}>Quick Actions</Text>
        <View style={styles.actionsContainer}>
          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => setVisibleForm("home")}
          >
            <Image source={require("../assets/images/Vector1.png")} />
            <Text style={styles.actionText}>Start Home Visit</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => setVisibleForm("house")}
          >
            <Image source={require("../assets/images/house.png")} />
            <Text style={styles.actionText}>Add House Details</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => navigation.navigate("appointments")}
          >
            <Image source={require("../assets/images/Vector.png")} />
            <Text style={styles.actionText}>VHWID</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => navigation.navigate("analytics")}
          >
            <Image source={require("../assets/images/Group .png")} />
            <Text style={styles.actionText}>Reports</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
<Modal
  transparent
  animationType="fade"
  visible={!!visibleForm}
  onRequestClose={closeModal}
>
  <BlurView intensity={20} tint="light" style={styles.fullScreenBlur}>
    <TouchableOpacity
      activeOpacity={1}
      onPress={closeModal}
      style={styles.overlayTouchable}
    >
      <View style={styles.centerContent}>
        {visibleForm === "motherCard" && (
          <MotherCard />
        )}
        {visibleForm === "home" && (
          <HomeVisitForm
            onClose={closeModal}
            onNext={() => setVisibleForm("homeStep2")}
          />
        )}
        {visibleForm === "homeStep2" && (
          <VisitPage2
            onClose={closeModal}
            onBack={() => setVisibleForm("home")}
            onNext={() => setVisibleForm("homeStep3")}
          />
        )}
        {visibleForm === "homeStep3" && (
          <VisitPage3
            onClose={closeModal}
            onBack={() => setVisibleForm("homeStep2")}
            onFinish={closeModal}
          />
        )}
        {visibleForm === "house" && (
          <AddHouseDetails
            onClose={closeModal}
            onNext={() => setVisibleForm("houseStep2")}
          />
        )}
        {visibleForm === "houseStep2" && (
          <HouseDetailsStep2
            onClose={closeModal}
            onBack={() => setVisibleForm("house")}
            onFinish={closeModal}
          />
        )}
      </View>
    </TouchableOpacity>
  </BlurView>
</Modal>



      {/* Fixed Bottom Navigation */}
      <View style={styles.fixedBottom}>
        <BottomNav />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#fff" },
  container: { flex: 1, backgroundColor: "#fff", paddingHorizontal: 16 },
  fontRegular: { fontFamily: "Poppins_400Regular" },
  fontBold: { fontFamily: "Poppins_700Bold" },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#09111E",
    padding: 16,
    borderRadius: 12,
    marginTop: 20,
  },
  headerText: { color: "#fff", fontSize: 18, marginLeft: 8 },
  notificationContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  notificationImage: { width: 18, height: 18, resizeMode: "contain" },

  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f1f3f6",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginTop: 14,
  },
  searchInput: { flex: 1, height: 40, color: "#000" },

  calendar: {
    backgroundColor: "#f7f8fa",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 10,
    marginTop: 18,
  },
  calendarHeader: {
    fontSize: 16,
    color: "#09111E",
    marginBottom: 10,
    marginLeft: 10,
  },
  daysRow: { flexDirection: "row", justifyContent: "space-between" },
  dayBox: {
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    paddingVertical: 6,
    borderRadius: 10,
  },
  activeDayBox: { backgroundColor: "#09111E" },
  dayText: { color: "#777", fontSize: 14 },
  activeDayText: { color: "#fff" },
  dateText: { color: "#000", fontSize: 14, fontWeight: "600" },
  activeDateText: { color: "#fff" },

  sectionTitle: {
    fontSize: 16,
    marginTop: 22,
    marginBottom: 8,
    marginLeft: 10,
    color: "#09111E",
  },
  overviewContainer: { flexDirection: "row", justifyContent: "space-between" },
  overviewCard: {
    flex: 1,
    backgroundColor: "#f1f3f6",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    marginHorizontal: 4,
  },
  cardTitle: { fontSize: 12, color: "#333", marginTop: 6 },
  cardCount: { fontSize: 16, marginTop: 4, color: "#09111E" },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
  seeAll: { color: "#777", fontSize: 13 },

  appointmentCard: {
    backgroundColor: "#f7f8fa",
    borderRadius: 12,
    padding: 14,
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  appointmentName: { fontSize: 15, color: "#09111E" },
  appointmentDetail: { color: "#777", fontSize: 13, marginTop: 2 },
  addBtn: {
    backgroundColor: "#09111E",
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  addBtnText: { color: "#fff", fontSize: 13 },

  actionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 10,
    marginBottom: 20,
  },
  blurContent: {
  backgroundColor: "rgba(255,255,255,0.9)",
  borderRadius: 20,
  padding: 20,
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
  actionCard: {
    backgroundColor: "#f1f3f6",
    borderRadius: 14,
    width: "48%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
    marginTop: 12,
  },
  actionText: {
    fontSize: 13,
    color: "#09111E",
    textAlign: "center",
    marginTop: 8,
  },
  blurContainer: {
    flex: 1,
    width: "100%",
    height: "100%",
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
  fullScreenBlur: {
  flex: 1,
  width: "100%",
  height: "100%",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "rgba(255,255,255,0.3)", // light overlay tint
},

overlayTouchable: {
  flex: 1,
  width: "100%",
  height: "100%",
  justifyContent: "center",
  alignItems: "center",
},

centerContent: {
  backgroundColor: "white",
  borderRadius: 16,
  padding: 20,
  width: "90%",
  maxHeight: "85%",
  boxShadow: {
    color: "#000",
    opacity: 0.15,
    radius: 10,
    offset: { width: 0, height: 0 },
  },
  elevation: 10,
},

});

export default HomeScreen;
