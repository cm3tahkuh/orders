import {
  Typography,
  Button,
  TextField,
  Box,
  Container,
  Paper,
  CircularProgress,
} from "@mui/material";
import { useAuth } from "../../features/auth/context/useAuth";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, loading, error, user } = useAuth();

  

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
   const data = await login(username, password);
    if (error) return;
  };

  useEffect(() => {
    if (user) {
      localStorage.setItem("userData", JSON.stringify({
        "id": user.identificator,
        "username": user.username,
        "role": user.role,

      }));
      navigate("/orders");
    }
  }, [user]);

  return (
    <Container maxWidth="xs">
      <Paper elevation={3} sx={{ padding: 3 }}>
        <Typography
          variant="h1"
          textAlign={"center"}
          fontSize={"32px"}
          fontWeight={500}
          letterSpacing={-0.5}
          component="h1"
          marginBottom={"32px"}
        >
          Авторизация в систему
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box
            gap={2.5}
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
          >
            <TextField
              label="Логин"
              variant="outlined"
              value={username}
              onChange={() => setUsername(event.target.value)}
            ></TextField>
            <TextField
              label="Пароль"
              variant="outlined"
              type="password"
              value={password}
              onChange={() => setPassword(event.target.value)}
            ></TextField>
            {error && (
              <Typography color="error" variant="body2">
                {error}
              </Typography>
            )}
            <Button type="submit" variant="outlined">
              {loading ? <CircularProgress size={24} /> : "Войти"}
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};
