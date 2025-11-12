import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Animated, { useAnimatedStyle, withSpring } from "react-native-reanimated";
import type { TabType } from "../types";

interface BottomNavProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  const tabs = [
    { id: "home" as TabType, icon: "home" as const, label: "Início" },
    { id: "buy" as TabType, icon: "cart" as const, label: "Comprar" },
    { id: "checkin" as TabType, icon: "qr-code" as const, label: "Check-in" },
    { id: "profile" as TabType, icon: "person" as const, label: "Perfil" },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const animatedStyle = useAnimatedStyle(() => ({
            transform: [
              { scale: withSpring(isActive ? 1.1 : 1) },
              { translateY: withSpring(isActive ? -2 : 0) },
            ],
          }));

          return (
            <TouchableOpacity
              key={tab.id}
              onPress={() => onTabChange(tab.id)}
              style={styles.tab}
              activeOpacity={0.7}
            >
              <Animated.View style={animatedStyle}>
                <Ionicons
                  name={tab.icon}
                  size={24}
                  color={isActive ? "#2563eb" : "#9ca3af"}
                />
              </Animated.View>
              <Text
                style={[
                  styles.label,
                  isActive && styles.labelActive,
                ]}
              >
                {tab.label}
              </Text>
              {isActive && <View style={styles.indicator} />}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 10,
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  tab: {
    alignItems: "center",
    minWidth: 60,
    position: "relative",
  },
  label: {
    fontSize: 12,
    color: "#6b7280",
    marginTop: 4,
  },
  labelActive: {
    color: "#2563eb",
  },
  indicator: {
    position: "absolute",
    bottom: -12,
    left: "50%",
    marginLeft: -2,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#2563eb",
  },
});

