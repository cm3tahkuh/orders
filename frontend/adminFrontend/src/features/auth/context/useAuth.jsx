import { createContext, useContext, useState, useEffect } from "react";
import { loginUser, logoutUser } from "../../../entities/user/user";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
      const generalUserData = localStorage.getItem("userData");

      const userData = JSON.parse(generalUserData);

      const username = userData.username;

     
        const data = await logoutUser(username);
        localStorage.removeItem("userData");
        setUser(null);
      
    } catch (error) {
      console.error("Ошибка при выходе:", error);
    }
  };

  useEffect(() => {
    const storedData = localStorage.getItem("userData");

    const jsonData = JSON.parse(storedData)

    if (storedData) {
      setUser({ id: jsonData.id, username: jsonData.username, role: jsonData.role });
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
