import MapSelector from "@/components/map";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";

import LocationSearchModel from "@/components/models/LocationSearchModel";
import CustomButton from "@/components/ui/CustomButton";
import { LoadingOverlay } from "@/components/ui/LoadingOverLay";
import { Colors } from "@/constants/Colors";
import { startPoints } from "@/constants/Data";
import { getAddress } from "@/utils";
import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";
import { router } from "expo-router";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

const AddressScreen = () => {
  const [userLocation, setUserLocation] = useState<Record<string, number>>({
    lat: 25.4711,
    lng: 85.7062,
  });

  const [initialLocation, setInitialLocation] = useState<
    Record<string, number>
  >({
    lat: 25.4711,
    lng: 85.7062,
  });

  const [addressData, setAddressData] = useState<Record<string, any> | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [showLocationModel, setShowLocationModel] = useState<boolean>(false);

  const addressSlideAnim = useRef(new Animated.Value(300)).current;

  const getCurrentLocation = async () => {
    try {
      setLoading(true);
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        ToastAndroid.show("Permission to access location was denied", 2000);
        return;
      }

      let location = await Location.getCurrentPositionAsync({});

      const userLocationData = {
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      };

      setInitialLocation(userLocationData);
      setUserLocation(userLocationData);
    } catch (error) {
      ToastAndroid.show("Unable to get your location", 2000);
    } finally {
      setLoading(false);
    }
  };

  const ReverseGeoCode = async () => {
    try {
      const data = await getAddress(userLocation.lat, userLocation.lng);
      if (data) {
        setAddressData({ ...(data as any) });
      } else {
        ToastAndroid.show("Unable to fetch address", 2000);
      }
    } catch (error) {
      ToastAndroid.show("Unable to fetch address", 2000);
    }
  };

  useEffect(() => {
    ReverseGeoCode();
  }, [userLocation]);

  useEffect(() => {
    Animated.timing(addressSlideAnim, {
      toValue: addressData ? 0 : 300,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [addressData]);

  const handleVerifyAddress = async () => {
    try {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      ToastAndroid.show("Address verified successfully", 2000);
      return router.replace("/(tabs)/Booking");
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => setShowLocationModel((prev) => !prev)}
        style={styles.searchBar}
      >
        <Ionicons
          name="search-sharp"
          size={RFValue(20)}
          color={Colors.Primary}
        />
        <Text style={styles.searchInput}>Search for area, street...</Text>
      </TouchableOpacity>
      {/* map container  */}
      <View style={styles.mapContainer}>
        <MapSelector
          markers={startPoints.map((p) => ({
            lat: p.lat,
            lng: p.lng,
            title: "Center Point",
          }))}
          initialLat={initialLocation.lat}
          initialLng={initialLocation.lng}
          userLocation={userLocation as any}
          onLocationSelect={(location) => {
            setUserLocation(location);
          }}
        />
      </View>

      <View
        style={[
          styles.bottomContainer,
          { bottom: addressData ? RFPercentage(30) : RFPercentage(10) },
        ]}
      >
        <TouchableOpacity
          onPress={getCurrentLocation}
          style={styles.locationBtn}
        >
          <Ionicons
            name="map-sharp"
            size={RFValue(16)}
            color={Colors.Primary}
          />
          <Text style={styles.btnText}>Use current location</Text>
        </TouchableOpacity>
      </View>

      <Animated.View
        style={[
          styles.addressContainer,
          { transform: [{ translateY: addressSlideAnim }] },
        ]}
      >
        <Text style={styles.greenText}>DELIVERING YOUR ORDER TO:</Text>

        <View style={styles.flexRow}>
          <View style={[styles.flexRow, { gap: RFValue(5) }]}>
            <Ionicons
              name="location-sharp"
              size={RFValue(30)}
              color={Colors.Primary}
            />

            <View style={styles.addressName}>
              <Text numberOfLines={2} style={styles.location_text}>
                {addressData?.display_name || ""}
              </Text>
              <Text>{`${addressData?.address?.state_district}, ${addressData?.address?.state}`}</Text>
            </View>

            <Text
              onPress={() => setShowLocationModel((prev) => !prev)}
              style={styles.changeText}
            >
              Change
            </Text>
          </View>
        </View>

        <CustomButton
          title="Confirm Location"
          onPressAction={handleVerifyAddress}
        />
      </Animated.View>

      <LoadingOverlay visible={loading} message="Updating Location..." />
      <LocationSearchModel
        visible={showLocationModel}
        onSelect={(lat, lng) => {
          setUserLocation({ lat, lng });
        }}
        onClose={() => setShowLocationModel(false)}
        onValueChange={(data) => setShowLocationModel((prev) => !prev)}
        showModel={showLocationModel}
        setShowModel={setShowLocationModel}
      />
    </View>
  );
};

export default AddressScreen;

const styles = StyleSheet.create({
  searchBar: {
    height: 60,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
    flexDirection: "row",
    backgroundColor: Colors.White,
    alignItems: "center",
    position: "absolute",
    top: RFValue(20),
    left: 20,
    right: 20,
    zIndex: 10,
  },
  searchInput: {
    fontSize: RFValue(16),
    fontWeight: "500",
    flex: 1,
    marginLeft: 10,
  },
  container: {
    flex: 1,
    position: "relative",
  },
  mapContainer: {
    flex: 1,
  },
  locationBtn: {
    borderWidth: 1,
    borderColor: Colors.Primary,
    flexDirection: "row",
    alignItems: "center",
    gap: RFValue(5),
    paddingHorizontal: RFValue(10),
    paddingVertical: RFValue(6),
    borderRadius: RFValue(12),
    backgroundColor: Colors.White,
    shadowColor: Colors.Grey,
    shadowOffset: { height: 1, width: 1 },
    shadowRadius: 12,
    shadowOpacity: 0.7,
  },
  btnText: {
    fontWeight: "600",
    fontSize: RFValue(12),
  },
  bottomContainer: {
    position: "absolute",
    left: 0,
    right: 0,

    alignItems: "center",
    zIndex: 2,
  },
  addressContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: RFPercentage(2),
    backgroundColor: Colors.White,
    borderRadius: RFValue(10),
    shadowColor: Colors.Grey,
    shadowOffset: { height: 1, width: 1 },
    shadowRadius: 12,
    shadowOpacity: 0.7,
    paddingHorizontal: RFPercentage(3),
    zIndex: 1,
  },
  greenText: {
    color: Colors.Green,
    fontWeight: "600",
    fontSize: RFValue(14),
    marginBottom: RFPercentage(2),
  },
  flexRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: RFPercentage(2),
    alignItems: "center",
  },
  addressName: {
    maxWidth: "70%",
    flexDirection: "column",
    alignItems: "flex-start",
    overflow: "hidden",
  },
  location_text: {
    fontSize: RFValue(18),
    fontWeight: "600",
    color: Colors.Text,
  },
  changeText: {
    fontSize: RFValue(14),
    fontWeight: "600",
    color: Colors.Primary,
  },
});
