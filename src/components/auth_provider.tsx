import { siteConfig } from "@/config/site";
import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router";

type LoginType = {
  email: string;
  password: string;
  remember: string;
};

type UserData = {
  email: string;
};

interface ProviderProps {
  user: string | null;
  token: string;
  login(data: LoginType): void;
  logout(): void;
}

const AuthContext = createContext<ProviderProps>({
  user: null,
  token: "",
  login: () => {},
  logout: () => {},
});

export const randomAlphaNumeric = (length: number) => {
  let s = "";

  Array.from({ length }).some(() => {
    s += Math.random().toString(36).slice(2);

    return s.length >= length;
  });

  return s.slice(0, length);
};

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const storedInfo = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user") || "{}")
    : null;
  const [user, setUser] = useState<string | null>(storedInfo?.email);
  const [token, setToken] = useState(storedInfo?.token || "");

  const login = async (data: LoginType): Promise<string> => {
    let t = "";
    let message = "";

    const obj = { email: data.email, token: t };

    if (data.remember === "true") {
      console.log("shouldnt be seeing this, like, ever.");
    } else {
      const response = await fetch(siteConfig.api_endpoints.login_token, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ email: data.email, password: data.password }),
      });

      const response_data = await response.json();
      console.log(response_data);
      t = response_data.accessToken;
    }

    setUser(data.email);
    setToken(t);
    localStorage.setItem("user", JSON.stringify(obj));

    return message;
  };

  const logout = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
