import {
  Modal,
  Paper,
  Typography,
  Box,
  Button,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";
import { useState, useEffect } from "react";
import React from "react";
import { userRoleMap } from "../../entities/user/user";

const UserModal = ({ open, onClose, user, mode, onEdit, onAdd }) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    overflowY:"scroll",
    height: "auto",
    p: 4,
  };

  const [currentUser, setCurrentUser] = useState(user);


  useEffect(() => {
    if (mode === "edit" && user) {
      setCurrentUser(user);
    } else if (mode === "add") {
      setCurrentUser({
        firstName: "",
        lastName: "",
        phone: "",
        user: {
          userName: "",
          password: "",
          role: 2,
        },
      });
    }
  }, [user, mode]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setCurrentUser((prev) => {
      const [key, nestedKey] = name.split(".");

      if (nestedKey) {
        return {
          ...prev,
          [key]: {
            ...prev[key],
            [nestedKey]: value,
          },
        };
      }

      return {
        ...prev,
        [key]: value,
      };
    });
  };

  return (
    <Paper>
      <Modal open={open} onClose={onClose}>
        <Box sx={style}>
          <Typography
            variant="h6"
            component="h2"
            textAlign={"center"}
            fontSize={24}
            fontWeight={600}
          >
            {mode === "edit"
              ? "Изменить данные пользователя"
              : "Добавить нового пользователя"}
          </Typography>
          {currentUser && (
            <>
              <TextField
                label="Имя"
                name="firstName"
                value={currentUser.firstName}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Фамилия"
                name="lastName"
                value={currentUser.lastName}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Телефон"
                name="phone"
                value={currentUser.phone}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Логин"
                name="user.userName"
                value={currentUser.user.userName}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Пароль"
                name="user.password"
                value={currentUser.user.password}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <Typography>Роль</Typography>
              <Select
                value={currentUser.user.role}
                name="user.role"
                onChange={handleChange}
              >
                {Object.entries(userRoleMap).map(([key, value]) => (
                  <MenuItem key={key} value={Number(key)}>
                    {value}
                  </MenuItem>
                ))}
              </Select>
            </>
          )}
          <Box display={"flex"} marginTop={2} justifyContent={"space-between"}>
            <Button variant="outlined" color="error" onClick={() => onClose()}>
              Закрыть
            </Button>
            <Button
              variant="outlined"
              color="success"
              onClick={() => {
                mode === "edit" ? onEdit(currentUser) : onAdd(currentUser);
                alert("Данные пользователя успешно изменены!");
                onClose();
              }}
            >
              {mode === "edit" ? "Сохранить" : "Добавить"}
            </Button>
          </Box>
        </Box>
      </Modal>
    </Paper>
  );
};

export default UserModal;
