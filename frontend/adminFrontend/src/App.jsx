import {
  Container,
  createTheme,
  Typography,
  ThemeProvider,
  Box,
  Paper,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  Table,
  TableBody,
  Button,
  Select,
  MenuItem
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PhoneIcon from "@mui/icons-material/Phone";
import SubjectIcon from "@mui/icons-material/Subject";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import BadgeIcon from "@mui/icons-material/Badge";
import RotateRightIcon from "@mui/icons-material/RotateRight";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { useEffect, useState } from "react";

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
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:5295/api/Order");

      const responseData = await response.json();

      setData(responseData);
    };

    fetchData();
  }, []);


  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const response = await fetch(`http://localhost:5295/api/Order/${orderId}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({
          status: newStatus, // отправляем новый статус
        }),
      });

      const result = await response.json();
      
      if (result) {
        // Обновляем список данных с новым статусом
        setData((prevData) =>
          prevData.map((order) =>
            order.id === orderId ? { ...order, status: newStatus } : order
          )
        );
        alert("Статус заявки обновлен");
      } else {
        alert("Ошибка при обновлении статуса");
      }
    } catch (error) {
      console.error("Ошибка при обновлении статуса:", error);
      alert("Произошла ошибка при обновлении статуса");
    }
  };


  const handleDeleteOrder = async (deleteId) => {
    const result = window.confirm("Вы уверены что хотите удалить заявку?");
    if (result) {
      const response = await fetch(
        `http://localhost:5295/api/Order/${deleteId}`,
        {
          method: "DELETE",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );

      const data = response.json();
      if (data) {
        setData((prevData) =>
          prevData.filter((order) => order.id !== deleteId)
        );
        alert("Заявка успешно удалена!")
      } else{
        alert(`Ошибка при удалении заявки.`)
      }
    }
  };

  const orderStatusMap = {
    0: "Новая",
    1: "ВПроцессе",
    2: "Выполнена",
    3: "Отменена",
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="xl">
        <Paper elevation={5} sx={{ padding: 3, marginTop: 5, marginBottom: 5 }}>
          <Typography display={"flex"} fontWeight={700} fontSize={32}>
            Админ-Панель
          </Typography>
        </Paper>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow display={"flex"}>
                <TableCell>
                  <Box display={"flex"} gap={1} alignContent={"center"}>
                    <AccountCircleIcon />
                    Клиент
                  </Box>
                </TableCell>
                <TableCell>
                  <Box display={"flex"} gap={1} alignContent={"center"}>
                    <PhoneIcon />
                    Контакты
                  </Box>
                </TableCell>
                <TableCell>
                  <Box display={"flex"} gap={1} alignContent={"center"}>
                    <SubjectIcon />
                    Описание
                  </Box>
                </TableCell>
                <TableCell>
                  <Box display={"flex"} gap={1} alignContent={"center"}>
                    <RotateRightIcon />
                    Статус
                  </Box>
                </TableCell>
                <TableCell>
                  <Box display={"flex"} gap={1} alignContent={"center"}>
                    <QueryBuilderIcon />
                    Создана
                  </Box>
                </TableCell>
                <TableCell>
                  <Box display={"flex"} gap={1} alignContent={"center"}>
                    <BadgeIcon />
                    Выполнитель
                  </Box>
                </TableCell>
                <TableCell>
                  <Box display={"flex"} gap={1} alignContent={"center"}>
                  </Box>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data &&
                data.map((order) => (
                  <TableRow key={order.id} display={"flex"}>
                    <TableCell>
                      <Box display={"flex"} gap={1} alignContent={"center"}>
                        {order.name}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box display={"flex"} gap={1} alignContent={"center"}>
                        {order.phone}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box display={"flex"} gap={1} alignContent={"center"}>
                        {order.description}
                      </Box>
                    </TableCell>
                    <TableCell>
                    <Box display={"flex"} gap={1} alignContent={"center"}>
                    <Select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                    >
                      {Object.entries(orderStatusMap).map(([key, value]) => (
                        <MenuItem key={key} value={Number(key)}>
                          {value}
                        </MenuItem>
                      ))}
                    </Select>
                  </Box>
                    </TableCell>
                    <TableCell>
                      <Box display={"flex"} gap={1} alignContent={"center"}>
                        {new Date(order.createdAt).toLocaleString()}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box display={"flex"} gap={1} alignContent={"center"}>
                        {order.completedAt === null
                          ? "Не назначен"
                          : new Date(order.completedAt).toLocaleString()}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Button
                        onClick={() => handleDeleteOrder(order.id)}
                        variant="outlined"
                        color="error"
                        startIcon={<HighlightOffIcon />}
                      >
                        Удалить
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </ThemeProvider>
  );
}

export default App;
