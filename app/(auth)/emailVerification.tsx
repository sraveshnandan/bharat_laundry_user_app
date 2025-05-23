import CustomButton from "@/components/ui/CustomButton";
import CustomInput from "@/components/ui/CustomInput";
import { LoadingOverlay } from "@/components/ui/LoadingOverLay";
import { OtpInput } from "@/components/ui/OTPInput";
import { Colors } from "@/constants/Colors";
import { useAuthStore } from "@/store/authStore";
import { encryptEmail } from "@/utils";
import { router } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
export default function EmailVerification() {
  const { user, setUser } = useAuthStore();
  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [otp, setOtp] = useState<string>("");

  const handleOtpSend = async () => {
    setMessage("Sending OTP...");
    setLoading(true);
    try {
      setUser({ email });
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setOtpSent(true);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const handleOTPVerify = async () => {
    setMessage("Verifying OTP...");
    try {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setMessage("OTP Verified Successfully");
      return router.replace(`/(auth)/profileDetails`);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setMessage("Resending OTP...");
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setOtpSent(true);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return !otpSent ? (
    <View style={styles.container}>
      <CustomInput
        inputMode="email"
        Label="Whats your email?"
        placeholder="Enter your email"
        value={email}
        error={null}
        onChangeText={setEmail}
      />
      <View style={styles.bottomContainer}>
        <CustomButton title="Continue" onPressAction={handleOtpSend} />
      </View>

      <LoadingOverlay visible={loading} message="Sending OTP..." />
    </View>
  ) : (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.header}>
          To confirm your email address, please enter the OTP we sent to
          <Text style={{ fontWeight: "700", color: Colors.Primary }}>
            {" "}
            {encryptEmail(user?.email!)}
          </Text>
        </Text>
      </View>
      <OtpInput value={otp} onComplete={(data) => setOtp(data)} />

      {/* resend otp  */}
      <View style={styles.resendContainer}>
        <Text style={styles.header}>
          Didn&apos;t get the code?{" "}
          <Text
            style={{ color: Colors.Primary, fontWeight: "700" }}
            onPress={() => handleResendOtp()}
          >
            Resend OTP
          </Text>
        </Text>
      </View>
      <View style={styles.bottomContainer}>
        <CustomButton title="Verify OTP" onPressAction={handleOTPVerify} />
      </View>
      <LoadingOverlay visible={loading} message="Verifying OTP..." />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
    paddingHorizontal: RFPercentage(3),
    paddingTop: RFPercentage(2),
  },
  bottomContainer: {
    flex: 1,
    justifyContent: "flex-end",
    paddingBottom: RFPercentage(4),
  },
  topContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: RFPercentage(10),
    marginBottom: RFPercentage(5),
  },
  header: {
    fontSize: RFValue(16),
    textAlign: "center",
    fontWeight: "600",
  },
  resendContainer: {
    marginTop: RFPercentage(2),
    alignItems: "center",
  },
});
