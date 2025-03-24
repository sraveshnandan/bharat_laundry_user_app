import React, { useState } from "react";
import { View, Alert, ToastAndroid } from "react-native";
import { WebView } from "react-native-webview";

const MapScreen = () => {
  const [marker, setMarker] = useState<{ lat: number; lng: number } | null>(
    null
  );

  // ✅ Multiple Start Points
  const startPoints = [
    { lat: 25.47108738155989, lng: 85.70622655274713 }, // Start Point 1
    { lat: 25.48, lng: 85.72 }, // Start Point 2
    { lat: 25.46, lng: 85.69 }, // Start Point 3
  ];

  // ✅ Function to Calculate Distance (Haversine Formula)
  const getDistanceFromLatLonInKm = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ) => {
    const R = 6371; // Earth's radius in km
    const degToRad = (deg: number) => deg * (Math.PI / 180);

    const dLat = degToRad(lat2 - lat1);
    const dLon = degToRad(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(degToRad(lat1)) *
        Math.cos(degToRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // Distance in km
  };

  // ✅ Handle Location Selection
  const handleMessage = (event: any) => {
    const userLocation = JSON.parse(event.nativeEvent.data);
    setMarker(userLocation);

    // ✅ Check if the selected location is within 5km of any start point
    const isWithin5km = startPoints.some((point) => {
      const distance = getDistanceFromLatLonInKm(
        point.lat,
        point.lng,
        userLocation.lat,
        userLocation.lng
      );

      console.log(
        `Distance from (${point.lat}, ${point.lng}): ${distance.toFixed(2)} km`
      );
      return distance <= 5;
    });

    // ✅ Show Alert
    if (isWithin5km) {
      Alert.alert("Service Available.", "You are in serviceable area.", [
        {
          text: "OK",
          onPress: () => console.log("hi"),
        },
        {
          text: "Cancel",
          onPress: () => console.log("cancel"),
        },
      ]);
    } else {
      ToastAndroid.show("Test", 3000);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <WebView
        source={{
          html: `
            <!DOCTYPE html>
            <html>
            <head>
              <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
              <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" />
              <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>
            </head>
            <body>
              <div id="map" style="width: 100vw; height: 100vh;"></div>
              <script>
                var map = L.map('map').setView([25.4711, 85.7062], 10);
                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

                var marker;
                map.on('click', function(e) {
                  if (marker) {
                    map.removeLayer(marker);
                  }
                  marker = L.marker([e.latlng.lat, e.latlng.lng]).addTo(map);
                  window.ReactNativeWebView.postMessage(JSON.stringify({ lat: e.latlng.lat, lng: e.latlng.lng }));
                });
              </script>
            </body>
            </html>
          `,
        }}
        onMessage={handleMessage}
        javaScriptEnabled={true}
        domStorageEnabled={true}
      />
    </View>
  );
};

export default MapScreen;
