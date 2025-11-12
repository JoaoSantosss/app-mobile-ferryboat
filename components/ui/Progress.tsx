import React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";

interface ProgressProps {
  value: number;
  style?: ViewStyle;
}

export function Progress({ value, style }: ProgressProps) {
  const percentage = Math.min(Math.max(value, 0), 100);

  return (
    <View style={[styles.container, style]}>
      <View style={[styles.bar, { width: `${percentage}%` }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 8,
    backgroundColor: "#e5e7eb",
    borderRadius: 4,
    overflow: "hidden",
  },
  bar: {
    height: "100%",
    backgroundColor: "#3b82f6",
    borderRadius: 4,
  },
});

