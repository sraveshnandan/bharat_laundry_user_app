import React, { useRef, useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";

type OtpInputProps = {
  onComplete: (otp: string) => void;
  value?: string;
};

export const OtpInput: React.FC<OtpInputProps> = ({ onComplete, value }) => {
  const inputRefs = useRef<Array<TextInput | undefined>>([
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
  ]);
  const [otp, setOtp] = useState(Array(6).fill(""));

  const handleChange = (text: string, index: number) => {
    if (!/^\d*$/.test(text)) return; // only digits

    const updatedOtp = [...otp];
    updatedOtp[index] = text.slice(-1); // only latest digit
    setOtp(updatedOtp);

    if (text && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    if (updatedOtp.every((digit) => digit !== "")) {
      onComplete(updatedOtp.join(""));
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === "Backspace" && otp[index] === "" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <View style={styles.container}>
      {otp.map((digit, index) => (
        <TextInput
          key={index}
          ref={(ref) => (inputRefs.current[index] = ref as TextInput) as any}
          style={styles.input}
          value={digit}
          onChangeText={(text) => handleChange(text, index)}
          onKeyPress={(e) => handleKeyPress(e, index)}
          keyboardType="number-pad"
          maxLength={1}
          autoFocus={index === 0}
          returnKeyType="next"
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 10,
    justifyContent: "center",
    marginTop: 20,
  },
  input: {
    width: 50,
    height: 60,
    borderColor: "#ccc",
    borderWidth: 2,
    borderRadius: 8,
    textAlign: "center",
    fontSize: 24,
    backgroundColor: "#fff",
  },
});
