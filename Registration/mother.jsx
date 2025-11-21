import React, { useState } from "react";
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

export default function RegisterMother({ navigation }) {
  const [fontsLoaded] = useFonts({ Poppins_400Regular, Poppins_700Bold });

  const [form, setForm] = useState({
    fullName: "",
    dateOfBirth: "",
    phoneNumber: "",
    nationalId: "",
    maritalStatus: "",
  });
  const [focusedField, setFocusedField] = useState(null);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    const { fullName, dateOfBirth, phoneNumber, nationalId, maritalStatus } = form;
    if (!fullName || !dateOfBirth || !phoneNumber || !nationalId || !maritalStatus) {
      Alert.alert("Incomplete", "Please fill in all personal details before continuing.");
      return;
    }
    navigation.navigate("register2", { motherData: form });
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
            <View style={[styles.step, styles.activeStep]} />
            <View style={styles.step} />
            <View style={styles.step} />
            <View style={styles.step} />
          </View>

          {/* Step text */}
          <Text style={[styles.stepText, {fontFamily: "Poppins_400Regular"}]}>Step 1 of 4</Text>

          {/* Card */}
          <View style={styles.card}>
            <Text
              style={[styles.cardText, { fontFamily: "Poppins_700Bold" }]}
            >
              Personal details
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
            Full name
          </Text>
          <TextInput
            value={form.fullName}
            onChangeText={(text) => handleChange("fullName", text)}
            style={[
              styles.input,
              { fontFamily: "Poppins_400Regular", fontWeight: "600" },
            ]}
            placeholder="Enter full name"
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
            Date of birth
          </Text>
          <TextInput
            value={form.dateOfBirth}
            onChangeText={(text) => handleChange("dateOfBirth", text)}
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
           Phone number
          </Text>
          <TextInput
            value={form.phoneNumber}
            onChangeText={(text) => handleChange("phoneNumber", text)}
            style={[
              styles.input,
              { fontFamily: "Poppins_400Regular", fontWeight: "600" },
            ]}
            placeholder="Enter phone number"
            keyboardType="phone-pad"
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
           National ID
          </Text>
          <TextInput
            value={form.nationalId}
            onChangeText={(text) => handleChange("nationalId", text)}
            style={[
              styles.input,
              { fontFamily: "Poppins_400Regular", fontWeight: "600" },
            ]}
            placeholder="Enter national ID"
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
            Marital status
          </Text>
          <TextInput
            value={form.maritalStatus}
            onChangeText={(text) => handleChange("maritalStatus", text)}
            style={[
              styles.input,
              { fontFamily: "Poppins_400Regular", fontWeight: "600" },
            ]}
            placeholder="e.g. Married"
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

const styles = StyleSheet.create({
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
    boxShadow: {
      color: "#000",
      offset: { width: 0, height: 3 },
      opacity: 0.15,
      radius: 3,
    },
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
