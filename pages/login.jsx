import React, { useState } from "react";
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
import { saveSession } from "../utils/authStorage";

export default function LoginScreen({ navigation }) {
  const [fontsLoaded] = useFonts({ Poppins_400Regular,Poppins_700Bold });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [focusedField, setFocusedField] = useState(null); // new: track focused field
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      // Call the MotherLink2 backend login API
      const response = await authAPI.login({ email: email.trim(), password });
      
      // Extract data from new backend format
      const { status, message, data } = response.data;
      const accessToken = data?.accessToken;
      const workerName = data?.worker?.fullName;
      
      if (status === "success" && accessToken) {
        await saveSession(accessToken, data?.worker);
        Alert.alert("Success", message || `Welcome back ${workerName || ""}`.trim());
        // Navigate to home on successful login
        navigation.navigate("home");
      } else {
        Alert.alert("Login Failed", message || "Login failed. Please try again.");
      }
    } catch (error) {
      // Handle API errors
      const errorMessage = error.response?.data?.message || 
                          error.message || 
                          "Unable to connect to server. Please check your connection.";
      Alert.alert("Login Failed", errorMessage);
    } finally {
      setLoading(false);
    }
  };



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
        LOGIN
      </Text>

      {/* Email Fieldset */}
      <View
        style={[
          styles.fieldset,
          { borderColor: focusedField === "email" ? "#1048C5" : "#09111E" },
        ]}
      >
        <Text style={[styles.legend,{ fontFamily: "Poppins_400Regular",fontWeight:"600" }]}>Email</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          style={[styles.input, { fontFamily: "Poppins_400Regular",fontWeight:"600"  }]}
          placeholder="Enter your email"
          placeholderTextColor="#09111E"
          underlineColorAndroid="transparent"
          selectionColor="#09111E"
          onFocus={() => setFocusedField("email")}
          onBlur={() => setFocusedField(null)}
        />
      </View>

      {/* Password Fieldset */}
      <View
        style={[
          styles.fieldset         
        ]}
      >
        <Text style={[styles.legend,{ fontFamily: "Poppins_400Regular",fontWeight:"600" }]}>Password</Text>
        <TextInput
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={[styles.input, { fontFamily: "Poppins_400Regular",fontWeight:"600" }]}
          placeholder="Enter your password"
          placeholderTextColor="#09111E"
          underlineColorAndroid="transparent"
          selectionColor="#09111E"
          onFocus={() => setFocusedField("password")}
          onBlur={() => setFocusedField(null)}
        />
      </View>

      {/* Confirm Password Fieldset */}

      <View style={styles.row}>
        <View style={styles.rememberMeContainer}>
          
          <Text
            style={[
              styles.rememberText,
              { fontFamily: "Poppins_400Regular",fontWeight:"600" },
            ]} onPress={()=>navigation.navigate("signup1")}
          >
            New? Create Account
          </Text>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
          <Text
            style={[styles.forgotText, { fontFamily: "Poppins_400Regular",fontWeight:"600" }]}
          >
            Forgot Password?
          </Text>
        </TouchableOpacity>
      </View>

      {/* Login Button */}
      <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
        {loading ? (
          <ActivityIndicator color="#fff" size="small" />
        ) : (
          <Text
            style={[styles.buttonText, { fontFamily: "Poppins_400Regular" }]}
          >
            Login
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
  title: { fontSize: 18, fontFamily:"Poppins_700Bold", fontWeight:"900", marginBottom: 20, color: "#09111E" },
  subtitle:{ fontSize: 16, fontFamily:"Poppins_700Bold", fontWeight:"700", marginBottom: 20, color: "#09111E" },

  fieldset: {
    width: 300,
    borderWidth: 1.5,
    borderColor: "#000",
    borderRadius: 8,
    position: "relative",
    paddingTop: 10,
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
    marginBottom: 1,
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
