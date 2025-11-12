import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Card } from "./ui/Card";
import { Button } from "./ui/Button";
import { Progress } from "./ui/Progress";
import type { Schedule } from "../types";

interface ScheduleListProps {
  schedules: Schedule[];
  onBuy: (time: string) => void;
}

export function ScheduleList({ schedules, onBuy }: ScheduleListProps) {
  return (
    <Card style={styles.card}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Ionicons name="time" size={20} color="#2563eb" />
          <Text style={styles.title}>Próximos Horários</Text>
        </View>
        <Text style={styles.subtitle}>
          Selecione o melhor horário para sua viagem
        </Text>
      </View>

      <View style={styles.list}>
        {schedules.map((schedule, index) => (
          <View
            key={schedule.time}
            style={[
              styles.scheduleItem,
              index === 0 && styles.scheduleItemFirst,
            ]}
          >
            <View style={styles.scheduleHeader}>
              <View style={styles.scheduleInfo}>
                <View
                  style={[
                    styles.timeBox,
                    index === 0 && styles.timeBoxFirst,
                  ]}
                >
                  <Text
                    style={[
                      styles.time,
                      index === 0 && styles.timeFirst,
                    ]}
                  >
                    {schedule.time}
                  </Text>
                  {index === 0 && (
                    <Text style={styles.nextLabel}>Próximo</Text>
                  )}
                </View>

                <View style={styles.ferryInfo}>
                  <Ionicons name="boat" size={16} color="#2563eb" />
                  <Text style={styles.ferryName} numberOfLines={1}>
                    {schedule.ferryName}
                  </Text>
                </View>
              </View>

              <Button
                onPress={() => onBuy(schedule.time)}
                style={[
                  styles.buyButton,
                  index === 0 ? styles.buyButtonFirst : styles.buyButtonNormal,
                ]}
              >
                <Text style={styles.buyButtonText}>Comprar</Text>
              </Button>
            </View>

            <View style={styles.occupancy}>
              <View style={styles.occupancyHeader}>
                <Text style={styles.occupancyLabel}>Ocupação de vagas</Text>
                <Text style={styles.occupancyValue}>{schedule.occupancy}%</Text>
              </View>
              <Progress value={schedule.occupancy} style={styles.progress} />
            </View>
          </View>
        ))}
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  header: {
    marginBottom: 20,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#374151",
  },
  subtitle: {
    fontSize: 14,
    color: "#6b7280",
  },
  list: {
    gap: 12,
  },
  scheduleItem: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#e5e7eb",
    backgroundColor: "#f9fafb",
  },
  scheduleItemFirst: {
    backgroundColor: "#dbeafe",
    borderColor: "#93c5fd",
  },
  scheduleHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
    gap: 12,
  },
  scheduleInfo: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    minWidth: 0,
  },
  timeBox: {
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    minWidth: 72,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  timeBoxFirst: {
    backgroundColor: "#fff",
  },
  time: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1e40af",
    lineHeight: 24,
  },
  timeFirst: {
    color: "#1e40af",
  },
  nextLabel: {
    fontSize: 10,
    color: "#0891b2",
    marginTop: 2,
  },
  ferryInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    flex: 1,
    minWidth: 0,
  },
  ferryName: {
    fontSize: 16,
    color: "#374151",
    flex: 1,
  },
  buyButton: {
    height: 40,
    paddingHorizontal: 20,
    borderRadius: 12,
    flexShrink: 0,
  },
  buyButtonFirst: {
    backgroundColor: "#2563eb",
  },
  buyButtonNormal: {
    backgroundColor: "#3b82f6",
  },
  buyButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  occupancy: {
    gap: 8,
  },
  occupancyHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  occupancyLabel: {
    fontSize: 12,
    color: "#6b7280",
  },
  occupancyValue: {
    fontSize: 12,
    color: "#374151",
    fontWeight: "600",
  },
  progress: {
    height: 8,
  },
});

