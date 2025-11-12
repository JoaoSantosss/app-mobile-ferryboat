export type TabType = "home" | "buy" | "checkin" | "profile";

export interface Schedule {
  time: string;
  ferryName: string;
  occupancy: number;
}

export interface TerminalStatus {
  status: "leve" | "moderado" | "alta";
  ferryName: string;
  departureTime: string;
  ferryStatus: "aguardando" | "embarcando" | "a-caminho";
  bestArrivalTime: string;
}

