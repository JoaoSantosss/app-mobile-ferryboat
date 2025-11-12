import { createContext, useContext, useState, ReactNode } from "react";

interface TerminalContextType {
  selectedTerminal: string;
  setSelectedTerminal: (terminal: string) => void;
}

const TerminalContext = createContext<TerminalContextType | undefined>(undefined);

export function TerminalProvider({ children }: { children: ReactNode }) {
  const [selectedTerminal, setSelectedTerminal] = useState<string>("Ponta da Espera");

  return (
    <TerminalContext.Provider
      value={{
        selectedTerminal,
        setSelectedTerminal,
      }}
    >
      {children}
    </TerminalContext.Provider>
  );
}

export function useTerminal() {
  const context = useContext(TerminalContext);
  if (context === undefined) {
    throw new Error("useTerminal must be used within a TerminalProvider");
  }
  return context;
}

