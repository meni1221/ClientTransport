import { createContext, ReactNode, useState } from "react";
import useFetch from "../hooks/useFetch";
import { useNavigate } from "react-router-dom";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: "driver" | "admin" | "passenger";
}

interface UserDTO {
  email: string;
  password: string;
}

interface AuthContextType {
  user: IUser | null;
  error: string | null;
  login: (user: UserDTO, urlPath: string) => Promise<boolean>;
  logout: () => Promise<boolean>;
  clearError: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export default function AuthProvider({ children }: { children: ReactNode }) {
  const { POST } = useFetch("http://localhost:7891");
  const [user, setUser] = useState<IUser | null>(null);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const clearError = () => setError(null);

  const login = async (
    userClient: UserDTO,
    urlPath: string
  ): Promise<boolean> => {
    try {
      clearError();

      // בניית ה-URL הנכון
      let endpoint = "auth/login";
  

      const response = await POST(endpoint, userClient);

      if (!response || !response.foundUser) {
        console.error("Invalid response:", response);
        throw new Error("Invalid response from server");
      }

      setUser(response.foundUser);



      // ניווט
      navigate(`${urlPath}`);
      return true;
    } catch (error) {
      console.error("Login error details:", error);
      const errorMessage =
        error instanceof Error ? error.message : "An unexpected error occurred";
      setError(`Login failed: ${errorMessage}`);
      return false;
    }
  };

  const logout = async (): Promise<boolean> => {
    try {
      clearError();
      await POST("auth/logout");
      setUser(null);
      navigate("/");
      return true;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unexpected error occurred";
      setError(`Logout failed: ${errorMessage}`);
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ user, error, login, logout, clearError }}>
      {children}
    </AuthContext.Provider>
  );
}
