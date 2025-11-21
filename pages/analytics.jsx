import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { LineChart } from "react-native-chart-kit";
import { Ionicons, Feather, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import BottomNav from "@/components/navbar";
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_700Bold } from "@expo-google-fonts/poppins";

const screenWidth = Dimensions.get("window").width;

const AnalyticsScreen = ({ navigation }) => {
  const [selectedPeriod, setSelectedPeriod] = useState("WEEK");

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  if (!fontsLoaded) return null;

  // Chart data with 3 lines matching the design
  const chartData = {
    labels: ["S", "M", "T", "W", "T", "F", "S"],
    datasets: [
      {
        data: [200, 220, 180, 250, 200, 180, 200],
        color: (opacity = 1) => `rgba(79, 70, 229, ${opacity})`, // Dark blue/purple
        strokeWidth: 3,
      },
      {
        data: [150, 170, 140, 160, 150, 130, 120],
        color: (opacity = 1) => `rgba(6, 182, 212, ${opacity})`, // Light blue
        strokeWidth: 3,
      },
      {
        data: [60, 80, 50, 90, 70, 40, 30],
        color: (opacity = 1) => `rgba(245, 158, 11, ${opacity})`, // Light red/orange
        strokeWidth: 3,
      },
    ],
    legend: [],
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation?.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="chevron-back" size={24} color="#09111E" />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { fontFamily: "Poppins_700Bold" }]}>
          Analytics
        </Text>
        <TouchableOpacity style={styles.editButton}>
          <Ionicons name="pencil" size={20} color="#09111E" />
        </TouchableOpacity>
      </View>

      <ScrollView 
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Period Selector */}
        <View style={styles.periodContainer}>
          {["DAY", "WEEK", "MONTH", "YEAR"].map((period) => (
            <TouchableOpacity
              key={period}
              onPress={() => setSelectedPeriod(period)}
              style={[
                styles.periodButton,
                selectedPeriod === period && styles.periodButtonActive,
              ]}
            >
              <Text
                style={[
                  styles.periodText,
                  selectedPeriod === period && styles.periodTextActive,
                  {
                    fontFamily:
                      selectedPeriod === period
                        ? "Poppins_700Bold"
                        : "Poppins_400Regular",
                  },
                ]}
              >
                {period}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Chart Section */}
        <Text style={[styles.sectionTitle, { fontFamily: "Poppins_700Bold" }]}>
          Antenatal appointments
        </Text>
        <View style={styles.chartCard}>
          <LineChart
            data={chartData}
            width={screenWidth - 48}
            height={280}
            chartConfig={{
              backgroundColor: "#ffffff",
              backgroundGradientFrom: "#ffffff",
              backgroundGradientTo: "#ffffff",
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(107, 114, 128, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(107, 114, 128, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: "5",
                strokeWidth: "2",
                stroke: "#fff",
              },
              propsForBackgroundLines: {
                strokeDasharray: "",
                stroke: "#E5E7EB",
                strokeWidth: 1,
              },
            }}
            bezier
            withInnerLines={true}
            withOuterLines={false}
            withVerticalLabels={true}
            withHorizontalLabels={true}
            segments={6}
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
        </View>

        {/* Attendance Overview */}
        <Text style={[styles.sectionTitle, { fontFamily: "Poppins_700Bold" }]}>
          Attendance overview
        </Text>
        <View style={styles.attendanceCard}>
          <View style={styles.attendanceItem}>
            <Text
              style={[styles.attendanceValue, { fontFamily: "Poppins_700Bold" }]}
            >
              567
            </Text>
            <Text
              style={[
                styles.attendanceLabel,
                { fontFamily: "Poppins_400Regular" },
              ]}
            >
              Total mothers
            </Text>
          </View>
          <View style={styles.attendanceDivider} />
          <View style={styles.attendanceItem}>
            <Text
              style={[styles.attendanceValue, { fontFamily: "Poppins_700Bold" }]}
            >
              400
            </Text>
            <Text
              style={[
                styles.attendanceLabel,
                { fontFamily: "Poppins_400Regular" },
              ]}
            >
              Total children
            </Text>
          </View>
          <View style={styles.attendanceDivider} />
          <View style={styles.attendanceItem}>
            <Text
              style={[styles.attendanceValue, { fontFamily: "Poppins_700Bold" }]}
            >
              100
            </Text>
            <Text
              style={[
                styles.attendanceLabel,
                { fontFamily: "Poppins_400Regular" },
              ]}
            >
              ANC over time
            </Text>
          </View>
        </View>

        {/* Emergency Overview */}
        <Text style={[styles.sectionTitle, { fontFamily: "Poppins_700Bold" }]}>
          Emergency overview
        </Text>
        <View style={styles.emergencyGrid}>
          <View style={styles.emergencyCard}>
            <View style={[styles.emergencyIconWrapper, { backgroundColor: "#FEF3C7" }]}>
              <Ionicons name="warning" size={24} color="#F59E0B" />
            </View>
            <Text
              style={[styles.emergencyValue, { fontFamily: "Poppins_700Bold" }]}
            >
              58
            </Text>
            <Text
              style={[
                styles.emergencyLabel,
                { fontFamily: "Poppins_400Regular" },
              ]}
            >
              Total emergencies
            </Text>
          </View>

          <View style={styles.emergencyCard}>
            <View style={[styles.emergencyIconWrapper, { backgroundColor: "#DBEAFE" }]}>
              <Ionicons name="snow" size={24} color="#3B82F6" />
            </View>
            <Text
              style={[styles.emergencyValue, { fontFamily: "Poppins_700Bold" }]}
            >
              37%
            </Text>
            <Text
              style={[
                styles.emergencyLabel,
                { fontFamily: "Poppins_400Regular" },
              ]}
            >
              Labor pain
            </Text>
          </View>

          <View style={styles.emergencyCard}>
            <View style={[styles.emergencyIconWrapper, { backgroundColor: "#E0E7FF" }]}>
              <MaterialIcons name="local-hospital" size={24} color="#6366F1" />
            </View>
            <Text
              style={[styles.emergencyValue, { fontFamily: "Poppins_700Bold" }]}
            >
              20
            </Text>
            <Text
              style={[
                styles.emergencyLabel,
                { fontFamily: "Poppins_400Regular" },
              ]}
            >
              Child emergencies
            </Text>
          </View>

          <View style={styles.emergencyCard}>
            <View style={[styles.emergencyIconWrapper, { backgroundColor: "#CCFBF1" }]}>
              <Ionicons name="water" size={24} color="#14B8A6" />
            </View>
            <Text
              style={[styles.emergencyValue, { fontFamily: "Poppins_700Bold" }]}
            >
              40
            </Text>
            <Text
              style={[
                styles.emergencyLabel,
                { fontFamily: "Poppins_400Regular" },
              ]}
            >
              Other emergencies
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Fixed Bottom Navigation */}
      <View style={styles.fixedBottom}>
        <BottomNav />
      </View>
    </View>
  );
};

export default AnalyticsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 16,
    backgroundColor: "#fff",
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 20,
    color: "#09111E",
  },
  editButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  scroll: {
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  periodContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
    gap: 8,
  },
  periodButton: {
    flex: 1,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: "#F3F4F6",
    alignItems: "center",
  },
  periodButtonActive: {
    backgroundColor: "#09111E",
  },
  periodText: {
    fontSize: 13,
    color: "#6B7280",
  },
  periodTextActive: {
    color: "#fff",
  },
  sectionTitle: {
    fontSize: 16,
    color: "#09111E",
    marginBottom: 12,
    marginTop: 8,
  },
  chartCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 0,
    marginBottom: 24,
    boxShadow: {
      color: "#000",
      offset: { width: 0, height: 2 },
      opacity: 0.05,
      radius: 8,
    },
    elevation: 2,
  },
  attendanceCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    boxShadow: {
      color: "#000",
      offset: { width: 0, height: 2 },
      opacity: 0.05,
      radius: 8,
    },
    elevation: 2,
  },
  attendanceItem: {
    flex: 1,
    alignItems: "center",
  },
  attendanceDivider: {
    width: 1,
    backgroundColor: "#E5E7EB",
    marginHorizontal: 8,
  },
  attendanceValue: {
    fontSize: 28,
    color: "#09111E",
    marginBottom: 4,
  },
  attendanceLabel: {
    fontSize: 13,
    color: "#6B7280",
    textAlign: "center",
  },
  emergencyGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  emergencyCard: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    alignItems: "center",
    boxShadow: {
      color: "#000",
      offset: { width: 0, height: 2 },
      opacity: 0.05,
      radius: 8,
    },
    elevation: 2,
  },
  emergencyIconWrapper: {
    width: 56,
    height: 56,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  emergencyValue: {
    fontSize: 28,
    color: "#09111E",
    marginBottom: 6,
  },
  emergencyLabel: {
    fontSize: 13,
    color: "#6B7280",
    textAlign: "center",
  },
  fixedBottom: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    elevation: 10,
    boxShadow: {
      color: "#000",
      offset: { width: 0, height: -2 },
      opacity: 0.1,
      radius: 3,
    },
  },
});
