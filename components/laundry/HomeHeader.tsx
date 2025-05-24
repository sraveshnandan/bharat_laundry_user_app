import { Colors } from "@/constants/Colors";
import { SearchPlaceHolder } from "@/constants/Data";
import { wp } from "@/constants/Scaling";
import { IUser } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { FC } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import AnimatedSearchBar from "../ui/CustomSearchBar";

type HomeHeaderProp = {
  user?: IUser;
};
const HomeHeader: FC<HomeHeaderProp> = ({ user }) => {
  const handleProfileBtnPress = () => {
    return router.push("/(screens)/Profile");
  };
  return (
    <View style={styles.container}>
      {/* Address bar  */}

      <View style={styles.addressContainer}>
        <View style={styles.addressBox}>
          <Ionicons
            name="location-sharp"
            color={Colors.Primary}
            size={RFValue(34)}
          />
          <View>
            <Text numberOfLines={1} style={styles.addressText}>
              NH32, Bihar Sharif, Nalanda, 803101
              <Ionicons
                name="chevron-down"
                color={Colors.Grey}
                size={RFValue(16)}
              />
            </Text>
            <Text numberOfLines={1} style={styles.addressSubText}>
              Bihar Sharif, Nalanda,803101
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.profileBtn}
          onPress={handleProfileBtnPress}
        >
          <Text style={styles.profileBtnText}>{user?.name || "U"}</Text>
        </TouchableOpacity>
      </View>

      {/* SearchBar  */}
      <AnimatedSearchBar
        leftIcon={
          <Ionicons
            size={RFValue(20)}
            color={Colors.Primary}
            name="search-sharp"
          />
        }
        rightIcon={
          <Ionicons name="mic" size={RFValue(20)} color={Colors.Primary} />
        }
        placeholderList={SearchPlaceHolder}
        onFocus={() => console.log("SearchBar Pressed")}
        style={styles.searchBar}
      />

      {/* CTA  */}

      <View style={styles.CTAContainer}>
        <View
          style={[
            styles.CTABOX,
            {
              position: "relative",
              left: -10,
              transform: [{ rotate: "10deg" }],
            },
          ]}
        >
          <Image
            style={styles.ctaimg0}
            source={require("@/assets/images/icons/cta1.png")}
          />
        </View>
        <View style={styles.CTABOX}>
          <Image
            style={styles.ctaImage}
            source={require("@/assets/images/icons/flash_sale.png")}
          />
        </View>
        <View
          style={[
            styles.CTABOX,
            {
              position: "relative",
              right: -10,
              transform: [{ rotate: "-10deg" }],
            },
          ]}
        >
          <Image
            style={styles.ctaimg0}
            source={require("@/assets/images/icons/cta2.png")}
          />
        </View>
      </View>
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  container: {
    width: wp * 1,
    backgroundColor: Colors.Ascent1,
    paddingHorizontal: RFPercentage(2),
    height: 363,
    borderBottomEndRadius: RFValue(24),
    borderBottomStartRadius: RFValue(24),
    paddingVertical: RFPercentage(2),
  },
  addressContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  addressBox: {
    flexDirection: "row",
    gap: RFValue(4),
    maxWidth: "60%",
    alignItems: "center",
  },
  addressText: {
    fontSize: RFValue(18),
    fontWeight: "600",
    color: Colors.Text,
    alignItems: "center",
    flexDirection: "row",
    gap: RFValue(2),
  },
  addressSubText: {
    fontSize: RFValue(10),
    color: Colors.Grey,
    fontWeight: "600",
  },
  profileBtn: {
    width: RFValue(36),
    height: RFValue(36),
    backgroundColor: Colors.Secondary,
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    borderRadius: 100,
  },
  profileBtnText: {
    fontSize: RFValue(16),
    fontWeight: "600",
    color: Colors.Primary,
  },
  searchBar: {
    backgroundColor: Colors.White,
    marginVertical: RFValue(20),
  },
  CTAContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: RFValue(2),
    maxWidth: wp * 0.9,
  },
  CTABOX: {
    padding: RFValue(10),
  },
  ctaimg0: {},
  ctaImage: {
    width: 145,
    height: 169,
    resizeMode: "contain",
  },
});
