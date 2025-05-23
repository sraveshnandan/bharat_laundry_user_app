import React, { memo, useEffect, useRef } from "react";
import { View } from "react-native";
import { WebView, WebViewMessageEvent } from "react-native-webview";
type MarkerType = {
  lat: number;
  lng: number;
  title?: string;
  color?: string; // Hex or named
};

type MapSelectorProps = {
  initialLat: number;
  initialLng: number;
  markers?: MarkerType[];
  userLocation?: { lat: number; lng: number };
  onLocationSelect: (location: { lat: number; lng: number }) => void;
};

const MapSelector: React.FC<MapSelectorProps> = ({
  initialLat,
  initialLng,
  markers = [],
  userLocation,
  onLocationSelect,
}) => {
  const webViewRef = useRef<WebView>(null);

  // Dynamically add static markers
  const injectedMarkers = markers
    .map(
      (m, i) => `
      var customIcon${i} = L.icon({
        iconUrl: "https://maps.gstatic.com/mapfiles/api-3/images/spotlight-poi2_hdpi.png",
        iconSize: [30, 45],
        iconAnchor: [15, 45],
        popupAnchor: [0, -30]
      });

      var marker${i} = L.marker([${m.lat}, ${
        m.lng
      }], { icon: customIcon${i} }).addTo(map);
      marker${i}.bindPopup("${m.title || `Marker ${i + 1}`}");
      
      marker${i}.on('click', function() {
        window.ReactNativeWebView?.postMessage(JSON.stringify({
          type: "marker-click",
          data: { lat: ${m.lat}, lng: ${m.lng}, title: "${
        m.title || `Marker ${i + 1}`
      }" }
        }));
      });
    `
    )
    .join("\n");

  // Core HTML for the WebView
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" />
      <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>
      <style>#map { height: 100vh; width: 100vw; }</style>
    </head>
    <body>
      <div id="map"></div>
      <script>
        const map = L.map('map', { zoomControl: false }).setView([${initialLat}, ${initialLng}], 15);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

        let userMarker;

        // Handle user click
        map.on('click', function(e) {
          if (e.originalEvent) e.originalEvent.preventDefault();
          if (userMarker) map.removeLayer(userMarker);
          userMarker = L.marker([e.latlng.lat, e.latlng.lng]).addTo(map);
          window.ReactNativeWebView?.postMessage(JSON.stringify({ lat: e.latlng.lat, lng: e.latlng.lng }));
        });

        // Render static markers
        ${injectedMarkers}

        // Enable external JS updates
        window.updateUserMarker = function(lat, lng) {
          if (userMarker) map.removeLayer(userMarker);
          userMarker = L.marker([lat, lng]).addTo(map).bindPopup("Your current location")
          map.setView([lat, lng], 15);
        };
      </script>
    </body>
    </html>
  `;

  // When userLocation changes from props, update the marker on map
  useEffect(() => {
    if (userLocation && webViewRef.current) {
      const js = `window.updateUserMarker(${userLocation.lat}, ${userLocation.lng}); true;`;
      webViewRef.current.injectJavaScript(js);
    }
  }, [userLocation]);

  const handleMessage = (event: WebViewMessageEvent) => {
    const message = JSON.parse(event.nativeEvent.data);
    if (message.type === "marker-click") {
      console.log("Marker clicked:", message.data);
    } else {
      onLocationSelect(message);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <WebView
        ref={webViewRef}
        source={{ html }}
        onMessage={handleMessage}
        javaScriptEnabled
        domStorageEnabled
        originWhitelist={["*"]}
      />
    </View>
  );
};

export default memo(MapSelector);
