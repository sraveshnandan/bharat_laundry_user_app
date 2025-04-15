import { View, Modal, StyleSheet, TouchableOpacity } from "react-native";
import React, { Dispatch, FC, ReactNode, SetStateAction } from "react";
import { Colors } from "@/constants/Colors";
import { hp } from "@/constants/Scaling";
import { RFValue } from "react-native-responsive-fontsize";
import { Ionicons } from "@expo/vector-icons";

const CustomModel: FC<{
  showModel: boolean;
  setShowModel: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
  containerHeight?: number;
}> = ({ showModel, setShowModel, containerHeight = 0.65, children }) => {
  return (
    <Modal
      visible={showModel}
      onRequestClose={() => setShowModel(false)}
      transparent
      animationType="slide"
      statusBarTranslucent
      collapsable
      hardwareAccelerated
    >
      <View style={styles.modelContainer}>
        {/* close button  */}
        <TouchableOpacity
          onPress={() => setShowModel(false)}
          style={styles.closeButton}
        >
          <Ionicons name="close" color={Colors.White} size={RFValue(22)} />
        </TouchableOpacity>
        <View style={[styles.mainContainer, { height: hp * containerHeight }]}>
          {/* main model container  */}
          {children}
        </View>
      </View>
    </Modal>
  );
};

export default CustomModel;

const styles = StyleSheet.create({
  modelContainer: {
    backgroundColor: Colors.Grey,
    width: "100%",
    height: hp * 1,
    justifyContent: "flex-end",
  },
  mainContainer: {
    width: "100%",
    backgroundColor: Colors.White,
    borderTopLeftRadius: RFValue(16),
    borderTopRightRadius: RFValue(16),
    padding: RFValue(16),
  },
  closeButton: {
    backgroundColor: Colors.Grey,
    marginHorizontal: "auto",
    marginBottom: RFValue(10),
    alignItems: "center",
    justifyContent: "center",
    padding: RFValue(8),
    borderRadius: 99,
  },
});
