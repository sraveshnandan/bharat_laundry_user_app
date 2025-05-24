import { Colors } from "@/constants/Colors";
import { wp } from "@/constants/Scaling";
import { IBanner } from "@/types";
import React, { useEffect, useRef, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

interface Props {
  data: IBanner[];
  autoScrollInterval?: number;
  onPressCTA?: (item: IBanner) => void;
  containerStyle?: ViewStyle;
}

const AutoScrollBannerSlider: React.FC<Props> = ({
  data,
  autoScrollInterval = 4000,
  onPressCTA,
  containerStyle,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      let nextIndex = (currentIndex + 1) % data.length;
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
      setCurrentIndex(nextIndex);
    }, autoScrollInterval);
    return () => clearInterval(interval);
  }, [currentIndex, data.length]);

  return (
    <View style={[styles.wrapper, containerStyle]}>
      <FlatList
        ref={flatListRef}
        horizontal
        pagingEnabled
        data={data}
        keyExtractor={(item, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={[styles.card, { backgroundColor: item.bg_color }]}>
            <View style={styles.leftSection}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.description}>{item.description}</Text>
              {item.sub_cta_text && (
                <View style={styles.subCta}>
                  <Text numberOfLines={1} style={styles.subCtaText}>
                    {item.sub_cta_text}
                  </Text>
                </View>
              )}
              <TouchableOpacity
                onPress={() => onPressCTA?.(item)}
                style={styles.ctaButton}
              >
                <Text style={styles.ctaText}>{item.cta_button_text}</Text>
              </TouchableOpacity>
            </View>
            <Image source={item.image} style={styles.bannerImage} />
          </View>
        )}
        onMomentumScrollEnd={(event) => {
          const index = Math.round(
            event.nativeEvent.contentOffset.x /
              event.nativeEvent.layoutMeasurement.width
          );
          setCurrentIndex(index);
        }}
      />
      <View style={styles.dotsContainer}>
        {data.map((_, i) => (
          <View
            key={i}
            style={[styles.dot, currentIndex === i && styles.activeDot]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    height: wp * 0.4,
    width: wp * 0.9,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: RFValue(16),
    borderRadius: RFValue(16),
    marginRight: RFValue(10),
    width: wp * 0.88,
  },
  leftSection: {
    flex: 1,
  },
  title: {
    fontSize: RFValue(18),
    fontWeight: "800",
    color: Colors.White,
    maxWidth: "80%",
  },
  description: {
    fontSize: RFValue(14),
    fontWeight: "500",
    maxWidth: "60%",
    color: Colors.White,
    opacity: 0.9,
  },
  subCta: {
    position: "absolute",
    top: RFValue(-10),
    right: RFValue(-5),
    width: "40%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    padding: RFValue(3),
    borderBottomEndRadius: 15,
    borderBottomStartRadius: 15,
  },
  subCtaText: {
    fontSize: RFValue(9),
    color: Colors.Text,
  },
  ctaButton: {
    marginTop: RFValue(8),
    paddingVertical: RFValue(5),
    paddingHorizontal: RFValue(12),
    backgroundColor: "#fff",
    borderRadius: RFValue(15),
    alignSelf: "flex-start",
  },
  ctaText: {
    fontSize: RFValue(11),
    fontWeight: "600",
    color: Colors.Primary,
  },
  bannerImage: {
    width: RFValue(100),
    height: RFValue(100),
    resizeMode: "contain",
    position: "absolute",
    right: RFValue(0),
    bottom: RFValue(0),
    zIndex: 1,
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: RFValue(6),
    alignItems: "center",
  },
  dot: {
    width: RFValue(7),
    height: RFValue(7),
    borderRadius: 100,
    backgroundColor: "#000",
    marginHorizontal: 4,
    opacity: 0.3,
  },
  activeDot: {
    width: RFValue(10),
    height: RFValue(10),
    opacity: 1,
  },
});

export default AutoScrollBannerSlider;
