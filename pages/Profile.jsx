import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";
import { useFonts, Poppins_400Regular, Poppins_700Bold } from "@expo-google-fonts/poppins";
import { Ionicons } from "@expo/vector-icons";
import BottomNav from "../components/navbar.jsx"; // assuming you already have this

const ProfileSettingsScreen = () => {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
  });

  if (!fontsLoaded) return null;

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Header Section */}
        <View style={styles.header}>
          <TouchableOpacity>
            <Ionicons name="menu" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { fontFamily: "Poppins_700Bold" }]}>
            Profile Settings
          </Text>
          <TouchableOpacity>
            <Ionicons name="pencil" size={22} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Curved Background + Profile Photo */}
        <View style={styles.profileSection}>
          <View style={styles.curvedBackground}></View>
          <View style={styles.profileImageContainer}>
            <Image
              source={require("../assets/images/mariza.png")
              }
              style={styles.profileImage}
            />
          </View>
          <Text style={[styles.profileLabel, { fontFamily: "Poppins_700Bold" }]}>
            PROFILE PHOTO
          </Text>
        </View>

        {/* Info Card */}
        <View style={styles.infoCard}>
          <View style={styles.infoItem}>
            <Text style={[styles.infoTitle, { fontFamily: "Poppins_700Bold" }]}>Names</Text>
            <Text style={[styles.infoText, { fontFamily: "Poppins_400Regular" }]}>
              Carrie Sanders
            </Text>
            <Ionicons name="chevron-forward" size={18} color="#000" style={styles.icon} />
          </View>

          <View style={styles.divider} />

          <View style={styles.infoItem}>
            <Text style={[styles.infoTitle, { fontFamily: "Poppins_700Bold" }]}>Email</Text>
            <Text style={[styles.infoText, { fontFamily: "Poppins_400Regular" }]}>
              carrie_sanders@gmail.com
            </Text>
            <Ionicons name="chevron-forward" size={18} color="#000" style={styles.icon} />
          </View>

          <View style={styles.divider} />

          <View style={styles.infoItem}>
            <Text style={[styles.infoTitle, { fontFamily: "Poppins_700Bold" }]}>Number of Phone</Text>
            <Text style={[styles.infoText, { fontFamily: "Poppins_400Regular" }]}>+250 7XXXXXXX</Text>
            <Ionicons name="chevron-forward" size={18} color="#000" style={styles.icon} />
          </View>

          <View style={styles.divider} />

          <View style={styles.infoItem}>
            <Text style={[styles.infoTitle, { fontFamily: "Poppins_700Bold" }]}>Location</Text>
            <Text style={[styles.infoText, { fontFamily: "Poppins_400Regular" }]}>
              Mukamira, Janja
            </Text>
            <Ionicons name="chevron-forward" size={18} color="#000" style={styles.icon} />
          </View>

          <View style={styles.divider} />

          <View style={styles.infoItem}>
            <Text style={[styles.infoTitle, { fontFamily: "Poppins_700Bold" }]}>Password</Text>
            <Text style={[styles.infoText, { fontFamily: "Poppins_400Regular" }]}>
              XXXXXXXXXX
            </Text>
            <Ionicons name="chevron-forward" size={18} color="#000" style={styles.icon} />
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <BottomNav />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    backgroundColor: "#0B1D3A",
    paddingHorizontal: 20,
    paddingVertical: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: {
    color: "#fff",
    fontSize: 18,
  },
  curvedBackground: {
    backgroundColor: "#0B1D3A",
    height: 80,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
  profileSection: {
    alignItems: "center",
    marginTop: -50,
  },
  profileImageContainer: {
    width: 110,
    height: 110,
    borderRadius: 55,
    overflow: "hidden",
    borderWidth: 3,
    borderColor: "#fff",
  },
  profileImage: {
    width: "100%",
    height: "100%",
  },
  profileLabel: {
    marginTop: 10,
    fontSize: 13,
    color: "#000",
  },
  infoCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginHorizontal: 20,
    marginTop: 20,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  infoItem: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    position: "relative",
  },
  infoTitle: {
    fontSize: 13,
    color: "#555",
  },
  infoText: {
    fontSize: 15,
    color: "#000",
    marginTop: 2,
  },
  icon: {
    position: "absolute",
    right: 20,
    top: "40%",
  },
  divider: {
    height: 1,
    backgroundColor: "#eee",
    marginHorizontal: 15,
  },
});

export default ProfileSettingsScreen;
