import React, { useEffect, useState } from "react";
import {
    FlatList,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    ToastAndroid,
    View,
} from "react-native";

import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { RFValue } from "react-native-responsive-fontsize";

type Place = {
  display_name: string;
  lat: string;
  lon: string;
};

type Props = {
  onSelect: (lat: number, lng: number, label: string) => void;
};

export default function FloatingSearchBar({ onSelect }: Props) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Place[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      if (query.length < 3) return setResults([]);
      try {
        setLoading(true);
        const options = {
          method: "GET",
          url: "https://eu1.locationiq.com/v1/search",
          params: {
            q: query,
            format: "json",
            key: "pk.0c5cedc2f0e0dbd014b872c360afd042",
          },
          headers: { accept: "application/json" },
        };
        const { data } = await axios.request(options);
        setResults(data);
      } catch (error) {
        console.log(error);
        ToastAndroid.show("Failed to fetch data", ToastAndroid.SHORT);
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [query.length]);

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <Ionicons
          size={RFValue(24)}
          color={Colors.Primary}
          name="search-sharp"
        />
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="search for area, streets...."
          style={styles.searchInput}
        />
      </View>
      {results.length > 0 && (
        <View style={styles.dropdown}>
          <FlatList
            data={results}
            keyExtractor={(item, i) => i.toString()}
            renderItem={({ item }) => (
              <Pressable
                onPress={() => {
                  onSelect(
                    parseFloat(item.lat),
                    parseFloat(item.lon),
                    item.display_name
                  );
                  setQuery(item.display_name);
                  setResults([]);
                }}
              >
                <Text style={styles.resultItem}>{item.display_name}</Text>
              </Pressable>
            )}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: RFValue(20),
    left: 20,
    right: 20,
    zIndex: 10,
  },
  input: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    fontSize: 16,
    elevation: 3,
  },
  dropdown: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginTop: 4,
    maxHeight: 200,
    elevation: 4,
  },
  resultItem: {
    padding: 10,
    borderBottomColor: "#eee",
    borderBottomWidth: 1,
  },
  searchBar: {
    height: 60,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
    flexDirection: "row",
    backgroundColor: Colors.White,
    alignItems: "center",
  },
  searchInput: {
    fontSize: RFValue(16),
    fontWeight: "500",
    flex: 1,
    marginLeft: 10,
  },
});
