import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useFonts, Poppins_400Regular } from '@expo-google-fonts/poppins';

export default function ForgotPasswordScreen({ navigation }) {
  const [fontsLoaded] = useFonts({ Poppins_400Regular });
  const [countryCode, setCountryCode] = useState("+250");
  const [phoneNumber, setPhoneNumber] = useState("");

  if (!fontsLoaded) return null; // optionally <AppLoading />

  return (
    <View style={styles.container}>
      {/* Top images */}
      <View style={styles.imagesContainer}>
        <Image
          source={require("../assets/images/cuate.png")}
          style={styles.image} // make sure to use the style
        />
      </View>

      {/* Title */}
      <Text style={[styles.title, { fontFamily: 'Poppins_400Regular' }]}>Forgot Password?</Text>

      {/* Subparagraph */}
      <Text style={[styles.subParagraph, { fontFamily: 'Poppins_400Regular' }]}>
        Don't worry! It happens. Please enter the phone number associated .
      </Text>

      {/* Phone input */}
      <View style={styles.phoneInputContainer}>
        <TouchableOpacity style={styles.countryCodeContainer}>
          <Text style={[styles.countryCodeText, { fontFamily: 'Poppins_400Regular' }]}>{countryCode}</Text>
          <AntDesign name="down" size={16} color="#000" style={{ marginLeft: 5 }} />
        </TouchableOpacity>
        <TextInput
          style={[styles.input, { fontFamily: 'Poppins_400Regular' }]}
          placeholder="876-788-890"
          keyboardType="phone-pad"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
      </View>

      {/* Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("verify")}
      >
        <Text style={[styles.buttonText, { fontFamily: 'Poppins_400Regular' }]}>
          Reset Password
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#EDEDED",
    justifyContent: "flex-end", // move content toward the bottom
    alignItems: "center",
    paddingBottom:0,
  },
  imagesContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    justifyContent: "center",
    marginBottom: 30,
  },
  image: {
    width: 90,
    height: 150,
    borderRadius: 10,
    resizeMode: "contain",
    marginHorizontal: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  subParagraph: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    color: "#555",
  },
  phoneInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    overflow: "hidden",
    width: "95%",
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  countryCodeContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 20,
    backgroundColor: "#f0f0f0",
  },
  countryCodeText: {
    fontWeight: "600",
    fontSize: 16,
  },
  input: {
    flex: 1,
    paddingHorizontal: 12,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#0a1a2f",
    paddingVertical: 20,
    borderRadius: 10,
    width: "95%",
    alignItems: "center",
    marginBottom: 20, // space from bottom
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});
