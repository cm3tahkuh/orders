import { Typography, Box, Button, Paper } from "@mui/material";
import { useAuth } from "../../features/auth/context/useAuth";
import UserTable from "../../widgets/UserTable/UserTable";
import { useUsers } from "../../features/user/useUser";

const RegisterEmployeePage = () => {
  const { user } = useAuth();

  const { data, handleDeleteUser, handleEditUser } = useUsers();

  // console.log(data);

  return (
    <Box>
      <Paper elevation={1} sx={{ padding: 3, marginTop: 5, marginBottom: 5 }}>
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
            Регистрация сотрудников
          </Typography>
          <Button variant="outlined">Добавить</Button>
        </Box>
      </Paper>
      <Paper elevation={1} sx={{ padding: 3, marginTop: 5, marginBottom: 5 }}>
        <UserTable
          data={data}
          onDelete={handleDeleteUser}
          onEdit={handleEditUser}
        />
      </Paper>
    </Box>
  );
};

export default RegisterEmployeePage;
