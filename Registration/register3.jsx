import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import { Ionicons } from "@expo/vector-icons";

export default function RegisterMother3({ navigation, route }) {
  const [fontsLoaded] = useFonts({ Poppins_400Regular, Poppins_700Bold });

  const [form, setForm] = useState({
    pregnancyStage: "",
    expectedDeliveryDate: "",
    healthCenter: "",
    status: "",
    notes: "",
  });
  const [focusedField, setFocusedField] = useState(null);
  const motherData = route?.params?.motherData;

  useEffect(() => {
    if (!motherData) {
      navigation.replace("register1");
    }
  }, [motherData, navigation]);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    const { status, healthCenter } = form;
    if (!status || !healthCenter) {
      Alert.alert("Incomplete", "Please provide at least status and health center.");
      return;
    }
    navigation.navigate("info", {
      motherData: {
        ...motherData,
        ...form,
      },
    });
  };

  if (!fontsLoaded) return null;

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#f8f8f8" }}
      contentContainerStyle={styles.scrollContainer}
      showsVerticalScrollIndicator={false}
    >
      {/* Header section */}
      <View style={styles.headerSection}>
        <Text style={[styles.headerText, { fontFamily: "Poppins_700Bold" }]}>
          Register mother
        </Text>

        {/* Small centered header content */}
        <View style={styles.headerContent}>
          {/* Progress bar */}
          <View style={styles.progressContainer}>
            <View style={styles.step} />
            <View style={styles.step} />
            <View style={[styles.step, styles.activeStep]} />
            <View style={styles.step} />
          </View>

          {/* Step text */}
          <Text style={[styles.stepText, {fontFamily: "Poppins_400Regular"}]}>Step 3 of 4</Text>

          {/* Card */}
          <View style={styles.card}>
            <Text
              style={[styles.cardText, { fontFamily: "Poppins_700Bold" }]}
            >
             Pregnancy Information
            </Text>
          </View>
        </View>
      </View>

      {/* === Form Fields === */}
      <View style={styles.formSection}>
        {/* Email Fieldset */}
        <View style={styles.fieldset}>
          <Text
            style={[
              styles.legend,
              { fontFamily: "Poppins_400Regular", fontWeight: "600" },
            ]}
          >
            Pregnancy stage
          </Text>
          <TextInput
            value={form.pregnancyStage}
            onChangeText={(text) => handleChange("pregnancyStage", text)}
            style={[
              styles.input,
              { fontFamily: "Poppins_400Regular", fontWeight: "600" },
            ]}
            placeholder="e.g. Trimester 2"
            placeholderTextColor="#09111E"
            underlineColorAndroid="transparent"
            selectionColor="#09111E"
            onFocus={() => setFocusedField("email")}
            onBlur={() => setFocusedField(null)}
          />
        </View>

        {/* Password Fieldset */}
        <View style={styles.fieldset}>
          <Text
            style={[
              styles.legend,
              { fontFamily: "Poppins_400Regular", fontWeight: "600" },
            ]}
          >
            Expected delivery date
          </Text>
          <TextInput
            value={form.expectedDeliveryDate}
            onChangeText={(text) => handleChange("expectedDeliveryDate", text)}
            style={[
              styles.input,
              { fontFamily: "Poppins_400Regular", fontWeight: "600" },
            ]}
            placeholder="YYYY-MM-DD"
            keyboardType="numbers-and-punctuation"
            placeholderTextColor="#09111E"
            underlineColorAndroid="transparent"
            selectionColor="#09111E"
            onFocus={() => setFocusedField("password")}
            onBlur={() => setFocusedField(null)}
          />
        </View>

        {/* Confirm Password Fieldset */}
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
            value={form.healthCenter}
            onChangeText={(text) => handleChange("healthCenter", text)}
            style={[
              styles.input,
              { fontFamily: "Poppins_400Regular", fontWeight: "600" },
            ]}
            placeholder="Enter health facility"
            placeholderTextColor="#09111E"
            underlineColorAndroid="transparent"
            selectionColor="#09111E"
            onFocus={() => setFocusedField("confirm")}
            onBlur={() => setFocusedField(null)}
          />
        </View>
        <View style={styles.fieldset}>
          <Text
            style={[
              styles.legend,
              { fontFamily: "Poppins_400Regular", fontWeight: "600" },
            ]}
          >
           Status
          </Text>
          <TextInput
            value={form.status}
            onChangeText={(text) => handleChange("status", text)}
            style={[
              styles.input,
              { fontFamily: "Poppins_400Regular", fontWeight: "600" },
            ]}
            placeholder="e.g. Active"
            placeholderTextColor="#09111E"
            underlineColorAndroid="transparent"
            selectionColor="#09111E"
            onFocus={() => setFocusedField("confirm")}
            onBlur={() => setFocusedField(null)}
          />
        </View>
        <View style={styles.fieldset}>
          <Text
            style={[
              styles.legend,
              { fontFamily: "Poppins_400Regular", fontWeight: "600" },
            ]}
          >
            Notes
          </Text>
          <TextInput
            value={form.notes}
            onChangeText={(text) => handleChange("notes", text)}
            style={[
              styles.input,
              { fontFamily: "Poppins_400Regular", fontWeight: "600" },
              { minHeight: 80, textAlignVertical: "top" },
            ]}
            multiline
            placeholder="Additional remarks"
            placeholderTextColor="#09111E"
            underlineColorAndroid="transparent"
            selectionColor="#09111E"
            onFocus={() => setFocusedField("confirm")}
            onBlur={() => setFocusedField(null)}
          />
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
            onPress={handleNext}
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

export const styles = StyleSheet.create({
  scrollContainer: {
    alignItems: "center",
    paddingBottom: 40,
  },
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#f8f8f8",
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
    width: 300,
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
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    width: "100%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 4,
  },
  cardText: {
    fontSize: 15,
    color: "#000",
  },
  formSection: {
    alignItems: "center",
    marginTop: 25,
  },
  fieldset: {
    width: 330,
    borderWidth: 1.5,
    borderColor: "#000",
    borderRadius: 8,
    position: "relative",
    paddingTop: 10,
    marginVertical: 17,
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
  signupText: {
    fontSize: 14,
    color: "#09111E",
    marginTop: 15,
  },
  loginLink: {
    color: "#063392",
    fontWeight: "bold",
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
