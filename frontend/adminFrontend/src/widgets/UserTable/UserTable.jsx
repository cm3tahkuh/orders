import {
  Table,
  Paper,
  TableContainer,
  Typography,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Box,
  Button,
  Select,
  MenuItem,
} from "@mui/material";
import BadgeIcon from "@mui/icons-material/Badge";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import LoginIcon from "@mui/icons-material/Login";
import PasswordIcon from "@mui/icons-material/Password";
import CoPresentIcon from "@mui/icons-material/CoPresent";
import { userRoleMap } from "../../entities/user/user";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";
import UserModal from "../UserModal/UserModal";


const UserTable = ({ data, onDelete, onEdit }) => {

  const [openModal, setOpenModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const handleOpenModal=(user)=>{
    setOpenModal(true)
    setCurrentUser(user)
  }

  const handleCloseModal=()=>{
    setOpenModal(false)
    setCurrentUser(null)
  }

  return (
    <TableContainer component={Paper}>
      {data &&
      (Array.isArray(data) ? data.length > 0 : Object.keys(data).length > 0) ? (
        <Table>
          <TableHead>
            <TableRow display={"flex"}>
              <TableCell>
                <Box display={"flex"} gap={1} alignContent={"center"}>
                  <BadgeIcon />
                  Имя
                </Box>
              </TableCell>
              <TableCell>
                <Box display={"flex"} gap={1} alignContent={"center"}>
                  <AssignmentIndIcon />
                  Фамилия
                </Box>
              </TableCell>
              <TableCell>
                <Box display={"flex"} gap={1} alignContent={"center"}>
                  <ContactPhoneIcon />
                  Телефон
                </Box>
              </TableCell>
              <TableCell>
                <Box display={"flex"} gap={1} alignContent={"center"}>
                  <LoginIcon />
                  Логин
                </Box>
              </TableCell>
              <TableCell>
                <Box display={"flex"} gap={1} alignContent={"center"}>
                  <PasswordIcon />
                  Пароль
                </Box>
              </TableCell>
              <TableCell>
                <Box display={"flex"} gap={1} alignContent={"center"}>
                  <CoPresentIcon />
                  Роль
                </Box>
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((user) => (
              <TableRow key={user.id} display={"flex"}>
                <TableCell>
                  <Box display={"flex"} gap={1} alignContent={"center"}>
                    {user.firstName}
                  </Box>
                </TableCell>
                <TableCell>
                  <Box display={"flex"} gap={1} alignContent={"center"}>
                    {user.lastName}
                  </Box>
                </TableCell>
                <TableCell>
                  <Box display={"flex"} gap={1} alignContent={"center"}>
                    {user.phone}
                  </Box>
                </TableCell>
                <TableCell>
                  <Box display={"flex"} gap={1} alignContent={"center"}>
                    {user.user.userName}
                  </Box>
                </TableCell>
                <TableCell>
                  <Box display={"flex"} gap={1} alignContent={"center"}>
                    {user.user.password}
                  </Box>
                </TableCell>
                <TableCell>
                  <Box display={"flex"} gap={1} alignContent={"center"}>
                    {userRoleMap[user.user.role]}
                  </Box>
                </TableCell>
                <TableCell
                  sx={{ display: "flex", gap: 1, flexDirection: "column" }}
                >
                  <Button
                    onClick={() => onDelete(user.id)}
                    variant="outlined"
                    color="error"
                    startIcon={<HighlightOffIcon />}
                    fullWidth
                  >
                    Удалить
                  </Button>
                  <Button
                    onClick={() => handleOpenModal(user)}
                    variant="outlined"
                    color="success"
                    startIcon={<EditIcon />}
                    fullWidth
                  >
                    Изменить
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <Typography
          variant="h2"
          fontWeight={600}
          fontSize={32}
          sx={{ padding: 5 }}
          textAlign={"center"}
        >
          Пользователи отсутствуют.
        </Typography>
      )}

      <UserModal open={openModal} onClose={handleCloseModal} onEdit={onEdit} user={currentUser}/>
    </TableContainer>
  );
};

export default UserTable;
