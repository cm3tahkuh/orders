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
  TableBody
} from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PhoneIcon from '@mui/icons-material/Phone';
import SubjectIcon from '@mui/icons-material/Subject';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import BadgeIcon from '@mui/icons-material/Badge';

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
  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg">
        <Paper elevation={5} sx={{ padding: 3, marginTop: 5, marginBottom: 5 }}>
          <Typography display={"flex"} fontWeight={700} fontSize={32} justifyContent={"center"}>Админ-Панель</Typography>
        </Paper>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow display={"flex"} justifyContent={"center"}>
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
              </TableRow>
            </TableHead>
            <TableBody>
            <TableRow display={"flex"} justifyContent={"center"}>
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
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

      </Container>
    </ThemeProvider>
  );
}

export default App;
