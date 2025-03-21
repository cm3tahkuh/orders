import { createContext, useContext, useState, useEffect } from "react";
import { loginUser, logoutUser } from "../../../entities/user/user";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  console.log(user);

  const login = async (username, password) => {
    const data = await loginUser(username, password);

    try {
      setUser(data);
    } catch (err) {
      setError(err.message || "Произошла ошибка");
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      const username = localStorage.getItem("userData");
      console.log(username);
      if (username) {
        const data = await logoutUser(username);
        localStorage.removeItem("userData");
        setUser(null);
      }
    } catch (error) {
      console.error("Ошибка при выходе:", error);
    }
  };

  useEffect(() => {
    const storedData = localStorage.getItem("userData");
    console.log(storedData);

    if (storedData) {
      setUser({ username: storedData.username });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
