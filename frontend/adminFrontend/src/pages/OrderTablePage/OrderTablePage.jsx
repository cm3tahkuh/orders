import { OrderTable } from "../../widgets/OrderTable/OrderTable";
import { useOrders } from "../../features/orders/useOrder";
import { Box, Typography, Paper } from "@mui/material";

const OrderTablePage = () => {
  const { data, handleDeleteOrder, handleStatusChange } = useOrders();

  return (
    <section>
      <Paper elevation={3} sx={{ padding: 3, marginTop: 5, marginBottom: 5 }}>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Typography
            variant="h1"
            fontWeight={500}
            letterSpacing={-1}
            fontSize={24}
          >
            Таблица заявок
          </Typography>
        </Box>
      </Paper>
      <Paper elevation={3} sx={{ padding: 3, marginTop: 5, marginBottom: 5 }}>
        <OrderTable
          data={data}
          onStatusChange={handleStatusChange}
          onDelete={handleDeleteOrder}
        />
      </Paper>
    </section>
  );
};

export default OrderTablePage;
