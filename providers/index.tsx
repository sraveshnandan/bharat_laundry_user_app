import { View } from "react-native";
import React from "react";
import { ConvexProvider } from "convex/react";
import { ConvexClient } from "convex/browser";

const MainProviders = ({ children }: { children: any }) => {
  const convex = new ConvexClient(process.env.EXPO_PUBLIC_CONVEX_URL!);
  return (
    <View>
      <ConvexProvider client={convex as any}>{children}</ConvexProvider>
    </View>
  );
};

export default MainProviders;
