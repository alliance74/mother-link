import React, { useState, useCallback, useEffect } from "react";
import { useFonts, Poppins_400Regular, Poppins_700Bold } from '@expo-google-fonts/poppins';
import BottomNav from "../components/navbar.jsx";
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Image, Modal, RefreshControl, ActivityIndicator, Alert } from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import MotherCard from "@/subpages/Upcoming.jsx";
import { appointmentAPI } from "../services/api";

export default function Appointments({navigation}){
    const [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_700Bold,
      });
    
      const [visibleForm, setVisibleForm] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  const closeModal = () => setVisibleForm(null);

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

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadAppointments();
    setRefreshing(false);
  }, [loadAppointments]);

  if (!fontsLoaded) return null;
      return (
        <View style={styles.screen}>
          {/* Scrollable content */}
          <ScrollView 
          style={styles.container} 
          showsVerticalScrollIndicator={false} 
          contentContainerStyle={{paddingBottom:90}}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} tintColor="#09111E" />
          }
        >
            {/* Header */}
            <View style={styles.header}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Ionicons name="menu" size={28} color="#fff" />
                <Text style={[styles.headerText, styles.fontRegular]}>Appointments</Text>
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
                          <TouchableOpacity
                           onPress={() => navigation.navigate("profile")}
                           >
                         <Image
                            source={require("../assets/images/white.png")}
                              style={styles.notificationImage}
                          />
                         </TouchableOpacity>
                        </View>
            </View>

            {/* Error / Loading UI */}
            {error && (
              <View style={styles.messageContainer}>
                <Text style={[styles.errorText, styles.fontRegular]}>{error}</Text>
                <TouchableOpacity style={styles.retryButton} onPress={loadAppointments}>
                  <Text style={[styles.retryButtonText, styles.fontBold]}>Retry</Text>
                </TouchableOpacity>
              </View>
            )}
            {loading && !refreshing && (
              <View style={styles.messageContainer}>
                <ActivityIndicator size="small" color="#09111E" />
                <Text style={[styles.loadingText, styles.fontRegular]}>Loading appointments...</Text>
              </View>
            )}
      
            {/* Search Bar */}
            <View style={styles.searchContainer}>
              <Feather name="search" size={18} color="#777" style={{ marginRight: 6 }} />
              <TextInput
                placeholder="Search for anything"
                placeholderTextColor="#777"
                style={[styles.searchInput, styles.fontRegular]}
              />
            </View>
      
            
            {/* Overview */}
            <Text style={[styles.sectionTitle, styles.fontBold]}>Overview</Text>
            <View style={styles.overviewContainer}>
              <View style={styles.overviewCard}>
                <Image source={require("../assets/images/camm.png")} />
                <Text style={[styles.cardTitle, styles.fontBold]}>UpComing</Text>
                <Text style={[styles.cardCount, styles.fontBold]}>50</Text>
              </View>
              <View style={styles.overviewCard}>
                <Image source={require("../assets/images/dash.png")} />
                <Text style={[styles.cardTitle, styles.fontBold]}>Missed</Text>
                <Text style={[styles.cardCount, styles.fontBold]}>120</Text>
              </View>
              <View style={styles.overviewCard}>
                <Image source={require("../assets/images/Tick.png")} />
                <Text style={[styles.cardTitle, styles.fontBold]}>Completed</Text>
                <Text style={[styles.cardCount, styles.fontBold]}>8</Text>
              </View>
            </View>
      
            {/* Appointments */}
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, styles.fontBold]}>Today's Appointment</Text>
              <Text style={[styles.seeAll, styles.fontBold]} onPress={() =>navigation.navigate("notifications")}>See all</Text>
            </View>
      
            {!loading && !error && appointments.length === 0 ? (
              <View style={styles.emptyContainer}>
                <Text style={[styles.emptyText, styles.fontRegular]}>No appointments scheduled</Text>
              </View>
            ) : (
              appointments.map((appt, i) => (
                <View key={appt.id || i} style={styles.appointmentCard}>
                  <View>
                    <Text style={[styles.appointmentName, styles.fontBold]}>
                      {appt.motherName || "Appointment"}
                    </Text>
                    <Text style={[styles.appointmentDetail, styles.fontRegular]}>
                      Due: {new Date(appt.scheduledAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}, {appt.location || "No location"}
                    </Text>
                  </View>
                  <TouchableOpacity style={styles.addBtn} onPress={() => setVisibleForm("motherCard")}>
                    <Text style={[styles.addBtnText, styles.fontRegular]}>ANC</Text>
                  </TouchableOpacity>
                </View>
              ))
            )}
      
                        
          </ScrollView>

           <Modal transparent animationType="fade" visible={!!visibleForm} onRequestClose={closeModal}>
                  <TouchableOpacity activeOpacity={1} style={styles.blurContainer} onPress={closeModal}>
                    <BlurView intensity={20} tint="light" style={styles.fullBlurView}>
                      <TouchableOpacity activeOpacity={1} onPress={() => {}} style={styles.cardContainer}>
                        {visibleForm === "motherCard" && <MotherCard />}
                      </TouchableOpacity>
                    </BlurView>
                  </TouchableOpacity>
                </Modal>
                
      
          {/* Fixed Bottom Navigation */}
          <View style={styles.fixedBottom}>
            <BottomNav />
          </View>
        </View>
      );
      
      };
      
      const styles = StyleSheet.create({
        container: { flex: 1, backgroundColor: "#fff", paddingHorizontal: 16,marginBottom:10 },
        screen: {
        flex: 1,
        backgroundColor: "#fff",
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

      notificationContainer: {
    position: "relative",
    flexDirection:"row",
    gap:8,
    alignItems:"center"


  },
  notificationDot: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#FF0000",
  },
      
    card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    borderWidth:1,
    borderColor:"#e7e2e2ff",
    marginVertical: 8,
    boxShadow: {
      color: "#000",
      opacity: 0.1,
      offset: { width: 0, height: 2 },
      radius: 4,
    },
    elevation: 3,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 8,
  },
  icon: {
    width: 24,
    height: 24,
  },
  title: {
    fontFamily: "Poppins_700Bold",
    fontSize: 16,
    color: "#09111E",
    textAlign: "left",
  },
  cardBody: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  info: {
    fontFamily: "Poppins_400Regular",
    fontSize: 14,
    color: "#555",
    textAlign: "left",
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#555",
  },
  rightIcon: {
    width: 20,
    height: 20,
    position: "absolute",
    top: 12,
    right: 12,
  },
      
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
        marginLeft:10,
        textAlign: "left", // <-- makes it aligned neatly like a title
      },
      
      daysRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        height:"60px",
      },
      
      dayBox: {
        alignItems: "center",
        justifyContent: "center",
        width: 50,
        paddingVertical: 6,
        borderRadius: 10,
        gap:6,
      },
      
      activeDayBox: {
        backgroundColor: "#09111E",
      },
      
      dayText: { color: "#777", fontSize: 14 },
      activeDayText: { color: "#fff" },
      dateText: { color: "#000", fontSize: 14, fontWeight: "600" },
      activeDateText: { color: "#fff" },
      
        sectionTitle: {
          fontSize: 16,
          marginTop: 22,
          marginBottom: 8,
          marginLeft:10,
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
  messageContainer: {
    alignItems: "center",
    paddingVertical: 20,
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
  loadingText: {
    color: "#777",
    fontSize: 14,
    marginTop: 8,
  },
  emptyContainer: {
    alignItems: "center",
    paddingVertical: 30,
  },
  emptyText: {
    color: "#777",
    fontSize: 14,
  },
      });
      