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
import React, { useEffect, useState } from "react";
import { hairLineWidth, hp, wp } from "@/constants/Scaling";
import { Colors } from "@/constants/Colors";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import LanguageModel from "@/components/models/LanguageModel";
import { router } from "expo-router";
import CustomSeparator from "@/components/ui/CustomSeperator";

const SignInPage = () => {
  const [showLanguageModel, setShowLanguageModel] = useState<boolean>(false);

  const [phone, setPhone] = useState<string>("");

  const handleSendOtp = () => {
    return router.navigate(`/(auth)/otpVerification?phone=${phone}`);
  };

  useEffect(() => {
    if (phone?.length === 10) {
      return handleSendOtp();
    }
  }, [phone]);

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
            onPress={() => router.replace(`/(tabs)/Booking`)}
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
                right: -20,
              },
            ]}
            source={require("@/assets/images/login1.png")}
          />
          <Image
            style={[
              styles.overlayImg,
              {
                top: RFValue(-50),
                left: -20,
              },
            ]}
            source={require("@/assets/images/login2.png")}
          />
          <Image
            style={[
              styles.overlayImg,
              {
                bottom: RFValue(10),
                right: -20,
              },
            ]}
            source={require("@/assets/images/login3.png")}
          />
          <Image
            style={[
              styles.overlayImg,
              {
                bottom: RFValue(10),
                left: -20,
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
              <Text style={styles.flag}>🇮🇳</Text>
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
            <View style={styles.OAuthBox}>
              <Ionicons
                onPress={() =>
                  Alert.alert("Google OAuth", "Signing process started")
                }
                name="logo-google"
                size={RFValue(28)}
              />
            </View>
            <View style={styles.OAuthBox}>
              <Entypo name="dots-three-horizontal" size={28} color="black" />
            </View>
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
    paddingVertical: RFPercentage(3),
    backgroundColor: Colors.White,
    width: wp * 1,
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
    fontSize: RFValue(14),
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
    width: "auto",
    alignItems: "center",
    gap: RFValue(8),
    marginVertical: RFPercentage(4),
  },
  input: {
    borderWidth: hairLineWidth,
    borderColor: Colors.Grey,
    padding: RFValue(8),
    borderRadius: RFValue(6),
    alignItems: "center",
    gap: RFValue(4),
    flexDirection: "row",
  },
  flag: {
    fontSize: RFValue(25),
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
    padding: RFValue(8),
    borderRadius: RFValue(6),
    alignItems: "center",
    gap: RFValue(4),
    flexDirection: "row",
    flexGrow: 1,
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
