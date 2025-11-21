import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

export default function RegisterChild({ navigation }) {
  const [fontsLoaded] = useFonts({ Poppins_400Regular, Poppins_700Bold });

  const [healthCenter, setHealthCenter] = useState("");
  const [healthInsurance, setHealthInsurance] = useState("");
  const [bcgChecked, setBcgChecked] = useState([true, true, true, true]);

  if (!fontsLoaded) return null;

  const toggleBcg = (index) => {
    const newChecked = [...bcgChecked];
    newChecked[index] = !newChecked[index];
    setBcgChecked(newChecked);
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#f8f8f8" }}
      contentContainerStyle={styles.scrollContainer}
      showsVerticalScrollIndicator={false}
    >
      {/* Header section */}
      <View style={styles.headerSection}>
        <Text style={[styles.headerText, { fontFamily: "Poppins_700Bold" }]}>
          Register child
        </Text>

        {/* Small centered header content */}
        <View style={styles.headerContent}>
          {/* Progress bar */}
          <View style={styles.progressContainer}>
            <View style={[styles.step, ]} />
            <View style={styles.step} />
            <View style={[styles.step,styles.activeStep]} />
            <View style={styles.step} />
          </View>

          {/* Step text */}
          <Text style={[styles.stepText, { fontFamily: "Poppins_400Regular" }]}>
            Step 3 of 4
          </Text>
        </View>
      </View>

      {/* === Form Fields === */}
      <View style={styles.formSection}>
        {/* Health Center Button */}
        <TouchableOpacity style={styles.healthCenterButton}>
          <Text
            style={[
              styles.healthCenterButtonText,
              { fontFamily: "Poppins_700Bold" },
            ]}
          >
            Health center
          </Text>
        </TouchableOpacity>

        {/* Health Center Input */}
        <View style={styles.fieldset}>
          <Text
            style={[
              styles.legend,
              { fontFamily: "Poppins_400Regular", fontWeight: "600" },
            ]}
          >
            Health center
          </Text>
          <TextInput
            value={healthCenter}
            onChangeText={setHealthCenter}
            style={[
              styles.input,
              { fontFamily: "Poppins_400Regular", fontWeight: "600" },
            ]}
            placeholder="Enter your full names"
            placeholderTextColor="#09111E"
            underlineColorAndroid="transparent"
            selectionColor="#09111E"
          />
        </View>

        {/* Health Insurance Input */}
        <View style={styles.fieldset}>
          <Text
            style={[
              styles.legend,
              { fontFamily: "Poppins_400Regular", fontWeight: "600" },
            ]}
          >
            Health insurance
          </Text>
          <TextInput
            value={healthInsurance}
            onChangeText={setHealthInsurance}
            style={[
              styles.input,
              { fontFamily: "Poppins_400Regular", fontWeight: "600" },
            ]}
            placeholder="select relationship"
            placeholderTextColor="#09111E"
            underlineColorAndroid="transparent"
            selectionColor="#09111E"
          />
        </View>

        {/* Vaccination Status Section */}
        <Text
          style={[
            styles.vaccinationTitle,
            { fontFamily: "Poppins_700Bold" },
          ]}
        >
          Vaccination status
        </Text>

        <View style={styles.vaccinationBox}>
          {[0, 1, 2, 3].map((index) => (
            <TouchableOpacity
              key={index}
              style={styles.checkboxRow}
              onPress={() => toggleBcg(index)}
            >
              <View
                style={[
                  styles.checkbox,
                  bcgChecked[index] && styles.checkboxChecked,
                ]}
              >
                {bcgChecked[index] && (
                  <Ionicons name="checkmark" size={16} color="#1E40AF" />
                )}
              </View>
              <Text
                style={[
                  styles.checkboxLabel,
                  { fontFamily: "Poppins_400Regular" },
                ]}
              >
                BCG
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Navigation Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.previousButton}
            onPress={() => {
              if (navigation && navigation.goBack) {
                navigation.goBack();
              }
            }}
          >
            <Text
              style={[
                styles.previousButtonText,
                { fontFamily: "Poppins_400Regular" },
              ]}
            >
              Previous
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.nextButton}
            onPress={() => navigation.navigate("InfoChild")}
          >
            <Text
              style={[
                styles.nextButtonText,
                { fontFamily: "Poppins_400Regular" },
              ]}
            >
              Next
            </Text>
            <Ionicons name="chevron-forward" size={18} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    alignItems: "center",
    paddingBottom: 40,
  },
  headerSection: {
    width: "87%",
    backgroundColor: "#0B0F2F",
    paddingTop: 60,
    paddingBottom: 35,
    alignItems: "center",
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  headerText: {
    fontSize: 20,
    color: "white",
    marginBottom: 15,
    alignSelf: "flex-start",
    marginLeft: 35,
  },
  headerContent: {
    width: 330,
    alignItems: "center",
  },
  progressContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    marginBottom: 8,
  },
  step: {
    flex: 1,
    height: 3,
    backgroundColor: "#ccc",
    marginHorizontal: 3,
    borderRadius: 3,
  },
  activeStep: {
    backgroundColor: "#1E40AF",
  },
  stepText: {
    color: "#fff",
    fontSize: 13,
    marginBottom: 15,
  },
  formSection: {
    alignItems: "center",
    marginTop: 25,
    width: "90%",
    paddingHorizontal: 20,
  },
  healthCenterButton: {
    width: 330,
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 20,
    alignItems: "center",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  healthCenterButtonText: {
    fontSize: 16,
    color: "#09111E",
  },
  fieldset: {
    width: 330,
    borderWidth: 1.5,
    borderColor: "#000",
    borderRadius: 8,
    position: "relative",
    paddingTop: 10,
    marginVertical: 17,
    backgroundColor: "#fff",
  },
  legend: {
    position: "absolute",
    top: -10,
    left: 15,
    backgroundColor: "#f8f8f8",
    paddingHorizontal: 6,
    fontSize: 14,
    color: "#09111E",
  },
  input: {
    padding: 12,
    fontSize: 12,
    color: "#09111E",
  },
  vaccinationTitle: {
    fontSize: 15,
    color: "#09111E",
    marginTop: 10,
    marginBottom: 12,
    alignSelf: "flex-start",
    marginLeft: 10,
  },
  vaccinationBox: {
    width:330,
    backgroundColor: "#fff",
    borderWidth: 1.5,
    borderColor: "#000",
    borderRadius: 8,
    padding: 16,
    marginBottom: 10,
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: "#1E40AF",
    borderRadius: 4,
    marginRight: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxChecked: {
    backgroundColor: "#E0E7FF",
  },
  checkboxLabel: {
    fontSize: 14,
    color: "#09111E",
  },
  buttonContainer: {
    flexDirection: "row",
    width: 330,
    justifyContent: "space-between",
    marginTop: 20,
    gap: 12,
  },
  previousButton: {
    flex: 1,
    backgroundColor: "#fff",
    borderWidth: 1.5,
    borderColor: "#000",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  previousButtonText: {
    color: "#09111E",
    fontSize: 16,
  },
  nextButton: {
    flex: 1,
    backgroundColor: "#0B0F2F",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    gap: 6,
  },
  nextButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});
