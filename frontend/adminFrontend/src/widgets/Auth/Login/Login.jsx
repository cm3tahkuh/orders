import {
  Typography,
  Button,
  TextField,
  Box,
  Container,
  Paper,
} from "@mui/material";

const Login = () => {
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
        <form>
          <Box
            gap={2.5}
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
          >
            <TextField label="Логин" variant="outlined"></TextField>
            <TextField
              label="Пароль"
              variant="outlined"
              type="password"
            ></TextField>
            <Button type="submit" variant="outlined">
              Войти
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default Login;
