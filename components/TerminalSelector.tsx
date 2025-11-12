import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Modal } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Button } from "./ui/Button";
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withRepeat, 
  withTiming,
  Easing 
} from "react-native-reanimated";

interface TerminalSelectorProps {
  selectedTerminal: string;
  onTerminalChange: (terminal: string) => void;
}

export function TerminalSelector({ selectedTerminal, onTerminalChange }: TerminalSelectorProps) {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const terminals = [
    { label: "Ponta da Espera", value: "Ponta da Espera" },
    { label: "Cujupe", value: "Cujupe" },
  ];

  const rotate = useSharedValue(0);

  useEffect(() => {
    if (isRefreshing) {
      rotate.value = withRepeat(
        withTiming(360, { duration: 1000, easing: Easing.linear }),
        -1,
        false
      );
    } else {
      rotate.value = 0;
    }
  }, [isRefreshing]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotate.value}deg` }],
  }));

  return (
    <View style={styles.container}>
      <View style={styles.selectorContainer}>
        <Text style={styles.label}>Terminal de Partida</Text>
        <TouchableOpacity
          style={styles.select}
          onPress={() => setShowModal(true)}
          activeOpacity={0.7}
        >
          <Text style={styles.selectText}>{selectedTerminal}</Text>
          <Ionicons name="chevron-down" size={20} color="#6b7280" />
        </TouchableOpacity>
      </View>

      <Button
        onPress={handleRefresh}
        style={styles.refreshButton}
      >
        <Animated.View style={animatedStyle}>
          <Ionicons name="refresh" size={20} color="#fff" />
        </Animated.View>
      </Button>

      <Modal
        visible={showModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowModal(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowModal(false)}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Selecione o Terminal</Text>
            {terminals.map((terminal) => (
              <TouchableOpacity
                key={terminal.value}
                style={[
                  styles.modalOption,
                  selectedTerminal === terminal.value && styles.modalOptionSelected,
                ]}
                onPress={() => {
                  onTerminalChange(terminal.value);
                  setShowModal(false);
                }}
              >
                <Text
                  style={[
                    styles.modalOptionText,
                    selectedTerminal === terminal.value && styles.modalOptionTextSelected,
                  ]}
                >
                  {terminal.label}
                </Text>
                {selectedTerminal === terminal.value && (
                  <Ionicons name="checkmark" size={20} color="#2563eb" />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 12,
  },
  selectorContainer: {
    flex: 1,
  },
  label: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 8,
  },
  select: {
    width: "100%",
    height: 48,
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#bfdbfe",
    borderRadius: 12,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  selectText: {
    fontSize: 16,
    color: "#1f2937",
  },
  refreshButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#22d3ee",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    width: "100%",
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: 16,
  },
  modalOption: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    backgroundColor: "#f9fafb",
  },
  modalOptionSelected: {
    backgroundColor: "#dbeafe",
  },
  modalOptionText: {
    fontSize: 16,
    color: "#1f2937",
  },
  modalOptionTextSelected: {
    color: "#2563eb",
    fontWeight: "600",
  },
});

