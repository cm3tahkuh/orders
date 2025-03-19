import {
  Container,
  createTheme,
  Typography,
  ThemeProvider,
  Paper,
} from "@mui/material";
import { useOrders } from "./features/orders/useOrder";
import { OrderTable } from "./widgets/OrderTable/ordertable";
import Login from "./widgets/Auth/Login/Login";

const theme = createTheme({
  typography: {
    allVariants: {
      fontFamily: ["Segoe UI", "sans-serif"].join(","),
      textTransform: "none",
      fontSize: 16,
    },
  },
});

function App() {
  const { data, handleStatusChange, handleDeleteOrder } = useOrders();

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="xl">
        <Paper elevation={3} sx={{ padding: 3, marginTop: 5, marginBottom: 5 }}>
          <Typography display={"flex"} fontWeight={100} letterSpacing={-2} fontSize={32}>
            Админ-Панель
          </Typography>
        </Paper>

        <OrderTable
          data={data}
          onStatusChange={handleStatusChange}
          onDelete={handleDeleteOrder}
        />
        <Login/>
      </Container>
    </ThemeProvider>
  );
}

export default App;
