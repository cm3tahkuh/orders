import { useAuth } from "../../features/auth/context/useAuth";
import { useNavigate } from "react-router-dom";
import { Typography, Paper, Container, Button, Box } from "@mui/material";

const Header = () => {
  const { user, login, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <Paper elevation={1} sx={{ padding: 3, marginTop: 5, marginBottom: 5 }}>
      <Box display="flex" justifyContent={"space-between"}>
      <Typography
        display={"flex"}
        fontWeight={600}
        letterSpacing={-1}
        fontSize={32}
      >
        Админ-Панель
      </Typography>
      <Button
        variant="outlined"
        onClick={user ? logout : () => navigate("/login")}
      >
        {user ? "Выйти" : "Войти"}
      </Button>
      </Box>
    </Paper>
    
  );
};

export default Header;
