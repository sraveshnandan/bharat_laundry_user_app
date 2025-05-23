import { Alert, ToastAndroid } from "react-native";

export const ShowToast = (message: string, type: string) => {
  return Alert.prompt("Hi", "How are you", (text: string) => {
    console.log(text);
  });
};
