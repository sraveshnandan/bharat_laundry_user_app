import { Colors } from "@/constants/Colors";
import { hairLineWidth } from "@/constants/Scaling";
import { Ionicons } from "@expo/vector-icons";

import React, { FC } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

type CustomInputProps = {
  placeholder: string;
  Label?: string;
  value: string;
  RightIcon?: React.ReactNode;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  error?: string | null;
};
const CustomInput: FC<
  CustomInputProps & React.InputHTMLAttributes<HTMLInputElement>
> = ({
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  Label,
  RightIcon,
  error,
  ...props
}) => {
  return (
    <View>
      {Label && <Text style={styles.label}>{Label}</Text>}
      <View
        style={[styles.inputContainer, { borderColor: error ? "red" : "#888" }]}
      >
        {RightIcon && (
          <Ionicons
            name="ios-eye-off"
            size={RFValue(16)}
            color={secureTextEntry ? Colors.Grey : Colors.Primary}
            style={{ marginLeft: RFValue(8) }}
          />
        )}
        <TextInput
          {...props}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          style={[styles.input]}
        />
        {value && (
          <Ionicons
            onPress={() => onChangeText("")}
            name="close-circle-sharp"
            size={RFValue(16)}
            color={Colors.Grey}
            style={{ marginLeft: RFValue(8) }}
          />
        )}
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  input: {
    fontSize: RFValue(16),
    fontWeight: "500",
    flexGrow: 1,
    maxWidth: "90%",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#888",
    borderWidth: hairLineWidth,
    borderRadius: 12,
    padding: RFValue(8),
    height: RFValue(50),
  },
  label: {
    fontSize: RFValue(16),
    fontWeight: "500",
    marginBottom: RFValue(8),
    color: "#000",
  },
  error: {
    color: "red",
    fontSize: RFValue(12),
    fontWeight: "600",
  },
});
