import { LoadingOverlay } from "@/components/ui/LoadingOverLay";
import { OtpInput } from "@/components/ui/OTPInput";
import { Colors } from "@/constants/Colors";
import { useAuthStore } from "@/store/authStore";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

const OTPVerificationScreen = () => {
  const params = useLocalSearchParams();
  const navigation = useNavigation();

  const { user, setUser } = useAuthStore();
  const [phone, setPhone] = useState(user?.phone);

  const [otp, setOtp] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleOtpVerification = async (otp: string) => {
    console.log("Verifying OTP:", otp);
    setLoading(true);
    try {
      // Simulate API call

      const data = {
        userId: user?._id,
        otp: otp,
      };
      const res = await new Promise((resolve, reject) =>
        setTimeout(() => {
          const isSuccess = user?._id === "1234567890" && otp === "123456";
          isSuccess
            ? resolve(true)
            : reject(new Error("OTP verification failed"));
        }, 2000)
      );
      if (res) {
        return router.replace(`/(auth)/emailVerification`);
      }
      console.log(res);
      console.log("OTP verified successfully");
    } catch (error) {
      console.error("Error verifying OTP:", error);
      Alert.alert("Error", "Failed to verify OTP. Please try again.", [
        {
          text: "OK",
          onPress: () => {
            setOtp("");
          },
        },
      ]);
      setOtp("");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => router.replace(`/(auth)`)}>
          <Text style={styles.title}>Skip</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    if (otp.length === 6) {
      handleOtpVerification(otp);
    }
  }, [otp]);

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>We have sent a verification code to</Text>
        <Text style={styles.title}>+91 {phone}</Text>
      </View>

      <View style={{ marginTop: RFPercentage(5) }}>
        <OtpInput value={otp} onComplete={(data) => setOtp(data)} />
      </View>

      <View style={styles.resendContainer}>
        <Text style={styles.title}>
          Didn&apos;t get the code?{" "}
          <Text
            style={{ color: Colors.Primary, fontWeight: "700" }}
            onPress={() => router.replace(`/(auth)`)}
          >
            Resend SMS
          </Text>
        </Text>
      </View>

      {/* More options  */}

      <View style={styles.bottomContainer}>
        <Text onPress={() => router.back()} style={styles.resendText}>
          Go back to login methods
        </Text>
      </View>

      <LoadingOverlay message="Verifying OTP..." visible={loading} />
    </View>
  );
};

export default OTPVerificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: RFPercentage(8),
  },
  title: {
    fontSize: RFValue(16),
    color: Colors.Text,
    fontWeight: "700",
    opacity: 0.7,
    textAlign: "center",
  },
  resendContainer: {
    marginTop: RFPercentage(5),
    flexDirection: "row",
    justifyContent: "center",
    maxWidth: "80%",
  },
  resendText: {
    color: Colors.Primary,
    fontWeight: "700",
    fontSize: RFValue(16),
    textAlign: "center",
  },
  bottomContainer: {
    position: "absolute",
    bottom: RFPercentage(5),
    left: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
    padding: RFPercentage(2),
  },
});
