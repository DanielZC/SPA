import { login, logout, register } from "@/api/services/auth.services";
import type { LoginData } from "@/interfaces/api.interfaces";
import type {
  AuthResponse,
  LoginInterface,
  RegisterInterface,
} from "@/interfaces/auth.interfaces";
import { createContext, useState, type PropsWithChildren } from "react";
import { toast } from "sonner";

interface UserContextProps {
  isAuth: boolean;
  user: LoginData | null;
  handleRegister: (data: RegisterInterface) => Promise<AuthResponse>;
  handleLogin: (data: LoginInterface) => Promise<AuthResponse>;
  logout: () => void;
}

export const UserContext = createContext({} as UserContextProps);

export const UserContextProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<null | LoginData>(null);
  const [isAuth, setIsAuth] = useState(false);
  const handleRegister = async (
    userData: RegisterInterface,
  ): Promise<AuthResponse> => {
    const { success, errors, server } = await register(userData);

    if (!success) {
      return { registered: success, errors: errors, server: server };
    }

    return { registered: success, errors: null };
  };

  const handleLogin = async (
    credentials: LoginInterface,
  ): Promise<AuthResponse> => {
    const { success, errors, server, data } = await login(credentials);

    if (!success) {
      return { auth: success, errors: errors, server: server };
    }
    setUser(data);
    setIsAuth(true);
    return { auth: success, data, errors: null };
  };

  const handleLogout = async () => {
    const response = logout();

    if (!response) toast.warning("Ha ocurrido un error");

    toast.success("Sesion finalizada");
    setIsAuth(false);
    setUser(null);
    localStorage.clear();
  };

  return (
    <UserContext
      value={{
        isAuth: isAuth,
        user: user,
        handleRegister: handleRegister,
        handleLogin: handleLogin,
        logout: handleLogout,
      }}
    >
      {children}
    </UserContext>
  );
};
