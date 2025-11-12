import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Animated, { FadeInDown } from "react-native-reanimated";

export function GuestModeBanner() {
  return (
    <Animated.View
      entering={FadeInDown.duration(400)}
      style={styles.container}
    >
      <View style={styles.content}>
        <Ionicons name="person-outline" size={16} color="#fff" />
        <Text style={styles.text}>
          Você está usando o app como convidado. Algumas funções estão limitadas.
        </Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f59e0b",
    paddingHorizontal: 20,
    paddingVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  text: {
    fontSize: 12,
    color: "#fff",
    flex: 1,
    lineHeight: 18,
  },
});

