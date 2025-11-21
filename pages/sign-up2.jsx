import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import { useFonts, Poppins_400Regular,Poppins_700Bold } from "@expo-google-fonts/poppins";

export default function Signup2screen({ navigation, route }) {
  const [fontsLoaded] = useFonts({ Poppins_400Regular,Poppins_700Bold });

  // Separate state variables for each field
  const [names, setNames] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [nationalId, setNationalId] = useState("");
  const [gender, setGender] = useState("");
  const [chwId, setChwId] = useState("");
  const [focusedField, setFocusedField] = useState(null); // new: track focused field

  const accountData = route?.params?.accountData;

  useEffect(() => {
    if (!accountData) {
      navigation.replace("signup1");
    }
  }, [accountData, navigation]);

  const handleProceed = () => {
    if (!names || !phoneNumber || !nationalId || !gender || !chwId) {
      Alert.alert("Error", "Please provide all details");
      return;
    }

    navigation.navigate("signup3", {
      accountData,
      profileData: {
        fullName: names.trim(),
        phoneNumber: phoneNumber.trim(),
        nationalId: nationalId.trim(),
        gender: gender.trim(),
        chwId: chwId.trim(),
      },
    });
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
        Details
      </Text>

      {/* Names Fieldset */}
      <View
        style={[
          styles.fieldset,
        ]}
      >
        <Text style={[styles.legend,{ fontFamily: "Poppins_400Regular",fontWeight:"600" }]}>Names</Text>
        <TextInput
          value={names}
          onChangeText={setNames}
          style={[styles.input, { fontFamily: "Poppins_400Regular",fontWeight:"600"  }]}
          placeholder="Enter your names"
          placeholderTextColor="#09111E"
          underlineColorAndroid="transparent"
          selectionColor="#09111E"
          onFocus={() => setFocusedField("email")}
          onBlur={() => setFocusedField(null)}
        />
      </View>

      {/* Phone Number Fieldset */}
      <View
        style={[
          styles.fieldset,
        ]}
      >
        <Text style={[styles.legend,{ fontFamily: "Poppins_400Regular",fontWeight:"600" }]}>Number</Text>
        <TextInput
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          style={[styles.input, { fontFamily: "Poppins_400Regular",fontWeight:"600" }]}
          placeholder="Enter your phone number"
          placeholderTextColor="#09111E"
          underlineColorAndroid="transparent"
          selectionColor="#09111E"
          onFocus={() => setFocusedField("password")}
          onBlur={() => setFocusedField(null)}
        />
      </View>

      {/* Gender Fieldset */}
      <View
        style={[
          styles.fieldset,
        ]}
      >
        <Text style={[styles.legend,{ fontFamily: "Poppins_400Regular",fontWeight:"600" }]}>Gender</Text>
        <TextInput
          value={gender}
          onChangeText={setGender}
          style={[styles.input, { fontFamily: "Poppins_400Regular" ,fontWeight:"600"}]}
          placeholder="Enter your gender"
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
        <Text style={[styles.legend,{ fontFamily: "Poppins_400Regular",fontWeight:"600" }]}>National Id</Text>
        <TextInput
          value={nationalId}
          onChangeText={setNationalId}
          style={[styles.input, { fontFamily: "Poppins_400Regular" ,fontWeight:"600"}]}
          placeholder="Enter national Id"
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
        <Text style={[styles.legend,{ fontFamily: "Poppins_400Regular",fontWeight:"600" }]}>CHW ID</Text>
        <TextInput
          value={chwId}
          onChangeText={setChwId}
          style={[styles.input, { fontFamily: "Poppins_400Regular" ,fontWeight:"600"}]}
          placeholder="Enter Community Health Worker ID"
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

      <TouchableOpacity style={styles.button} onPress={handleProceed}>
        <Text
          style={[styles.buttonText, { fontFamily: "Poppins_400Regular" ,fontWeight:200}]}
        >
          Proceed
        </Text>
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
