import { useEffect, useState } from "react";
import { WebView } from "react-native-webview";
import { StyleSheet } from "react-native";

// Functional component
const SignIn = ({ navigation }: { navigation: any }) => {
  // Local states
  const [deviceId, setDeviceId] = useState("");

  // Declaring an object
  const userInfo = {
    iss: "phmail",
    aud: "user",
    client_id: "15583378010065007825",
  };

  // Declaring sign-in URL
  const URI = `https://auth.phone.email/log-in?client_id=${userInfo.client_id}&auth_type=4&device=634872b7864c7nnc47676456`;

  // Hooks
  useEffect(() => {
    // Method to fetch device ID
    const fetchDeviceId = async () => {
      // Getting unique ID
      // Log the device ID to the console
      // console.log('Device ID:', id);
    };

    fetchDeviceId();
  }, []);

  const phoneAuthJwt = (event: any) => {
    // Getting encodedJWT
    const encodedJWT = event.nativeEvent.data;

    // Navigating to the EmailCount screen with the token param
    console.log(encodedJWT);
  };

  // Returning JSX
  return (
    <WebView
      source={{ uri: URI }}
      style={styles.webView}
      onMessage={phoneAuthJwt}
    />
  );
};

// Exporting
export default SignIn;

const styles = StyleSheet.create({
  webView: {
    flex: 1,
  },
});
