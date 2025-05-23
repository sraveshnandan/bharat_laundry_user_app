import LanguageModel from "@/components/models/LanguageModel";
import CustomSeparator from "@/components/ui/CustomSeperator";
import { Colors } from "@/constants/Colors";
import { hairLineWidth, hp } from "@/constants/Scaling";
import { useAuthStore } from "@/store/authStore";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

const SignInPage = () => {
  const [showLanguageModel, setShowLanguageModel] = useState<boolean>(false);

  const [phone, setPhone] = useState<string>("");
  const { user, setUser } = useAuthStore();

  const handleSendOtp = () => {
    if (phone.length !== 10) {
      return Alert.alert(
        "Invalid Phone Number",
        "Please enter a valid phone number"
      );
    }
    setUser({ phone, _id: "1234567890" });
    // Send OTP Logic
    return router.navigate(`/(auth)/otpVerification?phone=${phone}`);
  };

  const handleGoogleSignIn = () => {
    // Google SignIn Logic
    return Alert.alert("Coming Soon", "We are working on it");
  };

  const handleOtherSignIn = () => {
    return Alert.alert("Coming Soon", "We are working on it");
  };

  useEffect(() => {
    if (phone?.length === 10) {
      return handleSendOtp();
    }
  }, [phone]);

  useEffect(() => {
    if (user?.email) {
      return router.replace(`/(tabs)/Laundry`);
    }
  }, [user?.email]);

  return (
    <KeyboardAvoidingView style={styles.container}>
      {/* top header  */}
      <View style={styles.topView}>
        {/* top CTA  */}
        <View style={styles.topContainer}>
          <TouchableOpacity
            style={styles.topCTA}
            onPress={() => setShowLanguageModel((prev) => !prev)}
          >
            <Ionicons name="language" size={RFValue(24)} color={Colors.White} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.replace(`/(auth)`)}
            style={styles.topCTA}
          >
            <Text style={styles.skipBtn}>Skip</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.midContainer}>
          <Text style={styles.Header}>Bharat Laundry</Text>
          <Image
            style={[
              styles.overlayImg,
              {
                top: RFValue(-50),
                right: -16,
              },
            ]}
            source={require("@/assets/images/login1.png")}
          />
          <Image
            style={[
              styles.overlayImg,
              {
                top: RFValue(-50),
                left: -16,
              },
            ]}
            source={require("@/assets/images/login2.png")}
          />
          <Image
            style={[
              styles.overlayImg,
              {
                bottom: RFValue(10),
                right: -16,
              },
            ]}
            source={require("@/assets/images/login3.png")}
          />
          <Image
            style={[
              styles.overlayImg,
              {
                bottom: RFValue(10),
                left: -16,
              },
            ]}
            source={require("@/assets/images/login4.png")}
          />
        </View>
      </View>

      {/* Login Container  */}
      <ScrollView style={styles.loginContainer}>
        <KeyboardAvoidingView behavior="padding">
          <Text style={styles.loginHeader}>
            Bihar's #1 Laundry Pickup and Delivery App
          </Text>
          <CustomSeparator title="Log in or sign up" />

          {/* Phone Number Container  */}

          <View style={styles.phoneContainer}>
            {/* Country Selector  */}

            <View style={styles.input}>
              <Image
                style={styles.flag}
                source={require("@/assets/images/icons/india.png")}
              />
              <Ionicons name="chevron-down-sharp" />
            </View>

            <View style={styles.phoneInput}>
              <Text style={styles.title}>+91</Text>
              <TextInput
                keyboardType="number-pad"
                maxLength={10}
                value={phone}
                placeholder="Enter Phone Number"
                onChangeText={setPhone}
                style={styles.numberInput}
              />

              {phone.length === 10 && (
                <TouchableOpacity
                  onPress={() => handleSendOtp()}
                  style={styles.fwdbtn}
                >
                  <Ionicons
                    color={Colors.White}
                    size={28}
                    name="chevron-forward"
                  />
                </TouchableOpacity>
              )}
            </View>
          </View>

          <CustomSeparator title="or" />

          {/* Google Oauth SignIn  */}

          <View style={styles.OAuthContainer}>
            <TouchableOpacity
              onPress={handleGoogleSignIn}
              style={styles.OAuthBox}
            >
              <Image
                source={require("@/assets/images/icons/google.png")}
                style={{ width: RFValue(24), height: RFValue(24) }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleOtherSignIn}
              style={styles.OAuthBox}
            >
              <Entypo name="dots-three-horizontal" size={28} color="black" />
            </TouchableOpacity>
          </View>

          {/* Terms & Condition Section  */}

          <View style={styles.BottomContainer}>
            <Text style={styles.bottomText}>
              By continuing, you agree to our
            </Text>
            {/* Links  */}
            <View style={styles.center}>
              <TouchableOpacity>
                <Text style={styles.link}>Terms of Service</Text>
              </TouchableOpacity>

              <TouchableOpacity>
                <Text style={styles.link}>Privacy policy</Text>
              </TouchableOpacity>

              <TouchableOpacity>
                <Text style={styles.link}>Content Policy</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>

      {/* Language Change Model  */}
      <LanguageModel
        showModel={showLanguageModel}
        setShowModel={setShowLanguageModel}
        onValueChange={(data: any) =>
          console.log(`Passed language value is : ${data}`)
        }
      />
    </KeyboardAvoidingView>
  );
};

export default SignInPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topView: {
    width: "100%",
    height: hp * 0.32,
    backgroundColor: Colors.Primary,
  },
  topContainer: {
    width: "80%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: "auto",
    marginTop: hp * 0.03,
    zIndex: 5,
  },
  topCTA: {
    backgroundColor: Colors.Grey,
    borderRadius: 99,
    paddingHorizontal: RFValue(16),
    paddingVertical: RFValue(5),
    alignItems: "center",
    justifyContent: "center",
  },
  skipBtn: {
    color: Colors.White,
    fontWeight: "500",
    fontSize: RFValue(18),
  },
  midContainer: {
    width: "80%",
    marginHorizontal: "auto",
    alignItems: "center",
    flexGrow: 1,
    paddingTop: RFPercentage(6),
    position: "relative",
  },
  Header: {
    color: Colors.White,
    fontSize: RFValue(28),
    fontStyle: "italic",
    fontWeight: "700",
    zIndex: 10,
  },
  loginContainer: {
    flex: 1,
    paddingHorizontal: RFPercentage(2),
    paddingVertical: RFPercentage(2),
    backgroundColor: Colors.White,
  },
  loginHeader: {
    fontSize: RFValue(24),
    textAlign: "center",
    fontFamily: "Urbanist",
    fontWeight: "700",
    marginBottom: RFValue(25),
  },
  OAuthContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: RFValue(12),
    marginVertical: RFPercentage(4),
  },
  OAuthBox: {
    borderWidth: 2,
    borderColor: Colors.Grey,
    alignItems: "center",
    justifyContent: "center",
    padding: RFValue(12),
    borderRadius: 100,
  },
  BottomContainer: {
    alignItems: "center",
    justifyContent: "center",
    gap: RFValue(4),
  },
  bottomText: {
    color: Colors.Grey,
    fontSize: RFValue(14),
    fontWeight: "500",
  },
  link: {
    color: Colors.Grey,
    fontSize: RFValue(12),
    fontWeight: "800",
    textDecorationLine: "underline",
    textDecorationStyle: "dashed",
    textDecorationColor: Colors.Text,
  },
  center: {
    flexDirection: "row",
    gap: RFValue(14),
  },
  phoneContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: RFValue(8),
    width: "100%",
    marginVertical: RFValue(20),
  },
  input: {
    borderWidth: hairLineWidth,
    borderColor: Colors.Grey,
    padding: RFValue(8),
    borderRadius: RFValue(6),
    alignItems: "center",
    gap: RFValue(4),
    overflow: "hidden",
    flexDirection: "row",
  },
  flag: {
    width: RFValue(23),
    height: RFValue(23),
    aspectRatio: "1",
  },
  numberInput: {
    fontSize: RFValue(19),
    padding: 5,
    fontWeight: "700",
  },
  title: {
    fontWeight: "700",
    fontSize: RFValue(20),
  },
  phoneInput: {
    borderWidth: hairLineWidth,
    borderColor: Colors.Grey,
    padding: RFValue(3),
    borderRadius: RFValue(6),
    alignItems: "center",
    gap: RFValue(2),
    flexDirection: "row",
    overflow: "hidden",
  },

  overlayImg: {
    position: "absolute",
    zIndex: 0,
    width: 90,
    height: 90,
  },
  fwdbtn: {
    backgroundColor: Colors.Primary,
    borderRadius: 20,
    padding: 2,
    width: "20%",
    alignItems: "center",
    justifyContent: "center",
    elevation: 1,
    marginHorizontal: "auto",
  },
});
