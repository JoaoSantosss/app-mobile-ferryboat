import { LoginScreen } from "../screens/LoginScreen";
import { useAuth } from "../contexts/AuthContexts";

export default function Login() {
  const { login, guestLogin } = useAuth();

  return <LoginScreen onLogin={login} onGuestLogin={guestLogin} />;
}

