import {
  Container,
  createTheme,
  Typography,
  ThemeProvider,
  Paper,
} from "@mui/material";
import { useOrders } from "./features/orders/useOrder";
import { OrderTable } from "./pages/order-table-page/ordertable";
import Login from "./pages/Login/Login";

const theme = createTheme({
  typography: {
    allVariants: {
      fontFamily: '"Inter", sans-serif',
      textTransform: "none",
      fontSize: 16,
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="xl">
        <Paper elevation={1} sx={{ padding: 3, marginTop: 5, marginBottom: 5 }}>
          <Typography
            display={"flex"}
            fontWeight={600}
            letterSpacing={-1}
            fontSize={32}
          >
            Админ-Панель
          </Typography>
        </Paper>

        <Login />
      </Container>
    </ThemeProvider>
  );
}

export default App;
