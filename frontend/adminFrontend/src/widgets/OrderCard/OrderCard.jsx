import {
  Box,
  Typography,
  Paper,
  Container,
  Grid2,
  Divider,
  Button,
} from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { orderStatusMap } from "../../entities/order/order";
import { useState } from "react";

const OrderCard = ({
  data,
  dataEmployees,
  getEmployeesByOrderId,
  DeleteEmployeeInOrder,
}) => {
  const [orderId, setOrderId] = useState(null);
  console.log(orderId);
  console.log(dataEmployees);

  return (
    <Grid2 container spacing={2}>
      <Grid2 size={8}>
        <Paper style={{ padding: 20 }}>
          <Typography
            fontSize={32}
            fontWeight={600}
            letterSpacing={-1}
            element="h2"
          >
            Заявки
          </Typography>
          <Divider />
          {data.map((order) => (
            <Box
              onClick={() => {
                getEmployeesByOrderId(order.id);
                setOrderId(order.id);
              }}
              key={order.id}
            >
              <Box marginTop={1} marginBottom={1}>
                <Box display={"flex"} justifyContent={"space-between"}>
                  <Typography fontSize={18} fontWeight={500}>
                    {order.name}
                  </Typography>
                  <Typography>{orderStatusMap[order.status]}</Typography>
                </Box>
                <Box marginBottom={1} gap={1} display={"flex"}>
                  <Box gap={0.3} display={"flex"} alignItems={"center"}>
                    <PhoneIcon sx={{ fontSize: "14px" }} />
                    <Typography fontSize={14} fontWeight={300}>
                      {order.phone}
                    </Typography>
                  </Box>

                  <Box gap={0.3} display={"flex"} alignItems={"center"}>
                    <AccessTimeFilledIcon sx={{ fontSize: "14px" }} />
                    <Typography fontSize={14} fontWeight={300}>
                      {new Date(order.createdAt).toLocaleString()}
                    </Typography>
                  </Box>
                </Box>
                <Typography fontSize={18} fontWeight={500}>
                  {order.description}
                </Typography>
                <Box>
                  <Typography fontWeight={300}>
                    {order.employees.length} назначенных сотрудников
                  </Typography>
                </Box>
              </Box>
              <Divider />
            </Box>
          ))}
        </Paper>
      </Grid2>

      <Grid2 item size={4}>
        <Paper style={{ padding: 20 }}>
          <Typography
            fontSize={32}
            fontWeight={600}
            letterSpacing={-1}
            element="h2"
          >
            Детали заявки
          </Typography>
          <Divider />
          <Box>
            <Typography fontWeight={400}>Назначенные сотрудники</Typography>
            {dataEmployees.length > 0 ? (
              dataEmployees.map((employee) => (
                <Box
                  key={employee.id}
                  sx={{ margin: "10px 0px" }}
                  justifyContent={"space-between"}
                  display={"flex"}
                >
                  <Box>
                    <Typography fontWeight={400} fontSize={14}>
                      {employee.firstName} {employee.lastName}
                    </Typography>
                    <Typography fontWeight={300} fontSize={14}>
                      {employee.phone}
                    </Typography>
                  </Box>
                  <Button
                    onClick={() => DeleteEmployeeInOrder(orderId, employee.id)}
                    color="error"
                  >
                    <DeleteOutlineIcon color="error" />
                  </Button>
                </Box>
              ))
            ) : (
              <Typography>
                Нет назначенных сотрудников или заявка не выбрана
              </Typography>
            )}
            <Box gap={1} display={"flex"} flexDirection={"column"}>
              <Button color="success" variant="outlined">
                Добавить
              </Button>
              <Button color="secondary" variant="outlined">
                Сохранить
              </Button>
            </Box>
          </Box>
        </Paper>
      </Grid2>
    </Grid2>
  );
};

export default OrderCard;
