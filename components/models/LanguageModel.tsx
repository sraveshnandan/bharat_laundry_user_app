import { Colors } from "@/constants/Colors";
import { hp } from "@/constants/Scaling";
import React, { Dispatch, FC, SetStateAction, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import CustomButton from "../ui/CustomButton";
import CustomModel from "../ui/CustomModel";

const Languages = [
  {
    name: "English",
    value: "en",
  },
  {
    name: "Hindi",
    value: "hi",
  },
];

const LanguageModel: FC<{
  showModel: boolean;
  setShowModel: Dispatch<SetStateAction<boolean>>;
  onValueChange: (data: string) => void;
}> = ({ showModel, setShowModel, onValueChange }) => {
  const [selectedValue, setSelectedValue] = useState<string>("en");
  // handling language change
  const handlePress = (data: { name: string; value: string }) => {
    setSelectedValue(data?.value);
    return onValueChange(data?.value);
  };

  // handling main select fn

  const handleSelect = () => {
    setShowModel(false);
    return onValueChange(selectedValue);
  };
  return (
    <CustomModel
      showModel={showModel}
      modelBackgroundColor={Colors.BackGround}
      setShowModel={setShowModel}
      containerHeight={0.65}
      children={
        <View style={styles.container}>
          <Text style={styles.heading}>Choose your language</Text>

          <View style={styles.lanContainer}>
            {Languages.map((item, index) => (
              <TouchableOpacity
                onPress={() => handlePress(item)}
                style={[
                  styles.langBox,
                  selectedValue === item.value && {
                    borderColor: Colors.Primary,
                    borderWidth: 2,
                  },
                ]}
                key={index}
              >
                <View style={styles.radio}>
                  <View
                    style={[
                      styles.innerRadio,
                      selectedValue === item.value && {
                        backgroundColor: Colors.Primary,
                      },
                    ]}
                  ></View>
                </View>
                <Text style={styles.lanText}>{item?.name}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View>
            <CustomButton title="Select" onPressAction={() => handleSelect()} />
          </View>
        </View>
      }
    />
  );
};

export default LanguageModel;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
  },
  heading: {
    fontSize: RFValue(22),
    fontFamily: "Urbanist",
    fontWeight: "800",
  },
  lanContainer: {
    flexGrow: 1,
    marginTop: RFValue(10),
  },
  langBox: {
    backgroundColor: Colors.White,
    padding: RFValue(8),
    marginVertical: RFValue(10),
    flexDirection: "row",
    alignItems: "center",
    borderRadius: RFValue(8),
    gap: RFValue(12),
    height: hp * 0.12,
  },
  radio: {
    width: RFValue(26),
    height: RFValue(26),
    borderColor: Colors.Primary,
    borderWidth: 3,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  lanText: {
    fontSize: RFValue(22),
    fontWeight: "condensed",
    fontFamily: "Urbanist",
  },
  innerRadio: {
    width: RFValue(14),
    height: RFValue(14),
    borderRadius: 100,
  },
});
