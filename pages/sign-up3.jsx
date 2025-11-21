import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useFonts, Poppins_400Regular,Poppins_700Bold } from "@expo-google-fonts/poppins";
import { authAPI } from "../services/api";

export default function Signup3screen({ navigation, route }) {
  const [fontsLoaded] = useFonts({ Poppins_400Regular,Poppins_700Bold });

  // CHW Registration data according to MotherLink2 API
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("");
  const [village, setVillage] = useState("");
  const [sector, setSector] = useState("");
  const [district, setDistrict] = useState("");
  const [cell, setCell] = useState("");
  const [nationalId, setNationalId] = useState("");
  const [chwId, setChwId] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const accountData = route?.params?.accountData;
  const profileData = route?.params?.profileData;

  useEffect(() => {
    if (!accountData || !profileData) {
      navigation.replace("signup1");
    } else {
      setFullName(profileData.fullName || "");
      setPhoneNumber(profileData.phoneNumber || "");
      setGender(profileData.gender || "");
      setNationalId(profileData.nationalId || "");
      setChwId(profileData.chwId || "");
      setEmail(accountData.email || "");
      setPassword(accountData.password || "");
    }
  }, [accountData, profileData, navigation]);

  const handleRegistration = async () => {
    // Basic validation for the fields that are actually filled on this screen
    if (!accountData || !profileData) {
      Alert.alert("Error", "Registration data missing. Please restart the process.");
      navigation.replace("signup1");
      return;
    }

    if (!district || !sector || !cell || !village) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      
      // Prepare CHW data according to MotherLink2 API format
      const chwData = {
        fullName,
        email,
        password,
        phoneNumber: phoneNumber.trim(),
        gender: gender.trim(),
        dateJoined: new Date().toISOString().split('T')[0], // Current date
        village: village.trim(),
        sector: sector.trim(),
        district: district.trim(),
        cell: cell.trim(),
        nationalId: nationalId.trim(),
        chwId: chwId.trim(),
        status: "Active",
      };

      // Call the MotherLink2 backend registration API
      const response = await authAPI.signup(chwData);
      
      // Extract data from response according to backend format
      const { status, message, data } = response.data;
      const accessToken = data?.accessToken;
      
      if (status === "success" && accessToken) {
        // TODO: Store token in AsyncStorage for future API calls
        // Example: await AsyncStorage.setItem('authToken', accessToken);
        
        Alert.alert("Success", message || "Registration successful");
        // Navigate to login on successful registration
        navigation.navigate("Login");
      } else {
        Alert.alert("Registration Failed", message || "Registration failed. Please try again.");
      }
    } catch (error) {
      // Handle API errors
      const validationErrors = error.response?.data?.errors;
      const firstValidationMessage = validationErrors?.[0]?.msg;

      const errorMessage =
        firstValidationMessage ||
        error.response?.data?.message ||
        error.message ||
        "Unable to connect to server. Please check your connection.";

      Alert.alert("Registration Failed", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (!fontsLoaded) return null;

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/logo.png")}
        style={styles.logo}
      />
      <Text style={[styles.title, { fontFamily: "Poppins_400Regular" }]}>
        MotherLink
      </Text>

      <Text style={[styles.subtitle, { fontFamily: "Poppins_400Regular" }]}>
        Location
      </Text>

      {/* District Fieldset */}
      <View
        style={[
          styles.fieldset,
        ]}
      >
        <Text style={[styles.legend,{ fontFamily: "Poppins_400Regular",fontWeight:"600" }]}>District</Text>
        <TextInput
          value={district}
          onChangeText={setDistrict}
          style={[styles.input, { fontFamily: "Poppins_400Regular",fontWeight:"600"  }]}
          placeholder="Enter your district"
          placeholderTextColor="#09111E"
          underlineColorAndroid="transparent"
          selectionColor="#09111E"
          onFocus={() => setFocusedField("email")}
          onBlur={() => setFocusedField(null)}
        />
      </View>

      {/* Sector Fieldset */}
      <View
        style={[
          styles.fieldset,
        ]}
      >
        <Text style={[styles.legend,{ fontFamily: "Poppins_400Regular",fontWeight:"600" }]}>Sector</Text>
        <TextInput
          value={sector}
          onChangeText={setSector}
          style={[styles.input, { fontFamily: "Poppins_400Regular",fontWeight:"600" }]}
          placeholder="Enter your sector "
          placeholderTextColor="#09111E"
          underlineColorAndroid="transparent"
          selectionColor="#09111E"
          onFocus={() => setFocusedField("password")}
          onBlur={() => setFocusedField(null)}
        />
      </View>

      {/* Cell Fieldset */}
      <View
        style={[
          styles.fieldset,
        ]}
      >
        <Text style={[styles.legend,{ fontFamily: "Poppins_400Regular",fontWeight:"600" }]}>Cell</Text>
        <TextInput
          value={cell}
          onChangeText={setCell}
          style={[styles.input, { fontFamily: "Poppins_400Regular" ,fontWeight:"600"}]}
          placeholder="Enter your cell"
          placeholderTextColor="#09111E"
          underlineColorAndroid="transparent"
          selectionColor="#09111E"
          onFocus={() => setFocusedField("confirm")}
          onBlur={() => setFocusedField(null)}
        />
      </View>
      <View
        style={[
          styles.fieldset,
        ]}
      >
        <Text style={[styles.legend,{ fontFamily: "Poppins_400Regular",fontWeight:"600" }]}>Village</Text>
        <TextInput
          value={village}
          onChangeText={setVillage}
          style={[styles.input, { fontFamily: "Poppins_400Regular" ,fontWeight:"600"}]}
          placeholder="Enter your village"
          placeholderTextColor="#09111E"
          underlineColorAndroid="transparent"
          selectionColor="#09111E"
          onFocus={() => setFocusedField("confirm")}
          onBlur={() => setFocusedField(null)}
        />
      </View>

      <Text style={[styles.signupText,{fontWeight:"600"}]}>
        Already have an account?
        <Text
          style={styles.loginLink}
          onPress={() => navigation.navigate("Login")}
        >
          {" "}Login
        </Text>
      </Text>

      <TouchableOpacity style={styles.button} onPress={handleRegistration} disabled={loading}>
        {loading ? (
          <ActivityIndicator color="#fff" size="small" />
        ) : (
          <Text
            style={[styles.buttonText, { fontFamily: "Poppins_400Regular" ,fontWeight:200}]}
          >
            Register
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
    paddingBottom: 40,
  },
  logo: { width: 60, height: 60, resizeMode: "contain" },
  title: { fontSize: 18, fontFamily:"Poppins_700Bold", fontWeight:"900", marginBottom: 15, color: "#09111E" },
  subtitle:{ fontSize: 16, fontFamily:"Poppins_700Bold", fontWeight:"700", marginBottom: 15, color: "#09111E" },

  fieldset: {
    width: 300,
    borderWidth: 1.5,
    borderColor: "#000",
    borderRadius: 8,
    position: "relative",
    paddingTop: 5,
    marginVertical: 17,
  },
  signupText: {
    fontSize: 14,
    color: "#09111E",
    textAlign: "left",
    marginTop: 15,
    fontFamily: "Poppins_400Regular",
  },
  loginLink: {
    color: "#063392ff", // blue link color
    fontWeight: "bold",
    marginEnd:65,
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
    fontSize: 10,
    color: "#09111E",
    borderWidth: 0, // ensures no extra border
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: 300,
    marginBottom: 15,
  },
  rememberMeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    width: 16,
    height: 16,
    borderWidth: 1,
    borderColor: "#454546ff",
    borderRadius: 4,
  },
  rememberText: {
    marginLeft: 8,
    color: "#09111E",
    fontSize: 12,
  },
  button: {
    backgroundColor: "#09111E",
    padding: 15,
    marginTop: 20,
    borderRadius: 8,
    width: 300,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "600", fontSize: 16 },
  forgotText: { color: "#09111E",fontSize:12 },
});
