import React, { useState, useRef } from "react";
import { View, Alert } from "react-native";
import { WebView } from "react-native-webview";

const OPENROUTESERVICE_API_KEY =
  "5b3ce3597851110001cf6248b778d4abc75545b092659373b815b066";

const MapScreen = () => {
  const [markers, setMarkers] = useState<{ lat: number; lng: number }[]>([]);
  const webViewRef = useRef<WebView>(null); // ✅ Define WebView Ref

  // ✅ Fetch Route from OpenRouteService
  const getRoute = async (
    start: { lat: number; lng: number },
    end: { lat: number; lng: number }
  ) => {
    const url = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${OPENROUTESERVICE_API_KEY}&start=${start.lng},${start.lat}&end=${end.lng},${end.lat}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      const route = data.features[0].geometry.coordinates.map(
        ([lng, lat]: number[]) => ({ lat, lng })
      );
      return route;
    } catch (error) {
      console.error("Error fetching route:", error);
      Alert.alert("Error", "Failed to load directions");
      return null;
    }
  };

  // ✅ Handle User Click on Map
  const handleMessage = async (event: any) => {
    const userLocation = JSON.parse(event.nativeEvent.data);
    setMarkers((prev) => [...prev, userLocation].slice(-2)); // Store max 2 markers

    if (markers.length === 1) {
      const route = await getRoute(markers[0], userLocation);
      if (route) {
        sendRouteToWebView(route);
      }
    }
  };

  // ✅ Send Route to WebView
  const sendRouteToWebView = (route: { lat: number; lng: number }[]) => {
    webViewRef.current?.injectJavaScript(`
      drawRoute(${JSON.stringify(route)});
    `);
  };

  return (
    <View style={{ flex: 1 }}>
      <WebView
        ref={webViewRef} // ✅ Use useRef here
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
                var map = L.map('map').setView([25.4711, 85.7062], 13);
                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

                var markers = [];
                var routeLayer;

                map.on('click', function(e) {
                  if (markers.length >= 2) {
                    markers.forEach(m => map.removeLayer(m));
                    markers = [];
                  }

                  var marker = L.marker([e.latlng.lat, e.latlng.lng]).addTo(map);
                  markers.push(marker);
                  window.ReactNativeWebView.postMessage(JSON.stringify({ lat: e.latlng.lat, lng: e.latlng.lng }));
                });

                function drawRoute(route) {
                  if (routeLayer) {
                    map.removeLayer(routeLayer);
                  }
                  var latlngs = route.map(point => [point.lat, point.lng]);
                  routeLayer = L.polyline(latlngs, { color: 'blue', weight: 5 }).addTo(map);
                }
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
