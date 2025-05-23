import CustomButton from "@/components/ui/CustomButton";
import CustomInput from "@/components/ui/CustomInput";
import { LoadingOverlay } from "@/components/ui/LoadingOverLay";
import { router } from "expo-router";
import React, { useState } from "react";
import { Alert, StyleSheet, ToastAndroid, View } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";

const profileDetails = () => {
  const [name, setName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const handleContinue = async () => {
    setMessage("Creating your profile...");
    try {
      setLoading(true);
      if (name.length < 3) {
        return Alert.alert("Invalid Name", "Please enter a valid name");
      }
      const res = await new Promise((resolve) => {
        setTimeout(() => {
          resolve(true);
        }, 2000);
      });

      if (res) {
        ToastAndroid.show("Profile created successfully", ToastAndroid.SHORT);
        return router.replace(`/(auth)/AddressScreen`);
      } else {
        Alert.alert("Error", "Something went wrong");
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  return (
    <View style={styles.container}>
      <View>
        <CustomInput
          Label="What's your name?"
          placeholder="Enter  your name?"
          value={name}
          onChangeText={setName}
        />
      </View>

      <View style={styles.bottomContainer}>
        <CustomButton title="Done" onPressAction={handleContinue} />
      </View>
      <LoadingOverlay visible={loading} message={message} />
    </View>
  );
};

export default profileDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: RFPercentage(2),
    marginVertical: RFPercentage(3),
  },
  bottomContainer: {
    position: "absolute",
    bottom: RFPercentage(5),
    left: 0,
    right: 0,
    padding: RFPercentage(2),
  },
});
