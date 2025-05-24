import { Colors } from "@/constants/Colors";
import { IService } from "@/types";
import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

interface ServiceItem {
  title: string;
  icon: any;
  onPress: () => void;
}

interface Props {
  services: IService[];
  containerStyle?: ViewStyle;
  title?: string;
}

const ServiceSection: React.FC<Props> = ({
  services,
  containerStyle,
  title,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {title && <Text style={styles.sectionTitle}>{title}</Text>}
      <ScrollView
        contentContainerStyle={{
          alignItems: "center",
          gap: RFValue(15),
          flexWrap: "wrap",
          paddingVertical: RFValue(10),
          paddingHorizontal: RFValue(15),
        }}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      >
        {services.map((item, index) => (
          <TouchableOpacity
            key={item._id}
            style={styles.card}
            onPress={() => {}}
          >
            <View style={styles.iconWrapper}>
              <Image
                source={{ uri: item.image.url }}
                resizeMethod="auto"
                style={styles.icon}
              />
            </View>
            <Text numberOfLines={1} style={styles.cardText}>
              {item.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: RFValue(10),
  },
  sectionTitle: {
    fontSize: RFValue(10),
    fontWeight: "700",
    color: "#000",
    marginBottom: RFValue(10),
    textAlign: "center",
  },
  rowWrapper: {
    justifyContent: "space-between",
    marginBottom: RFValue(10),
    flexWrap: "wrap",
    gap: RFValue(10),
  },
  card: {
    width: RFValue(70),
    alignItems: "center",
  },
  iconWrapper: {
    width: RFValue(55),
    height: RFValue(55),

    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width: RFValue(65),
    height: RFValue(65),
    resizeMode: "contain",
  },
  cardText: {
    fontSize: RFValue(12),
    textAlign: "center",
    color: Colors.Text,
    fontWeight: "600",
    marginTop: RFValue(10),
  },
});

export default ServiceSection;
