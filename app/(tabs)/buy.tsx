import { PurchaseScreen } from "../../screens/PurchaseScreen";
import { useAuth } from "../../contexts/AuthContexts";
import { useTerminal } from "../../contexts/TerminalContext";
import { router } from "expo-router";

export default function Buy() {
  const { isGuestMode, switchToLogin } = useAuth();
  const { selectedTerminal } = useTerminal();

  const handleSwitchToLogin = () => {
    switchToLogin();
  };

  return (
    <PurchaseScreen
      initialOrigin={selectedTerminal}
      isGuestMode={isGuestMode}
      onSwitchToLogin={handleSwitchToLogin}
    />
  );
}

