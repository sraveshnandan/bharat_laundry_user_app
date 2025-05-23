import { startPoints } from "@/constants/Data";
import { getDistanceFromLatLonInKm } from "@/utils";
import React, { useState } from "react";
import { Alert, ToastAndroid, View } from "react-native";
import { WebView } from "react-native-webview";

const MapScreen = () => {
  const [marker, setMarker] = useState<{ lat: number; lng: number } | null>(
    null
  );

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
