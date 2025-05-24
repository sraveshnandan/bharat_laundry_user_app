import SectionedListCard from "@/components/Profile/MenuList";
import ProfileHeader from "@/components/Profile/ProfileHeader";
import { Colors } from "@/constants/Colors";
import { Profile1Menu, Profile2Menu } from "@/constants/Data";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { SafeAreaView } from "react-native-safe-area-context";

const Profile = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollContainer}
      >
        <Ionicons
          name="arrow-back"
          size={RFValue(20)}
          onPress={() => router.back()}
        />
        <ProfileHeader />
        {/* Profile Content */}
        <SectionedListCard title="Laundry Orders" options={Profile1Menu} />

        <SectionedListCard title="More" options={Profile2Menu} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: RFPercentage(3),
    backgroundColor: Colors.BG,
  },
  scrollContainer: {
    flex: 1,
  },
});
