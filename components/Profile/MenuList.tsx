import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ViewStyle,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

interface OptionItem {
  title: string;
  icon: ImageData;
  onPress?: () => void;
  path: string;
  end?: boolean;
}

interface Props {
  title: string;
  options: OptionItem[];
  containerStyle?: ViewStyle;
}

const SectionedListCard: React.FC<Props> = ({
  title,
  options,
  containerStyle,
}) => {
  const handleOnPress = (path: string) => {
    return router.navigate(path as any);
  };
  return (
    <View style={[styles.card, containerStyle]}>
      <View style={styles.topDecorator} />
      <Text style={styles.title}>{title}</Text>
      {options.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.row}
          activeOpacity={0.7}
          onPress={() => handleOnPress(item.path)}
        >
          <View style={styles.iconWrapper}>
            <Image source={item.icon} style={styles.icon} />
          </View>
          <Text style={styles.optionText}>{item.title}</Text>
          <Ionicons
            name="chevron-forward"
            size={18}
            color="#bbb"
            style={{ marginLeft: "auto" }}
          />
          <View style={[styles.separator, item.end && { opacity: 0 }]} />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    position: "relative",
    backgroundColor: "#fff",
    borderRadius: RFValue(12),
    paddingVertical: RFValue(10),
    paddingHorizontal: RFValue(14),
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginVertical: RFValue(12),
  },
  title: {
    fontSize: RFValue(16),
    fontWeight: "700",
    color: "#000",
    marginBottom: RFValue(10),
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: RFValue(12),
  },
  iconWrapper: {
    width: RFValue(34),
    height: RFValue(34),
    borderRadius: RFValue(16),
    backgroundColor: "#f1f3f5",
    justifyContent: "center",
    alignItems: "center",
    marginRight: RFValue(12),
  },
  icon: {
    width: RFValue(16),
    height: RFValue(16),
    resizeMode: "contain",
    tintColor: "#6b7280",
  },
  optionText: {
    fontSize: RFValue(14),
    color: "#111",
    fontWeight: "600",
  },
  topDecorator: {
    position: "absolute",
    width: RFValue(5),
    height: RFValue(20),
    borderTopRightRadius: RFValue(12),
    borderBottomRightRadius: RFValue(12),
    left: 0,
    top: RFValue(12),
    backgroundColor: Colors.Primary,
  },
  separator: {
    height: RFValue(2),
    width: "90%",
    backgroundColor: Colors.BG,
    position: "absolute",
    bottom: 0,
    right: RFValue(-25),
  },
});

export default SectionedListCard;
