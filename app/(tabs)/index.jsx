// Navigation.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LandingScreen from "../../pages/Landing";
import LoginScreen from "../../pages/login.jsx"
import VerifyScreen from "../../pages/verify.jsx"
import ForgotPasswordScreen from "../../pages/forgot-password.jsx";
import { useFonts, Poppins_400Regular } from '@expo-google-fonts/poppins';
import { setCustomText, setCustomTextInput } from 'react-native-global-props';
import Signup1screen from "../../pages/sign-up1.jsx";
import Signup2screen from "../../pages/sign-up2.jsx";
import Signup3screen from "../../pages/sign-up3.jsx";
import Home from "../../pages/Home.jsx"
import Appointments from "../../pages/appointments.jsx";
import MotherManagementScreen from "../../pages/mothermanagement.jsx";
import  AnalyticsScreen from "../../pages/analytics.jsx";
import ChildManagementscreen from "../../pages/Childmanagement.jsx";
import ProfileSettingsScreen from "../../pages/Profile.jsx";
import HomeVisitScreen2 from "../../subpages/VisitPage2";
import NotificationsScreen from "../../pages/notifications.jsx";
import RegisterMother from "../../Registration/mother.jsx";
import RegisterMother2 from "../../Registration/register2.jsx";
import RegisterMother3 from "../../Registration/register3.jsx";
import InfoSection from "../../Registration/Info.jsx";
import RegisterChild from "../../Registration/child1.jsx";
import RegisterChild2 from "../../Registration/child2.jsx";
import RegisterChild3 from "../../Registration/child3.jsx";
import InfoChild from "../../Registration/ChildInfo.jsx";
import motherProfileScreen from "../../pages/motherProfile.jsx";
import ChildProfileScreen from "../../subpages/ChildProfile.jsx";
import ChildAppointments from "../../subpages/ChildAppointment.jsx";
import ChildEmergency from "../../subpages/ChildEmergency.jsx"

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
   const [fontsLoaded] = useFonts({ Poppins_400Regular });

  if (!fontsLoaded) return null;

  // Set global font
  const customTextProps = { style: { fontFamily: 'Poppins_400Regular' } };
  setCustomText(customTextProps);
  setCustomTextInput(customTextProps);

  return (
    // <NavigationContainer> {/* ⚠ This is essential */}
      <Stack.Navigator initialRouteName="Landing">
        <Stack.Screen 
          name="Landing" 
          component={LandingScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="appointments" component={Appointments} />
        <Stack.Screen name="profile" component={ProfileSettingsScreen} />
        <Stack.Screen name="mother" component={MotherManagementScreen} />
        <Stack.Screen name="child" component={ChildManagementscreen} />
        <Stack.Screen name="visit2" component={HomeVisitScreen2} />
        <Stack.Screen name="analytics" component={AnalyticsScreen} />
        <Stack.Screen name="notifications" component={NotificationsScreen} />
        <Stack.Screen name="register1" component={RegisterMother}/>
        <Stack.Screen name="register2" component={RegisterMother2}/>
        <Stack.Screen name="register3" component={RegisterMother3}/>
        <Stack.Screen name="info" component={InfoSection}/>
        <Stack.Screen name="child1" component={RegisterChild}/>
        <Stack.Screen name="child2" component={RegisterChild2}/>
        <Stack.Screen name="child3" component={RegisterChild3}/>
        <Stack.Screen name="InfoChild" component={InfoChild}/>
        <Stack.Screen name="motherProfile" component={motherProfileScreen}/>
        <Stack.Screen name="childEmergency" component={ChildEmergency}/>
        <Stack.Screen name="childAppointment" component={ChildAppointments}/>
        <Stack.Screen name="childProfile" component={ChildProfileScreen}/>

        <Stack.Screen 
          name="ForgotPassword" 
          component={ForgotPasswordScreen} 
          options={{ title: "Forgot Password" }} 
        />
        <Stack.Screen 
          name="home" 
          component={Home} 
          options={{ title: "Home" }} 
        />
        <Stack.Screen 
          name="signup1" 
          component={Signup1screen} 
          options={{ title: "First-Signup" }} 
        />
        <Stack.Screen 
          name="signup2" 
          component={Signup2screen} 
          options={{ title: "second-Signup" }} 
        />
         <Stack.Screen 
          name="signup3" 
          component={Signup3screen} 
          options={{ title: "Third-Signup" }} 
        />
        
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ title: "login" }} 
        />
        <Stack.Screen 
          name="verify" 
          component={VerifyScreen} 
          options={{ title: "Verify OTP" }} 
        />
      </Stack.Navigator>
    // </NavigationContainer>
  );
}
