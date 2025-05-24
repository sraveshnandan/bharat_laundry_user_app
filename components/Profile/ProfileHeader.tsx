import { Colors } from "@/constants/Colors";
import { useAuthStore } from "@/store/authStore";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

const ProfileHeader = () => {
  const { user } = useAuthStore();
  return (
    <View style={[styles.container, styles.shadow]}>
      <View style={styles.leftBox}>
        <View style={styles.imageContainer}>
          <View style={styles.image}>
            {user?.avatar?.url ? (
              <Image source={{ uri: user?.avatar?.url }} style={styles.image} />
            ) : (
              <Text style={styles.name}>{user?.name?.charAt(0) || "U"}</Text>
            )}
          </View>
        </View>
      </View>
      <View style={styles.middleBox}>
        <Text style={styles.name}>{user?.name || "User"}</Text>
        <Text
          onPress={() => router.navigate(`/(screens)/EditProfile`)}
          style={styles.change}
        >
          {"Edit profile"}
          <Ionicons name="caret-forward-sharp" size={RFValue(12)} />
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => router.navigate(`/(screens)/EditProfile`)}
        style={styles.rightBox}
      >
        <Image source={require("@/assets/images/icons/pen.png")} />
      </TouchableOpacity>
    </View>
  );
};

export default ProfileHeader;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.White,
    padding: RFValue(10),
    flexDirection: "row",
    justifyContent: "space-between",
  },
  shadow: {
    elevation: 4,
    shadowColor: Colors.Grey,
    shadowOffset: { height: 1, width: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    borderRadius: 15,
    marginVertical: RFValue(5),
  },
  leftBox: {},
  middleBox: {
    flexDirection: "column",
    marginLeft: RFValue(10),
    justifyContent: "center",
    alignItems: "flex-start",
    flexGrow: 1,
  },
  rightBox: {
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: RFValue(10),
  },
  imageContainer: {},
  image: {
    width: RFValue(70),
    height: RFValue(70),
    borderRadius: RFValue(100),
    backgroundColor: Colors.Secondary,
    justifyContent: "center",
    alignItems: "center",
  },
  name: {
    fontSize: RFValue(26),
    fontWeight: "700",
    color: Colors.Text,
  },
  change: {
    fontSize: RFValue(14),
    fontWeight: "600",
    color: Colors.Primary,
    alignItems: "center",
    flexDirection: "row",
  },
});
