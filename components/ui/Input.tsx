import React from "react";
import { TextInput, StyleSheet, ViewStyle, TextInputProps } from "react-native";

interface InputProps extends TextInputProps {
  style?: ViewStyle;
}

export function Input({ style, ...props }: InputProps) {
  return (
    <TextInput
      style={[styles.input, style]}
      placeholderTextColor="#9ca3af"
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    height: 44,
    width: "100%",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#d1d5db",
    paddingHorizontal: 12,
    fontSize: 16,
    backgroundColor: "#fff",
  },
});

