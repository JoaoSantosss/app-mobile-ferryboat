import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withRepeat, 
  withTiming,
  Easing 
} from "react-native-reanimated";

export function WeatherWidget() {
  const cloudY = useSharedValue(0);
  const windRotate = useSharedValue(0);
  const wavesY = useSharedValue(0);

  useEffect(() => {
    cloudY.value = withRepeat(
      withTiming(-5, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );
    windRotate.value = withRepeat(
      withTiming(10, { duration: 3000, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );
    wavesY.value = withRepeat(
      withTiming(3, { duration: 2500, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );
  }, []);

  const cloudStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: cloudY.value }],
  }));

  const windStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${windRotate.value}deg` }],
  }));

  const wavesStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: wavesY.value }],
  }));

  return (
    <LinearGradient
      colors={["#60a5fa", "#67e8f9"]}
      style={styles.container}
    >
      <View style={styles.content}>
        <View style={styles.item}>
          <Animated.View style={cloudStyle}>
            <Ionicons name="cloud" size={36} color="#fff" />
          </Animated.View>
          <View>
            <Text style={styles.label}>Temperatura</Text>
            <Text style={styles.value}>28°C</Text>
          </View>
        </View>

        <View style={styles.item}>
          <Animated.View style={windStyle}>
            <Ionicons name="leaf" size={36} color="#fff" />
          </Animated.View>
          <View>
            <Text style={styles.label}>Vento</Text>
            <Text style={styles.valueSmall}>12 km/h</Text>
          </View>
        </View>

        <View style={styles.item}>
          <Animated.View style={wavesStyle}>
            <Ionicons name="water" size={36} color="#fff" />
          </Animated.View>
          <View>
            <Text style={styles.label}>Mar</Text>
            <Text style={styles.valueSmall}>Calmo</Text>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 16,
  },
  item: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  label: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.9)",
    marginBottom: 2,
  },
  value: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "600",
    lineHeight: 28,
  },
  valueSmall: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "600",
    lineHeight: 22,
  },
});

