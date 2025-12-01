import { createContext, useContext, useState } from "react";

import { siteConfig } from "@/config/site";

type LoginType = {
  email: string;
  password: string;
  remember: string;
};

interface ProviderProps {
  user: string | null;
  token: string;
  cookie: string;
  login(data: LoginType): void;
  logout(): void;
}

const AuthContext = createContext<ProviderProps>({
  user: null,
  token: "",
  cookie: "",
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
  const [cookie, setCookie] = useState(storedInfo?.cookie || "");

  const login = async (data: LoginType): Promise<string> => {
    let t = "";
    let message = "";
    let cookie = "";

    const obj = { email: data.email, token: t };

    //Login with cookie or temporary token
    if (data.remember === "true") {
      const response = await fetch(siteConfig.api_endpoints.login_cookie, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Credentials: "include",
        },
        credentials: "include",
        mode: "cors",
        method: "POST",
        body: JSON.stringify({ email: data.email, password: data.password }),
      });

      t = "";

      cookie = response.headers.get("set-cookie") || "";
    } else {
      //token
      const response = await fetch(siteConfig.api_endpoints.login_token, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ email: data.email, password: data.password }),
      });

      const response_data = await response.json();

      t = response_data.accessToken;
      cookie = "";
    }

    setUser(data.email);
    setToken(t);
    setCookie(cookie);
    localStorage.setItem("user", JSON.stringify(obj));

    return message;
  };

  const callLogoutEndpoint = async (): Promise<boolean> => {
    try {
      const endpoint = siteConfig.api_endpoints.logout;

      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
        mode: "cors",
        body: JSON.stringify({ email: user }),
      });
      return res.ok;
    } catch {
      return false;
    }
  };

  const logout = () => {
    void callLogoutEndpoint();
    setUser(null);
    setToken("");
    setCookie("");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, cookie, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
