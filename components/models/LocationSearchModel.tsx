import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import React, {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import CustomModel from "../ui/CustomModel";

type Place = {
  display_name: string;
  lat: string;
  lon: string;
};

type Props = {
  visible: boolean;
  onClose: () => void;
  onSelect: (lat: number, lng: number, label: string) => void;
  showModel: boolean;
  setShowModel: Dispatch<SetStateAction<boolean>>;
  onValueChange: (data: string) => void;
};

const LocationSearchModel: FC<Props> = ({
  showModel,
  setShowModel,
  onValueChange,
  onSelect,
  onClose,
}) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Place[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      if (query.length < 3) return setResults([]);
      try {
        setLoading(true);
        const { data } = await axios.get(
          "https://eu1.locationiq.com/v1/search",
          {
            params: {
              q: query,
              format: "json",
              key: "pk.0c5cedc2f0e0dbd014b872c360afd042",
            },
          }
        );
        setResults(data);
      } catch (error) {
        console.log(error);
        ToastAndroid.show("Failed to fetch data", ToastAndroid.SHORT);
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [query]);
  return (
    <CustomModel
      modelBackgroundColor={Colors.BackGround}
      showModel={showModel}
      setShowModel={setShowModel}
      containerHeight={0.85}
      children={
        <View style={styles.container}>
          <Text style={styles.heading}>Select a location</Text>

          <View style={styles.container}>
            <View style={styles.searchBar}>
              {loading ? (
                <ActivityIndicator size="small" color={Colors.Primary} />
              ) : (
                <Ionicons
                  name="search-sharp"
                  size={RFValue(20)}
                  color={Colors.Primary}
                />
              )}
              <TextInput
                value={query}
                onChangeText={setQuery}
                placeholder="Search for area, streets..."
                style={styles.searchInput}
              />
            </View>

            {results.length > 0 && (
              <View style={styles.dropdown}>
                <FlatList
                  data={results}
                  keyExtractor={(item, i) => i.toString()}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={styles.resultItem}
                      onPress={() => {
                        onSelect(
                          parseFloat(item.lat),
                          parseFloat(item.lon),
                          item.display_name
                        );
                        setQuery(item.display_name);
                        setResults([]);
                        setQuery("");
                        onValueChange("");
                        onClose();
                      }}
                    >
                      <Text style={styles.resultText}>{item.display_name}</Text>
                    </TouchableOpacity>
                  )}
                />
              </View>
            )}
          </View>
        </View>
      }
    />
  );
};

export default LocationSearchModel;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    backgroundColor: Colors.BackGround,
  },
  heading: {
    fontSize: RFValue(18),
    fontFamily: "Urbanist",
    fontWeight: "800",
    paddingBottom: RFValue(10),
  },

  bodyContainer: {
    width: "90%",
    backgroundColor: Colors.White,
    padding: 16,
    borderRadius: 10,
    elevation: 5,
  },
  searchBar: {
    height: 60,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
    flexDirection: "row",
    backgroundColor: Colors.White,
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.Grey,
  },
  searchInput: {
    fontSize: RFValue(16),
    fontWeight: "500",
    flex: 1,
    marginLeft: 10,
  },
  dropdown: {
    backgroundColor: "transparent",
  },
  resultItem: {
    padding: 10,
    borderBottomColor: Colors.Text,
    marginTop: RFValue(5),
    maxHeight: 200,
    backgroundColor: Colors.Secondary,
    borderRadius: 10,
    elevation: 5,
    shadowColor: Colors.White,
    shadowOffset: { height: 1, width: 1 },
    shadowRadius: 12,
    shadowOpacity: 0.7,
  },
  resultText: {
    fontSize: RFValue(16),
    fontWeight: "500",
    color: Colors.Text,
  },
});
